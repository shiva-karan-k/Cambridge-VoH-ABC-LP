# ABC Active Breathing Course - Setup Instructions

## Project Overview
A Next.js web application for the ABC Active Breathing Course with admin authentication, user management, and analytics dashboard.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Clerk account for authentication

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual keys

# Start development server
npm run dev
```

### First-Time Setup
1. Configure environment variables in `.env.local`
2. Visit `http://localhost:3000/admin/setup` to create admin account
3. Sign in at `http://localhost:3000/sign-in`
4. Access admin dashboard at `http://localhost:3000/admin`

## Environment Configuration

### Required Variables (.env.local)
```env
# Clerk Authentication - Get from https://dashboard.clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Database
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
# OR for production:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abc-breathing-course
```

## Project Structure

```
├── src/app/
│   ├── admin/page.tsx             # Protected admin dashboard
│   ├── admin/setup/page.tsx       # Admin account creation
│   ├── api/admin/                 # Admin management APIs
│   ├── weeks/                     # Week-by-week course content
│   │   ├── week-1/page.tsx        # Week 1 exercises
│   │   ├── week-2/page.tsx        # Week 2 exercises
│   │   └── ...                    # Weeks 3-6
│   ├── sign-in/                   # Clerk authentication pages
│   └── page.tsx                   # Main landing page
├── src/components/
│   ├── Header.tsx                 # Navigation with auth
│   └── Modal.tsx                  # Contact/donate/enroll forms
├── src/lib/
│   ├── mongodb.ts                 # Database connection
│   └── adminAuth.ts               # Admin utilities
└── public/assets/                 # Images and static files
```

## Key Features

### Authentication System
- Clerk integration for user sign-up/sign-in
- Protected admin routes with role-based access
- JWT token management and session handling

### Admin Dashboard
- Analytics display (homepage views, weekly progress, exercises)
- User management and admin creation
- Protected route accessible only to authenticated admins

### Database Integration
- MongoDB with Mongoose ODM
- Models for users, admins, enrollments, contacts, donations
- Cached connections with error handling

## API Endpoints

### Admin Management
- `POST /api/admin/create-admin-simple` - Create admin account
- `GET /api/admin/check-status` - Verify admin status

### User Management
- `POST /api/enroll` - Course enrollment
- `POST /api/contact` - Contact form submission
- `POST /api/donate` - Donation processing

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Security Guidelines

### Environment Protection
- Never commit `.env.local` or `.env` files
- Use `.env.example` as template for team sharing
- Rotate API keys regularly
- Use different keys for dev/staging/production

### Git Security
The following files are automatically ignored:
```
.env*
config/keys.js
*.pem
*.key
```

### If Keys Are Compromised
1. Revoke keys in respective dashboards (Clerk, MongoDB)
2. Generate new keys
3. Update environment files
4. Redeploy application
5. Monitor for unauthorized access

## Deployment

### Environment Setup
1. Use platform environment variables (Vercel, Netlify)
2. Never use `.env.local` in production
3. Enable HTTPS and security headers
4. Set up monitoring and logging

### Database Configuration
- Use MongoDB Atlas for production
- Enable authentication and IP whitelist
- Set up regular backups
- Monitor connection performance

## Troubleshooting

### Common Issues
- **Clerk Auth Errors**: Check API keys and domain configuration
- **MongoDB Connection**: Verify connection string and network access
- **Build Errors**: Ensure all dependencies installed
- **Environment Variables**: Check `.env.local` exists and formatted correctly

### Development Tips
- Clear browser cookies if authentication issues persist
- Check console for detailed error messages
- Verify environment variables are loaded correctly
- Use browser dev tools to inspect network requests

## Admin Access Flow

1. **Create Admin**: Visit `/admin/setup` with email and details
2. **Sign In**: Use Clerk authentication at `/sign-in`
3. **Access Dashboard**: Visit `/admin` for protected analytics
4. **Manage Users**: View enrollment and contact data

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Admin account created
- [ ] Authentication flow verified
- [ ] Security headers enabled
- [ ] HTTPS configured
- [ ] Monitoring set up
- [ ] Backup procedures in place

## Support

### Framework Details
- **Frontend**: Next.js 16.1.1 with TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Styling**: CSS with custom components

### Key URLs
- Development: `http://localhost:3000`
- Admin Setup: `/admin/setup`
- Admin Dashboard: `/admin`
- Authentication: `/sign-in`, `/sign-up`

---
*Keep environment variables secure and never commit sensitive data to version control.*