"use client";

import { useState, useMemo } from "react";
import * as FaIcons from "react-icons/fa";
import { FaSearch, FaTimes } from "react-icons/fa";

const iconKeys = Object.keys(FaIcons).slice(0, 300);

export default function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const SelectedIcon =
    FaIcons[value] || FaIcons.FaFolder;

  const filteredIcons = useMemo(() => {
    return iconKeys.filter((icon) =>
      icon.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="h-11 px-3 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        <SelectedIcon className="text-purple-600 text-lg" />
        <span className="text-sm text-gray-600 hidden sm:block">
          Icon
        </span>
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Select Icon
              </h3>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* SEARCH */}
            <div className="px-5 pb-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-purple-500 transition">
                <FaSearch className="text-gray-400 text-sm" />
                <input
                  placeholder="Search icons..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* ICON GRID */}
            <div className="px-5 pb-5 overflow-y-auto max-h-[420px]">
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">

                {filteredIcons.map((iconName) => {
                  const Icon = FaIcons[iconName];
                  const isActive = value === iconName;

                  return (
                    <button
                      key={iconName}
                      onClick={() => {
                        onChange(iconName);
                        setOpen(false);
                      }}
                      className={`flex items-center justify-center h-12 rounded-xl transition-all
                        ${
                          isActive
                            ? "bg-purple-100 text-purple-600 shadow-sm"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                        }`}
                    >
                      <Icon className="text-base" />
                    </button>
                  );
                })}

              </div>

              {filteredIcons.length === 0 && (
                <p className="text-center text-sm text-gray-400 mt-6">
                  No icons found
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="px-5 py-3 flex justify-between items-center text-xs text-gray-400">
              <span>{filteredIcons.length} icons</span>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
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