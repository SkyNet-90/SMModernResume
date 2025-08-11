# Self-Hosted Deployment Guide

This document provides detailed instructions for deploying the Skylar Matthews resume website using a self-hosted approach with TrueNAS Scale, Portainer, and Cloudflare Tunnel.

## 🏗️ Architecture Overview

```
GitHub Repository → Git-Sync Container → Nginx Container → Cloudflare Tunnel → Internet
                         ↓
                  Automatic Build & Deploy
```

### Components:
- **TrueNAS Scale**: Host operating system
- **Portainer**: Container management interface
- **Git-Sync Container**: Monitors repo, builds and deploys automatically
- **Nginx Container**: Serves the static website
- **File Browser**: Web interface for file management
- **Cloudflare Tunnel**: Secure public access without open ports

## 📋 Prerequisites

### Required Infrastructure:
- TrueNAS Scale server (running and accessible)
- Portainer installed and configured
- Internet connection with sufficient upload bandwidth
- Domain registered with Cloudflare

### Required Accounts:
- GitHub account (for repository)
- Cloudflare account (for tunnel and DNS)

## 🚀 Step-by-Step Deployment

### Step 1: Cloudflare Tunnel Setup

1. **Login to Cloudflare Dashboard**
   - Navigate to Zero Trust → Access → Tunnels
   - Click "Create a tunnel"
   - Choose "Cloudflared"
   - Name: `skylar-resume-tunnel`

2. **Get Tunnel Token**
   - After creation, copy the tunnel token (long string starting with `eyJ...`)
   - Save this token - you'll need it for the container

3. **Configure DNS**
   - Go to your domain's DNS settings in Cloudflare
   - Delete any existing A/CNAME records for your domain
   - The tunnel will automatically create the needed DNS records

### Step 2: Portainer Stack Deployment

1. **Access Portainer**
   - Login to your Portainer interface
   - Navigate to "Stacks" in the sidebar

2. **Create New Stack**
   - Click "Add stack"
   - Name: `skylar-resume`
   - Choose "Web editor"

3. **Docker Compose Configuration**
   ```yaml
   version: '3.8'

   services:
     skylar-resume:
       image: nginx:alpine
       container_name: skylar-resume
       restart: unless-stopped
       ports:
         - "8081:80"
       volumes:
         - resume_html:/usr/share/nginx/html:ro
         - resume_logs:/var/log/nginx
       healthcheck:
         test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost"]
         interval: 30s
         timeout: 10s
         retries: 3
         start_period: 30s
       environment:
         - TZ=America/New_York
       depends_on:
         - git-sync
       networks:
         - resume-net

     # File manager for monitoring deployment
     filebrowser:
       image: filebrowser/filebrowser:latest
       container_name: resume-filebrowser
       restart: unless-stopped
       ports:
         - "8082:80"
       volumes:
         - resume_html:/srv:ro
         - git_repo:/git:ro
         - filebrowser_db:/database
       environment:
         - FB_BASEURL=/
         - FB_NOAUTH=false
       networks:
         - resume-net

     # Git sync with Node.js build capability
     git-sync:
       image: node:18-alpine
       container_name: resume-git-sync
       restart: unless-stopped
       volumes:
         - resume_html:/webroot
         - git_repo:/repo
         - node_modules_cache:/repo/node_modules
       environment:
         - GIT_REPO=https://github.com/SkyNet-90/SMModernResume.git
         - GIT_BRANCH=main
         - SYNC_INTERVAL=300
         - NODE_ENV=production
       command: >
         sh -c '
           echo "🚀 Starting resume git-sync with build capability...";
           apk add --no-cache git curl;
           
           cd /repo;
           
           if [ ! -d ".git" ]; then
             echo "🧹 Cleaning up existing non-git content...";
             rm -rf /repo/*;
             rm -rf /repo/.*; 
           fi;
           
           if [ -d ".git" ]; then
             echo "📦 Git repository exists, resetting and pulling...";
             git reset --hard HEAD || echo "Reset failed";
             git clean -fd || echo "Clean failed";
             git pull origin $GIT_BRANCH || echo "Pull failed, will retry";
           else
             echo "📥 Cloning repository...";
             git clone $GIT_REPO /tmp/repo-clone || exit 1;
             cp -r /tmp/repo-clone/* /repo/;
             cp -r /tmp/repo-clone/.git /repo/;
             rm -rf /tmp/repo-clone;
             cd /repo;
             git checkout $GIT_BRANCH || echo "Branch checkout failed";
           fi;
           
           if [ ! -f "package.json" ]; then
             echo "❌ Error: package.json not found in repository";
             exit 1;
           fi;
           
           echo "🔨 Installing dependencies and building...";
           npm ci --production=false || exit 1;
           npm run build || exit 1;
           
           echo "📋 Copying built files to web directory...";
           rm -rf /webroot/*;
           cp -r dist/* /webroot/ || exit 1;
           
           echo "✅ Initial deployment completed. Starting periodic sync...";
           
           while true; do
             sleep $SYNC_INTERVAL;
             echo "🔄 Checking for updates at $(date)";
             
             cd /repo;
             BEFORE=$(git rev-parse HEAD 2>/dev/null || echo "unknown");
             
             git reset --hard HEAD || echo "Reset failed";
             git clean -fd || echo "Clean failed";
             git pull origin $GIT_BRANCH || (echo "Git pull failed, retrying in next cycle" && continue);
             
             AFTER=$(git rev-parse HEAD 2>/dev/null || echo "unknown");
             
             if [ "$BEFORE" != "$AFTER" ]; then
               echo "📦 Changes detected! New commit: $AFTER";
               echo "🔨 Rebuilding project...";
               
               npm ci --production=false || (echo "npm ci failed" && continue);
               npm run build || (echo "Build failed" && continue);
               
               echo "🚀 Deploying new build...";
               rm -rf /webroot/*;
               cp -r dist/* /webroot/ || (echo "Copy failed" && continue);
               
               echo "✅ Deployment completed successfully!";
             else
               echo "ℹ️  No changes detected (commit: $AFTER)";
             fi;
           done
         '
       networks:
         - resume-net
       healthcheck:
         test: ["CMD", "test", "-f", "/webroot/index.html"]
         interval: 60s
         timeout: 10s
         retries: 3

     # Cloudflare Tunnel
     cloudflared-resume:
       image: cloudflare/cloudflared:latest
       container_name: cloudflared-resume
       restart: unless-stopped
       command: tunnel --no-autoupdate run --token ${CF_TUNNEL_TOKEN}
       environment:
         - TUNNEL_TOKEN=${CF_TUNNEL_TOKEN}
       depends_on:
         - skylar-resume
       networks:
         - resume-net

   volumes:
     resume_html:
       driver: local
     resume_logs:
       driver: local
     git_repo:
       driver: local
     node_modules_cache:
       driver: local
     filebrowser_db:
       driver: local

   networks:
     resume-net:
       driver: bridge
   ```

4. **Environment Variables**
   - In the "Environment variables" section, add:
   - **Name**: `CF_TUNNEL_TOKEN`
   - **Value**: Your Cloudflare tunnel token from Step 1

5. **Deploy Stack**
   - Click "Deploy the stack"
   - Wait for all containers to start

### Step 3: Configure Cloudflare Tunnel Routes

1. **Return to Cloudflare Dashboard**
   - Go to Zero Trust → Access → Tunnels
   - Click on your tunnel name

2. **Configure Public Hostnames**
   - Click "Public Hostnames" tab
   - Add hostname:
     - **Subdomain**: `www`
     - **Domain**: `yourdomain.com`
     - **Service Type**: `HTTP`
     - **URL**: `skylar-resume:80`
   
   - Add second hostname:
     - **Subdomain**: (leave blank for root)
     - **Domain**: `yourdomain.com`
     - **Service Type**: `HTTP`
     - **URL**: `skylar-resume:80`

### Step 4: Verification

1. **Check Container Logs**
   - In Portainer, go to Containers
   - Click on `resume-git-sync` → Logs
   - Should see successful clone and build messages

2. **Access File Browser**
   - Visit `http://your-truenas-ip:8082`
   - Login with `admin` / `admin`
   - Verify files are present

3. **Test Website**
   - Visit your domain (e.g., `https://www.yourdomain.com`)
   - Should see your resume website

## 🔧 Troubleshooting

### Git-Sync Container Issues

**Problem**: Container keeps restarting
- **Solution**: Check logs for specific error, often related to git clone conflicts
- **Fix**: Delete git_repo volume and restart stack

**Problem**: Build fails
- **Solution**: Check if package.json exists in repo, verify Node.js dependencies

### Cloudflare Tunnel Issues

**Problem**: Website not accessible
- **Solution**: Verify tunnel token is correct and container is running
- **Check**: Cloudflare tunnel status in dashboard

### Network Issues

**Problem**: Containers can't communicate
- **Solution**: Ensure all containers are on the same Docker network
- **Check**: Container network configuration in Portainer

## 🔄 Ongoing Management

### Updating Content
1. Make changes to your GitHub repository
2. Push changes to main branch
3. Git-sync will automatically detect and deploy within 5 minutes

### Monitoring
- **Portainer**: Monitor container health and resource usage
- **File Browser**: View deployed files and logs
- **Cloudflare**: Analytics and security insights

### Backups
- **Container volumes**: Backup via Portainer or TrueNAS
- **Source code**: Always in GitHub repository
- **Configuration**: Export Portainer stack for backup

## 🔐 Security Considerations

- **No open ports**: Cloudflare tunnel handles all ingress
- **Container isolation**: Each service runs in isolated container
- **Automatic updates**: Containers restart with latest code
- **Cloudflare protection**: DDoS protection and WAF
- **Read-only volumes**: Nginx volume is read-only for security

## 💰 Cost Comparison

| Service | Azure Cost/Month | Self-Hosted Cost |
|---------|------------------|-------------------|
| Storage | $2 | $0 (using existing hardware) |
| CDN/Front Door | $35+ | $0 (Cloudflare free tier) |
| Compute | N/A | $0 (existing server) |
| **Total** | **$37+/month** | **$0/month** |

**Annual Savings**: $400+ per year

---

## 📞 Support

If you encounter issues with this deployment:

1. Check container logs in Portainer
2. Verify network connectivity
3. Confirm Cloudflare tunnel configuration
4. Review GitHub repository permissions

For specific issues, check the container logs and GitHub repository issues.
