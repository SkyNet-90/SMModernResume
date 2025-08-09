# Deployment Guide for Skylar Matthews Resume Website

This guide walks you through deploying your modern resume website to Azure using Terraform and setting up CI/CD with GitHub Actions.

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Terraform](https://www.terraform.io/downloads.html) (version 1.5+)
- [Node.js](https://nodejs.org/) (version 18+)
- An Azure subscription
- A GitHub account (for CI/CD)

## Quick Start

### 1. Initial Setup

```bash
# Clone the repository (if not already done)
git clone <your-repository-url>
cd SkylarMatthewsResumeWebsite

# Run setup script
./scripts/setup.sh
```

### 2. Configure Azure Authentication

```bash
# Login to Azure
az login

# Set your subscription (if you have multiple)
az account set --subscription "Your Subscription Name"
```

### 3. Configure Terraform Variables

```bash
# Copy the example terraform variables
cp terraform/terraform.tfvars.example terraform/terraform.tfvars

# Edit the variables to match your requirements
vim terraform/terraform.tfvars
```

Example `terraform.tfvars`:
```hcl
resource_group_name    = "rg-skylar-resume-prod"
location              = "East US"
environment           = "production"
project_name          = "skylar-resume"
storage_account_name  = "saskylarresumeprod"  # Must be globally unique
custom_domain         = "www.skylarmatthews.me"
```

### 4. Deploy Infrastructure and Application

```bash
# Deploy everything at once
./scripts/deploy.sh
```

Or deploy step by step:

```bash
# Build the application
npm run build

# Deploy infrastructure
cd terraform
terraform init
terraform plan
terraform apply

# Deploy website files
cd ..
STORAGE_ACCOUNT=$(cd terraform && terraform output -raw storage_account_name)
az storage blob upload-batch \
    --destination '$web' \
    --source dist/ \
    --account-name "$STORAGE_ACCOUNT" \
    --auth-mode login
```

## CI/CD Setup with GitHub Actions

### 1. Create Azure Service Principal

```bash
# Create service principal for GitHub Actions
az ad sp create-for-rbac \
    --name "github-actions-skylar-resume" \
    --role contributor \
    --scopes /subscriptions/{subscription-id} \
    --sdk-auth
```

Copy the entire JSON output for the next step.

### 2. Configure GitHub Secrets

In your GitHub repository, go to Settings > Secrets and variables > Actions, and add:

- **AZURE_CREDENTIALS**: The JSON output from the service principal creation

### 3. Push to GitHub

```bash
git add .
git commit -m "Initial commit - Modern resume website"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

The GitHub Actions workflow will automatically:
- Run tests and linting
- Build the application
- Deploy infrastructure with Terraform
- Upload files to Azure Storage
- Purge CDN cache

## Custom Domain Setup

### 1. Configure DNS

Point your domain to the CDN endpoint:
- Create a CNAME record pointing `www.skylarmatthews.me` to the CDN endpoint URL

### 2. Add Custom Domain to CDN

```bash
# Add custom domain to CDN endpoint (after DNS propagation)
az cdn custom-domain create \
    --endpoint-name {cdn-endpoint-name} \
    --profile-name {cdn-profile-name} \
    --resource-group {resource-group-name} \
    --name skylarmatthews \
    --hostname www.skylarmatthews.me
```

### 3. Enable HTTPS

```bash
# Enable managed HTTPS certificate
az cdn custom-domain enable-https \
    --endpoint-name {cdn-endpoint-name} \
    --profile-name {cdn-profile-name} \
    --resource-group {resource-group-name} \
    --name skylarmatthews
```

## Monitoring and Maintenance

### Application Insights

Your website includes Application Insights for monitoring:
- Page views and user sessions
- Performance metrics
- Error tracking
- Custom telemetry

Access your Application Insights data in the Azure Portal.

### Updates and Maintenance

To update your resume content:

1. Edit the data in `src/data/index.ts`
2. Commit and push to GitHub
3. The CI/CD pipeline will automatically deploy changes

To update infrastructure:

1. Modify Terraform files in the `terraform/` directory
2. Commit and push to GitHub
3. The pipeline will plan and apply changes

### Cost Optimization

The deployed resources are optimized for cost:
- Storage Account: Standard LRS replication
- CDN: Standard Microsoft tier
- Application Insights: Pay-as-you-go pricing

Expected monthly cost: $5-15 USD (depending on traffic)

## Troubleshooting

### Common Issues

1. **Storage account name conflicts**
   - Storage account names must be globally unique
   - Try adding random numbers to your storage account name

2. **Permission errors**
   - Ensure your Azure CLI is logged in: `az login`
   - Verify you have Contributor access to the subscription

3. **Build failures**
   - Check Node.js version: `node --version` (should be 18+)
   - Clear cache: `rm -rf node_modules package-lock.json && npm install`

4. **GitHub Actions failures**
   - Verify AZURE_CREDENTIALS secret is correctly set
   - Check the Actions logs for specific error messages

### Useful Commands

```bash
# Check Terraform state
cd terraform && terraform show

# View deployed resources
az resource list --resource-group rg-skylar-resume-prod

# Check website status
curl -I https://your-cdn-endpoint.azureedge.net

# View Application Insights logs
az monitor app-insights query \
    --app your-app-insights-name \
    --analytics-query "pageViews | limit 10"
```

## Support

For issues with this deployment:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Check Azure Portal for resource status
4. Review Terraform documentation for infrastructure issues

## Next Steps

After successful deployment:
1. Configure your custom domain and SSL certificate
2. Set up monitoring alerts in Application Insights
3. Consider adding additional features like contact form backend
4. Optimize for SEO with meta tags and structured data
5. Set up backup and disaster recovery procedures

---

🎉 Congratulations! Your modern resume website is now live on Azure!
