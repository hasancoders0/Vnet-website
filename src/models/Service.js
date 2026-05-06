import mongoose from "mongoose";

const { Schema } = mongoose;

// ================= SUPPORT =================
const SupportSchema = new Schema(
  {
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// ================= FEATURE =================
const FeatureSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "FaStar",
    },
  },
  { _id: false }
);

// ================= PRICING =================
const PricingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryTime: {
      type: String, // e.g. "3 days"
      required: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { _id: false }
);

// ================= PROCESS =================
const ProcessSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

// ================= FAQ =================
const FAQSchema = new Schema(
  {
    question: String,
    answer: String,
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

    subtitle: String,

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    fullDescription: String,

    badge: {
      type: String,
      enum: ["Popular", "New", "Featured", ""],
      default: "",
    },

    // CATEGORY (RELATION)
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // IMAGE
    featuredImage: String,

    // ================= SEO =================
    metaTitle: String,
    metaDescription: String,
    metaImage: String,

    // ================= SUPPORT =================
    support: SupportSchema,

    // ================= CONTENT =================
    features: [FeatureSchema],

    whatYouGet: [
      {
        type: String,
        trim: true,
      },
    ],

    pricing: [PricingSchema],

    process: [ProcessSchema],

    faq: [FAQSchema],

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