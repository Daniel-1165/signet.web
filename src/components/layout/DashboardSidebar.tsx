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
  Activity
} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

const sidebarItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Collective Chat', icon: MessageSquare, href: '/dashboard/chat' },
  { name: 'Assessments', icon: Brain, href: '/dashboard/assessments' },
  { name: 'Community', icon: Users, href: '/dashboard/community' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-[#0a0f0a] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="mb-12 px-2">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-[#4ade80] font-heading flex items-center gap-2">
          SIGNET
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_8px_#4ade80]" />
        </Link>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mt-1 font-heading">Inner Circle</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                isActive 
                  ? 'bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80] shadow-[0_0_20px_rgba(74,222,128,0.05)]' 
                  : 'text-white/40 hover:text-white hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              <item.icon size={18} className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="text-xs font-bold tracking-wide font-heading">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1 h-3 rounded-full bg-[#4ade80]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Membership</span>
              <Shield size={10} className="text-[#4ade80]" />
           </div>
           <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white tracking-tight">Growth Tier</span>
              <Link href="/join" className="text-[10px] text-[#4ade80] hover:underline flex items-center gap-0.5">
                 Upgrade <ArrowUpRight size={10} />
              </Link>
           </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="p-1 rounded-xl bg-white/5 border border-white/10">
            <UserButton />
          </div>
          <div className="flex-1 min-w-0">
             <p className="text-[11px] font-bold text-white truncate">Active Member</p>
             <p className="text-[9px] font-bold text-[#4ade80] uppercase tracking-widest leading-none mt-1">Live Sync</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
        </div>
      </div>
    </div>
  )
}
