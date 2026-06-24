import mongoose from "mongoose";

const { Schema } = mongoose;

// ================= BLOCK =================
const BlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "text",
        "list",
        "split",
        "gallery",
        "quote",
        "divider",
      ],
      required: true,
    },

    content: { type: String, default: "" },
    items: [{ type: String }],

    image: { type: String, default: "" },
    images: [{ type: String }],

    layout: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },

    title: { type: String, default: "" },
    description: { type: String, default: "" },

    quote: { type: String, default: "" },

    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" },
    buttonType: {
      type: String,
      enum: ["primary", "outline", "ghost", "link"],
      default: "primary",
    },
  },
  { _id: false }
);

// ================= SECTION =================
const SectionSchema = new Schema(
  {
    title: { type: String, default: "" },

    blocks: {
      type: [BlockSchema],
      default: [],
    },
  },
  { _id: false }
);

// ================= MAIN BLOG =================
const BlogSchema = new Schema(
  {
    // ================= BASIC =================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    featuredImage: {
      type: String,
      default: "",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ================= CONTENT =================
    content: {
      type: [SectionSchema],
      default: [],
    },

    // 🔥 IMPORTANT: Flat text for SEO & search
    contentText: {
      type: String,
      default: "",
    },

    // ================= SEO =================
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },

    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },

    metaImage: {
      type: String,
      default: "",
    },

    focusKeyword: {
      type: String,
      default: "",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    score: {
      type: Number,
      default: 0,
    },

    // ================= STATUS =================
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================

// 🔥 Text search (very powerful later)
BlogSchema.index({
  title: "text",
  contentText: "text",
});

// 🔥 Sorting optimization
BlogSchema.index({ createdAt: -1 });

// ================= EXPORT =================
export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);