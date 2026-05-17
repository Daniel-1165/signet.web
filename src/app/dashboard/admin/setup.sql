-- 1. Ensure the profiles table has a role column
-- This allows us to distinguish between 'member' and 'admin' users.
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'member';
    END IF;
END $$;

-- 2. Promote a specific user to Admin
-- REPLACE 'YOUR_USER_ID' with the actual user ID from Clerk/Supabase
-- UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';

-- 3. Update RLS policies for the messages table
-- This allows admins to delete ANY message, and owners to delete THEIR OWN messages.

-- First, drop the existing delete policy if it exists
DROP POLICY IF EXISTS "Users can delete their own messages" ON messages;

-- Create the new enhanced delete policy
CREATE POLICY "Users or Admins can delete messages" ON messages
FOR DELETE
USING (
  auth.uid()::text = user_id OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid()::text 
    AND profiles.role = 'admin'
  )
);

-- 4. Enable RLS on messages if not already enabled
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 5. Helper function to check if current user is admin (optional utility)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()::text
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
-- This function allows the Admin Page to promote users safely.
CREATE OR REPLACE FUNCTION promote_to_admin(user_email_or_id TEXT)
RETURNS VOID AS $$
BEGIN
  -- This is a simple update. In a real app, you might want more checks.
  UPDATE profiles 
  SET role = 'admin' 
  WHERE id = user_email_or_id OR first_name || ' ' || last_name ILIKE '%' || user_email_or_id || '%';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
