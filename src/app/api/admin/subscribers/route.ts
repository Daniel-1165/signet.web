import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { client } from '@/lib/sanity/client';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Verify user is logged in
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Query Supabase to verify admin role
    const supabase = createServerSupabaseClient();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 3. Fetch subscribers from Sanity (with no-store tag to prevent caching subscriber list)
    const subscribers = await client.fetch(
      `*[_type == "newsletterSubscription"] | order(subscribedAt desc)`,
      {},
      { cache: 'no-store' }
    );

    // 4. Fetch all profiles from Supabase to match emails
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('email, first_name, last_name, id');

    if (profilesError) {
      console.error('Error fetching profiles from Supabase:', profilesError);
    }

    // 5. Combine and construct usernames
    const merged = subscribers.map((sub: any) => {
      // Find matching profile by email (case-insensitive)
      const matchedProfile = profiles?.find(
        (p: any) => p.email?.toLowerCase() === sub.email?.toLowerCase()
      );

      // Construct a clean username:
      // If there's a profile, construct one from first and last name, or fallback.
      // Otherwise, fallback to the email username prefix.
      let username = 'N/A';
      if (matchedProfile) {
        if (matchedProfile.first_name) {
          const first = matchedProfile.first_name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
          const last = matchedProfile.last_name ? matchedProfile.last_name.toLowerCase().trim().replace(/[^a-z0-9]/g, '') : '';
          username = last ? `${first}_${last}` : first;
        } else {
          username = matchedProfile.email ? matchedProfile.email.split('@')[0] : 'user_' + matchedProfile.id.substring(0, 5);
        }
      } else if (sub.email) {
        username = sub.email.split('@')[0];
      }

      return {
        id: sub._id,
        name: sub.name || 'Anonymous Subscriber',
        email: sub.email,
        username: username,
        subscribedAt: sub.subscribedAt || sub._createdAt || new Date().toISOString(),
      };
    });

    return NextResponse.json({ subscribers: merged });

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
