'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSupabaseClient } from '@/lib/supabase/client'
import { Shield, Trash2, AlertTriangle, CheckCircle, Sparkles, Users, Activity, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminHubPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle', message: string }>({ type: 'idle', message: '' })
  const [promotionTarget, setPromotionTarget] = useState('')
  const [promoting, setPromoting] = useState(false)

  const supabase = useSupabaseClient()

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

  if (loading && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#D8CEBE] border-t-[#6E7A67] animate-spin" />
          <p className="text-[#6E7A67] text-[12px] font-bold tracking-[0.2em] uppercase">Verifying Admin Privileges</p>
        </div>
      </div>
    )
  }
  
  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1914] pt-4 md:pt-8">
      {/* Editorial Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between py-6 md:py-10 max-w-[1300px] mx-auto px-5 md:px-6 border-b border-[#D8CEBE]/40 mb-8 md:mb-12 gap-6 md:gap-0">
        <div>
           <div className="flex items-center gap-2 text-[#6E7A67] mb-2">
             <Shield size={14} className="md:w-4 md:h-4" />
             <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">Private Protocol</span>
           </div>
           <h1 className="text-[32px] md:text-[44px] font-bold leading-tight" >
             Admin <span className="italic font-normal text-[#6E7A67]">Hub</span>
           </h1>
           <p className="text-[#6E7A67]/60 text-[14px] font-medium mt-2">Platform Governance & Infrastructure Control</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-[#D8CEBE]/40 rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Users size={12} className="text-[#6E7A67]/60" />
              <p className="text-[#6E7A67]/40 text-[9px] font-bold uppercase tracking-widest">Members</p>
            </div>
            <p className="text-xl font-bold text-[#1D1914]">1,284</p>
          </div>
          <div className="bg-white border border-[#D8CEBE]/40 rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={12} className="text-[#6E7A67]/60" />
              <p className="text-[#6E7A67]/40 text-[9px] font-bold uppercase tracking-widest">Insights</p>
            </div>
            <p className="text-xl font-bold text-[#1D1914]">4,821</p>
          </div>
        </div>
      </header>

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12 px-4 md:px-6 pb-32">
        <div className="space-y-10">
          {/* Access Control Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#D8CEBE]/30">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#6E7A67]">Access Control</span>
            </div>
            
            <h3 className="text-[24px] md:text-[28px] font-bold text-[#1D1914] mb-4" >
              Promote <span className="italic font-normal text-[#6E7A67]">Member</span>
            </h3>
            <p className="text-[#6E7A67]/70 text-[14px] mb-8 max-w-xl leading-relaxed">
              Grant administrative privileges to a specific member. This allows them to moderate posts, delete content, and access this hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={promotionTarget}
                onChange={(e) => setPromotionTarget(e.target.value)}
                placeholder="Enter User ID or Email address..."
                className="flex-1 bg-[#FDFCFB] border border-[#D8CEBE]/40 rounded-2xl py-4 px-6 text-[#1D1914] text-[14px] outline-none focus:border-[#6E7A67] transition-all"
              />
              <button 
                onClick={handlePromote}
                disabled={promoting || !promotionTarget.trim()}
                className="px-8 py-4 bg-[#1D1914] hover:bg-[#6E7A67] text-white rounded-2xl font-bold text-[13px] transition-all shadow-lg disabled:opacity-50"
              >
                {promoting ? 'Processing...' : 'Verify & Promote'}
              </button>
            </div>

            {status.type !== 'idle' && (
              <div className={`mt-6 p-4 rounded-2xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-2 ${
                status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                <span className="text-[13px] font-bold">{status.message}</span>
              </div>
            )}
          </div>

          {/* Active Staff List */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#D8CEBE]/30">
            <h4 className="text-[10px] font-bold text-[#6E7A67]/40 uppercase tracking-[0.2em] mb-8">Active Administrators</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[user].map((staff, i) => (
                 <div key={i} className="flex items-center justify-between p-5 bg-[#FDFCFB] rounded-2xl border border-[#D8CEBE]/30 hover:border-[#6E7A67]/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={staff?.imageUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#1D1914]">{staff?.fullName || 'Root Admin'}</p>
                        <p className="text-[11px] text-[#6E7A67]/60 font-bold uppercase tracking-wider">Level 1 Admin</p>
                      </div>
                    </div>
                    <Shield size={16} className="text-[#6E7A67]/20 group-hover:text-[#6E7A67] transition-colors" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        <aside className="space-y-10">
          {/* Content Safety Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-[#D8CEBE]/30 shadow-[0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <Trash2 size={80} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-red-500/60" size={14} />
                <h2 className="text-[10px] font-bold text-[#6E7A67] uppercase tracking-[0.2em]">Platform Safety</h2>
              </div>
              
              <h3 className="text-[20px] font-bold text-[#1D1914] mb-4" >Platform <span className="text-red-500 italic font-normal">Cleanup</span></h3>
              <p className="text-[#6E7A67]/70 text-[13px] mb-8 leading-relaxed">
                Resets the collective community feed. All published insights, assets, and discussions will be permanently removed.
              </p>

              <button 
                onClick={clearAllMessages}
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full py-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-bold text-[12px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete All Messages
              </button>
            </div>
          </div>

          {/* Integration Links */}
          <div className="bg-[#1D1914] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
             <Sparkles className="absolute -top-6 -right-6 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D8CEBF]/60">System Logs</span>
             <h3 className="text-white text-[24px] font-bold mt-2 mb-6" >Infrastructure</h3>
             
             <div className="space-y-3">
                <a href="https://clerk.com" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group/link">
                   <span className="text-white/80 text-[13px] font-medium">Clerk Console</span>
                   <ExternalLink size={14} className="text-white/20 group-hover/link:text-white" />
                </a>
                <a href="https://supabase.com" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group/link">
                   <span className="text-white/80 text-[13px] font-medium">Supabase DB</span>
                   <ExternalLink size={14} className="text-white/20 group-hover/link:text-white" />
                </a>
             </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
