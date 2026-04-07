---
name: clerk-supabase-nextjs
description: >
  Full setup guide for integrating Clerk (authentication) with Supabase (backend/database) in a Next.js app using the native 2025 third-party integration. Use this skill whenever the user wants to: connect Clerk auth to a Supabase project, set up Row Level Security (RLS) with Clerk user IDs, create Supabase clients that use Clerk session tokens, scaffold a Next.js app with Clerk + Supabase, or troubleshoot auth/RLS issues in this stack. Trigger even if the user just mentions "Clerk and Supabase", "auth with Supabase", or "JWT with Supabase in Next.js".
---

# Clerk + Supabase + Next.js Skill

Clerk handles **all authentication** (sign-up, sign-in, sessions, user management).  
Supabase handles the **backend** — Postgres database, storage, realtime, edge functions.  
They connect via Clerk's **native third-party auth integration** (the JWT template method is deprecated as of April 2025).

---

## High-Level Architecture

```
User Browser
  │
  ├─► Clerk (Auth)
  │     └─ Issues session token (JWT) with `role: authenticated`
  │
  └─► Next.js App
        ├─ Server Components / Route Handlers
        │     └─ createServerSupabaseClient() ← injects Clerk token
        └─ Client Components
              └─ createClerkSupabaseClient() ← injects Clerk session
                    │
                    └─► Supabase (Backend)
                          ├─ Verifies JWT via Clerk JWKS endpoint
                          ├─ RLS policies use requesting_user_id()
                          └─ Returns only rows owned by that user
```

---

## Step-by-Step Setup

### PHASE 1 — Dashboard Configuration (No code yet)

**Step 1: Connect Clerk to Supabase (native integration)**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → your app → **Integrations**
2. Find Supabase and click **"Connect with Supabase"**
3. This auto-adds `role: authenticated` to your Clerk session tokens ✅

**Step 2: Add Clerk as Third-Party Auth in Supabase**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. Navigate to **Authentication → Sign In / Sign Up → Third Party Auth**
3. Click **Add Provider → Clerk**
4. Paste your **Clerk Domain** (found in Clerk Dashboard → API Keys)
5. Click **Create Connection** ✅

> ⚠️ Do NOT enable Supabase's own Auth — Clerk replaces it entirely.

---

### PHASE 2 — Project Setup

**Install dependencies:**

```bash
npm install @clerk/nextjs @supabase/supabase-js
```

**Environment variables (`.env.local`):**

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

> 🔒 Never expose `CLERK_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to the client.

---

### PHASE 3 — Middleware

Create `middleware.ts` at the root of your project:

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
```

---

### PHASE 4 — Supabase Client Helpers

#### Server-Side Client (Server Components, Route Handlers, Server Actions)

```ts
// lib/supabase/server.ts
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken()
      },
    }
  )
}
```

#### Client-Side Client (Client Components with `'use client'`)

```ts
// lib/supabase/client.ts
'use client'
import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { useMemo } from 'react'

export function useSupabaseClient() {
  const { session } = useSession()

  return useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null
        },
      }
    )
  }, [session])
}
```

---

### PHASE 5 — Row Level Security (RLS)

Run these SQL statements in the **Supabase SQL Editor**.

**Step 1: Create the `requesting_user_id()` helper function**

```sql
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$ LANGUAGE SQL STABLE;
```

This extracts the Clerk user ID (the `sub` claim) from every request's JWT.

**Step 2: Add `user_id` column to your table**

```sql
ALTER TABLE your_table
ADD COLUMN user_id TEXT NOT NULL DEFAULT requesting_user_id();
```

**Step 3: Enable RLS and create policies**

```sql
-- Enable RLS
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- SELECT: users can only read their own rows
CREATE POLICY "Users can read own rows"
ON your_table FOR SELECT
USING (user_id = requesting_user_id());

-- INSERT: user_id is auto-set to Clerk user
CREATE POLICY "Users can insert own rows"
ON your_table FOR INSERT
WITH CHECK (user_id = requesting_user_id());

-- UPDATE: users can only update their own rows
CREATE POLICY "Users can update own rows"
ON your_table FOR UPDATE
USING (user_id = requesting_user_id());

-- DELETE: users can only delete their own rows
CREATE POLICY "Users can delete own rows"
ON your_table FOR DELETE
USING (user_id = requesting_user_id());
```

---

### PHASE 6 — Usage Examples

See `references/usage-examples.md` for:
- Server Component data fetching
- Client Component with hooks
- Server Action (form submission)
- Route Handler (API endpoint)
- Webhook to sync Clerk users → Supabase `profiles` table

---

## Common Gotchas

| Problem | Cause | Fix |
+|---|---|---|
+| `JWT expired` errors | Old JWT template still active | Delete old JWT template in Clerk Dashboard |
+| RLS blocks all rows | `requesting_user_id()` returns null | Make sure Clerk native integration is connected in both dashboards |
+| `role: authenticated` missing | Native integration not enabled | Re-run Connect with Supabase in Clerk Dashboard |
+| Client gets no data | Using server client in `'use client'` | Use `useSupabaseClient()` hook instead |
+| Supabase auth.uid() is null | That's expected — Clerk replaces it | Always use `requesting_user_id()` in RLS policies |

---

## Syncing Users to Supabase (Optional but Recommended)

If you want a `profiles` table that mirrors Clerk users, use a **Clerk Webhook**:

1. In Clerk Dashboard → **Webhooks** → Add endpoint
2. Point to `/api/webhooks/clerk` in your Next.js app
3. Subscribe to: `user.created`, `user.updated`, `user.deleted`

See `references/usage-examples.md` → **Webhook Handler** section for the full implementation.

---

## Quick Reference

| What | Where |
+|---|---|
+| Clerk Dashboard | dashboard.clerk.com |
+| Supabase Dashboard | supabase.com/dashboard |
+| Clerk Docs for Supabase | clerk.com/docs → Integrations → Supabase |
+| Supabase Docs for Clerk | supabase.com/docs/guides/auth/third-party/clerk |
+| Official example repo | github.com/clerk/clerk-supabase-nextjs | 