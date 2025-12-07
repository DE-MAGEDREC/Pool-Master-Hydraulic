import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // ❗ autoriser Next.js assets (NE PAS BLOQUER ces routes)
  const publicFiles = [
    "/favicon.ico",
    "/manifest.json",
    "/icon.png",
    "/logo.png",
    "/_next",
    "/assets",
  ];

  if (publicFiles.some((p) => req.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Routes protégées
  if (req.nextUrl.pathname.startsWith("/calculator")) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/auth/login";
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// IMPORTANT : seul /calculator est protégé
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
