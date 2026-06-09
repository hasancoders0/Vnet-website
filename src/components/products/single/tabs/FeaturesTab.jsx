import {
  FaPaintBrush,
  FaMobileAlt,
  FaSlidersH,
  FaCode,
  FaSyncAlt,
  FaGlobe,
} from "react-icons/fa";

export default function FeaturesTab({ product }) {

  // 🔥 Icon mapping
  const icons = {
    design: FaPaintBrush,
    responsive: FaMobileAlt,
    custom: FaSlidersH,
    code: FaCode,
    update: FaSyncAlt,
    browser: FaGlobe,
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {product?.features?.map((item, i) => {
        const Icon = icons[item.icon];

        return (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
          >

            {/* ICON */}
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
              {Icon && <Icon className="text-sm" />}
            </div>

            {/* TITLE */}
            <h4 className="font-semibold text-gray-800 mb-2">
              {item.title}
            </h4>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-500 leading-relaxed">
              {item.description}
            </p>

          </div>
        );
      })}

    </div>
  );
}