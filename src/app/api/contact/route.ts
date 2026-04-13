import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
  preferredContact: 'email' | 'whatsapp' | 'phone'
  urgency: 'low' | 'medium' | 'high'
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Insert contact form data
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        category: body.category,
        message: body.message,
        preferred_contact: body.preferredContact,
        urgency: body.urgency,
        submitted_at: new Date().toISOString(),
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save contact submission' },
        { status: 500 }
      )
    }

    // Here you could also send an email notification, create a ticket in your support system, etc.

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: data.id
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}