output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.static_site.name
}

output "storage_account_primary_web_endpoint" {
  description = "Primary web endpoint of the storage account"
  value       = azurerm_storage_account.static_site.primary_web_endpoint
}

output "cdn_endpoint_hostname" {
  description = "Hostname of the CDN endpoint"
  value       = azurerm_cdn_endpoint.main.fqdn
}

output "cdn_endpoint_url" {
  description = "URL of the CDN endpoint"
  value       = "https://${azurerm_cdn_endpoint.main.fqdn}"
}

output "application_insights_instrumentation_key" {
  description = "Application Insights instrumentation key"
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "application_insights_connection_string" {
  description = "Application Insights connection string"
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}

output "log_analytics_workspace_id" {
  description = "Log Analytics workspace ID"
  value       = azurerm_log_analytics_workspace.main.id
}
