import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "general";

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 🔐 Allowed folders
    const allowedFolders = [
      "services",
      "products",
      "blogs",
      "templates",
      "tools",
      "general",
    ];

    if (!allowedFolders.includes(folder)) {
      return NextResponse.json(
        { error: "Invalid folder" },
        { status: 400 }
      );
    }

    // ================= ENV DETECTION =================
    const isProd = process.env.NODE_ENV === "production";

    let uploadDir;

    if (isProd) {
      // ✅ CPANEL PATH (UPDATE THIS)
      uploadDir = `/home/YOUR_USERNAME/public_html/uploads/${folder}`;
    } else {
      // ✅ LOCAL DEV
      uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        folder
      );
    }

    // ensure folder exists
    fs.mkdirSync(uploadDir, { recursive: true });

    // convert file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🔒 sanitize filename
    const cleanName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const fileName = `${Date.now()}-${cleanName}`;

    const filePath = path.join(uploadDir, fileName);

    // save file
    fs.writeFileSync(filePath, buffer);

    // return public URL
    const fileUrl = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}