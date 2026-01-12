# MongoDB Backend Integration - Complete Setup

## ✅ What's Already Connected

All your forms are now connected to MongoDB! Here's what's working:

### 1. **Contact Form** (`/api/contact`)
- **Model**: `src/models/Contact.ts`
- **API Route**: `src/app/api/contact/route.ts`
- **Fields**: name, email, subject, message, userId, status
- **Status**: ✅ Fully functional

### 2. **Donation Form** (`/api/donate`)
- **Model**: `src/models/Donation.ts`
- **API Route**: `src/app/api/donate/route.ts`
- **Fields**: name, email, amount, message, userId, status, paymentId
- **Status**: ✅ Fully functional

### 3. **Enrollment Form** (`/api/enroll`)
- **Model**: `src/models/Enrollment.ts`
- **API Route**: `src/app/api/enroll/route.ts`
- **Fields**: parentName, email, childName, childAge, additionalInfo, userId, status
- **Status**: ✅ Fully functional

### 4. **Newsletter Signup** (`/api/newsletter`) - NEW!
- **Model**: `src/models/Newsletter.ts`
- **API Route**: `src/app/api/newsletter/route.ts`
- **Fields**: firstName, lastName, email, userId, status, subscribedAt
- **Features**:
  - Prevents duplicate subscriptions
  - Reactivates unsubscribed users
  - Shows success/error messages
- **Status**: ✅ Just added and functional

## 🗄️ Database Configuration

### Current Setup
Your `.env.local` file is configured with:
```
MONGODB_URI=mongodb://localhost:27017/abc-breathing-course
```

### For Production (MongoDB Atlas)

1. **Create a MongoDB Atlas Account** (if you haven't):
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select your preferred region
   - Click "Create"

3. **Get Your Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update `.env.local`**:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/abc-breathing-course?retryWrites=true&w=majority
   ```

5. **Whitelist Your IP**:
   - In Atlas, go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's IP address

## 📊 Database Collections

Your MongoDB database will have these collections:

1. **contacts** - Contact form submissions
2. **donations** - Donation records
3. **enrollments** - Course enrollment applications
4. **newsletters** - Newsletter subscriptions
5. **adminusers** - Admin user accounts (already exists)

## 🔍 How to View Your Data

### Option 1: MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your MONGODB_URI
3. Browse collections visually

### Option 2: MongoDB Atlas Dashboard
1. Log into MongoDB Atlas
2. Click "Browse Collections"
3. View and manage data directly

### Option 3: Command Line
```bash
# Connect to local MongoDB
mongosh mongodb://localhost:27017/abc-breathing-course

# View collections
show collections

# Query data
db.contacts.find()
db.donations.find()
db.enrollments.find()
db.newsletters.find()
```

## 🧪 Testing the Forms

### Test Contact Form:
1. Click "CONTACT US" in the navbar
2. Fill in the form
3. Submit
4. Check MongoDB for the new contact entry

### Test Donation Form:
1. Click "DONATE" button
2. Select an amount
3. Fill in details
4. Submit
5. Check MongoDB for the new donation entry

### Test Enrollment Form:
1. Click "ENROLL" in the navbar
2. Fill in parent and child details
3. Submit
4. Check MongoDB for the new enrollment entry

### Test Newsletter Form:
1. Scroll to the footer
2. Fill in First Name, Last Name, and Email
3. Click "SUBMIT"
4. You should see a success message
5. Check MongoDB for the new newsletter subscription

## 🔐 Security Features

- ✅ Clerk authentication integration (userId tracking)
- ✅ Input validation on all forms
- ✅ Duplicate email prevention for newsletter
- ✅ Status tracking for all submissions
- ✅ Error handling and user feedback

## 📝 Form Validation

All forms include:
- Required field validation
- Email format validation
- Age range validation (enrollment: 7-18)
- Amount validation (donations: > 0)
- Duplicate prevention (newsletter)

## 🚀 Next Steps (Optional Enhancements)

1. **Email Notifications**:
   - Set up SendGrid or Resend
   - Send confirmation emails to users
   - Notify admins of new submissions

2. **Payment Integration**:
   - Integrate Stripe for actual donations
   - Update donation status after payment

3. **Admin Dashboard**:
   - View all submissions
   - Manage enrollment status
   - Export data to CSV

4. **Analytics**:
   - Track form submission rates
   - Monitor newsletter growth
   - Generate reports

## 🐛 Troubleshooting

### "Failed to connect to MongoDB"
- Check if MongoDB is running locally: `mongod`
- Verify MONGODB_URI in `.env.local`
- Check network access in MongoDB Atlas

### "Duplicate key error"
- Newsletter: Email already exists
- Solution: Use a different email or check existing subscriptions

### Forms not submitting
- Check browser console for errors
- Verify API routes are accessible
- Check MongoDB connection

## 📞 Support

If you need help:
1. Check the browser console for errors
2. Check the server logs in your terminal
3. Verify MongoDB connection string
4. Ensure all environment variables are set

---

**Status**: All forms are connected and ready to use! 🎉
