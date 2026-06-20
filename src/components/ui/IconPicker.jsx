"use client";

import { useState, useMemo } from "react";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

import { FaSearch, FaTimes } from "react-icons/fa";
const POPULAR_ICONS = {
  FaFolder: FaIcons.FaFolder,
  FaHome: FaIcons.FaHome,
  FaUser: FaIcons.FaUser,
  FaUsers: FaIcons.FaUsers,
  FaBriefcase: FaIcons.FaBriefcase,
  FaShoppingCart: FaIcons.FaShoppingCart,
  FaChartBar: FaIcons.FaChartBar,
  FaGlobe: FaIcons.FaGlobe,
  FaCog: FaIcons.FaCog,
  FaSearch: FaIcons.FaSearch,

  MdDashboard: MdIcons.MdDashboard,
  MdEmail: MdIcons.MdEmail,
  MdPhone: MdIcons.MdPhone,
  MdSettings: MdIcons.MdSettings,
  MdAnalytics: MdIcons.MdAnalytics,
};
const ICON_GROUPS = {
  popular: {
    label: "Popular",
    icons: POPULAR_ICONS,
  },

  fa: {
    label: "Font Awesome",
    icons: FaIcons,
  },

  md: {
    label: "Material",
    icons: MdIcons,
  },

  bs: {
    label: "Bootstrap",
    icons: BsIcons,
  },

  ai: {
    label: "Ant Design",
    icons: AiIcons,
  },

  hi: {
    label: "Hero Icons",
    icons: HiIcons,
  },

  all: {
    label: "All Icons",
    icons: {
      ...FaIcons,
      ...MdIcons,
      ...BsIcons,
      ...AiIcons,
      ...HiIcons,
    },
  },
};

export default function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

  const activeIcons = ICON_GROUPS[activeTab].icons;

  const allIcons = {
    ...FaIcons,
    ...MdIcons,
    ...BsIcons,
    ...AiIcons,
    ...HiIcons,
  };

  const SelectedIcon = allIcons[value] || FaIcons.FaFolder;

  const filteredIcons = useMemo(() => {
    return Object.keys(activeIcons).filter((icon) =>
      icon.toLowerCase().includes(search.toLowerCase()),
    );
  }, [activeIcons, search]);

  return (
    <>
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-11 px-3 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        {" "}
        <SelectedIcon className="text-purple-600 text-lg" />
        <span className="text-sm text-gray-600 hidden sm:block">Icon</span>
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Select Icon
                </h3>

                <p className="text-xs text-gray-400">
                  Search and choose an icon
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* SEARCH */}
            <div className="p-5 pb-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-purple-500">
                <FaSearch className="text-gray-400 text-sm" />

                <input
                  placeholder="Search icons..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* TABS */}
            <div className="px-5 pb-4 flex gap-2 border-b border-gray-100 overflow-x-auto">
              {Object.entries(ICON_GROUPS).map(([key, group]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                    activeTab === key
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            {/* GRID */}
            <div className="px-5 py-5 overflow-y-auto max-h-[500px]">
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                {filteredIcons.map((iconName) => {
                  const Icon = activeIcons[iconName];

                  const isActive = value === iconName;

                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        onChange(iconName);
                        setOpen(false);
                      }}
                      title={iconName}
                      className={`h-12 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-purple-100 text-purple-600 shadow-sm"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="text-lg" />
                    </button>
                  );
                })}
              </div>

              {filteredIcons.length === 0 && (
                <p className="text-center text-sm text-gray-400 mt-8">
                  No icons found
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
              <span>{filteredIcons.length} icons</span>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
