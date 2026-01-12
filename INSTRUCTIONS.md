# ABC Active Breathing Course - Complete Setup & Documentation

## Project Overview
A Next.js web application for the ABC Active Breathing Course with admin authentication, user management, analytics dashboard, and MongoDB backend integration.

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
│   ├── api/
│   │   ├── admin/                 # Admin management APIs
│   │   ├── contact/route.ts       # Contact form API
│   │   ├── donate/route.ts        # Donation form API
│   │   ├── enroll/route.ts        # Enrollment form API
│   │   └── newsletter/route.ts    # Newsletter signup API
│   ├── weeks/                     # Week-by-week course content
│   │   ├── week-1/page.tsx        # Week 1 exercises
│   │   ├── week-2/page.tsx        # Week 2 exercises
│   │   └── ...                    # Weeks 3-6
│   ├── sign-in/                   # Clerk authentication pages
│   └── page.tsx                   # Main landing page
├── src/components/
│   ├── Header.tsx                 # Navigation with auth
│   └── Modal.tsx                  # Contact/donate/enroll forms
├── src/models/
│   ├── AdminUser.ts               # Admin user model
│   ├── Contact.ts                 # Contact form model
│   ├── Donation.ts                # Donation model
│   ├── Enrollment.ts              # Enrollment model
│   └── Newsletter.ts              # Newsletter subscription model
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

### Database Integration - MongoDB
All forms are connected to MongoDB with the following collections:

1. **contacts** - Contact form submissions
2. **donations** - Donation records
3. **enrollments** - Course enrollment applications
4. **newsletters** - Newsletter subscriptions (with duplicate prevention)
5. **adminusers** - Admin user accounts

### Form Features
- ✅ Input validation on all forms
- ✅ Email format validation
- ✅ Duplicate email prevention for newsletter
- ✅ Status tracking for all submissions
- ✅ Error handling and user feedback
- ✅ Clerk authentication integration (userId tracking)

## API Endpoints

### Admin Management
- `POST /api/admin/create-admin-simple` - Create admin account
- `GET /api/admin/check-status` - Verify admin status

### User Management
- `POST /api/enroll` - Course enrollment
- `POST /api/contact` - Contact form submission
- `POST /api/donate` - Donation processing
- `POST /api/newsletter` - Newsletter subscription

## MongoDB Setup

### Local Development
Your `.env.local` is configured with:
```
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
```

### Production (MongoDB Atlas)

1. **Create MongoDB Atlas Account**: https://www.mongodb.com/cloud/atlas
2. **Create a Cluster**: Choose "Free" tier (M0)
3. **Get Connection String**: 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
4. **Update `.env.local`**:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/abc-breathing-course?retryWrites=true&w=majority
   ```
5. **Whitelist IP**: In Atlas → "Network Access" → "Add IP Address"

### Viewing Your Data

**Option 1: MongoDB Compass (GUI)**
- Download: https://www.mongodb.com/products/compass
- Connect using your MONGODB_URI

**Option 2: MongoDB Atlas Dashboard**
- Log into Atlas → "Browse Collections"

**Option 3: Command Line**
```bash
mongosh mongodb://localhost:27017/abc-breathing-course
show collections
db.contacts.find()
db.newsletters.find()
```

## UI/UX Features

### Navigation
- Clean navbar with optimized logo sizes
- Transparent nav buttons (no backgrounds)
- University of Cambridge logo properly sized
- Responsive design for all screen sizes

### Footer
- Newsletter signup form with validation
- Social media links
- Centered copyright (© 2026)
- Site visits counter on main page only

### Week Pages (1-6)
- Bear icons properly sized and positioned on blue blocks
- Consistent sizing across all weeks: `clamp(80px, 10vw, 140px)`
- Inline styles ensure proper rendering
- Video thumbnails with lock states

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## CSS Architecture

### Key Styling Features
- Custom fonts: MyType, Skytree, Lato, Bebas Neue
- Responsive design with clamp() for fluid sizing
- Color variables for consistent theming
- Animations for interactive elements

### Bear Icon Sizing (Week Pages)
- Desktop: `clamp(80px, 10vw, 140px)`
- Mobile: `clamp(60px, 12vw, 100px)`
- Applied via inline styles in each week page component
- Positioned on blue rectangular blocks

### Logo Sizing (Header)
- Voices of Hope: `clamp(25px, 4vw, 40px)`
- Kingston/Cambridge: `clamp(30px, 4.5vw, 45px)`
- ABC Logo: `clamp(30px, 4.5vw, 45px)`

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

**Clerk Auth Errors**
- Check API keys and domain configuration
- Clear browser cookies if issues persist

**MongoDB Connection**
- Verify connection string and network access
- Check if MongoDB is running locally: `mongod`
- Verify MONGODB_URI in `.env.local`

**Build Errors**
- Ensure all dependencies installed
- Check for TypeScript errors

**Form Submission Issues**
- Check browser console for errors
- Verify API routes are accessible
- Check MongoDB connection

**CSS/Styling Issues**
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

### Development Tips
- Check console for detailed error messages
- Verify environment variables are loaded correctly
- Use browser dev tools to inspect network requests
- Test forms with valid data first

## Testing the Application

### Test Contact Form
1. Click "CONTACT US" in navbar
2. Fill in form and submit
3. Check MongoDB `contacts` collection

### Test Donation Form
1. Click "DONATE" button
2. Select amount and fill details
3. Check MongoDB `donations` collection

### Test Enrollment Form
1. Click "ENROLL" in navbar
2. Fill parent and child details
3. Check MongoDB `enrollments` collection

### Test Newsletter Form
1. Scroll to footer
2. Fill First Name, Last Name, Email
3. Click "SUBMIT"
4. Check MongoDB `newsletters` collection

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
- [ ] All forms tested
- [ ] Newsletter duplicate prevention working
- [ ] Bear icons displaying correctly on all week pages
- [ ] Footer copyright shows 2026
- [ ] Navbar logos properly sized

## Future Enhancements (Optional)

1. **Email Notifications**
   - Set up SendGrid or Resend
   - Send confirmation emails to users
   - Notify admins of new submissions

2. **Payment Integration**
   - Integrate Stripe for actual donations
   - Update donation status after payment

3. **Enhanced Admin Dashboard**
   - View all submissions in tables
   - Manage enrollment status
   - Export data to CSV
   - Analytics and reports

4. **Newsletter Management**
   - Unsubscribe functionality
   - Email campaign integration
   - Subscriber segmentation

## Support & Documentation

### Framework Details
- **Frontend**: Next.js 16.1.1 with TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Styling**: CSS with custom components
- **Fonts**: MyType, Skytree, Lato, Bebas Neue, Oswald

### Key URLs
- Development: `http://localhost:3000`
- Admin Setup: `/admin/setup`
- Admin Dashboard: `/admin`
- Authentication: `/sign-in`, `/sign-up`
- Week Pages: `/weeks/week-1` through `/weeks/week-6`

### Recent Updates
- ✅ Bear icons sized correctly across all week pages
- ✅ Navbar optimized with proper logo sizing
- ✅ Footer updated with 2026 copyright
- ✅ Site visits counter styled and positioned
- ✅ Newsletter form with duplicate prevention
- ✅ All forms connected to MongoDB
- ✅ Transparent nav buttons (no backgrounds)

---

**Status**: All features implemented and tested! 🎉

*Keep environment variables secure and never commit sensitive data to version control.*