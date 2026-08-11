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

  interface DBCertificate {
    id: string
    username: string
    email: string
    course_name: string
    file_url: string
    issue_date: string
    created_at: string
  }

  const [dbCertificates, setDbCertificates] = useState<DBCertificate[]>([])
  const [loadingCerts, setLoadingCerts] = useState(true)
  const [certUsername, setCertUsername] = useState('')
  const [certEmail, setCertEmail] = useState('')
  const [certCourse, setCertCourse] = useState('Silent Growth Network Cohort 1')
  const [certDate, setCertDate] = useState(new Date().toISOString().split('T')[0])
  const [certFile, setCertFile] = useState<File | null>(null)
  const [uploadingCert, setUploadingCert] = useState(false)

  useEffect(() => {
    if (isAdmin) {
      fetchSubscribers()
      fetchCertificates()
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

  const fetchCertificates = async () => {
    try {
      setLoadingCerts(true)
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) {
        setDbCertificates(data)
      } else {
        console.error('Error fetching certificates:', error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingCerts(false)
    }
  }

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certUsername.trim() || !certEmail.trim() || !certCourse.trim() || !certFile) {
      setStatus({ type: 'error', message: 'All certificate fields are required.' })
      return
    }

    setUploadingCert(true)
    setStatus({ type: 'idle', message: '' })

    try {
      // 1. Upload file to Supabase Storage in 'post-images' bucket
      const fileExt = certFile.name.split('.').pop()
      const fileName = `certificate-${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, certFile)

      if (uploadError) {
        throw new Error('Failed to upload file to Supabase storage: ' + uploadError.message)
      }

      // 2. Get public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName)

      // 3. Insert record into Supabase certificates table
      const { error: insertError } = await supabase
        .from('certificates')
        .insert({
          username: certUsername.trim(),
          email: certEmail.trim(),
          course_name: certCourse.trim(),
          file_url: publicUrl,
          issue_date: certDate ? new Date(certDate).toISOString() : new Date().toISOString()
        })

      if (insertError) {
        throw new Error('Failed to insert certificate into database: ' + insertError.message)
      }

      setStatus({ type: 'success', message: 'Certificate successfully created!' })
      setCertUsername('')
      setCertEmail('')
      setCertFile(null)
      
      const fileInput = document.getElementById('certFile') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
      fetchCertificates()
    } catch (err: any) {
      console.error(err)
      setStatus({ type: 'error', message: err.message || 'An error occurred while creating certificate.' })
    } finally {
      setUploadingCert(false)
    }
  }

  const handleDeleteCertificate = async (certId: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return

    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', certId)

      if (error) {
        setStatus({ type: 'error', message: 'Failed to delete certificate: ' + error.message })
      } else {
        setStatus({ type: 'success', message: 'Certificate deleted successfully.' })
        fetchCertificates()
      }
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'An error occurred.' })
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
      <div className="min-h-screen bg-canvas flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-mist border-t-seal animate-spin" />
          <p className="text-seal text-[12px] font-semibold tracking-[0.2em] uppercase font-sans">Verifying Admin Privileges</p>
        </div>
      </div>
    )
  }
  
  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-canvas text-ink pt-4 md:pt-8 font-sans selection:bg-mist selection:text-seal">
      {/* Editorial Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between py-6 md:py-10 max-w-[1300px] mx-auto px-5 md:px-6 border-b border-rule mb-8 md:mb-12 gap-6 md:gap-0">
        <div>
           <div className="flex items-center gap-2 text-seal mb-2">
             <Shield size={14} className="md:w-4 md:h-4" />
             <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.3em] uppercase">Private Protocol</span>
           </div>
           <h1 className="text-[32px] md:text-[44px] font-semibold leading-tight text-ink font-sans" >
             Admin <span className="italic font-light text-seal">Hub</span>
           </h1>
           <p className="text-ink/60 text-[14px] font-semibold mt-2">Platform Governance & Infrastructure Control</p>
        </div>
      </header>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12 px-4 md:px-6 pb-32">
        <div className="space-y-10">
          {/* Access Control Card */}
          <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-10  border border-rule">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-seal">Access Control</span>
            </div>
            
            <h3 className="text-[24px] md:text-[28px] font-semibold text-ink mb-4 font-sans" >
              Promote <span className="italic font-light text-seal">Member</span>
            </h3>
            <p className="text-ink/70 text-[14px] mb-8 max-w-xl leading-relaxed font-medium">
              Grant administrative privileges to a specific member. This allows them to moderate posts, delete content, and access this hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={promotionTarget}
                onChange={(e) => setPromotionTarget(e.target.value)}
                placeholder="Enter User ID or Email address..."
                className="flex-1 bg-canvas border border-rule rounded-[var(--radius-lg)] py-4 px-6 text-ink text-[14px] outline-none focus:border-seal transition-colors font-sans font-medium"
              />
              <button 
                onClick={handlePromote}
                disabled={promoting || !promotionTarget.trim()}
                className="px-8 py-4 bg-seal hover:bg-seal text-white rounded-[var(--radius-lg)] font-semibold text-[13px] transition   disabled:opacity-50 font-sans"
              >
                {promoting ? 'Processing...' : 'Verify & Promote'}
              </button>
            </div>

            {status.type !== 'idle' && (
              <div className={`mt-6 p-4 rounded-[var(--radius-lg)] flex items-center gap-3 border animate-in fade-in slide-in-from-top-2 ${
                status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                <span className="text-[13px] font-semibold">{status.message}</span>
              </div>
            )}
          </div>

          {/* Certificates Management Card */}
          <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-10  border border-rule">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-seal">Credentials Control</span>
            </div>
            
            <h3 className="text-[24px] md:text-[28px] font-semibold text-ink mb-4 font-sans" >
              Manage Cohort <span className="italic font-light text-seal">Certificates</span>
            </h3>
            <p className="text-ink/70 text-[14px] mb-8 max-w-xl leading-relaxed font-medium">
              Create and manage official digital certificates. Users will be able to retrieve them by entering either their username or email on the public certificates page.
            </p>

            {/* Add Certificate Form */}
            <form onSubmit={handleAddCertificate} className="space-y-6 bg-canvas border border-rule p-6 rounded-[var(--radius-lg)] mb-10">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-ink/60">Add New Certificate</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">Signet Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. daniel_growth"
                    value={certUsername}
                    onChange={(e) => setCertUsername(e.target.value)}
                    className="w-full bg-white border border-rule rounded-xl py-3 px-4 text-sm outline-none focus:border-seal transition-colors font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">Secure Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. daniel@signet.org"
                    value={certEmail}
                    onChange={(e) => setCertEmail(e.target.value)}
                    className="w-full bg-white border border-rule rounded-xl py-3 px-4 text-sm outline-none focus:border-seal transition-colors font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">Cohort/Course Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Silent Growth Network Cohort 1"
                    value={certCourse}
                    onChange={(e) => setCertCourse(e.target.value)}
                    className="w-full bg-white border border-rule rounded-xl py-3 px-4 text-sm outline-none focus:border-seal transition-colors font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">Issue Date</label>
                  <input
                    type="date"
                    required
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    className="w-full bg-white border border-rule rounded-xl py-3 px-4 text-sm outline-none focus:border-seal transition-colors font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-ink/60">Certificate PDF or Image File</label>
                <input
                  id="certFile"
                  type="file"
                  required
                  accept="application/pdf,image/*"
                  onChange={(e) => setCertFile(e.target.files?.[0] || null)}
                  className="w-full bg-white border border-rule rounded-xl py-3 px-4 text-sm outline-none file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-mist file:text-seal hover:file:bg-seal hover:file:text-white file:transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={uploadingCert}
                className="w-full py-4 bg-seal hover:bg-seal text-white rounded-xl font-semibold text-xs uppercase tracking-widest transition   disabled:opacity-50"
              >
                {uploadingCert ? 'Uploading & Creating...' : 'Create Certificate Record'}
              </button>
            </form>

            {/* List of Existing Certificates */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">Active Certificates ({dbCertificates.length})</h4>
              
              {loadingCerts ? (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 border-2 border-gray-200 border-t-seal rounded-full animate-spin" />
                </div>
              ) : dbCertificates.length === 0 ? (
                <p className="text-sm text-ink/40 font-medium py-4 text-center">No certificates uploaded to Supabase database yet.</p>
              ) : (
                <div className="divide-y divide-rule max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                  {dbCertificates.map((cert) => (
                    <div key={cert.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-ink truncate">@{cert.username}</p>
                          <span className="text-[10px] bg-mist/60 text-seal px-2 py-0.5 rounded font-semibold truncate max-w-[150px]">{cert.course_name}</span>
                        </div>
                        <p className="text-xs text-ink/60 font-semibold truncate mt-0.5">{cert.email}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <a 
                          href={cert.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 text-ink/40 hover:text-seal transition-colors"
                          title="View Certificate"
                        >
                          <ExternalLink size={15} />
                        </a>
                        <button 
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="p-2 text-ink/40 hover:text-red-600 transition-colors"
                          title="Delete Certificate"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Newsletter Subscribers Spreadsheet Card */}
          <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-10  border border-rule overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-seal">Mailing List</span>
                <h3 className="text-[24px] md:text-[28px] font-semibold text-ink mt-1 font-sans">
                  Newsletter <span className="italic font-light text-seal">Subscribers</span>
                </h3>
              </div>
              
              <button 
                onClick={handleExportCSV}
                disabled={subscribers.length === 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-mist hover:bg-seal text-seal hover:text-white rounded-xl font-semibold text-[12px] uppercase tracking-wider transition disabled:opacity-50 font-sans"
              >
                <Download size={14} /> Export CSV
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center gap-3 bg-canvas border border-rule rounded-[var(--radius-lg)] px-4 py-3 mb-6">
              <Search className="text-ink/40 w-4 h-4 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13.5px] outline-none text-ink placeholder-ink/30 font-sans font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-seal hover:underline uppercase shrink-0 font-sans"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Spreadsheet Table Container */}
            <div className="overflow-x-auto -mx-8 md:-mx-10 px-8 md:px-10 scrollbar-thin">
              <table className="w-full text-left border-collapse border-spacing-0 font-sans">
                <thead>
                  <tr className="border-b border-rule bg-canvas">
                    <th 
                      onClick={() => handleSort('name')}
                      className="py-4 px-5 text-[10px] font-semibold uppercase tracking-widest text-ink/50 select-none cursor-pointer hover:text-seal transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Name <ArrowUpDown size={10} className="text-seal/40" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('email')}
                      className="py-4 px-5 text-[10px] font-semibold uppercase tracking-widest text-ink/50 select-none cursor-pointer hover:text-seal transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Email Address <ArrowUpDown size={10} className="text-seal/40" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('username')}
                      className="py-4 px-5 text-[10px] font-semibold uppercase tracking-widest text-ink/50 select-none cursor-pointer hover:text-seal transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Username <ArrowUpDown size={10} className="text-seal/40" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('subscribedAt')}
                      className="py-4 px-5 text-[10px] font-semibold uppercase tracking-widest text-ink/50 select-none cursor-pointer hover:text-seal transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Subscribed Date <ArrowUpDown size={10} className="text-seal/40" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule/60">
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
                      <td colSpan={4} className="py-12 text-center text-sm font-medium text-ink/40">
                        {searchQuery ? 'No matching subscribers found.' : 'No newsletter subscribers yet.'}
                      </td>
                    </tr>
                  ) : (
                    currentSubscribers.map((sub) => (
                      <tr 
                        key={sub.id} 
                        className="hover:bg-mist/10 transition-colors group"
                      >
                        <td className="py-4 px-5 text-[13.5px] font-semibold text-ink truncate max-w-[150px]">
                          {sub.name}
                        </td>
                        <td className="py-4 px-5 text-[13.5px] font-semibold text-ink/70 font-mono truncate max-w-[200px]">
                          {sub.email}
                        </td>
                        <td className="py-4 px-5 text-[13px] font-semibold text-seal">
                          <span className="bg-mist/60 px-2.5 py-1 rounded-lg">
                            @{sub.username}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-[12px] font-semibold text-ink/50">
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
              <div className="flex items-center justify-between border-t border-rule/60 pt-6 mt-6">
                <p className="text-[12px] font-semibold text-ink/40">
                  Showing <span className="font-semibold text-ink">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-semibold text-ink">{Math.min(indexOfLastItem, sortedSubscribers.length)}</span> of{' '}
                  <span className="font-semibold text-ink">{sortedSubscribers.length}</span> subscribers
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-rule rounded-xl text-ink/50 hover:bg-canvas hover:text-ink transition disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-rule rounded-xl text-ink/50 hover:bg-canvas hover:text-ink transition disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Staff List */}
          <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-10  border border-rule">
            <h4 className="text-[10px] font-semibold text-seal/60 uppercase tracking-[0.2em] mb-8">Active Administrators</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[user].map((staff, i) => (
                 <div key={i} className="flex items-center justify-between p-5 bg-canvas rounded-[var(--radius-lg)] border border-rule hover:border-seal/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={staff?.imageUrl} className="w-10 h-10 rounded-full border-2 border-white " />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-ink">{staff?.fullName || 'Root Admin'}</p>
                        <p className="text-[11px] text-seal/60 font-semibold uppercase tracking-wider">Level 1 Admin</p>
                      </div>
                    </div>
                    <Shield size={16} className="text-seal/20 group-hover:text-seal transition-colors" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        <aside className="space-y-10">
          {/* Content Safety Card */}
          <div className="bg-white rounded-[var(--radius-lg)] p-8 border border-rule  relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <Trash2 size={80} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="text-red-500/60" size={14} />
                <h2 className="text-[10px] font-semibold text-seal uppercase tracking-[0.2em]">Platform Safety</h2>
              </div>
              
              <h3 className="text-[20px] font-semibold text-ink mb-4 font-sans" >Platform <span className="text-red-600 italic font-light">Cleanup</span></h3>
              <p className="text-ink/70 text-[13px] mb-8 leading-relaxed font-semibold font-sans">
                Resets the collective community feed. All published insights, assets, and discussions will be permanently removed.
              </p>

              <button 
                onClick={clearAllMessages}
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full py-4 bg-red-50 text-red-600 border border-red-100 rounded-[var(--radius-lg)] font-semibold text-[12px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete All Messages
              </button>
            </div>
          </div>

          {/* Integration Links */}
          <div className="bg-ink rounded-[var(--radius-lg)] p-8  relative overflow-hidden group">
             <Sparkles className="absolute -top-6 -right-6 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
             <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-mist/60">System Logs</span>
             <h3 className="text-white text-[24px] font-semibold mt-2 mb-6 font-sans" >Infrastructure</h3>
             
             <div className="space-y-3 font-sans">
                <a href="https://clerk.com" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-[var(--radius-lg)] hover:bg-white/10 transition-colors group/link">
                   <span className="text-white/80 text-[13px] font-semibold">Clerk Console</span>
                   <ExternalLink size={14} className="text-white/20 group-hover/link:text-white" />
                </a>
                <a href="https://supabase.com" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-[var(--radius-lg)] hover:bg-white/10 transition-colors group/link">
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
