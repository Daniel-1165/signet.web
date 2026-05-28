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
                className="flex flex-col items-center justify-center w-1/5 h-full pt-1 gap-1 group relative px-0.5"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-[#1E6B3A] text-white shadow-sm' : 'bg-transparent text-[#536471]'}`}>
                  <item.icon 
                    size={18} 
                    strokeWidth={isActive ? 2 : 1.5}
                    className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#536471]'}`}
                  />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 transition-colors ${isActive ? 'text-[#1E6B3A]' : 'text-[#536471]'}`} >
                  {item.name}
                </span>
              </Link>
            )
          })}
       </div>
    </div>
  )
}
