#!/bin/bash

# Setup script for local development
# This script installs dependencies and sets up the development environment

set -e

echo "🛠️ Setting up Skylar Matthews Resume Website development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create terraform.tfvars if it doesn't exist
if [ ! -f "terraform/terraform.tfvars" ]; then
    echo "📝 Creating terraform.tfvars from example..."
    cp terraform/terraform.tfvars.example terraform/terraform.tfvars
    echo "⚠️  Please edit terraform/terraform.tfvars with your specific values"
fi

# Make deploy script executable
chmod +x scripts/deploy.sh

echo "✅ Setup completed!"
echo ""
echo "🚀 Next steps:"
echo "1. Edit terraform/terraform.tfvars with your Azure configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Run 'scripts/deploy.sh' to deploy to Azure (requires Azure CLI and Terraform)"
echo ""
echo "📚 Available commands:"
echo "  npm run dev      - Start development server"
echo "  npm run build    - Build for production"
echo "  npm run preview  - Preview production build"
echo "  npm run lint     - Run ESLint"
