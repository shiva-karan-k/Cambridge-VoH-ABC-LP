# Setup Instructions

## Prerequisites

- Node.js 18 or higher
- MongoDB (local or Atlas)
- Clerk account for authentication
- Git

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
```

#### Get Clerk Keys

1. Go to https://dashboard.clerk.com/
2. Create a new application
3. Copy the publishable and secret keys
4. Add to `.env.local`

#### MongoDB Setup

**Local Development:**
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com

# Start MongoDB
mongod
```

**Production (MongoDB Atlas):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0)
3. Get connection string
4. Update MONGODB_URI in `.env.local`

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions.

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## First-Time Setup

### 1. Create Admin Account

1. Visit http://localhost:3000/admin/setup
2. Fill in admin details
3. Submit to create admin account

### 2. Sign In

1. Visit http://localhost:3000/sign-in
2. Sign in with your Clerk account
3. You'll be redirected to the homepage

### 3. Initialize Video Metadata

As an admin, initialize the video system:

```bash
# Using curl
curl -X POST http://localhost:3000/api/videos/init \
  -H "Authorization: Bearer YOUR_TOKEN"

# Or visit the admin dashboard and use the init button
```

### 4. Test the System

1. Visit `/weeks/week-1` to see video progression
2. Try watching a video to track progress
3. Visit `/admin/videos` to see the admin dashboard

## Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js pages and API routes
│   │   ├── admin/             # Admin pages
│   │   ├── api/               # API endpoints
│   │   ├── weeks/             # Weekly course pages
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   ├── Modal.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── ProgressIndicator.tsx
│   ├── hooks/                 # Custom hooks
│   │   ├── useVideoProgress.ts
│   │   └── useVideoUnlock.ts
│   ├── lib/                   # Libraries and utilities
│   │   ├── config/           # Configuration
│   │   ├── services/         # Business logic
│   │   └── utils/            # Helpers
│   └── models/                # MongoDB models
├── public/                    # Static assets
│   └── assets/               # Images and videos
├── docs/                      # Documentation
└── .env.local                # Environment variables (create this)
```

## Development Workflow

### Running the App

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Making Changes

1. **Frontend Changes**: Edit files in `src/app/` or `src/components/`
2. **API Changes**: Edit files in `src/app/api/`
3. **Database Models**: Edit files in `src/models/`
4. **Services**: Edit files in `src/lib/services/`

Changes will hot-reload automatically in development mode.

### Testing Forms

1. **Contact Form**: Click "CONTACT US" in navbar
2. **Donation Form**: Click "DONATE" button
3. **Enrollment Form**: Click "ENROLL" in navbar
4. **Newsletter**: Fill form in footer

Check MongoDB to verify data is saved.

## Troubleshooting

### MongoDB Connection Issues

**Error: "Failed to connect to MongoDB"**

Solutions:
- Check if MongoDB is running: `mongod`
- Verify MONGODB_URI in `.env.local`
- For Atlas: Check network access whitelist

### Clerk Authentication Issues

**Error: "Clerk keys not found"**

Solutions:
- Verify keys in `.env.local`
- Restart development server
- Check Clerk dashboard for correct keys

### Build Errors

**Error: TypeScript compilation failed**

Solutions:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Video Player Issues

**Videos not loading**

Solutions:
- Check video file paths in `src/lib/config/videoSequence.ts`
- Verify video files exist in `public/assets/videos/`
- Check browser console for errors

### CSS Not Updating

Solutions:
```bash
# Hard refresh browser
# Windows: Ctrl + Shift + R
# Mac: Cmd + Shift + R

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

## Environment Variables

### Required Variables

```env
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# MongoDB (Required)
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
```

### Optional Variables

```env
# Node Environment
NODE_ENV=development

# Custom Port
PORT=3000
```

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use different keys** for dev/staging/production
3. **Rotate keys regularly** in production
4. **Enable HTTPS** in production
5. **Whitelist IPs** in MongoDB Atlas

## Next Steps

1. Read [VIDEO_PROGRESSION_SYSTEM.md](./VIDEO_PROGRESSION_SYSTEM.md) for video system details
2. Check [API_REFERENCE.md](./API_REFERENCE.md) for API documentation
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

## Getting Help

1. Check browser console for errors
2. Check server logs in terminal
3. Review documentation in `docs/` folder
4. Verify environment variables are set correctly

---

**Ready to develop!** 🚀
