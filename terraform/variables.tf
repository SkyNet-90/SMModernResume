variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
  default     = "rg-skylar-resume"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "skylar-resume"
}

variable "storage_account_name" {
  description = "Storage account name for static website"
  type        = string
  default     = "saskylarresume"
  
  validation {
    condition     = can(regex("^[a-z0-9]{3,24}$", var.storage_account_name))
    error_message = "Storage account name must be between 3 and 24 characters, contain only lowercase letters and numbers."
  }
}

variable "custom_domain" {
  description = "Custom domain for the website"
  type        = string
  default     = "www.skylarmatthews.me"
}

variable "additional_tags" {
  description = "Additional tags to merge into all resources"
  type        = map(string)
  default     = {}
}
