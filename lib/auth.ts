import { NextRequest } from "next/server";

/**
 * Cek apakah request berasal dari admin yang sudah login.
 * Autentikasi memakai cookie "admin_logged_in" yang di-set saat login
 * (lihat app/api/auth/login/route.ts).
 */
export function isAdminAuthenticated(request: NextRequest): boolean {
  return request.cookies.get("admin_logged_in")?.value === "true";
}
