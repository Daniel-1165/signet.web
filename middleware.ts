import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Public routes — no auth required
const isPublicRoute = createRouteMatcher([
  '/',
  '/features(.*)',
  '/resources(.*)',
  '/eq-test(.*)',
  '/iq-test(.*)',
  '/vision-guide(.*)',
  '/join(.*)',
  '/contact(.*)',
  '/api/public/(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
