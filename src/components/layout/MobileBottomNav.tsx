'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Library, CheckSquare, Info } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const mobileBottomNavItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Resources', icon: Library, href: '/resources' },
  { name: 'About Us', icon: Info, href: '/features' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const isVisible = useScrollDirection()
  
  // Don't show if we are in some specific routes if needed, 
  // but for now we show it everywhere as requested "unify navigation"
  
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#D8CEBE]/30 z-[60] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
         <div className="flex items-center justify-around px-2 h-16">
            {mobileBottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-1 group relative"
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#6E7A67]/10' : 'bg-transparent'}`}>
                    <item.icon size={20} className={`transition-all duration-300 ${isActive ? 'text-[#6E7A67] scale-110' : 'text-[#6E7A67]/40 group-hover:text-[#6E7A67]'}`} />
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest font-bold ${isActive ? 'text-[#1D1914]' : 'text-[#6E7A67]/40'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.name}
                  </span>
                  {isActive && <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#6E7A67] rounded-full" />}
                </Link>
              )
            })}
         </div>
      </div>
  )
}
