'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Users,
  CheckSquare, 
  Library,
  HelpCircle,
  X,
  LogOut
} from 'lucide-react'
import { useState } from 'react'

// Main Navigation Items (Desktop Sidebar)
const navigationItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'Resources', icon: Library, href: '/resources' },
]

const utilityItems = [
  { name: 'Help', icon: HelpCircle, href: '/help' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Only render on dashboard routes
  const isDashboard = pathname.startsWith('/dashboard')
  if (!isDashboard) return null

  return (
    <div className={`w-80 h-screen bg-canvas border-r border-rule/40 flex flex-col fixed md:sticky left-0 top-0 z-[70] md:z-50 transition-colors duration-300 ${isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full md:translate-x-0 pointer-events-none md:pointer-events-auto"}`}>
      
      <div className="py-12 px-10">
        <Link href="/" className="group flex items-center gap-3 relative transition-colors">
            <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-10 w-auto object-contain" />
        </Link>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-10 right-6 text-ink p-2 hover:bg-ink/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1.5 px-6 mt-2">
        <p className="px-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-ink/40 mb-4 ml-1">Essentials</p>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-xl transition-colors group ${
                isActive 
                  ? 'bg-white text-ink  border border-rule/50' 
                  : 'text-ink/60 hover:text-ink hover:bg-ink/5 border border-transparent'
              }`}
            >
              <item.icon size={18} className={`transition-transform duration-500 ${isActive ? 'text-ink scale-110' : 'group-hover:scale-110'}`} />
              <span className={`text-[14px] font-medium tracking-tight ${isActive ? 'font-semibold' : ''}`} >{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-ink/20" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-6 space-y-6 pb-12">
        <div className="bg-ink/5 rounded-[var(--radius-lg)] p-6 border border-ink/10 mx-2">
          <h4 className="text-[13px] font-semibold text-ink mb-2" >Inner Circle</h4>
          <p className="text-[11px] text-ink leading-relaxed mb-4">Elevate your growth with intentional community mentorship.</p>
          <Link href="/join" className="block w-full py-2.5 rounded-xl bg-ink text-white text-center font-semibold text-[12px]   hover:-translate-y-0.5 transition" >
             Upgrade Plan
          </Link>
        </div>
        
        <nav className="space-y-1 ml-1">
          {utilityItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? 'text-ink bg-ink/5' 
                    : 'text-ink/50 hover:text-ink'
                }`}
              >
                <item.icon size={16} />
                <span className="text-[13px] font-medium" >{item.name}</span>
              </Link>
            )
          })}
          <button className="w-full flex items-center gap-3.5 px-4 py-2.5 text-ink/50 hover:text-wax transition-colors">
            <LogOut size={16} />
            <span className="text-[13px] font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
