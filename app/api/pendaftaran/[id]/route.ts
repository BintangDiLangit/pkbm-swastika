import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Status pendaftaran yang valid
const VALID_STATUS = ["Menunggu", "Diterima", "Ditolak"];

const unauthorized = () =>
  NextResponse.json({ success: false, message: "Tidak terautentikasi" }, { status: 401 });

// GET - Ambil satu pendaftaran berdasarkan id (hanya admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorized();
  try {
    const { id } = await params;
    const pendaftaran = await prisma.pendaftaran.findUnique({ where: { id } });

    if (!pendaftaran) {
      return NextResponse.json(
        { success: false, message: "Data pendaftaran tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pendaftaran });
  } catch (error) {
    console.error("Error fetching pendaftaran:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data pendaftaran" },
      { status: 500 }
    );
  }
}

// PATCH - Update status / catatan admin
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorized();
  try {
    const { id } = await params;
    const body = await request.json();

    const data: { status?: string; catatanAdmin?: string | null } = {};

    if (body.status !== undefined) {
      if (!VALID_STATUS.includes(body.status)) {
        return NextResponse.json(
          { success: false, message: "Status tidak valid" },
          { status: 400 }
        );
      }
      data.status = body.status;
    }

    if (body.catatanAdmin !== undefined) {
      data.catatanAdmin = body.catatanAdmin?.trim() || null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada data yang diubah" },
        { status: 400 }
      );
    }

    const pendaftaran = await prisma.pendaftaran.update({ where: { id }, data });

    return NextResponse.json({
      success: true,
      message: "Data pendaftaran berhasil diperbarui",
      data: pendaftaran,
    });
  } catch (error: any) {
    console.error("Error updating pendaftaran:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Data pendaftaran tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data pendaftaran" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus pendaftaran
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorized();
  try {
    const { id } = await params;
    await prisma.pendaftaran.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Data pendaftaran berhasil dihapus",
    });
  } catch (error: any) {
    console.error("Error deleting pendaftaran:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Data pendaftaran tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data pendaftaran" },
      { status: 500 }
    );
  }
}
