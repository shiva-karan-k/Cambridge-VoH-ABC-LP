# Deployment Guide

## Production Deployment

### Prerequisites

- MongoDB Atlas account (free tier available)
- Clerk production keys
- Vercel account (recommended) or other hosting platform

## Environment Setup

### 1. MongoDB Atlas Configuration

1. **Create MongoDB Atlas Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select region closest to your users
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose password authentication
   - Save username and password

4. **Whitelist IP Addresses**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For production: Add your server's IP
   - For development: Use "Allow Access from Anywhere" (0.0.0.0/0)

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 2. Clerk Production Setup

1. **Create Production Instance**
   - Go to https://dashboard.clerk.com/
   - Create a new application or use existing
   - Switch to "Production" mode

2. **Configure Domain**
   - Add your production domain
   - Set up redirect URLs
   - Configure allowed origins

3. **Get Production Keys**
   - Copy production publishable key
   - Copy production secret key

## Vercel Deployment

### 1. Connect Repository

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 2. Configure Environment Variables

In Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add the following:

```env
# Clerk Production Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_publishable_key
CLERK_SECRET_KEY=your_production_secret_key

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abc-breathing-course?retryWrites=true&w=majority

# Node Environment
NODE_ENV=production
```

### 3. Deploy

```bash
# Deploy to production
vercel --prod
```

## Post-Deployment Setup

### 1. Initialize Video Metadata

After first deployment, initialize the video system:

```bash
# Using curl (replace with your domain)
curl -X POST https://your-domain.com/api/videos/init \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Or visit the admin dashboard and use the initialization feature.

### 2. Create Admin Account

1. Visit `https://your-domain.com/admin/setup`
2. Create your admin account
3. Sign in at `https://your-domain.com/sign-in`

### 3. Test the System

1. Visit weekly pages to test video progression
2. Check admin dashboard for analytics
3. Test all forms (contact, donation, enrollment, newsletter)

## Alternative Deployment Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Configure environment variables in Netlify Dashboard.

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

Configure environment variables in Railway Dashboard.

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t abc-breathing-course .
docker run -p 3000:3000 --env-file .env.production abc-breathing-course
```

## Security Checklist

- [ ] Use production Clerk keys (not test keys)
- [ ] Enable HTTPS (automatic with Vercel/Netlify)
- [ ] Whitelist specific IPs in MongoDB Atlas
- [ ] Set up database backups
- [ ] Enable rate limiting on API routes
- [ ] Configure CORS properly
- [ ] Set secure headers
- [ ] Enable monitoring and logging
- [ ] Rotate API keys regularly
- [ ] Set up error tracking (Sentry, etc.)

## Performance Optimization

### 1. Enable Caching

The app includes built-in caching for:
- Video metadata
- User progress data
- Analytics data

### 2. CDN Configuration

For Vercel:
- Static assets automatically served via CDN
- Images optimized with Next.js Image component

### 3. Database Optimization

- Indexes already configured on MongoDB models
- Connection pooling enabled
- Query optimization in services

## Monitoring

### 1. Application Monitoring

Recommended tools:
- Vercel Analytics (built-in)
- Google Analytics
- Sentry for error tracking

### 2. Database Monitoring

- MongoDB Atlas monitoring dashboard
- Set up alerts for:
  - High connection count
  - Slow queries
  - Storage usage

### 3. Uptime Monitoring

Recommended tools:
- UptimeRobot
- Pingdom
- StatusCake

## Backup Strategy

### 1. Database Backups

MongoDB Atlas:
- Automatic backups enabled by default
- Configure backup schedule
- Test restore process

### 2. Code Backups

- Use Git for version control
- Push to GitHub/GitLab regularly
- Tag releases

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Database Rollback

1. Go to MongoDB Atlas
2. Navigate to "Backup"
3. Select restore point
4. Restore to cluster

## Troubleshooting Production Issues

### 500 Internal Server Error

1. Check Vercel logs
2. Verify environment variables
3. Check MongoDB connection
4. Review error tracking (Sentry)

### Authentication Issues

1. Verify Clerk production keys
2. Check domain configuration
3. Verify redirect URLs
4. Check CORS settings

### Database Connection Issues

1. Verify MongoDB connection string
2. Check IP whitelist
3. Verify database user credentials
4. Check connection limits

## Scaling Considerations

### Database Scaling

- MongoDB Atlas auto-scales
- Upgrade to higher tier if needed
- Consider read replicas for high traffic

### Application Scaling

- Vercel auto-scales by default
- Monitor function execution times
- Optimize API routes if needed

### CDN Scaling

- Static assets automatically scaled
- Consider separate CDN for videos if needed

## Cost Optimization

### Free Tier Limits

- **MongoDB Atlas**: 512MB storage (M0)
- **Vercel**: 100GB bandwidth/month
- **Clerk**: 10,000 MAU (Monthly Active Users)

### Upgrade Triggers

- MongoDB: Storage > 512MB
- Vercel: Bandwidth > 100GB/month
- Clerk: Users > 10,000 MAU

## Maintenance

### Regular Tasks

- [ ] Review error logs weekly
- [ ] Check database performance monthly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Review and optimize queries quarterly
- [ ] Test backup restore annually

### Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Support

For deployment issues:
1. Check Vercel/platform logs
2. Review MongoDB Atlas logs
3. Check Clerk dashboard
4. Review application error tracking

---

**Production Ready!** 🚀
