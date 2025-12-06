
Pool Hydraulics App - Email+Password Auth (Supabase)

What I added/changed:
- lib/supabase/client.ts   (singleton getSupabase)
- app/auth/login/page.tsx   (login form - signInWithPassword)
- app/auth/sign-up/page.tsx (signup form - signUp)
- app/auth/logout/page.tsx  (logout)
- app/calculator/page.tsx   (protected example page)

After deploying on Vercel:
1) Set environment variables in Vercel:
   NEXT_PUBLIC_SUPABASE_URL = https://<your-project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <anon public key>

2) (Optional) In Supabase dashboard, add redirect URL(s) if you use callback flows.

3) Redeploy your Vercel project. Then visit /auth/sign-up to create an account and /auth/login to sign in.
