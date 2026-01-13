# ABC Active Breathing Course - Documentation

## Quick Links

- [Setup Instructions](./SETUP.md) - Get started with development
- [Video Progression System](./VIDEO_PROGRESSION_SYSTEM.md) - Video unlock and progress tracking
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to production
- [API Reference](./API_REFERENCE.md) - Complete API documentation

## Project Overview

A Next.js web application for the ABC Active Breathing Course featuring:
- Sequential video progression system
- User authentication with Clerk
- Admin dashboard with analytics
- MongoDB backend for data persistence
- Responsive design for all devices

## Technology Stack

- **Frontend**: Next.js 16.1.1 with TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Styling**: CSS with custom components
- **Deployment**: Vercel-ready

## Key Features

### Video Progression System
- Sequential video unlocking based on completion
- Automatic progress tracking (90% completion threshold)
- Resume functionality for partially watched videos
- Admin controls for manual unlocking and progress reset

### Authentication & Authorization
- Clerk integration for user management
- Role-based access control for admin features
- Protected routes and API endpoints

### Admin Dashboard
- User progress monitoring
- Video analytics and completion rates
- Manual progress management
- User enrollment tracking

### Forms & Data Collection
- Contact form
- Donation form
- Course enrollment
- Newsletter subscription (with duplicate prevention)

## Project Structure

```
├── src/
│   ├── app/                      # Next.js app router
│   │   ├── admin/               # Admin dashboard pages
│   │   ├── api/                 # API routes
│   │   ├── weeks/               # Weekly course content
│   │   └── page.tsx             # Landing page
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities and services
│   │   ├── config/             # Configuration files
│   │   ├── services/           # Business logic services
│   │   └── utils/              # Helper utilities
│   └── models/                  # MongoDB models
├── public/                      # Static assets
└── docs/                        # Documentation
```

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd website
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Initialize System**
   - Visit `/admin/setup` to create admin account
   - Sign in at `/sign-in`
   - Initialize video metadata at `/api/videos/init`

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Documentation

- **[Setup Instructions](./SETUP.md)** - Complete setup guide
- **[Video Progression System](./VIDEO_PROGRESSION_SYSTEM.md)** - Video system documentation
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[API Reference](./API_REFERENCE.md)** - API endpoints and usage

## Support

For issues or questions:
1. Check the documentation in the `docs/` folder
2. Review the troubleshooting section in SETUP.md
3. Check browser console and server logs for errors

---

**Status**: Production ready! 🎉
