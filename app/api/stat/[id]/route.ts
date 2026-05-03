import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await prisma.stat.update({
      where: { id },
      data: {
        label: body.label,
        value: body.value,
        caption: body.caption || null,
        icon: body.icon || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: updated, message: "Statistik diupdate" });
  } catch (e) {
    console.error("PUT /api/stat/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update statistik" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.stat.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Statistik dihapus" });
  } catch (e) {
    console.error("DELETE /api/stat/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus statistik" }, { status: 500 });
  }
}
