'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  Settings, 
  CheckSquare,
  Library,
  HelpCircle,
  Bell,
  X,
  LogOut,
  Sparkles,
  Info
} from 'lucide-react'
import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useScrollDirection } from '@/hooks/useScrollDirection'

// Main Navigation Items (Desktop Sidebar)
const navigationItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'Resources', icon: Library, href: '/resources' },
]

// Specific Mobile Bottom Nav (Home/Dashboard, Resource, About Us, Exercises)
const mobileBottomNavItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Resources', icon: Library, href: '/resources' },
  { name: 'About Us', icon: Info, href: '/features' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
]

const utilityItems = [
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { name: 'Help', icon: HelpCircle, href: '/help' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isVisible = useScrollDirection()

  return (
    <>
      {/* Mobile Top Header - Clean Editorial Style */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl z-[50] flex items-center justify-between px-6 border-b border-[#D8CEBE]/50 shadow-sm transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-[#1D1914]" style={{ fontFamily: "'Outfit', sans-serif" }}>SIGNET</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-[#6E7A67] p-2 hover:bg-[#6E7A67]/5 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D8CEBE] shadow-sm">
             <UserButton />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar - ORGANIZED (Home, Resources, About Us, Exercises) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#D8CEBE]/30 z-[50] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
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

      {/* Desktop Sidebar - Premium Neutral/Editorial Style */}
      <div className={`w-80 h-screen bg-[#FDFCFB] border-r border-[#D8CEBE]/40 flex flex-col fixed md:sticky left-0 top-0 z-[70] md:z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        
        <div className="py-12 px-10">
          <Link href="/" className="group flex items-center gap-3 relative transition-all">
              <div className="h-8 w-8 bg-[#6E7A67] rounded-lg flex items-center justify-center text-white shadow-[0_4px_12px_rgba(110,122,103,0.3)]">
                <Sparkles size={16} />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#1D1914]" style={{ fontFamily: "'Outfit', sans-serif" }}>SIGNET</span>
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
    </>
  )
}
