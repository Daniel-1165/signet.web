'use client'

import { useEffect, useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { Send, User, AtSign, Filter, Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { LikeIcon, CommentIcon, TransmissionIcon, NotificationIcon } from '@/components/ui/SignetIcons'

interface Message {
  id: string
  content: string
  room_id: string
  user_id: string
  created_at: string
  profiles?: {
    first_name: string
    last_name: string
    image_url: string
  }
}

interface Room {
  id: string
  name: string
  type: string
}

export default function ChatWindow({ roomId }: { roomId: string }) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [room, setRoom] = useState<Room | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!roomId) return

    // Fetch room details
    const fetchRoom = async () => {
      const { data } = await supabase.from('rooms').select('*').eq('id', roomId).single()
      if (data) setRoom(data)
    }

    // Fetch initial messages with joined profiles
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*, profiles(first_name, last_name, image_url)')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })
      
      if (data) setMessages(data as Message[])
    }

    fetchRoom()
    fetchMessages()

    // Realtime subscription
    const channel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, 
        async (payload) => {
          // Re-fetch to get the profile association too
          const { data } = await supabase
            .from('messages')
            .select('*, profiles(first_name, last_name, image_url)')
            .eq('id', payload.new.id)
            .single()

          if (data) setMessages(prev => [...prev, data as Message])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [roomId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const { error } = await supabase.from('messages').insert({
      room_id: roomId,
      user_id: user.id,
      content: newMessage.trim(),
    })

    if (error) {
      console.error('Error sending message:', error)
    } else {
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#111111]/50 soft-blur">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D3F36B]/10 border border-[#D3F36B]/20 flex items-center justify-center text-[#D3F36B] signet-glow">
            <TransmissionIcon size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white font-heading">{room?.name || 'Growth Hub'}</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D3F36B] animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D3F36B]/60 font-heading">Feed Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-[#D3F36B] hover:bg-[#D3F36B]/10 transition-all border border-transparent hover:border-[#D3F36B]/20">
            <NotificationIcon size={18} />
          </button>
          <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
            <Filter size={18} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.user_id === user?.id ? 'flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0">
              {msg.profiles?.image_url ? (
                <img src={msg.profiles.image_url} className="w-10 h-10 rounded-xl" alt="avatar" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <User size={18} strokeWidth={2.5} className="text-white/20" />
                </div>
              )}
            </div>
            <div className={`flex flex-col max-w-[70%] ${msg.user_id === user?.id ? 'items-end' : ''}`}>
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase font-heading">
                  {msg.profiles?.first_name || 'Member'}
                </span>
                <span className="text-[10px] text-white/10">•</span>
                <span className="text-[10px] text-white/20 font-medium">
                  {formatDistanceToNow(new Date(msg.created_at))}
                </span>
              </div>
              <div className={`group relative px-6 py-4 rounded-[2rem] text-sm leading-relaxed typography-premium ${
                msg.user_id === user?.id 
                  ? 'bg-[#D3F36B] text-[#000000] font-semibold signet-glow' 
                  : 'bg-[#111111]/80 soft-blur text-white/80 border border-white/5 inner-glow'
              }`}>
                {msg.content}
                
                {/* Reactions Placeholder */}
                <div className={`absolute -bottom-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all ${msg.user_id === user?.id ? 'right-4' : 'left-4'}`}>
                   <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#000000] border border-white/10 text-[10px] font-bold text-white/40 hover:text-[#D3F36B] transition-colors">
                      <LikeIcon size={12} />
                      <span>0</span>
                   </button>
                   <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#000000] border border-white/10 text-[10px] font-bold text-white/40 hover:text-[#D3F36B] transition-colors">
                      <CommentIcon size={12} />
                      <span>Reply</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-6 border-t border-white/5 bg-[#111111]/30">
        <div className="relative">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share an insight with the collective..."
            className="w-full h-16 bg-[#000000] border border-white/5 rounded-2xl px-8 pr-16 focus:outline-none focus:border-[#D3F36B]/40 text-sm tracking-wide transition-all placeholder:text-white/10"
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 w-10 h-10 bg-[#D3F36B] text-[#000000] rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#D3F36B]/20 signet-glow"
          >
            <TransmissionIcon size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}
