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
    const updated = await prisma.alumniDestination.update({
      where: { id },
      data: {
        name: body.name,
        type: body.type || "kampus",
        logo: body.logo || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: updated, message: "Destinasi diupdate" });
  } catch (e) {
    console.error("PUT /api/destination/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update destinasi" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.alumniDestination.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Destinasi dihapus" });
  } catch (e) {
    console.error("DELETE /api/destination/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus destinasi" }, { status: 500 });
  }
}
