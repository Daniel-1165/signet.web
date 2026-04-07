'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export function SyncUser() {
  const { user, isLoaded } = useUser()
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    if (!isLoaded || !user || synced) return

    const sync = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      try {
        // We use the clerk user id as the primary key in our profiles table
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
            image_url: user.imageUrl,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' })

        if (error) {
          console.error('Error syncing user to Supabase:', error)
        } else {
          setSynced(true)
        }
      } catch (err) {
        console.error('Failed to sync user:', err)
      }
    }

    sync()
  }, [user, isLoaded, synced])

  return null
}
