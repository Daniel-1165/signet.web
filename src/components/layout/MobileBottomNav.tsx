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
  
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-black/[0.03] z-[60] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
         <div className="flex items-center justify-between px-2 h-16">
            {mobileBottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center justify-center w-1/5 h-full pt-1.5 gap-1 group relative"
                >
                  <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#8EB69B]/10' : 'bg-transparent'}`}>
                    <item.icon 
                      size={18} 
                      className={`transition-all duration-300 ${isActive ? 'text-[#8EB69B] fill-[#8EB69B]' : 'text-[#1D1914]'}`} 
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                  </div>
                  <span className={`text-[7px] uppercase tracking-[0.14em] font-extrabold transition-colors ${isActive ? 'text-[#8EB69B]' : 'text-[#1D1914]/40'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.name}
                  </span>
                  {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#8EB69B] rounded-full shadow-[0_1px_4px_rgba(142,182,155,0.4)]" />}
                </Link>
              )
            })}
         </div>
      </div>
  )
}
