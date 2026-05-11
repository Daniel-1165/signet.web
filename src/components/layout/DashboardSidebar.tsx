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
  { name: 'Home', icon: Home, href: '/dashboard' },
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

  return (
    <div className={`w-80 h-screen bg-[#FDFCFB] border-r border-[#D8CEBE]/40 flex flex-col fixed md:sticky left-0 top-0 z-[70] md:z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      
      <div className="py-12 px-10">
        <Link href="/" className="group flex items-center gap-3 relative transition-all">
            <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-10 w-auto object-contain" />
        </Link>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-10 right-6 text-[#1D1914] p-2 hover:bg-[#6E7A67]/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1.5 px-6 mt-2">
        <p className="px-4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#6E7A67]/40 mb-4 ml-1">Essentials</p>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-white text-[#1D1914] shadow-[0_10px_30px_rgba(110,122,103,0.08)] border border-[#D8CEBE]/50' 
                  : 'text-[#6E7A67]/60 hover:text-[#1D1914] hover:bg-[#6E7A67]/5 border border-transparent'
              }`}
            >
              <item.icon size={18} className={`transition-transform duration-500 ${isActive ? 'text-[#6E7A67] scale-110' : 'group-hover:scale-110'}`} />
              <span className={`text-[14px] font-medium tracking-tight ${isActive ? 'font-bold' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-[#6E7A67]/20" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-6 space-y-6 pb-12">
        <div className="bg-[#6E7A67]/5 rounded-2xl p-6 border border-[#6E7A67]/10 mx-2">
          <h4 className="text-[13px] font-bold text-[#1D1914] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Inner Circle</h4>
          <p className="text-[11px] text-[#6E7A67] leading-relaxed mb-4">Elevate your growth with intentional community mentorship.</p>
          <Link href="/join" className="block w-full py-2.5 rounded-xl bg-[#6E7A67] text-white text-center font-bold text-[12px] shadow-[0_8px_20px_rgba(110,122,103,0.2)] hover:shadow-[0_12px_25px_rgba(110,122,103,0.3)] hover:-translate-y-0.5 transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>
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
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg transition-all group ${
                  isActive 
                    ? 'text-[#1D1914] bg-[#6E7A67]/5' 
                    : 'text-[#6E7A67]/50 hover:text-[#1D1914]'
                }`}
              >
                <item.icon size={16} />
                <span className="text-[13px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{item.name}</span>
              </Link>
            )
          })}
          <button className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[#6E7A67]/50 hover:text-[#8B4513] transition-all">
            <LogOut size={16} />
            <span className="text-[13px] font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
