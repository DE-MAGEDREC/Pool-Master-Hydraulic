import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Récupérer la session
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  // Protéger seulement /calculator
  if (req.nextUrl.pathname.startsWith("/calculator") && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// IMPORTANT : exclure tous les fichiers statiques, ET manifest.json
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|icon|manifest.json|.*\\..*).*)",
  ],
};
