# ABC Active Breathing Course

A Next.js web application for the ABC Active Breathing Course featuring sequential video progression, user authentication, and comprehensive admin controls.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

Visit http://localhost:3000

## ✨ Features

- **Video Progression System**: Sequential video unlocking with automatic progress tracking
- **User Authentication**: Clerk integration with role-based access control
- **Admin Dashboard**: Complete analytics and user management
- **Progress Tracking**: Automatic 90% completion threshold with resume functionality
- **Forms**: Contact, donation, enrollment, and newsletter with MongoDB persistence
- **Responsive Design**: Mobile-friendly interface

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Services and utilities
│   └── models/          # MongoDB models
├── public/              # Static assets
├── docs/                # Documentation
└── middleware.ts        # Clerk authentication middleware
```

## 📚 Documentation

Complete documentation is available in the `docs/` folder:

- **[Getting Started](./docs/SETUP.md)** - Complete setup guide
- **[Video System](./docs/VIDEO_PROGRESSION_SYSTEM.md)** - Video progression details
- **[API Reference](./docs/API_REFERENCE.md)** - Complete API documentation
- **[Deployment](./docs/DEPLOYMENT.md)** - Production deployment guide
- **[MongoDB Setup](./docs/MONGODB_SETUP.md)** - Database configuration

## 🔑 Environment Variables

Create `.env.local` with:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
```

## 🛠️ Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Key Pages

- `/` - Landing page
- `/weeks/week-1` - Weekly course content
- `/admin/setup` - Create admin account
- `/admin` - Admin dashboard
- `/admin/videos` - Video progress management
- `/sign-in` - User authentication

## 🧪 Testing

1. Start the development server
2. Visit `/admin/setup` to create admin account
3. Sign in at `/sign-in`
4. Test video progression at `/weeks/week-1`
5. Check admin dashboard at `/admin/videos`

## 📦 Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Styling**: CSS Modules
- **Deployment**: Vercel-ready

## 🚢 Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete deployment instructions.

Quick deploy to Vercel:

```bash
vercel
```

## 🔒 Security

- Environment variables for sensitive data
- Role-based access control
- Protected API routes
- Clerk authentication
- MongoDB connection security

## 📝 License

[Your License Here]

## 🤝 Contributing

[Your Contributing Guidelines Here]

## 📞 Support

For issues or questions:
1. Check the [documentation](./docs/)
2. Review [SETUP.md](./docs/SETUP.md) for troubleshooting
3. Check browser console and server logs

---

**Status**: Production Ready! 🎉

Built with ❤️ for ABC Active Breathing Course
