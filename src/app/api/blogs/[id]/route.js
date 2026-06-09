import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import "@/models/Category";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ================= NORMALIZE FOR SAVE =================
// UI → DB (objects → simple values)
const normalizeContentForSave = (content = []) => {
  return content.map((section) => ({
    ...section,
    blocks: (section.blocks || []).map((block) => ({
      ...block,

      // ✅ LIST → string[]
      items: (block.items || []).map((item) =>
        typeof item === "string" ? item : item.text || ""
      ),

      // ✅ GALLERY → string[]
      images: (block.images || []).map((img) =>
        typeof img === "string" ? img : img.url || ""
      ),
    })),
  }));
};

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const buildContentText = (content = []) =>
  content
    .flatMap((section) =>
      (section.blocks || []).flatMap((block) => [
        stripHtml(block.content || ""),
        block.title || "",
        stripHtml(block.description || ""),
        block.quote || "",
        ...(block.items || []),
      ])
    )
    .filter(Boolean)
    .join(" ");

// ================= NORMALIZE FOR FRONTEND =================
// DB → UI (simple → objects with id)
const normalizeContentForFrontend = (content = []) => {
  const uid = () => crypto.randomUUID();

  return content.map((section) => ({
    ...section,
    id: section.id || uid(),

    blocks: (section.blocks || []).map((block) => ({
      ...block,
      id: block.id || uid(),

      // ✅ LIST → [{id, text}]
      items: (block.items || []).map((item) =>
        typeof item === "string"
          ? { id: uid(), text: item }
          : { id: item.id || uid(), text: item.text || "" }
      ),

      // ✅ GALLERY → [{id, url}]
      images: (block.images || []).map((img) =>
        typeof img === "string"
          ? { id: uid(), url: img }
          : { id: img.id || uid(), url: img.url || "" }
      ),
    })),
  }));
};

// ================= GET BLOG =================
export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id)
      .populate("category", "name")
      .lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // 🔥 NORMALIZE FOR UI
    const normalizedBlog = {
      ...blog,
      content: normalizeContentForFrontend(blog.content),
    };

    return NextResponse.json({
      success: true,
      data: normalizedBlog,
    });
  } catch (err) {
    console.error("GET BLOG ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Server error",
      },
      { status: 500 }
    );
  }
}

// ================= UPDATE BLOG =================
export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    // 🔥 FIX CONTENT BEFORE SAVE
    const normalizedContent = normalizeContentForSave(body.content);
    const contentText = buildContentText(normalizedContent);

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...body,
        content: normalizedContent,
        contentText,

        // SEO
        slug: body.slug,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaImage: body.metaImage,
        focusKeyword: body.focusKeyword,
        score: body.score,
      },
      {
        new: true,
      }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (err) {
    console.error("UPDATE BLOG ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Update failed",
      },
      { status: 500 }
    );
  }
}

// ================= DELETE BLOG =================
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error("DELETE BLOG ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Delete failed",
      },
      { status: 500 }
    );
  }
}
