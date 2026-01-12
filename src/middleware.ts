// Temporarily disabled for deployment testing
// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// }

// Placeholder middleware for deployment test
export function middleware() {
  console.log('Middleware disabled for Clerk deployment test');
}

export const config = {
  matcher: [],
}