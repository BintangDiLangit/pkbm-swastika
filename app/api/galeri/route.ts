import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { readFileSync, writeFileSync, existsSync } from "fs";
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

// GET - Ambil semua galeri
export async function GET() {
  try {
    const galeri = readGaleriData();
    return NextResponse.json({ success: true, data: galeri });
  } catch (error) {
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
    const galeri = readGaleriData();
    
    const newItem = {
      id: Date.now().toString(),
      title: body.title,
      category: body.category,
      image: body.image,
      createdAt: new Date().toISOString(),
    };
    
    galeri.unshift(newItem);
    writeGaleriData(galeri);
    
    return NextResponse.json({
      success: true,
      message: "Foto berhasil ditambahkan",
      data: newItem,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan foto" },
      { status: 500 }
    );
  }
}
