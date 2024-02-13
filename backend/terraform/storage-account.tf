# Create a storage account in Azure

resource "azurerm_storage_account" "main" {
  name                     = var.app_name
  resource_group_name      = azurerm_resource_group.main.name
  location                 = var.location
  account_kind             = "StorageV2"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}