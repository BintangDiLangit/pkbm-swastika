import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.siteSetting.findMany();
    const data: Record<string, string> = {};
    for (const r of rows) data[r.key] = r.value;
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/site-setting failed:", e);
    return NextResponse.json({ success: false, message: "Gagal mengambil data" }, { status: 500 });
  }
}

// Bulk update by key→value map
export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const entries = Object.entries(body || {});
    if (!entries.length) {
      return NextResponse.json({ success: false, message: "Tidak ada perubahan" }, { status: 400 });
    }
    for (const [key, value] of entries) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value ?? "") },
        create: { key, value: String(value ?? "") },
      });
    }
    return NextResponse.json({ success: true, message: "Pengaturan berhasil disimpan" });
  } catch (e) {
    console.error("PUT /api/site-setting failed:", e);
    return NextResponse.json({ success: false, message: "Gagal simpan pengaturan" }, { status: 500 });
  }
}
