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
    const updated = await prisma.recognition.update({
      where: { id },
      data: {
        title: body.title,
        issuer: body.issuer || null,
        description: body.description || null,
        logo: body.logo || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: updated, message: "Recognition diupdate" });
  } catch (e) {
    console.error("PUT /api/recognition/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update recognition" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.recognition.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Recognition dihapus" });
  } catch (e) {
    console.error("DELETE /api/recognition/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus recognition" }, { status: 500 });
  }
}
