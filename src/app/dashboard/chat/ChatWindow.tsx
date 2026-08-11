'use client'

import { useEffect, useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { Send, User, AtSign, Filter, Bell, MoreVertical, Edit2, Copy, Trash2, Check, X } from 'lucide-react'
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
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!roomId) return

    if (user) {
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.role === 'admin') setIsAdmin(true);
        });
    }

    const fetchRoom = async () => {
      const { data } = await supabase.from('rooms').select('*').eq('id', roomId).single()
      if (data) setRoom(data)
    }

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

    const channel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, 
        async (payload) => {
          const { data } = await supabase
            .from('messages')
            .select('*, profiles(first_name, last_name, image_url)')
            .eq('id', payload.new.id)
            .single()

          if (data) setMessages(prev => [...prev, data as Message])
        }
      )
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, 
        (payload) => {
          setMessages(prev => prev.map(msg => msg.id === payload.new.id ? { ...msg, content: payload.new.content } : msg))
        }
      )
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, 
        (payload) => {
          setMessages(prev => prev.filter(msg => msg.id !== payload.old.id))
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

    if (!error) setNewMessage('')
  }

  const deleteMessage = async (id: string) => {
    await supabase.from('messages').delete().eq('id', id)
    setActiveMenuId(null)
  }

  const startEditing = (msg: Message) => {
    setEditingId(msg.id)
    setEditContent(msg.content)
    setActiveMenuId(null)
  }

  const saveEdit = async () => {
    if (!editingId || !editContent.trim()) return
    await supabase.from('messages').update({ content: editContent.trim() }).eq('id', editingId)
    setEditingId(null)
    setEditContent('')
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    setActiveMenuId(null)
  }

  return (
    <div className="flex flex-col h-full bg-ink border border-white/5 rounded-3xl overflow-hidden shadow-2xl" onClick={() => setActiveMenuId(null)}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-ink/50 soft-blur">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-verdant/10 border border-verdant/20 flex items-center justify-center text-verdant">
            <TransmissionIcon size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white font-heading">{room?.name || 'Growth Hub'}</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-verdant animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-verdant/60 font-heading">Feed Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-verdant hover:bg-verdant/10 transition-colors border border-transparent hover:border-verdant/20">
            <NotificationIcon size={18} />
          </button>
          <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
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
                  <User size={18} strokeWidth={2.5} className="text-mist/40" />
                </div>
              )}
            </div>
            <div className={`flex flex-col max-w-[70%] ${msg.user_id === user?.id ? 'items-end' : ''}`}>
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase font-heading">
                  {msg.profiles?.first_name || 'Member'}
                </span>
                <span className="text-[10px] text-white/10">•</span>
                <span className="text-[10px] text-mist/40 font-medium">
                  {formatDistanceToNow(new Date(msg.created_at))}
                </span>
              </div>
              <div className={`group relative px-6 py-4 rounded-[2rem] text-sm leading-relaxed ${
                msg.user_id === user?.id 
                  ? 'bg-verdant text-ink font-semibold shadow-lg shadow-verdant/10' 
                  : 'bg-ink/80 soft-blur text-white/80 border border-white/5'
              }`}>
                {editingId === msg.id ? (
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <textarea 
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="bg-transparent border-none focus:outline-none resize-none text-sm w-full"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                       <button onClick={() => setEditingId(null)} className="p-1 rounded-full hover:bg-black/10"><X size={14} /></button>
                       <button onClick={saveEdit} className="p-1 rounded-full bg-black/5 hover:bg-black/10"><Check size={14} /></button>
                    </div>
                  </div>
                ) : (
                  <>
                    {msg.content}
                    
                    {/* Message Actions - Three Dots */}
                    <div className={`absolute top-4 ${msg.user_id === user?.id ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === msg.id ? null : msg.id) }} 
                        className="text-mist/40 hover:text-white/60 transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeMenuId === msg.id && (
                        <div 
                          className={`absolute top-0 ${msg.user_id === user?.id ? 'right-0' : 'left-0'} mt-6 w-32 bg-ink border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            onClick={() => copyMessage(msg.content)}
                            className="w-full px-4 py-2 text-left text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                          >
                            <Copy size={14} /> Copy
                          </button>
                          {msg.user_id === user?.id && (
                            <button 
                              onClick={() => startEditing(msg)}
                              className="w-full px-4 py-2 text-left text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                          )}
                          {(msg.user_id === user?.id || isAdmin) && (
                            <button 
                              onClick={() => deleteMessage(msg.id)}
                              className="w-full px-4 py-2 text-left text-[11px] font-bold text-red-400/60 hover:text-red-400 hover:bg-red-400/5 flex items-center gap-2 transition-colors"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {/* Reactions Placeholder */}
                {!editingId && (
                  <div className={`absolute -bottom-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${msg.user_id === user?.id ? 'right-4' : 'left-4'}`}>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-ink border border-white/10 text-[10px] font-bold text-white/40 hover:text-verdant transition-colors">
                        <LikeIcon size={12} />
                        <span>0</span>
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-ink border border-white/10 text-[10px] font-bold text-white/40 hover:text-verdant transition-colors">
                        <CommentIcon size={12} />
                        <span>Reply</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-6 border-t border-white/5 bg-ink/30">
        <div className="relative">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share an insight with the collective..."
            className="w-full h-16 bg-ink border border-white/5 rounded-2xl px-8 pr-16 focus:outline-none focus:border-verdant/40 text-sm tracking-wide transition-colors placeholder:text-white/10"
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 w-10 h-10 bg-verdant text-ink rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-verdant/20"
          >
            <TransmissionIcon size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}
