'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, MoreHorizontal, Settings2, Hash } from 'lucide-react'
import { MessageIcon, TransmissionIcon } from '@/components/ui/SignetIcons'

interface Room {
  id: string
  name: string
  type: string
}

export default function ChatSidebar({ onSelectRoom, selectedRoomId }: { onSelectRoom: (id: string) => void, selectedRoomId: string }) {
  const [rooms, setRooms] = useState<Room[]>([])
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase.from('rooms').select('*')
      if (data) setRooms(data)
    }
    fetchRooms()
  }, [])

  return (
    <div className="w-[340px] flex flex-col h-full bg-[#000000] border-r border-white/5 pt-32 pb-8 px-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6 font-heading">Collective.</h2>
        <div className="relative group">
          <Search size={16} strokeWidth={2.5} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FF6B00] transition-colors" />
          <input 
            type="text" 
            placeholder="Search channels..." 
            className="w-full h-12 bg-[#0a0a0a] border border-white/5 rounded-2xl pl-12 pr-4 focus:outline-none focus:border-[#FF6B00]/20 text-xs tracking-wider transition-all placeholder:text-white/10"
          />
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Active Hubs</span>
            <button className="text-white/20 hover:text-white transition-colors">
              <Settings2 size={12} strokeWidth={2.5} />
            </button>
          </div>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all group ${
                  selectedRoomId === room.id 
                    ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-white signet-glow' 
                    : 'text-white/40 hover:bg-[#0a0a0a] hover:text-white border border-transparent signet-glow-hover'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  selectedRoomId === room.id ? 'bg-[#FF6B00] text-[#000000]' : 'bg-[#111111] text-white/20 group-hover:text-[#FF6B00]'
                }`}>
                  <TransmissionIcon size={16} />
                </div>
                <span className="text-sm font-bold tracking-wide typography-premium">{room.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 font-heading">Direct Transmission</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[8px] font-bold text-[#FF6B00] uppercase tracking-widest animate-pulse border border-[#FF6B00]/20">Encrypted</span>
          </div>
          <div className="p-10 text-center border border-dashed border-white/5 rounded-[2rem] bg-white/[0.02] soft-blur">
             <MessageIcon size={28} className="mx-auto mb-4 text-white/10" />
             <p className="text-[9px] font-bold uppercase tracking-[0.15em] leading-relaxed text-white/20">Direct channels arriving in next phase.</p>
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 py-6 bg-[#0a0a0a] rounded-3xl border border-white/5 group hover:border-[#FF6B00]/20 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 animate-pulse" />
          <div>
            <p className="text-xs font-bold text-white">System Hub</p>
            <p className="text-[10px] text-white/20 tracking-wider">All systems operational</p>
          </div>
          <MoreHorizontal size={14} strokeWidth={2.5} className="ml-auto text-white/10" />
        </div>
      </div>
    </div>
  )
}
