import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// ================= SLUG =================
const generateSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// ================= CLEAN DATA =================
const buildServiceData = (body, slug) => ({
  title: body.title,
  slug,
  subtitle: body.subtitle || "",
  fullDescription: body.fullDescription || "",
  badge: body.badge || "",
  featuredImage: body.featuredImage || "",
  category: body.category,

  // ================= SEO =================
  metaTitle: body.metaTitle || body.title,
  metaDescription: body.metaDescription || "",
  metaImage: body.metaImage || body.featuredImage || "",

  // ================= TAGS =================
  tags: Array.isArray(body.tags) ? body.tags : [],

  // ================= FEATURES =================
  features: (body.features || []).map((f) => ({
    label: f.label || "",
    icon: f.icon || "FaStar",
  })),

  // ================= SUPPORT =================
  support: {
    duration: body.support?.duration || "",
    type: body.support?.type || "",
  },

  // ================= WHAT YOU GET (🔥 FIXED) =================
  whatYouGet: {
    description: body.whatYouGet?.description || "",
    items: Array.isArray(body.whatYouGet?.items)
      ? body.whatYouGet.items.filter(Boolean)
      : [],
  },

  // ================= PRICING =================
  pricing: (body.pricing || []).map((p) => ({
    title: p.title || "",
    price: Number(p.price) || 0,
    deliveryTime: p.deliveryTime || "",
    description: p.description || "",
    features: (p.features || []).filter(Boolean),
    highlighted: !!p.highlighted,
  })),

  // ================= PROCESS =================
  process: (body.process || []).map((p) => ({
    title: p.title || "",
    description: p.description || "",
    icon: p.icon || "FaRocket",
  })),

  // ================= FAQ =================
  faq: (body.faq || []).map((f) => ({
    question: f.question || "",
    answer: f.answer || "",
  })),

  // ================= STATUS =================
  status: body.status || "draft",
  isFeatured: !!body.isFeatured,
  order: Number(body.order) || 0,
});

// ================= CREATE =================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ================= VALIDATION =================
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

    const existing = await Service.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // ================= BUILD =================
    const serviceData = buildServiceData(body, slug);

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

    const services = await Service.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

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