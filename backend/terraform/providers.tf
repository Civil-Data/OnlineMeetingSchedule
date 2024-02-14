# Initialises Terraform providers and sets their version numbers.

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.90.0"
    }
  }

  required_version = "~> 1.7.2"
}

provider "azurerm" {
  skip_provider_registration = true
  features {}
}