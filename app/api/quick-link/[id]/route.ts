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
    const updated = await prisma.quickLink.update({
      where: { id },
      data: {
        label: body.label,
        href: body.href,
        icon: body.icon || null,
        external: !!body.external,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: updated, message: "Quick link diupdate" });
  } catch (e) {
    console.error("PUT /api/quick-link/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update quick link" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.quickLink.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Quick link dihapus" });
  } catch (e) {
    console.error("DELETE /api/quick-link/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus quick link" }, { status: 500 });
  }
}
