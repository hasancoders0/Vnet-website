"use client";

import { useRouter } from "next/navigation";
import { FaBell, FaMoon, FaSearch, FaSignOutAlt } from "react-icons/fa";

export default function Topbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/administrator/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button className="text-gray-600 text-lg">☰</button>

        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm w-[260px]">
          <FaSearch className="text-gray-400" />

          <input
            placeholder="Search anything..."
            className="bg-transparent outline-none w-full"
          />

          <span className="text-xs text-gray-400">⌘K</span>
        </div>

        {/* NOTIFICATION */}
        <div className="relative">
          <FaBell className="text-gray-600 text-lg" />

          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* THEME */}
        <FaMoon className="text-gray-600" />

        {/* USER */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-300" />

          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-gray-400 text-xs">Super Admin</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-red-50
            text-red-600
            border border-red-100
            hover:bg-red-100
            transition-all duration-200
          "
        >
          <FaSignOutAlt className="text-sm" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
