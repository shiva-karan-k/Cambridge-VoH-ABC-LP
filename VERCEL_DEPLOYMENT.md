# Vercel Deployment Guide

## Quick Deploy

### 1. Push to GitHub
```bash
git add .
git commit -m "Fix hydration errors and video playback"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### 3. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_publishable_key
CLERK_SECRET_KEY=your_production_secret_key

# MongoDB (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/abc-breathing-course?retryWrites=true&w=majority

# Node Environment
NODE_ENV=production
```

## Video Files on Vercel

### Important Notes:
1. **Video files must be in `public/assets/videos/`** - Vercel serves files from the `public` directory
2. **Large video files** - Vercel has a 100MB limit per file. If your videos are larger:
   - Use a CDN (Cloudflare, AWS S3, etc.)
   - Or compress videos to under 100MB
   - Update video paths to point to CDN URLs

### Check Video File Sizes
```bash
# Windows
dir public\assets\videos\

# Check if any files are over 100MB
```

### If Videos Are Too Large:
1. **Option A: Use External CDN**
   - Upload videos to Cloudflare R2, AWS S3, or similar
   - Update video src paths in week pages:
   ```tsx
   <source src="https://your-cdn.com/videos/Session 1 - excercise 1, part 2 final.mp4" type="video/mp4" />
   ```

2. **Option B: Compress Videos**
   - Use ffmpeg or online tools to compress
   - Target: Under 100MB per file
   - Maintain reasonable quality (720p recommended)

## Fixes Applied

### 1. Hydration Error Fixed ✓
- Removed `styled-jsx` causing className mismatches
- Added `isClient` state to handle localStorage safely
- Used `dangerouslySetInnerHTML` for inline styles

### 2. Video Playback Improvements ✓
- Added `preload="metadata"` to all video tags
- Added `playsInline` for mobile compatibility
- Added proper caching headers in `next.config.ts`
- Created `.vercelignore` to ensure videos are included

## Testing After Deployment

1. **Visit your Vercel URL**
2. **Test Week 1 videos**:
   - First video should play immediately
   - Complete 90% of first video
   - Second video should unlock
3. **Check browser console** for any errors
4. **Test on mobile** to ensure `playsInline` works

## Troubleshooting

### Videos Not Loading on Vercel

**Check 1: File Size**
```bash
# If videos are over 100MB, they won't deploy
# Solution: Use CDN or compress videos
```

**Check 2: File Paths**
- Videos must be in `public/assets/videos/`
- Paths in code should be `/assets/videos/filename.mp4`
- Check case sensitivity (Vercel is case-sensitive)

**Check 3: Build Logs**
- Go to Vercel Dashboard → Deployments → Click deployment
- Check "Build Logs" for any errors about missing files

**Check 4: Network Tab**
- Open browser DevTools → Network tab
- Try to play video
- Check if video file returns 404 or 200

### Videos Work Locally But Not on Vercel

This usually means:
1. **Files too large** (>100MB) - Use CDN
2. **Files not committed to git** - Check `.gitignore`
3. **Case sensitivity** - Rename files to lowercase

### Still Having Issues?

1. Check Vercel deployment logs
2. Verify all video files are under 100MB
3. Ensure videos are committed to git
4. Try deploying a single small test video first

## Performance Tips

1. **Use video compression** - Smaller files = faster loading
2. **Add loading states** - Show spinner while video loads
3. **Lazy load videos** - Only load when user scrolls to them
4. **Use poster images** - Show thumbnail before video loads

## MongoDB Atlas Setup

If you haven't set up MongoDB Atlas yet:

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string
6. Add to Vercel environment variables

## Post-Deployment Checklist

- [ ] Videos play on desktop
- [ ] Videos play on mobile
- [ ] Video unlocking works correctly
- [ ] Progress tracking works
- [ ] MongoDB connection successful
- [ ] Clerk authentication works
- [ ] All forms submit correctly
- [ ] No console errors

---

**Need Help?** Check the Vercel deployment logs and browser console for specific error messages.
