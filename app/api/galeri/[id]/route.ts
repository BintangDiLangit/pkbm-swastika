import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Ambil galeri berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const item = await prisma.galeri.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Foto tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// PUT - Update galeri
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if galeri exists
    const existing = await prisma.galeri.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Foto tidak ditemukan" },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.title || !body.image) {
      return NextResponse.json(
        { success: false, message: "Title dan image harus diisi" },
        { status: 400 }
      );
    }

    const updated = await prisma.galeri.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category || null,
        image: body.image,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Foto berhasil diupdate",
      data: {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating galeri:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate foto" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus galeri
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if galeri exists
    const existing = await prisma.galeri.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Foto tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.galeri.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Foto berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus foto" },
      { status: 500 }
    );
  }
}
