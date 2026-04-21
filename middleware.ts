import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// We protect everything except the landing page (/)
const isPublicRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
