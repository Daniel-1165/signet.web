'use client'

import { useState } from 'react'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ChatIllustration } from '@/components/chat/ChatIllustration'
import { Sparkles, MessageCircle } from 'lucide-react'

export default function ChatPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-10 mt-6 mx-auto max-w-[1400px] px-6">
      {/* Local Chat Sidebar */}
      <ChatSidebar selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />

      {/* Main Chat Window Area */}
      <div className="flex-1 min-w-0 h-full">
        {selectedRoomId ? (
          <ChatWindow roomId={selectedRoomId} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="max-w-xl text-center p-20 bg-white rounded-[3.5rem] border border-rule/40  space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-ink/5 blur-[80px]" />
               
               <div className="flex justify-center relative z-10">
                 <div className="w-24 h-24 rounded-[var(--radius-lg)] bg-ink/5 flex items-center justify-center text-ink">
                   <MessageCircle size={48} />
                 </div>
               </div>
               
               <div className="space-y-6 relative z-10">
                 <div className="inline-flex items-center gap-3 text-ink">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">The Transmission</span>
                 </div>
                 <h2 className="text-[44px] md:text-[52px] font-semibold text-ink tracking-tight leading-tight" >
                   Connect with the <span className="italic font-normal text-ink">Collective.</span>
                 </h2>
                 <p className="text-ink text-[16px] leading-relaxed max-w-sm mx-auto italic">
                   Initiate a deep-resonance exchange with peer architects across the network.
                 </p>
               </div>
               
               <div className="pt-6 relative z-10">
                 <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-ink text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/75 ">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
                    Network Sync Established
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
