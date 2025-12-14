import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Ambil berita berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const item = await prisma.berita.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...item,
        date: item.date || new Date(item.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

// PUT - Update berita
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if berita exists
    const existing = await prisma.berita.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, message: "Title dan content harus diisi" },
        { status: 400 }
      );
    }

    const updated = await prisma.berita.update({
      where: { id },
      data: {
        title: body.title,
        excerpt: body.excerpt || null,
        content: body.content,
        author: body.author || null,
        category: body.category || null,
        image: body.image || existing.image,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diupdate",
      data: {
        ...updated,
        date: updated.date || new Date(updated.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate berita" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus berita
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if berita exists
    const existing = await prisma.berita.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.berita.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
