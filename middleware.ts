import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // CRITIQUE : ignorer tous les assets, manifest, images, favicons, fonts, etc.
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/favicon") ||
    req.nextUrl.pathname.startsWith("/manifest") ||
    req.nextUrl.pathname.startsWith("/icons") ||
    req.nextUrl.pathname.startsWith("/images") ||
    req.nextUrl.pathname.match(/\.(png|jpg|jpeg|svg|ico|json|txt|xml)$/)
  ) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  // Protection uniquement pour /calculator
  if (req.nextUrl.pathname.startsWith("/calculator") && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Nouveau matcher CORRECT
export const config = {
  matcher: [
    // n'intercepte que les routes pages, PAS les assets !
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\..*).*)",
  ],
};
