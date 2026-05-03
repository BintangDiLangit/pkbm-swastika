import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.stat.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/stat failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.label || !body.value) {
      return NextResponse.json(
        { success: false, message: "Label dan value wajib diisi" },
        { status: 400 }
      );
    }
    const created = await prisma.stat.create({
      data: {
        label: body.label,
        value: body.value,
        caption: body.caption || null,
        icon: body.icon || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "Statistik ditambahkan" });
  } catch (e) {
    console.error("POST /api/stat failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah statistik" }, { status: 500 });
  }
}
