"use client";

import { FaSmile, FaCube, FaClipboardList, FaGlobe } from "react-icons/fa";

export default function AboutStats() {
  const stats = [
    {
      icon: FaSmile,
      value: "50K+",
      title: "Happy Customers",
      desc: "Trusted by users worldwide",
      color: "text-purple-500 bg-purple-100",
    },
    {
      icon: FaCube,
      value: "120+",
      title: "Products & Tools",
      desc: "Digital products and utilities",
      color: "text-green-500 bg-green-100",
    },
    {
      icon: FaClipboardList,
      value: "5+",
      title: "Years of Experience",
      desc: "Delivering quality solutions",
      color: "text-orange-500 bg-orange-100",
    },
    {
      icon: FaGlobe,
      value: "150+",
      title: "Countries Served",
      desc: "Global reach and growing",
      color: "text-blue-500 bg-blue-100",
    },
  ];

  return (
    <section className="px-6 -mt-12 relative z-10">
      <div className="max-w-[1200px] mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i} className="flex items-center gap-4">

                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}>
                  <Icon className="text-lg" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {item.value}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}