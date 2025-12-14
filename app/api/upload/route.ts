import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

// Validasi tipe file yang diizinkan
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string || "general"; // berita, galeri, atau general

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file yang diupload" },
        { status: 400 }
      );
    }

    // Validasi tipe file
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Tipe file tidak valid. Hanya gambar (JPEG, PNG, GIF, WebP) yang diizinkan." },
        { status: 400 }
      );
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = path.extname(file.name);
    const fileName = `${timestamp}-${randomString}${fileExtension}`;

    // Tentukan folder upload berdasarkan category
    const uploadFolder = path.join(process.cwd(), "public", "uploads", category);
    const filePath = path.join(uploadFolder, fileName);

    // Buat folder jika belum ada
    if (!existsSync(uploadFolder)) {
      await mkdir(uploadFolder, { recursive: true });
    }

    // Convert file to buffer dan simpan
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Generate URL untuk akses file
    const fileUrl = `/uploads/${category}/${fileName}`;

    console.log("File uploaded successfully:", fileUrl);

    return NextResponse.json({
      success: true,
      message: "File berhasil diupload",
      url: fileUrl,
      fileName: fileName,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengupload file" },
      { status: 500 }
    );
  }
}
