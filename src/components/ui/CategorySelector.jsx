"use client";

import { useEffect, useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export default function CategorySelector({
  type,
  value,
  onChange,
}) {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // ================= FETCH =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `/api/categories?type=${type}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setCategories(data.data || []);
      } catch {
        console.log("Failed to load categories");
      }
    };

    fetchCategories();
  }, [type]);

  // ================= OUTSIDE CLICK =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = categories.find((c) => c._id === value);

  const SelectedIcon = selected
    ? FaIcons[selected.icon] || FaIcons.FaFolder
    : FaIcons.FaFolder;

  return (
    <div ref={ref} className="relative w-full">
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 h-11 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm"
      >
        <div className="flex items-center gap-2">
          <SelectedIcon className="text-purple-600 text-sm" />

          <span className="text-gray-700">
            {selected ? selected.name : "Select category"}
          </span>
        </div>

        <FaChevronDown
          className={`text-gray-400 text-xs transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-[250px] overflow-y-auto">
          
          {categories.length === 0 && (
            <div className="p-4 text-sm text-gray-400 text-center">
              No categories found
            </div>
          )}

          {categories.map((cat) => {
            const Icon =
              FaIcons[cat.icon] || FaIcons.FaFolder;

            return (
              <button
                type="button"
                key={cat._id}
                onClick={() => {
                  onChange(cat._id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition
                ${
                  value === cat._id
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="text-sm" />
                {cat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}