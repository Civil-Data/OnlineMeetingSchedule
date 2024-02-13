# Creates a container registry in Azure (for Docker images).

resource "azurerm_container_registry" "main" {
  name                = var.app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  admin_enabled       = true
  sku                 = "Basic"
}