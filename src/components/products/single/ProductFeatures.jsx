"use client";

import {
  FaPaintBrush,
  FaMobileAlt,
  FaSlidersH,
  FaCode,
  FaSyncAlt,
  FaGlobe,
} from "react-icons/fa";

export default function ProductFeatures({ product }) {
  // 🔥 SAME ICON SYSTEM AS FeaturesTab (keep consistent)
  const icons = {
    design: FaPaintBrush,
    responsive: FaMobileAlt,
    custom: FaSlidersH,
    code: FaCode,
    update: FaSyncAlt,
    browser: FaGlobe,
  };

  if (!product?.features?.length) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-[22px] font-semibold text-center text-gray-900 mb-10">
          Why Choose {product.shortTitle || product.title}?
        </h2>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {product.features.map((item, i) => {
            const Icon = icons[item.icon];

            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition"
              >

                {/* ICON */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  {Icon && <Icon size={18} />}
                </div>

                {/* TITLE */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}