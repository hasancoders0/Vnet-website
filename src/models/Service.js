import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    slug: String,

    title: String,
    subtitle: String,
    badge: String,
    description: String,
    heroImage: String,

    features: [
      {
        label: String,
        icon: String,
      },
    ],

    whatYouGet: [String],

    pricing: [
      {
        name: String,
        price: Number,
        description: String,
        features: [String],
        highlighted: Boolean,
      },
    ],

    process: [
      {
        title: String,
        description: String,
        icon: String,
      },
    ],

    faq: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);