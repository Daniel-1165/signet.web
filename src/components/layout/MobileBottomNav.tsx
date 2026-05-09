'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Library, CheckSquare, Info, Users } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const mobileBottomNavItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Resources', icon: Library, href: '/resources' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'About Us', icon: Info, href: '/features' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const isVisible = useScrollDirection()
  
  // Don't show if we are in some specific routes if needed, 
  // but for now we show it everywhere as requested "unify navigation"
  
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-[#1D1914] border-t border-white/5 z-[60] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
         <div className="flex items-center justify-around px-1 h-14">
            {mobileBottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-1 group relative"
                >
                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${isActive ? 'bg-white/10' : 'bg-transparent'}`}>
                    <item.icon size={18} className={`transition-all duration-300 ${isActive ? 'text-[#8EB69B] scale-110' : 'text-white/30 group-hover:text-white/60'}`} />
                  </div>
                  <span className={`text-[8px] uppercase tracking-[0.15em] font-extrabold transition-colors ${isActive ? 'text-[#8EB69B]' : 'text-white/20'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.name}
                  </span>
                  {isActive && <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#8EB69B] rounded-full" />}
                </Link>
              )
            })}
         </div>
      </div>
  )
}
