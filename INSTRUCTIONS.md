# ABC Active Breathing Course - Quick Start Guide

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Clerk and MongoDB credentials

# 3. Start development server
npm run dev

# 4. Visit http://localhost:3000
```

## 📋 First-Time Setup Checklist

- [ ] Install Node.js 18+
- [ ] Install MongoDB (or set up MongoDB Atlas)
- [ ] Create Clerk account and get API keys
- [ ] Configure `.env.local` with credentials
- [ ] Start development server
- [ ] Create admin account at `/admin/setup`
- [ ] Sign in at `/sign-in`
- [ ] Initialize video metadata (admin only)

## 🔑 Environment Variables

Create `.env.local` in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Pages and API routes
│   ├── components/       # React components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Services and utilities
│   └── models/          # MongoDB models
├── public/              # Static assets
└── docs/                # Documentation
```

## 🎯 Key Features

### Video Progression System
- Sequential video unlocking
- Automatic progress tracking (90% completion)
- Resume from last position
- Admin controls for manual management

### Authentication
- Clerk integration
- Role-based access control
- Protected admin routes

### Admin Dashboard
- User progress monitoring
- Video analytics
- Manual progress management
- Enrollment tracking

## 📚 Documentation

Detailed documentation is in the `docs/` folder:

- **[docs/README.md](./docs/README.md)** - Documentation overview
- **[docs/SETUP.md](./docs/SETUP.md)** - Complete setup guide
- **[docs/VIDEO_PROGRESSION_SYSTEM.md](./docs/VIDEO_PROGRESSION_SYSTEM.md)** - Video system details
- **[docs/MONGODB_SETUP.md](./docs/MONGODB_SETUP.md)** - Database configuration
- **[docs/BUILD_LOG.md](./docs/BUILD_LOG.md)** - Build history and notes

## 🛠️ Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🧪 Testing the Application

1. **Landing Page**: http://localhost:3000
2. **Week Pages**: http://localhost:3000/weeks/week-1
3. **Admin Setup**: http://localhost:3000/admin/setup
4. **Admin Dashboard**: http://localhost:3000/admin
5. **Video Admin**: http://localhost:3000/admin/videos

## 🔧 Common Issues

### MongoDB Connection Error
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abc-breathing-course
```

### Clerk Authentication Error
- Verify keys in `.env.local`
- Restart development server
- Check Clerk dashboard

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📞 Getting Help

1. Check `docs/SETUP.md` for detailed setup instructions
2. Review browser console for errors
3. Check server logs in terminal
4. Verify environment variables

## 🚢 Deployment

See `docs/DEPLOYMENT.md` for production deployment instructions.

---

**Status**: Ready for development! 🎉

For detailed documentation, see the `docs/` folder.
