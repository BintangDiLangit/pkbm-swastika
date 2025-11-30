import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    console.log("Uploading to Cloudinary...");

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "pkbm-swastika",
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" }, // Resize jika terlalu besar
        { quality: "auto" }, // Auto-optimize quality
      ],
    });

    console.log("Cloudinary upload success:", uploadResponse.secure_url);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
