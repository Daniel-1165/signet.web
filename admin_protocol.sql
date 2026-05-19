-- Signet Admin & Owner Deletion Protocol Setup
-- Run this in your Supabase SQL Editor

-- 1. Ensure the 'role' column exists in profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. Restrict Post Deletion to Post Owners and Admins
DROP POLICY IF EXISTS "Posts can be deleted by owner and admins" ON public.posts;
CREATE POLICY "Posts can be deleted by owner and admins" 
ON public.posts 
FOR DELETE 
USING (
  (auth.jwt() ->> 'sub') = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = (auth.jwt() ->> 'sub') AND role = 'admin'
  )
);

-- 3. Restrict Comment Deletion to Comment Owners and Admins
DROP POLICY IF EXISTS "Post comments can be deleted by owner and admins" ON public.post_comments;
CREATE POLICY "Post comments can be deleted by owner and admins" 
ON public.post_comments 
FOR DELETE 
USING (
  (auth.jwt() ->> 'sub') = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = (auth.jwt() ->> 'sub') AND role = 'admin'
  )
);
