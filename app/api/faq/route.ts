import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/faq failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.question || !body.answer) {
      return NextResponse.json(
        { success: false, message: "Pertanyaan dan jawaban wajib diisi" },
        { status: 400 }
      );
    }
    const created = await prisma.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category || null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ success: true, data: created, message: "FAQ ditambahkan" });
  } catch (e) {
    console.error("POST /api/faq failed:", e);
    return NextResponse.json({ success: false, message: "Gagal menambah FAQ" }, { status: 500 });
  }
}
