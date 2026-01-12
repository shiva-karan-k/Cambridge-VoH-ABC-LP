// Middleware disabled for Clerk deployment testing
// This file intentionally left minimal to avoid Clerk integration issues

export function middleware() {
  // No-op middleware for testing
  return;
}

export const config = {
  matcher: [], // Empty matcher - middleware disabled
};
