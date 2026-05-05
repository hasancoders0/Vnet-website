import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// 🔧 SLUG GENERATOR
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-");

// ================= CREATE =================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ VALIDATION
    if (!body.name || !body.type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    // ✅ GENERATE BASE SLUG
    let baseSlug = generateSlug(body.name);

    // ✅ ENSURE UNIQUE SLUG PER TYPE
    let slug = baseSlug;
    let counter = 1;

    while (
      await Category.findOne({
        slug,
        type: body.type,
      })
    ) {
      slug = `${baseSlug}-${counter++}`;
    }

    // ✅ CREATE CATEGORY
    const category = await Category.create({
      name: body.name,
      type: body.type,
      icon: body.icon || "FaFolder",
      slug,
    });

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// ================= GET =================
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const query = type ? { type } : {};

    const categories = await Category.find(query).sort({
      createdAt: -1,
    });

    // ✅ COUNT ALL TYPES
    const countsRaw = await Category.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {};
    countsRaw.forEach((c) => {
      counts[c._id] = c.count;
    });

    return NextResponse.json({
      data: categories,
      counts,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}