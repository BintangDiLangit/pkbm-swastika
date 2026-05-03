import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.recognition.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/recognition failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, message: "Title wajib diisi" }, { status: 400 });
    }
    const created = await prisma.recognition.create({
      data: {
        title: body.title,
        issuer: body.issuer || null,
        description: body.description || null,
        logo: body.logo || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "Recognition ditambahkan" });
  } catch (e) {
    console.error("POST /api/recognition failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah recognition" }, { status: 500 });
  }
}
