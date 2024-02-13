# Creates a Network Watcher on Azure.

resource "azurerm_resource_group" "networkwatcher" {
  name     = "NetworkWatcherRG"
  location = var.location
}

resource "azurerm_network_watcher" "networkwatcher" {
  name                = "NetworkWatcher_westeurope"
  location            = var.location
  resource_group_name = azurerm_resource_group.networkwatcher.name
}