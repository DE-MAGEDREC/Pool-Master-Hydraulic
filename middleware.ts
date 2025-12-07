import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Ignore static assets
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/favicon") ||
    req.nextUrl.pathname.startsWith("/manifest") ||
    req.nextUrl.pathname.startsWith("/icons") ||
    req.nextUrl.pathname.match(/\.(png|jpg|jpeg|svg|ico|json|txt|xml|webp)$/)
  ) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (req.nextUrl.pathname.startsWith("/calculator") && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|.*\\..*).*)",
  ],
};
