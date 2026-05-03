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
    const updated = await prisma.program.update({
      where: { id },
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
    return NextResponse.json({ success: true, data: updated, message: "Program berhasil diupdate" });
  } catch (e) {
    console.error("PUT /api/program/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update program" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.program.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Program berhasil dihapus" });
  } catch (e) {
    console.error("DELETE /api/program/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus program" }, { status: 500 });
  }
}
