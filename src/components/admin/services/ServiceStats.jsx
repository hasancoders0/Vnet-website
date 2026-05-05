"use client";

import {
  FaBox,
  FaCheckCircle,
  FaPauseCircle,
  FaFolder,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Services",
    value: "32",
    change: "+12%",
    icon: FaBox,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Active Services",
    value: "28",
    change: "+8%",
    icon: FaCheckCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Inactive Services",
    value: "4",
    change: "-4%",
    icon: FaPauseCircle,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Total Categories",
    value: "8",
    change: "+5%",
    icon: FaFolder,
    color: "from-orange-500 to-yellow-500",
  },
];

export default function ServiceStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            {/* TOP */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-xl text-white bg-gradient-to-r ${item.color}`}
              >
                <Icon className="text-sm" />
              </div>

              <span
                className={`text-xs font-medium ${
                  item.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.change}
              </span>
            </div>

            {/* VALUE */}
            <h3 className="text-2xl font-semibold text-gray-800 leading-none">
              {item.value}
            </h3>

            {/* LABEL */}
            <p className="text-sm text-gray-500 mt-1">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}