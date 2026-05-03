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
    const updated = await prisma.faq.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: updated, message: "FAQ diupdate" });
  } catch (e) {
    console.error("PUT /api/faq/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal update FAQ" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.faq.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "FAQ dihapus" });
  } catch (e) {
    console.error("DELETE /api/faq/[id] failed:", e);
    return NextResponse.json({ success: false, message: "Gagal hapus FAQ" }, { status: 500 });
  }
}
