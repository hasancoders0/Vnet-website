import { FaTools, FaUsers, FaStar, FaShieldAlt } from "react-icons/fa";

const stats = [
  { icon: FaTools, value: "50+", label: "Powerful Tools" },
  { icon: FaUsers, value: "10K+", label: "Active Users" },
  { icon: FaStar, value: "4.9", label: "Average Rating" },
  { icon: FaShieldAlt, value: "100%", label: "Trusted & Safe" },
];

export default function ToolsStats() {
  return (
    <section className="px-4 -mt-16 relative z-10">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border shadow-sm grid grid-cols-2 md:grid-cols-4">

        {stats.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-6 ${
                i !== stats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-gray-200"
                  : ""
              }`}
            >

              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon className="text-purple-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}