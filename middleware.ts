import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("admin_logged_in");

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin/berita") || 
      request.nextUrl.pathname.startsWith("/admin/galeri")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (request.nextUrl.pathname === "/admin/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/berita", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
