import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/testimonial failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.quote) {
      return NextResponse.json(
        { success: false, message: "Nama dan kutipan wajib diisi" },
        { status: 400 }
      );
    }
    const created = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role || null,
        quote: body.quote,
        avatar: body.avatar || null,
        rating: typeof body.rating === "number" ? body.rating : 5,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "Testimoni ditambahkan" });
  } catch (e) {
    console.error("POST /api/testimonial failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah testimoni" }, { status: 500 });
  }
}
