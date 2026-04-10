-- Community System Schema - Posts, Likes, Comments

CREATE TABLE IF NOT EXISTS public.community_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  author_name text NOT NULL,
  author_avatar text,
  content text NOT NULL,
  image_url text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- likes table
CREATE TABLE IF NOT EXISTS public.community_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- comments table
CREATE TABLE IF NOT EXISTS public.community_comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  author_name text NOT NULL,
  author_avatar text,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Function to increment likes
CREATE OR REPLACE FUNCTION increment_post_likes(post_id_val uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.community_posts SET likes_count = likes_count + 1 WHERE id = post_id_val;
END;
$$;

-- Function to decrement likes
CREATE OR REPLACE FUNCTION decrement_post_likes(post_id_val uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.community_posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = post_id_val;
END;
$$;
