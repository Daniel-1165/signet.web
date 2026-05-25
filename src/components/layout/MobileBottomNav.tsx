'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Library, CheckSquare, Info, Users } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useEffect, useRef } from 'react'

const mobileBottomNavItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Resources', icon: Library, href: '/resources' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'About Us', icon: Info, href: '/features' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
]

// Page order for swipe navigation — left swipe goes forward, right swipe goes back
// Order: Home -> Resources -> Community -> About Us -> Exercises
const SWIPE_PAGE_ORDER = [
  '/',
  '/resources',
  '/dashboard/community',
  '/features',
  '/dashboard/exercises',
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isVisible = useScrollDirection()
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (target && target.closest('.no-swipe')) {
        touchStartX.current = null
        touchStartY.current = null
        return
      }
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return

      const deltaX = e.changedTouches[0].clientX - touchStartX.current
      const deltaY = e.changedTouches[0].clientY - touchStartY.current

      // Only trigger if horizontal swipe is dominant (not a scroll)
      if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) {
        touchStartX.current = null
        touchStartY.current = null
        return
      }

      const currentIndex = SWIPE_PAGE_ORDER.indexOf(pathname)
      if (currentIndex === -1) {
        touchStartX.current = null
        touchStartY.current = null
        return
      }

      if (deltaX < -60 && currentIndex < SWIPE_PAGE_ORDER.length - 1) {
        // Swipe left → next page
        router.push(SWIPE_PAGE_ORDER[currentIndex + 1])
      } else if (deltaX > 60 && currentIndex > 0) {
        // Swipe right → previous page
        router.push(SWIPE_PAGE_ORDER[currentIndex - 1])
      }

      touchStartX.current = null
      touchStartY.current = null
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pathname, router])

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-black/[0.03] z-[60] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
       <div className="flex items-center justify-between px-2 h-16">
          {mobileBottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center w-1/5 h-full pt-1 gap-1.5 group relative px-0.5"
              >
                <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#8EB69B]/10' : 'bg-transparent'}`}>
                  <item.icon 
                    size={19} 
                    className={`transition-all duration-300 ${isActive ? 'text-[#8EB69B] fill-[#8EB69B]' : 'text-[#1D1914]'}`} 
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </div>
                <span className={`text-[7px] uppercase tracking-normal font-black transition-colors ${isActive ? 'text-[#8EB69B]' : 'text-[#1D1914]/25'}`} >
                  {item.name}
                </span>
                {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[1.5px] bg-[#8EB69B] rounded-full" />}
              </Link>
            )
          })}
       </div>
    </div>
  )
}
