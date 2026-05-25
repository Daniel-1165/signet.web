import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { client } from '@/lib/sanity/client';

interface SubscribeRequest {
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verify user is logged in via Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'You must be signed in to subscribe.' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body: SubscribeRequest = await request.json();
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Missing subscriber name or email.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // 3. Check for existing subscription to avoid duplicates
    const existing = await client.fetch(
      `*[_type == "newsletterSubscription" && email == $email][0]`,
      { email: body.email }
    );

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to the newsletter!',
      });
    }

    // 4. Create new subscription document in Sanity
    const doc = {
      _type: 'newsletterSubscription',
      name: body.name,
      email: body.email,
      subscribedAt: new Date().toISOString(),
    };

    const result = await client.create(doc);

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully in silence!',
      id: result._id,
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
