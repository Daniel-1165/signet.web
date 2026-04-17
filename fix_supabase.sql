-- Fix Schema Cache and Foreign Key Relationships
ALTER TABLE public.posts 
  DROP CONSTRAINT IF EXISTS posts_user_id_fkey;
ALTER TABLE public.posts 
  ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.post_comments 
  DROP CONSTRAINT IF EXISTS post_comments_user_id_fkey;
ALTER TABLE public.post_comments 
  ADD CONSTRAINT post_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Reload Schema Cache so Supabase PostgREST API recognizes the relationships
NOTIFY pgrst, reload_schema;

-- Fix the Admin Protocol (Type casting auth.uid()::text)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

DROP POLICY IF EXISTS "Posts can be deleted by everyone" ON public.posts;
DROP POLICY IF EXISTS "Posts can be deleted by owner and admins" ON public.posts;

CREATE POLICY "Posts can be deleted by owner and admins" 
ON public.posts 
FOR DELETE 
USING (
  auth.uid()::text = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid()::text AND role = 'admin'
  )
);

DROP POLICY IF EXISTS "Post comments can be deleted by everyone" ON public.post_comments;
DROP POLICY IF EXISTS "Post comments can be deleted by owner and admins" ON public.post_comments;

CREATE POLICY "Post comments can be deleted by owner and admins" 
ON public.post_comments 
FOR DELETE 
USING (
  auth.uid()::text = user_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid()::text AND role = 'admin'
  )
);
