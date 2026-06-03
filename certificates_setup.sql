-- 1. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  course_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone (public) to view/read certificates
DROP POLICY IF EXISTS "Allow public read-only access to certificates" ON public.certificates;
CREATE POLICY "Allow public read-only access to certificates" ON public.certificates
  FOR SELECT USING (true);

-- 4. Policy: Allow only admins to manage certificates (insert/update/delete)
DROP POLICY IF EXISTS "Allow admins to manage certificates" ON public.certificates;
CREATE POLICY "Allow admins to manage certificates" ON public.certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = (auth.jwt() ->> 'sub')
      AND public.profiles.role = 'admin'
    )
  );
