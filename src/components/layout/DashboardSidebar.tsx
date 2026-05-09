'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Settings, 
  CheckSquare,
  Library,
  Shield, 
  HelpCircle,
  Bell,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const sidebarItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Growth', icon: TrendingUp, href: '/dashboard/growth' },
  { name: 'Exercises', icon: CheckSquare, href: '/dashboard/exercises' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'Resources', icon: Library, href: '/resources' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isVisible = useScrollDirection()

  return (
    <>
      {/* Mobile Top Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-14 bg-white z-[50] flex items-center justify-between px-4 border-b border-[#f2f4f5] shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link href="/" className="flex items-center">
            <img 
                src="/signet-brand-logo.svg" 
                alt="Signet Logo" 
                className="h-5 w-auto object-contain"
            />
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-[#005746]">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#83fba5] shadow-sm flex items-center justify-center bg-[#f2f4f5]">
             <UserButton />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#f2f4f5] z-[50] pb-[env(safe-area-inset-bottom)]">
         <div className="flex items-center justify-between px-2 h-16">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-1 group relative"
                >
                  <item.icon size={20} className={`${isActive ? 'text-[#005746]' : 'text-[#6e7975]'}`} />
                  <span className={`text-[10px] ${isActive ? 'font-bold text-[#005746]' : 'font-medium text-[#6e7975]'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#005746]" />
                  )}
                </Link>
              )
            })}
         </div>
      </div>
      
      {/* Mobile FAB (Floating Action Button) */}
      <div className="md:hidden fixed bottom-20 right-4 z-[40]">
         <div className="w-14 h-14 bg-[#83fba5] text-[#005746] rounded-full flex items-center justify-center shadow-lg hover:bg-[#9df2d8] transition-colors border border-[#006d36]/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <line x1="12" y1="5" x2="12" y2="19"></line>
               <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
         </div>
      </div>

      <div className={`w-full md:w-64 h-screen bg-[#005746] border-r border-[#006d36]/20 flex flex-col fixed left-0 top-0 z-[70] md:z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        
        <div className="py-8 px-8 flex items-center justify-between">
          <div>
            <Link href="/" className="group flex items-center gap-4 relative hover:scale-[1.02] transition-transform">
                <div className="h-10 flex-shrink-0 flex items-center justify-center">
                   <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-10 w-auto object-contain brightness-0 invert" />
                </div>
            </Link>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white p-1.5 bg-black/10 rounded-[0.5rem] hover:bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-6 mt-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-[0.5rem] transition-all group ${
                  isActive 
                    ? 'bg-[#1b4f43] text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]' 
                    : 'text-[#9df2d8]/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon size={18} className={`transition-transform duration-500 ${isActive ? 'text-[#83fba5] scale-110' : 'group-hover:scale-110'}`} />
                <span className={`text-[14px] font-medium tracking-wide ${isActive ? 'text-white' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#83fba5] shadow-[0_0_8px_#83fba5]" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto px-6 space-y-4 pb-8">
          <Link href="/join" className="block w-full py-3 rounded-[0.5rem] bg-[#83fba5] text-[#00210c] text-center font-bold text-[14px] shadow-[0_4px_15px_rgba(131,251,165,0.2)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(131,251,165,0.3)] transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>
             Upgrade to Pro
          </Link>
          
          <nav className="space-y-1 pt-4 border-t border-white/10">
            <Link href="/help" className="flex items-center gap-4 px-4 py-3 rounded-[0.5rem] text-[#9df2d8]/70 hover:text-white hover:bg-white/5 transition-all">
              <HelpCircle size={16} />
              <span className="text-[14px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Help</span>
            </Link>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-[0.5rem] text-[#9df2d8]/70 hover:text-white hover:bg-white/5 transition-all">
              <LogOut size={16} />
              <span className="text-[14px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
