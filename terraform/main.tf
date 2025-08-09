terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.0"
    }
  }
  # Remote backend (uncomment and configure after creating state storage):
  # backend "azurerm" {
  #   resource_group_name  = "rg-terraform-state"
  #   storage_account_name = "<stateaccount>"
  #   container_name       = "tfstate"
  #   key                  = "resume-prod.tfstate"
  # }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

provider "azuread" {
}

# Data sources
data "azurerm_client_config" "current" {}

# Resource Group
locals {
  base_tags = {
    Environment = var.environment
    Project     = "skylar-matthews-resume"
    ManagedBy   = "terraform"
  }
  all_tags = merge(local.base_tags, var.additional_tags)
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = local.all_tags
}

# Storage Account for Static Website Hosting
resource "azurerm_storage_account" "static_site" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  allow_blob_public_access = true # required for static website hosting
  min_tls_version          = "TLS1_2"
  enable_https_traffic_only = true

  # Enforce that only the $web container is public (future enhancement: add container-level ACLs)

  static_website {
    index_document = "index.html"
    error_404_document = "index.html"
  }

  tags = local.all_tags
}

# CDN Profile
resource "azurerm_cdn_profile" "main" {
  name                = "${var.project_name}-cdn"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Standard_Microsoft"
  tags                = local.all_tags
}

# CDN Endpoint
resource "azurerm_cdn_endpoint" "main" {
  name                = "${var.project_name}-endpoint"
  profile_name        = azurerm_cdn_profile.main.name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  origin {
    name      = "storage"
    host_name = azurerm_storage_account.static_site.primary_web_host
  }

  origin_host_header = azurerm_storage_account.static_site.primary_web_host

  # Caching rules for better performance
  global_delivery_rule {
    cache_expiration_action {
      behavior = "Override"
      duration = "1.00:00:00"
    }

    cache_key_query_string_action {
      behavior   = "IncludeAll"
    }
  }

  delivery_rule {
    name  = "spa-routing"
    order = 1

    url_file_extension_condition {
      operator         = "LessThan"
      negate_condition = false
      match_values     = ["1"]
    }

    url_rewrite_action {
      source_pattern          = "/"
      destination             = "/index.html"
      preserve_unmatched_path = false
    }
  }

  # (Optional) Add custom domain resource referencing var.custom_domain once DNS is set
  tags = local.all_tags
}

# Application Insights for monitoring
resource "azurerm_application_insights" "main" {
  name                = "${var.project_name}-insights"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  application_type    = "web"
  tags                = local.all_tags
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "main" {
  name                = "${var.project_name}-logs"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = local.all_tags
}
