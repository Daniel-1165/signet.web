-- 1. QUICK SCRIPT TO MAKE YOURSELF ADMIN BY EMAIL
-- Run this block in your Supabase SQL Editor.
-- REPLACE 'your.email@example.com' with your actual account email.

UPDATE public.profiles
SET role = 'admin'
WHERE first_name ILIKE '%Daniel%' OR first_name ILIKE '%Ebuka%';

-- =========================================================================

-- 2. Ensure the profiles table has a role column
-- This allows us to distinguish between 'member' and 'admin' users.
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'member';
    END IF;
END $$;

-- 3. Update RLS policies for the posts table
-- This allows admins to delete ANY post, and owners to delete THEIR OWN posts.

-- First, drop the existing delete policy if it exists
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;
DROP POLICY IF EXISTS "Users or Admins can delete posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own messages" ON messages;
DROP POLICY IF EXISTS "Users or Admins can delete messages" ON messages;

-- Create the new enhanced delete policy
CREATE POLICY "Users or Admins can delete posts" ON posts
FOR DELETE
USING (
  (auth.jwt() ->> 'sub') = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE public.profiles.id = (auth.jwt() ->> 'sub')
    AND public.profiles.role = 'admin'
  )
);

-- 4. Enable RLS on posts if not already enabled
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 5. Helper function to check if current user is admin (optional utility)
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

-- 6. Helper to promote user by email (if email column exists in profiles)
-- If you don't have an email column in profiles, you'll need the user's ID.
-- UPDATE profiles SET role = 'admin' WHERE email = 'user@example.com';

-- 7. Ensure everyone has a role if they don't already
UPDATE profiles SET role = 'member' WHERE role IS NULL;

-- 8. Add a "Search User" and "Update Role" capability for the Admin Page
-- This function allows the Admin Page to promote users securely using Clerk/Supabase architecture
CREATE OR REPLACE FUNCTION promote_to_admin(admin_id TEXT, target_user TEXT)
RETURNS VOID AS $$
BEGIN
  -- Security: verify caller holds admin status
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = admin_id AND role = 'admin') THEN
     RAISE EXCEPTION 'Not authorized. Only existing admins can promote members.';
  END IF;

  UPDATE public.profiles 
  SET role = 'admin' 
  WHERE id = target_user 
     OR first_name || ' ' || last_name ILIKE '%' || target_user || '%';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
