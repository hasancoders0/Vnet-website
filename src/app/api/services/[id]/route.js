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

// ================= HELPER =================
const getId = async (context) => {
  const params = context.params;

  if (typeof params?.then === "function") {
    const resolved = await params;
    return resolved.id;
  }

  return params?.id;
};

// ================= CLEAN DATA =================
const buildUpdateData = (body, slug) => ({
  title: body.title,
  slug,
  subtitle: body.subtitle || "",
  fullDescription: body.fullDescription || "",
  badge: body.badge || "",
  featuredImage: body.featuredImage || "",
  category: body.category,

  // SEO
  metaTitle: body.metaTitle || body.title,
  metaDescription: body.metaDescription || "",
  metaImage: body.metaImage || body.featuredImage || "",

  // TAGS
  tags: Array.isArray(body.tags) ? body.tags : [],

  // FEATURES
  features: (body.features || []).map((f) => ({
    label: f.label || "",
    icon: f.icon || "FaStar",
  })),

  // SUPPORT
  support: {
    duration: body.support?.duration || "",
    type: body.support?.type || "",
  },

  // WHAT YOU GET (🔥 IMPORTANT FIX)
  whatYouGet: {
    description: body.whatYouGet?.description || "",
    items: Array.isArray(body.whatYouGet?.items)
      ? body.whatYouGet.items.filter(Boolean)
      : [],
  },

  // PRICING
  pricing: (body.pricing || []).map((p) => ({
    title: p.title || "",
    price: Number(p.price) || 0,
    deliveryTime: p.deliveryTime || "",
    description: p.description || "",
    features: (p.features || []).filter(Boolean),
    highlighted: !!p.highlighted,
  })),

  // PROCESS
  process: (body.process || []).map((p) => ({
    title: p.title || "",
    description: p.description || "",
    icon: p.icon || "FaRocket",
  })),

  // FAQ
  faq: (body.faq || []).map((f) => ({
    question: f.question || "",
    answer: f.answer || "",
  })),

  // STATUS
  status: body.status || "draft",
  isFeatured: !!body.isFeatured,
  order: Number(body.order) || 0,
});

// ================= GET ONE =================
export async function GET(req, context) {
  try {
    await connectDB();

    const id = await getId(context);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const service = await Service.findById(id).populate(
      "category",
      "name"
    );

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(req, context) {
  try {
    await connectDB();

    const id = await getId(context);
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    // ================= SLUG =================
    let slug = body.slug
      ? generateSlug(body.slug)
      : generateSlug(body.title);

    const existing = await Service.findOne({ slug });

    if (existing && existing._id.toString() !== id) {
      slug = `${slug}-${Date.now()}`;
    }

    // ================= BUILD DATA =================
    const updateData = buildUpdateData(body, slug);

    const updated = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("category", "name");

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      data: updated,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(req, context) {
  try {
    await connectDB();

    const id = await getId(context);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
        error: err.message,
      },
      { status: 500 }
    );
  }
}