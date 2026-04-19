'use client'

import { useState } from 'react'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ChatIllustration } from '@/components/chat/ChatIllustration'

export default function ChatPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-8">
      {/* Local Chat Sidebar */}
      <ChatSidebar selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />

      {/* Main Chat Window Area */}
      <div className="flex-1 min-w-0 h-full">
        {selectedRoomId ? (
          <ChatWindow roomId={selectedRoomId} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="max-w-md text-center p-14 bg-[#232826]/50 soft-blur rounded-[2.5rem] border border-white/5 space-y-8 inner-glow signet-glow">
              <div className="flex justify-center">
                <ChatIllustration />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white tracking-tight font-heading">The Growth Network.</h2>
                <p className="text-white/40 text-sm leading-relaxed font-normal px-6 typography-premium">
                  Select a channel from the collective to begin your transmission. Share insights, build connections, and fuel the group's ascent.
                </p>
              </div>
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA756]/10 text-[10px] font-bold uppercase tracking-widest text-[#1DA756] border border-[#1DA756]/20">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#1DA756] shadow-[0_0_8px_#1DA756]" />
                   Real-time Sync Active
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
