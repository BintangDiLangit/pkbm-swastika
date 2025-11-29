import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "galeri.json");

function readGaleriData() {
  try {
    const data = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeGaleriData(data: any) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET - Ambil galeri berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const galeri = readGaleriData();
    const item = galeri.find((g: any) => g.id === params.id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Foto tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// PUT - Update galeri
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const galeri = readGaleriData();
    const index = galeri.findIndex((g: any) => g.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Foto tidak ditemukan" },
        { status: 404 }
      );
    }
    
    galeri[index] = {
      ...galeri[index],
      title: body.title,
      category: body.category,
      image: body.image,
      updatedAt: new Date().toISOString(),
    };
    
    writeGaleriData(galeri);
    
    return NextResponse.json({
      success: true,
      message: "Foto berhasil diupdate",
      data: galeri[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate foto" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus galeri
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const galeri = readGaleriData();
    const filtered = galeri.filter((g: any) => g.id !== params.id);
    
    if (filtered.length === galeri.length) {
      return NextResponse.json(
        { success: false, message: "Foto tidak ditemukan" },
        { status: 404 }
      );
    }
    
    writeGaleriData(filtered);
    
    return NextResponse.json({
      success: true,
      message: "Foto berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus foto" },
      { status: 500 }
    );
  }
}
