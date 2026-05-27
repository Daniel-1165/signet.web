'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Signet Network',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setSubmitStatus('success')

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      })

    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#EDEDED] p-8 md:p-12 shadow-sm relative overflow-hidden font-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2 font-sans">
          Send Us a Message
        </h2>
        <p className="text-[#0F172A]/60 text-sm font-sans font-medium">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-[#EAF4EC]/50 border border-[#1E6B3A]/20 rounded-2xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#1E6B3A] flex-shrink-0" />
          <p className="text-[#1E6B3A] text-sm font-sans font-semibold">
            Message sent successfully! We'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm font-sans font-semibold">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#0F172A] mb-2 font-sans">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#EDEDED] rounded-xl focus:border-[#1E6B3A] focus:outline-none transition-colors text-[#0F172A] font-sans font-medium"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#0F172A] mb-2 font-sans">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#EDEDED] rounded-xl focus:border-[#1E6B3A] focus:outline-none transition-colors text-[#0F172A] font-sans font-medium"
            placeholder="your.email@example.com"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-[#0F172A] mb-2 font-sans">
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#EDEDED] rounded-xl focus:border-[#1E6B3A] focus:outline-none transition-colors resize-y text-[#0F172A] font-sans font-medium"
            placeholder="Please provide details about your inquiry..."
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1E6B3A] hover:bg-[#114B2A] text-white font-bold py-4 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-[#1E6B3A]/10 font-sans uppercase text-xs tracking-wider"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#0F172A]/50 text-center font-sans font-medium">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}