import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Menyajikan file dari tabel media. Isi file tidak pernah berubah untuk id yang sama
// (ganti gambar = upload baru = id baru), jadi aman di-cache browser selamanya.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const media = await prisma.media.findUnique({
      where: { id },
      select: { data: true, mimeType: true, fileName: true },
    });
    if (!media) {
      return NextResponse.json({ success: false, message: "File tidak ditemukan" }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(media.data), {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": String(media.data.length),
        "Content-Disposition": `inline; filename="${encodeURIComponent(media.fileName)}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    // id bukan UUID valid juga berakhir di sini
    console.error("GET /api/media/[id] failed:", error);
    return NextResponse.json({ success: false, message: "File tidak ditemukan" }, { status: 404 });
  }
}
