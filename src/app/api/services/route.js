"use server";

import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

// ================= SLUG =================
const generateSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// ================= NORMALIZE =================
const normalizeForSave = (body) => {
  const seo = body.seo || {};

  return {
    // ================= BASIC =================
    title: body.title || "",
    subtitle: body.subtitle || "",
    shortDescription: body.shortDescription || "",
    fullDescription: body.fullDescription || "",
    badge: body.badge || "",
    featuredImage: body.featuredImage || "",
    category: body.category || null,

    // ================= SEO =================
    slug:
      seo.slug ||
      body.slug ||
      generateSlug(body.title || ""),

    metaTitle:
      seo.metaTitle ||
      body.metaTitle ||
      body.title ||
      "",

    metaDescription:
      seo.metaDescription ||
      body.metaDescription ||
      "",

    metaImage:
      seo.metaImage ||
      body.metaImage ||
      body.featuredImage ||
      "",

    focusKeyword:
      seo.focusKeyword ||
      body.focusKeyword ||
      "",

    // ================= TAGS =================
    tags: Array.isArray(body.tags) ? body.tags : [],

    // ================= FEATURES =================
    features: Array.isArray(body.features)
      ? body.features.map((f) =>
          typeof f === "string"
            ? { label: f, icon: "FaStar" }
            : {
                label: f?.label || "",
                icon: f?.icon || "FaStar",
              }
        )
      : [],

    // ================= SUPPORT =================
    support: {
      duration: body.support?.duration || "",
      type: body.support?.type || "",
    },

    // ================= WHAT YOU GET (🔥 FIXED) =================
    whatYouGet: {
      description:
        body.whatYouGet?.description ||
        body.shortDescription ||
        "",

      items: Array.isArray(body.whatYouGet?.items)
        ? body.whatYouGet.items.map((i) =>
            typeof i === "string" ? i : i?.text || ""
          )
        : [],
    },

    // ================= PRICING =================
    pricing: Array.isArray(body.pricing)
      ? body.pricing.map((p) => ({
          title: p?.title || "",
          price: Number(p?.price) || 0,
          deliveryTime: p?.deliveryTime || "",
          description: p?.description || "",
          features: Array.isArray(p?.features)
            ? p.features.map((f) =>
                typeof f === "string" ? f : f?.text || ""
              )
            : [],
          highlighted: !!p?.highlighted,
        }))
      : [],

    // ================= PROCESS =================
    process: Array.isArray(body.process)
      ? body.process.map((p) => ({
          title: p?.title || "",
          description: p?.description || "",
          icon: p?.icon || "FaRocket",
        }))
      : [],

    // ================= FAQ =================
    faq: Array.isArray(body.faq)
      ? body.faq.map((f) => ({
          question: f?.question || "",
          answer: f?.answer || "",
        }))
      : [],

    // ================= STATUS =================
    status: body.status || "draft",
    isFeatured: !!body.isFeatured,
    order: Number(body.order) || 0,
  };
};

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

    // ================= NORMALIZE =================
    let cleanData = normalizeForSave(body);

    // ================= SLUG UNIQUE =================
    let baseSlug = cleanData.slug;
    let slug = baseSlug;

    const existing = await Service.findOne({ slug });

    if (existing) {
      slug = `${baseSlug}-${Date.now()}`;
    }

    cleanData.slug = slug;

    // ================= SAVE =================
    const service = await Service.create(cleanData);

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      data: service,
    });

  } catch (err) {
    console.error("CREATE SERVICE ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// ================= GET =================
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    // ================= SLUG CHECK =================
    if (slug) {
      const existing = await Service.findOne({
        slug,
        ...(id && { _id: { $ne: id } }),
      });

      return NextResponse.json({
        success: true,
        available: !existing,
      });
    }

    // ================= LIST =================
    const services = await Service.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services,
    });

  } catch (err) {
    console.error("GET SERVICES ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}