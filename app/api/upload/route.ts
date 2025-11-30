import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    console.log("Upload API called");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file in request");
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("File received:", file.name, file.type, file.size);

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      console.log("Invalid file type:", file.type);
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only images allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log("File too large:", file.size);
      return NextResponse.json(
        { success: false, message: "File size too large. Max 5MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalName}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "berita");
    console.log("Upload directory:", uploadDir);
    
    if (!existsSync(uploadDir)) {
      console.log("Creating directory...");
      mkdirSync(uploadDir, { recursive: true });
    }

    // Save file SYNCHRONOUSLY
    const filepath = path.join(uploadDir, filename);
    console.log("Saving to:", filepath);
    
    try {
      writeFileSync(filepath, buffer);
      console.log("File written with writeFileSync");
      
      // Verify file exists
      if (!existsSync(filepath)) {
        throw new Error("File was not saved after writeFileSync");
      }
      
      console.log("File verified exists at:", filepath);
    } catch (saveError) {
      console.error("Error saving file:", saveError);
      return NextResponse.json(
        { success: false, message: `Failed to save file: ${saveError}` },
        { status: 500 }
      );
    }

    // Return URL
    const imageUrl = `/uploads/berita/${filename}`;
    console.log("Returning URL:", imageUrl);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      url: imageUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file" },
      { status: 500 }
    );
  }
}
