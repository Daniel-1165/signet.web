'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSupabaseClient } from '@/lib/supabase/client'
import { Shield, Trash2, AlertTriangle, CheckCircle, Sparkles, Users, Activity, ExternalLink, Search, Download, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
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

  interface Subscriber {
    id: string
    name: string
    email: string
    username: string
    subscribedAt: string
  }

  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loadingSubscribers, setLoadingSubscribers] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<'name' | 'email' | 'username' | 'subscribedAt'>('subscribedAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    if (isAdmin) {
      fetchSubscribers()
    }
  }, [isAdmin])

  const fetchSubscribers = async () => {
    try {
      setLoadingSubscribers(true)
      const res = await fetch('/api/admin/subscribers')
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data.subscribers || [])
      } else {
        console.error('Failed to fetch subscribers')
      }
    } catch (err) {
      console.error('Error fetching subscribers:', err)
    } finally {
      setLoadingSubscribers(false)
    }
  }

  const handleSort = (field: 'name' | 'email' | 'username' | 'subscribedAt') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredSubscribers = subscribers.filter(sub => {
    const q = searchQuery.toLowerCase()
    return (
      (sub.name || '').toLowerCase().includes(q) ||
      (sub.email || '').toLowerCase().includes(q) ||
      (sub.username || '').toLowerCase().includes(q)
    )
  })

  const sortedSubscribers = [...filteredSubscribers].sort((a, b) => {
    let valA = a[sortField] || ''
    let valB = b[sortField] || ''
    
    if (sortField === 'subscribedAt') {
      return sortDirection === 'asc' 
        ? new Date(valA).getTime() - new Date(valB).getTime()
        : new Date(valB).getTime() - new Date(valA).getTime()
    }

    return sortDirection === 'asc'
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA)
  })

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedSubscribers.length / itemsPerPage))
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSubscribers = sortedSubscribers.slice(indexOfFirstItem, indexOfLastItem)

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleExportCSV = () => {
    if (subscribers.length === 0) return
    const headers = ['Name', 'Email', 'Username', 'Subscribed At']
    
    // Always export the complete mailing list, sorted by subscription date (newest first)
    const listToExport = [...subscribers].sort((a, b) => 
      new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    )
    
    const rows = listToExport.map(sub => [
      sub.name,
      sub.email,
      sub.username,
      new Date(sub.subscribedAt).toISOString()
    ])
    
    const csvString = [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `signet_subscribers_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

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
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#EAF4EC] border-t-[#1E6B3A] animate-spin" />
          <p className="text-[#1E6B3A] text-[12px] font-bold tracking-[0.2em] uppercase font-sans">Verifying Admin Privileges</p>
        </div>
      </div>
    )
  }
  
  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] pt-4 md:pt-8 font-sans selection:bg-[#EAF4EC] selection:text-[#114B2A]">
      {/* Editorial Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between py-6 md:py-10 max-w-[1300px] mx-auto px-5 md:px-6 border-b border-[#EDEDED] mb-8 md:mb-12 gap-6 md:gap-0">
        <div>
           <div className="flex items-center gap-2 text-[#1E6B3A] mb-2">
             <Shield size={14} className="md:w-4 md:h-4" />
             <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">Private Protocol</span>
           </div>
           <h1 className="text-[32px] md:text-[44px] font-extrabold leading-tight text-[#0F172A] font-sans" >
             Admin <span className="italic font-light text-[#1E6B3A]">Hub</span>
           </h1>
           <p className="text-[#0F172A]/60 text-[14px] font-semibold mt-2">Platform Governance & Infrastructure Control</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-[#EDEDED] rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Users size={12} className="text-[#1E6B3A]/60" />
              <p className="text-[#0F172A]/40 text-[9px] font-bold uppercase tracking-widest">Members</p>
            </div>
            <p className="text-xl font-extrabold text-[#0F172A] font-sans">1,284</p>
          </div>
          <div className="bg-white border border-[#EDEDED] rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={12} className="text-[#1E6B3A]/60" />
              <p className="text-[#0F172A]/40 text-[9px] font-bold uppercase tracking-widest">Insights</p>
            </div>
            <p className="text-xl font-extrabold text-[#0F172A] font-sans">4,821</p>
          </div>
        </div>
      </header>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12 px-4 md:px-6 pb-32">
        <div className="space-y-10">
          {/* Access Control Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#EDEDED]">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1E6B3A]">Access Control</span>
            </div>
            
            <h3 className="text-[24px] md:text-[28px] font-extrabold text-[#0F172A] mb-4 font-sans" >
              Promote <span className="italic font-light text-[#1E6B3A]">Member</span>
            </h3>
            <p className="text-[#0F172A]/70 text-[14px] mb-8 max-w-xl leading-relaxed font-medium">
              Grant administrative privileges to a specific member. This allows them to moderate posts, delete content, and access this hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={promotionTarget}
                onChange={(e) => setPromotionTarget(e.target.value)}
                placeholder="Enter User ID or Email address..."
                className="flex-1 bg-[#FAFAF8] border border-[#EDEDED] rounded-2xl py-4 px-6 text-[#0F172A] text-[14px] outline-none focus:border-[#1E6B3A] transition-all font-sans font-medium"
              />
              <button 
                onClick={handlePromote}
                disabled={promoting || !promotionTarget.trim()}
                className="px-8 py-4 bg-[#1E6B3A] hover:bg-[#114B2A] text-white rounded-2xl font-bold text-[13px] transition-all shadow-md shadow-[#1E6B3A]/20 disabled:opacity-50 font-sans"
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

          {/* Newsletter Subscribers Spreadsheet Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#EDEDED] overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1E6B3A]">Mailing List</span>
                <h3 className="text-[24px] md:text-[28px] font-extrabold text-[#0F172A] mt-1 font-sans">
                  Newsletter <span className="italic font-light text-[#1E6B3A]">Subscribers</span>
                </h3>
              </div>
              
              <button 
                onClick={handleExportCSV}
                disabled={subscribers.length === 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#EAF4EC] hover:bg-[#1E6B3A] text-[#1E6B3A] hover:text-white rounded-xl font-bold text-[12px] uppercase tracking-wider transition-all disabled:opacity-50 font-sans"
              >
                <Download size={14} /> Export CSV
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center gap-3 bg-[#FAFAF8] border border-[#EDEDED] rounded-2xl px-4 py-3 mb-6">
              <Search className="text-[#0F172A]/40 w-4 h-4 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13.5px] outline-none text-[#0F172A] placeholder-[#0F172A]/30 font-sans font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#1E6B3A] hover:underline uppercase shrink-0 font-sans"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Spreadsheet Table Container */}
            <div className="overflow-x-auto -mx-8 md:-mx-10 px-8 md:px-10 scrollbar-thin">
              <table className="w-full text-left border-collapse border-spacing-0 font-sans">
                <thead>
                  <tr className="border-b border-[#EDEDED] bg-[#FAFAF8]">
                    <th 
                      onClick={() => handleSort('name')}
                      className="py-4 px-5 text-[10px] font-extrabold uppercase tracking-widest text-[#0F172A]/50 select-none cursor-pointer hover:text-[#1E6B3A] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Name <ArrowUpDown size={10} className="text-[#1E6B3A]/40" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('email')}
                      className="py-4 px-5 text-[10px] font-extrabold uppercase tracking-widest text-[#0F172A]/50 select-none cursor-pointer hover:text-[#1E6B3A] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Email Address <ArrowUpDown size={10} className="text-[#1E6B3A]/40" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('username')}
                      className="py-4 px-5 text-[10px] font-extrabold uppercase tracking-widest text-[#0F172A]/50 select-none cursor-pointer hover:text-[#1E6B3A] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Username <ArrowUpDown size={10} className="text-[#1E6B3A]/40" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('subscribedAt')}
                      className="py-4 px-5 text-[10px] font-extrabold uppercase tracking-widest text-[#0F172A]/50 select-none cursor-pointer hover:text-[#1E6B3A] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Subscribed Date <ArrowUpDown size={10} className="text-[#1E6B3A]/40" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDED]/60">
                  {loadingSubscribers ? (
                    // Skeleton Rows
                    Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="py-4 px-5"><div className="h-4 bg-black/[0.05] rounded-full w-24" /></td>
                        <td className="py-4 px-5"><div className="h-4 bg-black/[0.05] rounded-full w-40" /></td>
                        <td className="py-4 px-5"><div className="h-4 bg-black/[0.05] rounded-full w-20" /></td>
                        <td className="py-4 px-5"><div className="h-4 bg-black/[0.05] rounded-full w-28" /></td>
                      </tr>
                    ))
                  ) : currentSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-sm font-medium text-[#0F172A]/40">
                        {searchQuery ? 'No matching subscribers found.' : 'No newsletter subscribers yet.'}
                      </td>
                    </tr>
                  ) : (
                    currentSubscribers.map((sub) => (
                      <tr 
                        key={sub.id} 
                        className="hover:bg-[#EAF4EC]/10 transition-colors group"
                      >
                        <td className="py-4 px-5 text-[13.5px] font-bold text-[#0F172A] truncate max-w-[150px]">
                          {sub.name}
                        </td>
                        <td className="py-4 px-5 text-[13.5px] font-semibold text-[#0F172A]/70 font-mono truncate max-w-[200px]">
                          {sub.email}
                        </td>
                        <td className="py-4 px-5 text-[13px] font-bold text-[#1E6B3A]">
                          <span className="bg-[#EAF4EC]/60 px-2.5 py-1 rounded-lg">
                            @{sub.username}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-[12px] font-semibold text-[#0F172A]/50">
                          {new Date(sub.subscribedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {!loadingSubscribers && totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-[#EDEDED]/60 pt-6 mt-6">
                <p className="text-[12px] font-semibold text-[#0F172A]/40">
                  Showing <span className="font-bold text-[#0F172A]">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-bold text-[#0F172A]">{Math.min(indexOfLastItem, sortedSubscribers.length)}</span> of{' '}
                  <span className="font-bold text-[#0F172A]">{sortedSubscribers.length}</span> subscribers
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-[#EDEDED] rounded-xl text-[#0F172A]/50 hover:bg-[#FAFAF8] hover:text-[#0F172A] transition-all disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-[#EDEDED] rounded-xl text-[#0F172A]/50 hover:bg-[#FAFAF8] hover:text-[#0F172A] transition-all disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Staff List */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#EDEDED]">
            <h4 className="text-[10px] font-bold text-[#1E6B3A]/60 uppercase tracking-[0.2em] mb-8">Active Administrators</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[user].map((staff, i) => (
                 <div key={i} className="flex items-center justify-between p-5 bg-[#FAFAF8] rounded-2xl border border-[#EDEDED] hover:border-[#1E6B3A]/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={staff?.imageUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#0F172A]">{staff?.fullName || 'Root Admin'}</p>
                        <p className="text-[11px] text-[#1E6B3A]/60 font-bold uppercase tracking-wider">Level 1 Admin</p>
                      </div>
                    </div>
                    <Shield size={16} className="text-[#1E6B3A]/20 group-hover:text-[#1E6B3A] transition-colors" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        <aside className="space-y-10">
          {/* Content Safety Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-[#EDEDED] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <Trash2 size={80} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-red-500/60" size={14} />
                <h2 className="text-[10px] font-bold text-[#1E6B3A] uppercase tracking-[0.2em]">Platform Safety</h2>
              </div>
              
              <h3 className="text-[20px] font-extrabold text-[#0F172A] mb-4 font-sans" >Platform <span className="text-red-600 italic font-light">Cleanup</span></h3>
              <p className="text-[#0F172A]/70 text-[13px] mb-8 leading-relaxed font-semibold font-sans">
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
          <div className="bg-[#0F172A] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
             <Sparkles className="absolute -top-6 -right-6 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#EAF4EC]/60">System Logs</span>
             <h3 className="text-white text-[24px] font-extrabold mt-2 mb-6 font-sans" >Infrastructure</h3>
             
             <div className="space-y-3 font-sans">
                <a href="https://clerk.com" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group/link">
                   <span className="text-white/80 text-[13px] font-semibold">Clerk Console</span>
                   <ExternalLink size={14} className="text-white/20 group-hover/link:text-white" />
                </a>
                <a href="https://supabase.com" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group/link">
                   <span className="text-white/80 text-[13px] font-semibold">Supabase DB</span>
                   <ExternalLink size={14} className="text-white/20 group-hover/link:text-white" />
                </a>
             </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
