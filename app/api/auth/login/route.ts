import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_FILE = path.join(process.cwd(), "data", "admin.json");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    // Read admin credentials
    const adminData = JSON.parse(fs.readFileSync(ADMIN_FILE, "utf-8"));
    
    if (username === adminData.username && password === adminData.password) {
      const response = NextResponse.json({
        success: true,
        message: "Login berhasil",
      });
      
      // Set cookie for authentication
      response.cookies.set("admin_logged_in", "true", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Username atau password salah" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal login" },
      { status: 500 }
    );
  }
}
