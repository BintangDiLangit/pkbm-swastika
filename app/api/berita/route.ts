import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Ambil semua berita
export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format date for response
    const formattedBerita = berita.map((item: typeof berita[0]) => ({
      ...item,
      date: item.date || new Date(item.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, data: formattedBerita });
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

// POST - Tambah berita baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, message: "Title dan content harus diisi" },
        { status: 400 }
      );
    }

    const newBerita = await prisma.berita.create({
      data: {
        title: body.title,
        excerpt: body.excerpt || null,
        content: body.content,
        author: body.author || null,
        category: body.category || null,
        image: body.image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80",
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil ditambahkan",
      data: {
        ...newBerita,
        date: newBerita.date || new Date(newBerita.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        createdAt: newBerita.createdAt.toISOString(),
        updatedAt: newBerita.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan berita" },
      { status: 500 }
    );
  }
}
