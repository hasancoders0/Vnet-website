"use client";

import { usePathname } from "next/navigation";
import {
  FaThLarge,
  FaCogs,
  FaBox,
  FaBlog,
  FaTags,
  FaTools,
} from "react-icons/fa";

const menu = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", icon: FaThLarge, href: "/administrator/dashboard" },
    ],
  },
  {
    title: "MANAGE CONTENT",
    items: [
      { name: "Services", icon: FaCogs, href: "/administrator/services" },
      { name: "Digital Products", icon: FaBox, href: "/administrator/products" },
      { name: "Blog / Journal", icon: FaBlog, href: "/administrator/blog" },
      { name: "Tools", icon: FaTools, href: "/administrator/tools" },
    ],
  },
  {
    title: "SITE MANAGEMENT",
    items: [
      { name: "Categories", icon: FaTags, href: "/administrator/categories" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-screen bg-gradient-to-b from-[#020617] to-[#030a1f] text-white flex flex-col justify-between">

      {/* LOGO */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-purple-500">V</span> Visionary
        </h1>
      </div>

      {/* MENU */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {menu.map((section, i) => (
          <div key={i}>
            <p className="text-xs text-white/40 mb-3">{section.title}</p>

            <div className="space-y-2">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <a
                    key={idx}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                          : "text-white/70 hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon className="text-sm" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* USER */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
          <div>
            <p className="text-sm">Admin</p>
            <p className="text-xs text-white/40">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}