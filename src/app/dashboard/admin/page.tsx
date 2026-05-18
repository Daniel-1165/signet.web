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
  const [promotionTarget, setPromotionTarget] = useState('')
  const [promoting, setPromoting] = useState(false)

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
    if (!confirm('CRITICAL: Are you absolutely sure? This will delete EVERY post in the community insight history permanently.')) return
    
    setLoading(true)
    // Targeting the 'posts' table which is used for the community page
    const { error } = await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000') 

    if (error) {
      setStatus({ type: 'error', message: 'Failed to clear community posts: ' + error.message })
    } else {
      setStatus({ type: 'success', message: 'Successfully cleared all community insights.' })
    }
    setLoading(false)
  }

  const handlePromote = async () => {
    if (!promotionTarget.trim() || !user) return
    setPromoting(true)
    // Pass the currently authenticated user ID to verify they are an admin, 
    // and the target they wish to promote.
    const { error } = await supabase.rpc('promote_to_admin', { 
      admin_id: user.id, 
      target_user: promotionTarget 
    })

    if (error) {
      setStatus({ type: 'error', message: 'Promotion failed: ' + error.message })
    } else {
      setStatus({ type: 'success', message: `Successfully promoted ${promotionTarget} to Admin.` })
      setPromotionTarget('')
    }
    setPromoting(false)
  }

  if (loading && !isAdmin) return <div className="p-10 text-white/20 font-bold animate-pulse">Verifying Admin Privileges...</div>
  
  if (!isAdmin) return null

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#1DA756]/10 flex items-center justify-center text-[#1DA756]">
              <Shield size={20} />
            </div>
            <h1 className="text-3xl font-bold text-white font-heading tracking-tight">Admin Protocol</h1>
          </div>
          <p className="text-white/40 text-sm max-w-xl">
            Authorized personnel only. Accessing System Level Infrastructure.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-[#111111] border border-white/5 rounded-2xl px-6 py-4">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Total Members</p>
            <p className="text-2xl font-bold text-white tracking-tighter">1,284</p>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-2xl px-6 py-4">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Active Insights</p>
            <p className="text-2xl font-bold text-white tracking-tighter">4,821</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="text-[#1DA756]" size={16} />
            <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">Access Control</h2>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">Promote Member</h3>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Grant administrative privileges to a specific member. Use their unique User ID or registered Email address.
          </p>

          <div className="space-y-4">
            <div className="relative group">
              <input 
                type="text" 
                value={promotionTarget}
                onChange={(e) => setPromotionTarget(e.target.value)}
                placeholder="Enter User ID, Email, or Name..."
                className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:border-[#1DA756]/50 transition-all"
              />
            </div>
            <button 
              onClick={handlePromote}
              disabled={promoting || !promotionTarget.trim()}
              className="w-full py-4 bg-[#1DA756] hover:bg-[#1DA756]/80 text-white rounded-2xl font-bold text-sm transition-all shadow-[0_10px_20px_rgba(29,167,86,0.2)] disabled:opacity-50"
            >
              {promoting ? 'Promoting...' : 'Verify & Promote'}
            </button>
          </div>

          <div className="mt-10 border-t border-white/5 pt-8">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Active Staff</h4>
            <div className="space-y-4">
               {[user].map((staff, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={staff?.imageUrl} className="w-8 h-8 rounded-full border border-white/10" />
                      <div>
                        <p className="text-xs font-bold text-white">{staff?.fullName}</p>
                        <p className="text-[10px] text-white/40 uppercase">Root Admin</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-[#1DA756]/10 text-[#1DA756] text-[9px] font-black rounded-full uppercase">Active</div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Community Management */}
        <div className="space-y-8">
          <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Trash2 size={160} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-8">
                <AlertTriangle className="text-red-500" size={16} />
                <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">Platform Safety</h2>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Content Purge</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Resets the collective community feed. All published insights, assets, and discussions will be permanently destroyed.
              </p>

              <div className="mt-auto">
                <button 
                  onClick={clearAllMessages}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all group disabled:opacity-50"
                >
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  Perform Reset Lifecycle
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
      </div>
    </div>
  )
}
