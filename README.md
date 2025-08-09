# Skylar Matthews - Resume Website

A modern, responsive resume website built with React, TypeScript, and Tailwind CSS, deployed on Azure with Terraform infrastructure as code.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Optimized for all devices and screen sizes
- **Performance**: Fast loading with Azure CDN integration
- **SEO Optimized**: Meta tags and structured data for search engines
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Infrastructure as Code**: Terraform for Azure resource management
- **Monitoring**: Application Insights integration
- **Security Hardening**: CSP, security headers, Terraform tag merging, storage hardening

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Build Tool**: Vite
- **Infrastructure**: Azure Storage (Static Website), Azure CDN, Application Insights
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Monitoring**: Azure Application Insights, Log Analytics

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Azure CLI
- Terraform 1.5+
- Azure subscription

## 🏗️ Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkylarMatthewsResumeWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Azure Deployment

### Infrastructure Setup

1. **Navigate to terraform directory**
   ```bash
   cd terraform
   ```

2. **Copy and configure variables**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your specific values
   ```

3. **Initialize Terraform**
   ```bash
   terraform init
   ```

4. **Plan deployment**
   ```bash
   terraform plan
   ```

5. **Apply infrastructure**
   ```bash
   terraform apply
   ```

### Application Deployment

The application automatically deploys via GitHub Actions when changes are pushed to the main branch.

#### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Azure Storage**
   ```bash
   az storage blob upload-batch \
     --destination '$web' \
     --source dist/ \
     --account-name <storage-account-name> \
     --auth-mode login
   ```

## 🔧 Configuration

### GitHub Actions Secrets

Set up the following secrets in your GitHub repository:

- `AZURE_CREDENTIALS`: Azure service principal credentials for authentication

### Environment Variables

Create a `.env` file for local development (optional):

```env
VITE_APP_INSIGHTS_KEY=your-app-insights-key
```

## 📊 Monitoring

The application includes Azure Application Insights for:

- Performance monitoring
- Error tracking
- User analytics
- Custom telemetry

## 🎨 Customization

### Updating Content

- **Experience**: Edit `src/data/index.ts` - `experiences` array
- **Certifications**: Edit `src/data/index.ts` - `certifications` array
- **Skills**: Edit `src/data/index.ts` - `skills` array
- **Contact Info**: Update social links in `src/components/Navigation.tsx`

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Update font imports in `index.html` and `tailwind.config.js`
- **Animations**: Customize Framer Motion animations in component files

## 🚀 Performance

- **Lighthouse Score**: 90+ across all metrics
- **CDN**: Global content delivery via Azure CDN
- **Caching**: Optimized caching strategies
- **Bundle Size**: Minimized with Vite's optimizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal resume website, suggestions and improvements are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Website**: [www.skylarmatthews.me](https://www.skylarmatthews.me)
- **LinkedIn**: [linkedin.com/in/skylarmatthews](https://linkedin.com/in/skylarmatthews)
- **Email**: skylar@skylarmatthews.me

---

Built with ❤️ by Skylar Matthews

---
### Deployment Hardening Notes
This repository includes optional Terraform enhancements (tag merging, remote backend scaffold, TLS enforcement) and a default CSP in `index.html`. If you enable a remote backend, uncomment the backend block in `terraform/main.tf` after provisioning the state storage account.
