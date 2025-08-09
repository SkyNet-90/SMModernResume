#!/bin/bash

# Deployment script for Skylar Matthews Resume Website
# This script builds the app and deploys it to Azure

set -e

echo "🚀 Starting deployment process..."

# Check if required tools are installed
command -v az >/dev/null 2>&1 || { echo "❌ Azure CLI is required but not installed. Aborting." >&2; exit 1; }
command -v terraform >/dev/null 2>&1 || { echo "❌ Terraform is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

# Build the application
echo "📦 Building application..."
npm ci
npm run build

# Deploy infrastructure with Terraform
echo "🏗️ Deploying infrastructure..."
cd terraform

# Initialize Terraform if needed
if [ ! -d ".terraform" ]; then
    echo "🔧 Initializing Terraform..."
    terraform init
fi

# Apply Terraform configuration
echo "🚀 Applying Terraform configuration..."
terraform apply -auto-approve

# Get storage account name
STORAGE_ACCOUNT=$(terraform output -raw storage_account_name)
RESOURCE_GROUP=$(terraform output -raw resource_group_name)

cd ..

# Deploy application to Azure Storage
echo "📤 Deploying application to Azure Storage..."
az storage blob upload-batch \
    --destination '$web' \
    --source dist/ \
    --account-name "$STORAGE_ACCOUNT" \
    --auth-mode login \
    --overwrite

# Purge CDN cache
echo "🔄 Purging CDN cache..."
CDN_PROFILE=$(echo "$RESOURCE_GROUP" | sed 's/rg-//')-cdn
CDN_ENDPOINT=$(echo "$RESOURCE_GROUP" | sed 's/rg-//')-endpoint

az cdn endpoint purge \
    --profile-name "$CDN_PROFILE" \
    --name "$CDN_ENDPOINT" \
    --resource-group "$RESOURCE_GROUP" \
    --content-paths "/*"

# Get the website URL
cd terraform
WEBSITE_URL=$(terraform output -raw cdn_endpoint_url)
cd ..

echo "✅ Deployment completed successfully!"
echo "🌐 Website URL: $WEBSITE_URL"
echo "📊 Monitor your application: https://portal.azure.com"
