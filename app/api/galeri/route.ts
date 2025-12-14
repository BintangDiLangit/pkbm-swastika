import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Ambil semua galeri
export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format dates for response
    const formattedGaleri = galeri.map((item: typeof galeri[0]) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, data: formattedGaleri });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data galeri" },
      { status: 500 }
    );
  }
}

// POST - Tambah foto baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.image) {
      return NextResponse.json(
        { success: false, message: "Title dan image harus diisi" },
        { status: 400 }
      );
    }

    const newItem = await prisma.galeri.create({
      data: {
        title: body.title,
        category: body.category || null,
        image: body.image,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Foto berhasil ditambahkan",
      data: {
        ...newItem,
        createdAt: newItem.createdAt.toISOString(),
        updatedAt: newItem.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating galeri:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan foto" },
      { status: 500 }
    );
  }
}
