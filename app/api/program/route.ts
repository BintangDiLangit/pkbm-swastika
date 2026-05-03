import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.program.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/program failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.code || !body.title || !body.description) {
      return NextResponse.json(
        { success: false, message: "Code, title, dan description wajib diisi" },
        { status: 400 }
      );
    }
    const created = await prisma.program.create({
      data: {
        code: body.code,
        title: body.title,
        subtitle: body.subtitle || null,
        description: body.description,
        features: Array.isArray(body.features) ? body.features : [],
        image: body.image || null,
        duration: body.duration || null,
        badge: body.badge || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "Program berhasil ditambahkan" });
  } catch (e) {
    console.error("POST /api/program failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah program" }, { status: 500 });
  }
}
