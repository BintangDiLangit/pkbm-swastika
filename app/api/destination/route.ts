import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.alumniDestination.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/destination failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, message: "Nama wajib diisi" }, { status: 400 });
    }
    const created = await prisma.alumniDestination.create({
      data: {
        name: body.name,
        type: body.type || "kampus",
        logo: body.logo || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "Destinasi ditambahkan" });
  } catch (e) {
    console.error("POST /api/destination failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah destinasi" }, { status: 500 });
  }
}
