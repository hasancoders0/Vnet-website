import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

// 👉 HELPER: SLUG GENERATOR
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// ================= CREATE =================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ VALIDATION
    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // ✅ SLUG AUTO GENERATE
    const slug = body.slug
      ? generateSlug(body.slug)
      : generateSlug(body.title);

    // ✅ PREPARE DATA
    const serviceData = {
      ...body,
      slug,
      tags: body.tags || [],
      features: body.features || [],
      whatYouGet: body.whatYouGet || [],
      pricing: body.pricing || [],
      process: body.process || [],
      faq: body.faq || [],
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.shortDescription || "",
    };

    // ✅ CREATE
    const service = await Service.create(serviceData);

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
        error: err.message,
      },
      { status: 500 }
    );
  }
}