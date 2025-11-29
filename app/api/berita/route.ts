import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "berita.json");

// Helper function to read berita data
function readBeritaData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write berita data
function writeBeritaData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET - Ambil semua berita
export async function GET() {
  try {
    const berita = readBeritaData();
    return NextResponse.json({ success: true, data: berita });
  } catch (error) {
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
    const berita = readBeritaData();
    
    const newBerita = {
      id: Date.now().toString(),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      category: body.category,
      image: body.image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      createdAt: new Date().toISOString(),
    };
    
    berita.unshift(newBerita); // Add to beginning
    writeBeritaData(berita);
    
    return NextResponse.json({
      success: true,
      message: "Berita berhasil ditambahkan",
      data: newBerita,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan berita" },
      { status: 500 }
    );
  }
}
