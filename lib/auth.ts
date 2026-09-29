import { NextRequest, NextResponse } from "next/server";

/**
 * Cek apakah request berasal dari admin yang sudah login.
 * Autentikasi memakai cookie "admin_logged_in" yang di-set saat login
 * (lihat app/api/auth/login/route.ts).
 */
export function isAdminAuthenticated(request: NextRequest): boolean {
  return request.cookies.get("admin_logged_in")?.value === "true";
}

/** Untuk route API: kembalikan respons 401 bila belum login, atau null bila boleh lanjut. */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (isAdminAuthenticated(request)) return null;
  return NextResponse.json({ success: false, message: "Silakan login sebagai admin" }, { status: 401 });
}
