import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_FOLDERS = [
  "services",
  "products",
  "blogs",
  "templates",
  "tools",
  "general",
];

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const folder = formData.get("folder") || "general";

    // ================= VALIDATION =================
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    // ================= UPLOAD DIRECTORY =================
    // Works both locally and on any cPanel server
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

    // Create folder if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });

    // ================= FILE PROCESSING =================
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const cleanName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const fileName = `${Date.now()}-${cleanName}`;

    const filePath = path.join(uploadDir, fileName);

    // Save file
    fs.writeFileSync(filePath, buffer);

    // Public URL
    const fileUrl = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Upload failed",
      },
      { status: 500 },
    );
  }
}
