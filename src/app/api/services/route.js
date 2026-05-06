import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

// ================= SLUG =================
const generateSlug = (text) =>
  text
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// ================= CREATE =================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ================= BASIC VALIDATION =================
    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { success: false, message: "Category is required" },
        { status: 400 }
      );
    }

    // ================= SLUG =================
    let slug = body.slug
      ? generateSlug(body.slug)
      : generateSlug(body.title);

    // 👉 UNIQUE SLUG CHECK
    const existing = await Service.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // ================= CLEAN DATA =================
    const serviceData = {
      title: body.title,
      slug,
      subtitle: body.subtitle || "",
      shortDescription: body.shortDescription || "",
      fullDescription: body.fullDescription || "",
      badge: body.badge || "",
      featuredImage: body.featuredImage || "",
      category: body.category,

      // SEO
      metaTitle: body.metaTitle || body.title,
      metaDescription:
        body.metaDescription || body.shortDescription || "",
      metaImage: body.metaImage || body.featuredImage || "",

      // ARRAYS
      tags: Array.isArray(body.tags) ? body.tags : [],

      features: (body.features || []).map((f) => ({
        label: f.label || "",
        icon: f.icon || "FaStar",
      })),

      whatYouGet: (body.whatYouGet || []).filter(Boolean),

      pricing: (body.pricing || []).map((p) => ({
        title: p.title || "",
        price: Number(p.price) || 0,
        deliveryTime: p.deliveryTime || "",
        description: p.description || "",
        features: (p.features || []).filter(Boolean),
        highlighted: !!p.highlighted,
      })),

      process: (body.process || []).map((p) => ({
        title: p.title || "",
        description: p.description || "",
        icon: p.icon || "FaRocket",
      })),

      faq: (body.faq || []).map((f) => ({
        question: f.question || "",
        answer: f.answer || "",
      })),
    };

    // ================= CREATE =================
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

// ================= GET =================
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find()
      .sort({ createdAt: -1 })
      .populate("category"); // 🔥 important

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