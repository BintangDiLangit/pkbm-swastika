import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.quickLink.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/quick-link failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.label || !body.href) {
      return NextResponse.json(
        { success: false, message: "Label dan href wajib diisi" },
        { status: 400 }
      );
    }
    const created = await prisma.quickLink.create({
      data: {
        label: body.label,
        href: body.href,
        icon: body.icon || null,
        external: !!body.external,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "Quick link ditambahkan" });
  } catch (e) {
    console.error("POST /api/quick-link failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah quick link" }, { status: 500 });
  }
}
