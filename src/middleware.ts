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
  // All other routes are public and accessible
});

export const config = {
  // Match all routes EXCEPT static files and Next.js internals
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
