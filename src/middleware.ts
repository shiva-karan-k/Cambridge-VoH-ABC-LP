import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// ONLY protect admin routes - all other routes are public
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect admin routes
  if (isProtectedRoute(req)) {
    const authObj = await auth();
    authObj.protect();
  }
  // All other routes are public and accessible - no auth required
});

export const config = {
  // Only run middleware on admin routes to avoid interfering with public pages
  matcher: [
    '/admin/:path*',
  ],
};
