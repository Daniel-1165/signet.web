import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId } = await params;
    const supabase = createServerSupabaseClient();
    const { reaction_type = 'like' } = await request.json();

    // Check if reaction already exists
    const { data: existingReaction } = await supabase
      .from('post_reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .eq('reaction_type', reaction_type)
      .single();

    if (existingReaction) {
      // Remove reaction if it exists
      const { error } = await supabase
        .from('post_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId)
        .eq('reaction_type', reaction_type);

      if (error) {
        console.error('Error removing reaction:', error);
        return NextResponse.json({ error: 'Failed to remove reaction' }, { status: 500 });
      }

      return NextResponse.json({ action: 'removed' });
    } else {
      // Add reaction
      const { error } = await supabase
        .from('post_reactions')
        .insert({
          post_id: postId,
          user_id: userId,
          reaction_type
        });

      if (error) {
        console.error('Error adding reaction:', error);
        return NextResponse.json({ error: 'Failed to add reaction' }, { status: 500 });
      }

      return NextResponse.json({ action: 'added' });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}