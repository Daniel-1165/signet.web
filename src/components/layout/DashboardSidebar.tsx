'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  MessageSquare, 
  Brain, 
  Users, 
  Settings, 
  Shield, 
  ArrowUpRight,
  Zap,
  Activity,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const sidebarItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Collective Chat', icon: MessageSquare, href: '/dashboard/chat' },
  { name: 'Assessments', icon: Brain, href: '/dashboard/assessments' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isVisible = useScrollDirection()

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={`md:hidden fixed top-0 left-0 right-0 h-16 bg-[#F7F6F0]/90 backdrop-blur-md z-[50] flex items-center justify-between px-6 border-b border-[rgba(0,0,0,0.05)] shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link href="/" className="group flex items-center gap-3 relative hover:scale-[1.02] transition-transform">
            <div className="h-8 flex-shrink-0 flex items-center">
                <img 
                    src="/signet-brand-logo.svg" 
                    alt="Signet Logo" 
                    className="h-8 w-auto object-contain"
                />
            </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 flex items-center justify-center p-[2px] rounded-full border border-[rgba(0,0,0,0.1)] bg-white shadow-sm">
             <UserButton />
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="text-[#0D120E] p-1.5 rounded-md hover:bg-black/5"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`w-full md:w-64 h-screen bg-white md:bg-[#F7F6F0] border-r border-[#0D120E]/5 flex flex-col p-6 fixed left-0 top-0 z-[70] md:z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        
        {/* Mobile Sidebar Close Button & Logo */}
        <div className="mb-12 px-2 flex items-center justify-between">
          <div>
            <Link href="/" className="group flex items-center gap-3 relative hover:scale-[1.02] transition-transform">
                <div className="h-10 flex-shrink-0 flex items-center">
                    <img 
                        src="/signet-brand-logo.svg" 
                        alt="Signet Logo" 
                        className="h-10 w-auto object-contain"
                    />
                </div>
            </Link>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden text-[#0D120E] p-1.5 bg-black/5 rounded-full hover:bg-black/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-[#1DA756]/10 text-[#0D120E] shadow-[0_4px_20px_rgba(29,167,86,0.05)]' 
                    : 'text-[#0D120E]/60 hover:text-[#0D120E] hover:bg-black/[0.02] border border-transparent'
                }`}
              >
                <item.icon size={18} className={`transition-transform duration-500 ${isActive ? 'text-[#1DA756] scale-110' : 'group-hover:scale-110'}`} />
                <span className={`text-xs font-bold tracking-wide font-heading ${isActive ? 'text-[#0D120E]' : ''}`}>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1DA756]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-4 pt-6 border-t border-[#0D120E]/5">
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-[#0D120E]/5 space-y-3 shadow-inner">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#0D120E]/40">Membership</span>
                <Shield size={10} className="text-[#1DA756]" />
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#0D120E] tracking-tight">Growth Tier</span>
                <Link href="/join" className="text-[10px] text-[#1DA756] hover:underline flex items-center gap-0.5">
                   Upgrade <ArrowUpRight size={10} />
                </Link>
             </div>
          </div>

          <div className="hidden md:flex items-center gap-3 px-2">
            <div className="p-0.5 rounded-full bg-white border border-[#0D120E]/10 flex-shrink-0 shadow-sm">
              <UserButton />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[11px] font-bold text-[#0D120E] truncate">Active Member</p>
               <p className="text-[9px] font-bold text-[#1DA756] uppercase tracking-widest leading-none mt-1">Live Sync</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#1DA756] animate-pulse shadow-[0_0_8px_#1DA756]" />
          </div>
        </div>
      </div>
    </>
  )
}
