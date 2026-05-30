import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Validation constants - batasan karakter untuk setiap field
const VALIDATION_LIMITS = {
  nama: { min: 3, max: 100 },
  email: { min: 5, max: 100 },
  telepon: { min: 10, max: 20 },
  paket: { max: 50 },
  alamat: { min: 10, max: 500 },
  pendidikanTerakhir: { max: 50 },
  pekerjaan: { max: 100 },
  motivasi: { max: 1000 },
};

// Helper function untuk validasi email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function untuk validasi telepon (format Indonesia)
function isValidPhone(phone: string): boolean {
  // Format: 08xx atau 628xx (dengan atau tanpa +)
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// POST - Submit pendaftaran baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi required fields
    const requiredFields = ["nama", "email", "telepon", "paket", "alamat", "tanggalLahir"];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === "string" && body[field].trim() === "")) {
        return NextResponse.json(
          { success: false, message: `Field ${field} harus diisi` },
          { status: 400 }
        );
      }
    }

    // Validasi panjang karakter - Nama
    if (body.nama.length < VALIDATION_LIMITS.nama.min) {
      return NextResponse.json(
        { success: false, message: `Nama minimal ${VALIDATION_LIMITS.nama.min} karakter` },
        { status: 400 }
      );
    }
    if (body.nama.length > VALIDATION_LIMITS.nama.max) {
      return NextResponse.json(
        { success: false, message: `Nama maksimal ${VALIDATION_LIMITS.nama.max} karakter` },
        { status: 400 }
      );
    }

    // Validasi email
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }
    if (body.email.length < VALIDATION_LIMITS.email.min || body.email.length > VALIDATION_LIMITS.email.max) {
      return NextResponse.json(
        { success: false, message: `Email harus antara ${VALIDATION_LIMITS.email.min}-${VALIDATION_LIMITS.email.max} karakter` },
        { status: 400 }
      );
    }

    // Validasi telepon
    if (!isValidPhone(body.telepon)) {
      return NextResponse.json(
        { success: false, message: "Format nomor telepon tidak valid. Gunakan format Indonesia (08xx atau 628xx)" },
        { status: 400 }
      );
    }
    if (body.telepon.length < VALIDATION_LIMITS.telepon.min || body.telepon.length > VALIDATION_LIMITS.telepon.max) {
      return NextResponse.json(
        { success: false, message: `Nomor telepon harus antara ${VALIDATION_LIMITS.telepon.min}-${VALIDATION_LIMITS.telepon.max} karakter` },
        { status: 400 }
      );
    }

    // Validasi paket
    const validPaket = ["paket-a", "paket-b", "paket-c"];
    if (!validPaket.includes(body.paket)) {
      return NextResponse.json(
        { success: false, message: "Pilihan program tidak valid" },
        { status: 400 }
      );
    }

    // Validasi alamat
    if (body.alamat.length < VALIDATION_LIMITS.alamat.min) {
      return NextResponse.json(
        { success: false, message: `Alamat minimal ${VALIDATION_LIMITS.alamat.min} karakter` },
        { status: 400 }
      );
    }
    if (body.alamat.length > VALIDATION_LIMITS.alamat.max) {
      return NextResponse.json(
        { success: false, message: `Alamat maksimal ${VALIDATION_LIMITS.alamat.max} karakter` },
        { status: 400 }
      );
    }

    // Validasi tanggal lahir
    const tanggalLahir = new Date(body.tanggalLahir);
    if (isNaN(tanggalLahir.getTime())) {
      return NextResponse.json(
        { success: false, message: "Format tanggal lahir tidak valid" },
        { status: 400 }
      );
    }
    // Pastikan tanggal lahir tidak di masa depan
    if (tanggalLahir > new Date()) {
      return NextResponse.json(
        { success: false, message: "Tanggal lahir tidak boleh di masa depan" },
        { status: 400 }
      );
    }

    // Validasi berkas wajib (URL hasil upload Cloudinary)
    const requiredBerkas: { key: string; label: string }[] = [
      { key: "fotoKk", label: "Fotocopy Kartu Keluarga (KK)" },
      { key: "fotoKtp", label: "Fotocopy KTP" },
      { key: "pasFoto", label: "Pasfoto 3x4" },
      { key: "fotoIjazah", label: "Fotocopy Ijazah/Raport" },
    ];
    for (const berkas of requiredBerkas) {
      if (!body[berkas.key] || typeof body[berkas.key] !== "string" || body[berkas.key].trim() === "") {
        return NextResponse.json(
          { success: false, message: `Berkas ${berkas.label} harus diunggah` },
          { status: 400 }
        );
      }
    }

    // Validasi pendidikan terakhir (optional)
    if (body.pendidikanTerakhir && body.pendidikanTerakhir.length > VALIDATION_LIMITS.pendidikanTerakhir.max) {
      return NextResponse.json(
        { success: false, message: `Pendidikan terakhir maksimal ${VALIDATION_LIMITS.pendidikanTerakhir.max} karakter` },
        { status: 400 }
      );
    }

    // Validasi pekerjaan (optional)
    if (body.pekerjaan && body.pekerjaan.length > VALIDATION_LIMITS.pekerjaan.max) {
      return NextResponse.json(
        { success: false, message: `Pekerjaan maksimal ${VALIDATION_LIMITS.pekerjaan.max} karakter` },
        { status: 400 }
      );
    }

    // Validasi motivasi (optional)
    if (body.motivasi && body.motivasi.length > VALIDATION_LIMITS.motivasi.max) {
      return NextResponse.json(
        { success: false, message: `Motivasi maksimal ${VALIDATION_LIMITS.motivasi.max} karakter` },
        { status: 400 }
      );
    }

    // Simpan ke database
    const pendaftaran = await prisma.pendaftaran.create({
      data: {
        nama: body.nama.trim(),
        email: body.email.trim().toLowerCase(),
        telepon: body.telepon.trim(),
        paket: body.paket,
        alamat: body.alamat.trim(),
        tanggalLahir: tanggalLahir,
        pendidikanTerakhir: body.pendidikanTerakhir?.trim() || null,
        pekerjaan: body.pekerjaan?.trim() || null,
        motivasi: body.motivasi?.trim() || null,
        fotoKk: body.fotoKk?.trim() || null,
        fotoKtp: body.fotoKtp?.trim() || null,
        pasFoto: body.pasFoto?.trim() || null,
        fotoIjazah: body.fotoIjazah?.trim() || null,
        status: "Menunggu",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil dikirim",
      data: {
        id: pendaftaran.id,
        nama: pendaftaran.nama,
        email: pendaftaran.email,
      },
    });
  } catch (error: any) {
    console.error("Error creating pendaftaran:", error);
    
    // Handle unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Email atau nomor telepon sudah terdaftar" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Gagal menyimpan pendaftaran" },
      { status: 500 }
    );
  }
}

// GET - Ambil semua pendaftaran (hanya untuk admin)
export async function GET(request: NextRequest) {
  // Data pendaftar bersifat sensitif (KTP, KK, alamat) — wajib login admin
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: "Tidak terautentikasi" },
      { status: 401 }
    );
  }

  try {
    const pendaftaran = await prisma.pendaftaran.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: pendaftaran });
  } catch (error) {
    console.error("Error fetching pendaftaran:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data pendaftaran" },
      { status: 500 }
    );
  }
}
