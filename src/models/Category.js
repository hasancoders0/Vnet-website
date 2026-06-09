import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: String,

    slug: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["service", "product", "blog", "tool", "template"],
      required: true,
    },

    icon: {
      type: String,
      default: "FaFolder",
    },
  },
  { timestamps: true }
);

// ✅ IMPORTANT: UNIQUE COMBINATION
CategorySchema.index({ slug: 1, type: 1 }, { unique: true });

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);