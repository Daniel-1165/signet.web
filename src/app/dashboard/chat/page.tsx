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
            <div className="max-w-xl text-center p-20 bg-white rounded-[3.5rem] border border-[#D8CEBE]/40 shadow-[0_30px_70px_rgba(0,0,0,0.03)] space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#6E7A67]/5 blur-[80px]" />
               
               <div className="flex justify-center relative z-10">
                 <div className="w-24 h-24 rounded-[2rem] bg-[#6E7A67]/5 flex items-center justify-center text-[#6E7A67]">
                   <MessageCircle size={48} />
                 </div>
               </div>
               
               <div className="space-y-6 relative z-10">
                 <div className="inline-flex items-center gap-3 text-[#6E7A67]">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Transmission</span>
                 </div>
                 <h2 className="text-[44px] md:text-[52px] font-bold text-[#1D1914] tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                   Connect with the <span className="italic font-normal text-[#6E7A67]">Collective.</span>
                 </h2>
                 <p className="text-[#6E7A67] text-[16px] leading-relaxed max-w-sm mx-auto italic">
                   Initiate a deep-resonance exchange with peer architects across the network.
                 </p>
               </div>
               
               <div className="pt-6 relative z-10">
                 <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#1D1914] text-[10px] font-bold uppercase tracking-[0.2em] text-[#D8CEBF] shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E7A67] animate-pulse" />
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
