# Skylar Matthews - Resume Website

A modern, responsive resume website built with React, TypeScript, and Tailwind CSS, self-hosted on TrueNAS Scale with automated Git-sync deployment.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Optimized for all devices and screen sizes
- **Self-Hosted**: Running on TrueNAS Scale with Cloudflare Tunnel
- **SEO Optimized**: Meta tags and structured data for search engines
- **Automated Deployment**: Git-sync container for seamless updates
- **Containerized**: Docker containers managed with Portainer
- **Zero-Cost Infrastructure**: No cloud hosting fees
- **Security**: Cloudflare protection with zero open ports

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Build Tool**: Vite
- **Infrastructure**: TrueNAS Scale, Portainer, Docker
- **Networking**: Cloudflare Tunnel for secure public access
- **Deployment**: Git-sync automated deployment
- **CI/CD**: GitHub Actions for build validation
- **Web Server**: Nginx (Alpine)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- TrueNAS Scale server
- Portainer (for container management)
- Cloudflare account with domain
- Docker knowledge (basic)

## 🏗️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/SkyNet-90/SMModernResume.git
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

## � Self-Hosted Deployment

### Infrastructure Setup

1. **TrueNAS Scale with Portainer**
   - Ensure TrueNAS Scale is running
   - Install Portainer for container management
   - Have basic Docker knowledge

2. **Cloudflare Tunnel Setup**
   - Create Cloudflare account
   - Set up domain in Cloudflare
   - Create new tunnel for your domain

### Container Stack Deployment

1. **Create Portainer Stack**
   - Access Portainer interface
   - Create new stack named `skylar-resume`
   - Use the docker-compose.yml configuration (see deployment docs)

2. **Configure Environment Variables**
   - `CF_TUNNEL_TOKEN`: Your Cloudflare tunnel token
   - `GIT_REPO`: https://github.com/SkyNet-90/SMModernResume.git
   - `GIT_BRANCH`: main

3. **Deploy Stack**
   - Deploy the stack in Portainer
   - Verify all containers start successfully
   - Check git-sync container logs for build progress

### Automatic Deployment

The application automatically deploys when changes are pushed to the main branch:

1. **Git-sync container** monitors repository every 5 minutes
2. **Automatically builds** project with npm when changes detected  
3. **Deploys built files** to Nginx web directory
4. **Website updates** within 5 minutes of git push

#### Manual Deployment Trigger

To force immediate deployment:
```bash
# Restart the git-sync container in Portainer
docker restart resume-git-sync
```

## 🔧 Configuration

### Cloudflare Tunnel Configuration

1. **Create tunnel** in Cloudflare Zero Trust dashboard
2. **Configure public hostnames**:
   - `www.yourdomain.com` → `http://container-name:80`
   - `yourdomain.com` → `http://container-name:80`
3. **Update DNS** to point to tunnel

### Container Services

- **Nginx**: Serves the website on port 8081
- **Git-sync**: Monitors repo and builds/deploys automatically  
- **File Browser**: Web interface for file management (port 8082)
- **Cloudflare Tunnel**: Secure public access

## 📊 Monitoring

- **Portainer Dashboard**: Container health and logs
- **File Browser**: View deployed files and source code
- **Git-sync Logs**: Build and deployment status
- **Cloudflare Analytics**: Traffic and performance metrics

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
- **Cloudflare CDN**: Global content delivery and caching
- **Nginx**: Optimized static file serving
- **Container Efficiency**: Lightweight Alpine Linux containers

## 💡 Benefits of Self-Hosting

- **Zero hosting costs** (except domain registration)
- **Full control** over infrastructure and data
- **Learning experience** with containerization and networking
- **Scalable** - can easily add more services
- **Secure** - no open ports, Cloudflare protection
- **Professional setup** - enterprise-grade architecture

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

Built with ❤️ by Skylar Matthews | Self-hosted on TrueNAS Scale

---

### Architecture Notes
This deployment uses a containerized architecture with Git-sync for automated deployment, Cloudflare Tunnels for secure public access, and Portainer for container management. The setup provides enterprise-grade reliability while maintaining zero recurring hosting costs.
