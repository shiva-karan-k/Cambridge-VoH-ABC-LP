import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// ONLY protect admin routes - all other routes are public
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect admin routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  // All other routes are public and accessible - no auth required
});

export const config = {
  // Match all routes EXCEPT static files - this is the recommended Clerk configuration
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
