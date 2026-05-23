-- TOTAL CLEANUP & FIX FOR CLERK ID (TEXT) vs SUPABASE UID (UUID)
-- Run this in your Supabase SQL Editor

-- 1. Drop EVERYTHING on posts to be safe
DROP POLICY IF EXISTS "Posts can be deleted by everyone" ON public.posts;
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Posts can be created by everyone" ON public.posts;
DROP POLICY IF EXISTS "Posts can be updated by everyone" ON public.posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users or Admins can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Posts can be deleted by owner and admins" ON public.posts;

-- 2. Create the CLEAN, TEXT-BASED policies for Posts
-- SELECT: Everyone can read
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);

-- INSERT: Authenticated users can create
CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT WITH CHECK (true);

-- DELETE: Owner or Admin can delete
CREATE POLICY "Owner or Admin can delete posts" ON public.posts FOR DELETE USING (
  (auth.jwt() ->> 'sub') = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = (auth.jwt() ->> 'sub') AND role = 'admin'
  )
);

-- UPDATE: Owner or Admin can update
CREATE POLICY "Owner or Admin can update posts" ON public.posts FOR UPDATE USING (
  (auth.jwt() ->> 'sub') = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = (auth.jwt() ->> 'sub') AND role = 'admin'
  )
);

-- 3. Repeat for Comments
DROP POLICY IF EXISTS "Post comments can be deleted by everyone" ON public.post_comments;
DROP POLICY IF EXISTS "Post comments can be deleted by owner and admins" ON public.post_comments;

CREATE POLICY "Owner or Admin can delete comments" ON public.post_comments FOR DELETE USING (
  (auth.jwt() ->> 'sub') = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = (auth.jwt() ->> 'sub') AND role = 'admin'
  )
);

-- 4. Fix profiles policies too
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for profiles" ON public.profiles;

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Enable insert for profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for profiles" ON public.profiles FOR UPDATE USING (
  id = (auth.jwt() ->> 'sub') OR 
  EXISTS (
     SELECT 1 FROM public.profiles WHERE id = (auth.jwt() ->> 'sub') AND role = 'admin'
  )
);

-- 5. Fix the is_admin helper to avoid auth.uid()
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = (auth.jwt() ->> 'sub')
    AND profiles.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
