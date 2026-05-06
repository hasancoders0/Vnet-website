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

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    deliveryTime: { type: String, default: "" },

    description: { type: String, default: "" }, // ✅ added

    features: [{ type: String, trim: true }],

    highlighted: { type: Boolean, default: false }, // ✅ added
  },
  { _id: false }
);

// ================= PROCESS =================
const ProcessSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "FaRocket" }, // ✅ added
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

// ================= MAIN =================
const ServiceSchema = new Schema(
  {
    // BASIC
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    subtitle: { type: String, default: "" },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    fullDescription: { type: String, default: "" },

    badge: {
      type: String,
      enum: ["Popular", "New", "Featured", ""],
      default: "",
    },

    // CATEGORY
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [{ type: String, trim: true }],

    // IMAGE
    featuredImage: { type: String, default: "" },

    // ================= SEO =================
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaImage: { type: String, default: "" },

    // ================= SUPPORT =================
    support: {
      type: SupportSchema,
      default: () => ({}), // ✅ safe default
    },

    // ================= CONTENT =================
    features: { type: [FeatureSchema], default: [] },

    whatYouGet: [{ type: String, trim: true }],

    pricing: { type: [PricingSchema], default: [] },

    process: { type: [ProcessSchema], default: [] },

    faq: { type: [FAQSchema], default: [] },

    // ================= STATUS =================
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================
ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ status: 1 });

// ================= EXPORT =================
export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);