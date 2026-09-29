import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { mediaUrl } from "@/lib/media";

export const runtime = "nodejs";

// Validasi tipe file yang diizinkan (gambar atau PDF untuk berkas dokumen)
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "application/pdf"];
// File disimpan di database, jadi dibatasi agar tabel tidak cepat membengkak
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = (formData.get("category") as string) || "general"; // berita, galeri, atau general

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file yang diupload" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Tipe file tidak valid. Hanya gambar (JPEG, PNG, GIF, WebP) atau PDF yang diizinkan." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
        { status: 400 }
      );
    }

    const media = await prisma.media.create({
      data: {
        fileName: file.name.slice(0, 255),
        mimeType: file.type,
        size: file.size,
        category: category.slice(0, 50),
        data: Buffer.from(await file.arrayBuffer()),
      },
      select: { id: true },
    });

    return NextResponse.json({
      success: true,
      message: "File berhasil diupload",
      url: mediaUrl(media.id),
      fileName: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupload file" },
      { status: 500 }
    );
  }
}
