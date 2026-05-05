"use client";

import { FaCube, FaShoppingBag, FaFileAlt, FaShoppingCart } from "react-icons/fa";

const stats = [
  {
    title: "Total Services",
    value: "32",
    growth: "+12%",
    icon: FaCube,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Digital Products",
    value: "28",
    growth: "+8%",
    icon: FaShoppingBag,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Blog Posts",
    value: "56",
    growth: "+15%",
    icon: FaFileAlt,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Cart Orders",
    value: "128",
    growth: "+18%",
    icon: FaShoppingCart,
    color: "from-red-500 to-pink-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl text-white bg-gradient-to-r ${item.color}`}
              >
                <Icon />
              </div>

              <span className="text-xs text-green-500 font-medium">
                ↑ {item.growth}
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900">
              {item.value}
            </h3>
            <p className="text-sm text-gray-500">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}