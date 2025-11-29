import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "berita.json");

function readBeritaData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeBeritaData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET - Ambil berita berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const berita = readBeritaData();
    const item = berita.find((b: any) => b.id === id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
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
    const berita = readBeritaData();
    const index = berita.findIndex((b: any) => b.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }
    
    berita[index] = {
      ...berita[index],
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      category: body.category,
      image: body.image,
      updatedAt: new Date().toISOString(),
    };
    
    writeBeritaData(berita);
    
    return NextResponse.json({
      success: true,
      message: "Berita berhasil diupdate",
      data: berita[index],
    });
  } catch (error) {
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
    const berita = readBeritaData();
    const filtered = berita.filter((b: any) => b.id !== id);
    
    if (filtered.length === berita.length) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }
    
    writeBeritaData(filtered);
    
    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
