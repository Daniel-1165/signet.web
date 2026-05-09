'use client'

import Link from 'next/link'
import { Bell } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export default function MobileTopHeader() {
  const isVisible = useScrollDirection()

  return (
    <div className={`md:hidden fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl z-[60] flex items-center justify-between px-6 border-b border-[#D8CEBE]/50 shadow-sm transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <Link href="/" className="flex items-center">
          <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-8 w-auto object-contain" />
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
  )
}
