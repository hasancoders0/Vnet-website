import {
  FaCalendarAlt,
  FaClock,
  FaFileAlt,
  FaBook,
  FaShieldAlt,
  FaLifeRing,
} from "react-icons/fa";

export default function OverviewTab({ product }) {
  const iconMap = {
    "Last Update": <FaCalendarAlt />,
    Published: <FaClock />,
    "Files Included": <FaFileAlt />,
    Documentation: <FaBook />,
    License: <FaShieldAlt />,
    Support: <FaLifeRing />,
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* LEFT */}
      <div className="space-y-6">

        <h3 className="text-lg font-semibold text-gray-900">
          Product Description
        </h3>

        {product?.overview?.description?.map((item, i) => (
          <p key={i} className="text-sm text-gray-600 leading-relaxed">
            {item}
          </p>
        ))}

        {/* TECH */}
        <div className="flex flex-wrap gap-3 pt-2">
          {product?.overview?.tech?.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 pt-2">
          {product?.overview?.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* RIGHT (META INSIDE OVERVIEW) */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">

        {product?.meta?.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-3 ${
              i !== product.meta.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <span className="text-purple-500">
                {iconMap[item.label]}
              </span>
              {item.label}
            </div>

            <span className="text-sm font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}