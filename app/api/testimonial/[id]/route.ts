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
    const updated = await prisma.testimonial.update({
      where: { id },
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
    return NextResponse.json({ success: true, data: updated, message: "Testimoni diupdate" });
  } catch (e) {
    console.error("PUT /api/testimonial/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update testimoni" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Testimoni dihapus" });
  } catch (e) {
    console.error("DELETE /api/testimonial/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus testimoni" }, { status: 500 });
  }
}
