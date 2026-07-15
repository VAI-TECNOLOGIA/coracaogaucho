import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verificarSessao } from "@/lib/session";

/**
 * Protege todo o /admin (exceto /admin/login). Sem sessão válida → redireciona ao login.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const sessao = token ? await verificarSessao(token) : null;

  if (!sessao && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (sessao && isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
