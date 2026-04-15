-- Signet Supabase Setup Script (2025 Native Clerk Integration)
-- Run this in the SQL Editor of your Supabase Dashboard

-- 1. Profiles Table (Mirrors Clerk Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Chat Rooms
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  type TEXT DEFAULT 'group', -- 'direct' or 'group'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Room Members
CREATE TABLE IF NOT EXISTS public.room_members (
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (room_id, user_id)
);

-- 4. Messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Community Posts
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Post Reactions (likes, etc.)
CREATE TABLE IF NOT EXISTS public.post_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction_type TEXT DEFAULT 'like', -- 'like', 'love', 'laugh', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(post_id, user_id, reaction_type)
);

-- 7. Post Comments
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- 6. Row Level Security Policies

-- Note: Because SyncUser.tsx synchronizes anonymously from the frontend client currently, 
-- we allow unrestricted INSERT/UPDATE for profiles. In a production setting, 
-- use Webhooks or Clerk JWT template validation instead.

-- Profiles: Anyone can read, insert and update profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Enable insert for profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for profiles" ON public.profiles FOR UPDATE USING (true);

-- Rooms: Anyone can view or insert during prototype phase
CREATE POLICY "Rooms are viewable by everyone" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Rooms can be created by everyone" ON public.rooms FOR INSERT WITH CHECK (true);

-- Room Members: Anyone can view or insert
CREATE POLICY "Room members are viewable by everyone" ON public.room_members FOR SELECT USING (true);
CREATE POLICY "Members can be inserted by everyone" ON public.room_members FOR INSERT WITH CHECK (true);

-- Messages: Anyone can view and send messages
CREATE POLICY "Messages are viewable by everyone" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Messages can be inserted by everyone" ON public.messages FOR INSERT WITH CHECK (true);

-- Posts: Anyone can read, create, update, delete
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Posts can be created by everyone" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Posts can be updated by everyone" ON public.posts FOR UPDATE USING (true);
CREATE POLICY "Posts can be deleted by everyone" ON public.posts FOR DELETE USING (true);

-- Post Reactions: Anyone can read, create, delete
CREATE POLICY "Post reactions are viewable by everyone" ON public.post_reactions FOR SELECT USING (true);
CREATE POLICY "Post reactions can be created by everyone" ON public.post_reactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Post reactions can be deleted by everyone" ON public.post_reactions FOR DELETE USING (true);

-- Post Comments: Anyone can read, create, update, delete
CREATE POLICY "Post comments are viewable by everyone" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Post comments can be created by everyone" ON public.post_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Post comments can be updated by everyone" ON public.post_comments FOR UPDATE USING (true);
CREATE POLICY "Post comments can be deleted by everyone" ON public.post_comments FOR DELETE USING (true);

-- 7. Initialize Global Room
INSERT INTO public.rooms (name, type) VALUES ('Global Collective', 'group') ON CONFLICT DO NOTHING;

-- 8. Create Storage Bucket for Post Images
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true) ON CONFLICT DO NOTHING;

-- 9. Storage Policies for Post Images
CREATE POLICY "Post images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'post-images');
CREATE POLICY "Users can upload post images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'post-images');
CREATE POLICY "Users can update their own post images" ON storage.objects FOR UPDATE USING (bucket_id = 'post-images');
-- 10. Increment Post Likes Function
CREATE OR REPLACE FUNCTION public.increment_post_likes(post_id_val UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts
  SET likes_count = COALESCE(likes_count, 0) + 1
  WHERE id = post_id_val;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

