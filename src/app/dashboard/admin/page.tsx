'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { Shield, Trash2, AlertTriangle, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle', message: string }>({ type: 'idle', message: '' })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/')
      return
    }

    if (user) {
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.role === 'admin') {
            setIsAdmin(true)
          } else {
            router.push('/dashboard')
          }
          setLoading(false)
        })
    }
  }, [user, isLoaded])

  const clearAllMessages = async () => {
    if (!confirm('CRITICAL: Are you absolutely sure? This will delete EVERY message in the community chat history permanently.')) return
    
    setLoading(true)
    const { error } = await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Trick to delete all

    if (error) {
      setStatus({ type: 'error', message: 'Failed to clear messages: ' + error.message })
    } else {
      setStatus({ type: 'success', message: 'Successfully cleared all messages.' })
    }
    setLoading(false)
  }

  if (loading && !isAdmin) return <div className="p-10 text-white/20 font-bold animate-pulse">Verifying Admin Privileges...</div>
  
  if (!isAdmin) return null

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1DA756]/10 flex items-center justify-center text-[#1DA756]">
            <Shield size={20} />
          </div>
          <h1 className="text-3xl font-bold text-white font-heading tracking-tight">Admin Protocol</h1>
        </div>
        <p className="text-white/40 text-sm max-w-xl">
          Authorized personnel only. Use these tools with extreme caution. Actions performed here are permanent and cannot be undone.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Community Management */}
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Trash2 size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="text-red-500" size={18} />
              <h2 className="text-lg font-bold text-white uppercase tracking-widest text-[11px]">Community Lifecycle</h2>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Purge Chat History</h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Resets the community feed by deleting all messages across all rooms. This action is typically used for season resets or critical maintenance.
            </p>

            <button 
              onClick={clearAllMessages}
              disabled={loading}
              className="flex items-center gap-3 px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all group disabled:opacity-50"
            >
              <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
              Clear All Messages
            </button>

            {status.type !== 'idle' && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 border ${
                status.type === 'success' ? 'bg-[#1DA756]/10 border-[#1DA756]/20 text-[#1DA756]' : 'bg-red-500/10 border-red-500/20 text-red-500'
              }`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                <span className="text-[12px] font-bold">{status.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
