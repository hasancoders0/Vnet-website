import mongoose from "mongoose";

const { Schema } = mongoose;

// ================= SUPPORT =================
const SupportSchema = new Schema(
  {
    duration: { type: String, trim: true, default: "" },
    type: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ================= FEATURE =================
const FeatureSchema = new Schema(
  {
    label: { type: String, trim: true, default: "" },
    icon: { type: String, default: "FaStar" },
  },
  { _id: false }
);

// ================= PRICING =================
const PricingSchema = new Schema(
  {
    title: { type: String, trim: true, default: "" },
    price: { type: Number, default: 0 },
    deliveryTime: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [{ type: String, trim: true }],
    highlighted: { type: Boolean, default: false },
  },
  { _id: false }
);

// ================= PROCESS =================
const ProcessSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "FaRocket" },
  },
  { _id: false }
);

// ================= FAQ =================
const FAQSchema = new Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false }
);

// ================= WHAT YOU GET (🔥 NEW STRUCTURE) =================
const WhatYouGetSchema = new Schema(
  {
    description: { type: String, default: "" },
    items: [{ type: String, trim: true }],
  },
  { _id: false }
);

// ================= MAIN =================
const ServiceSchema = new Schema(
  {
    // ================= BASIC =================
    title: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    subtitle: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },

    badge: {
      type: String,
      enum: ["Popular", "New", "Featured", ""],
      default: "",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    tags: [{ type: String, trim: true }],

    featuredImage: { type: String, default: "" },

    // ================= SEO =================
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaImage: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },

    // ================= SUPPORT =================
    support: {
      type: SupportSchema,
      default: () => ({}),
    },

    // ================= CONTENT =================

    features: {
      type: [FeatureSchema], // 🔥 FIXED (no mixed anymore)
      default: [],
    },

    whatYouGet: {
      type: WhatYouGetSchema, // 🔥 FIXED
      default: () => ({ description: "", items: [] }),
    },

    pricing: {
      type: [PricingSchema],
      default: [],
    },

    process: {
      type: [ProcessSchema],
      default: [],
    },

    faq: {
      type: [FAQSchema],
      default: [],
    },

    // ================= STATUS =================
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
      index: true,
    },

    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ================= INDEXES =================
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ status: 1 });
ServiceSchema.index({ createdAt: -1 });

ServiceSchema.index({
  title: "text",
  metaTitle: "text",
  metaDescription: "text",
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);