"use client";

import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/useToast";
import * as FaIcons from "react-icons/fa";
import {
  FaLayerGroup,
  FaBox,
  FaBlog,
  FaTools,
  FaTrash,
  FaCubes,
} from "react-icons/fa";

// ✅ IMPORT GLOBAL PICKER
import IconPicker from "@/components/ui/IconPicker";

const TYPES = [
  { label: "Services", value: "service", icon: FaLayerGroup },
  { label: "Products", value: "product", icon: FaBox },
  { label: "Templates", value: "template", icon: FaCubes },
  { label: "Blog", value: "blog", icon: FaBlog },
  { label: "Tools", value: "tool", icon: FaTools },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({});
  const [type, setType] = useState("service");

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("FaFolder");

  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/categories?type=${type}`, {
          cache: "no-store",
        });

        const data = await res.json();

        setCategories(data.data || []);
        setCounts(data.counts || {});
      } catch {
        toast("Failed to load categories", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [type]);

  // ================= CREATE =================
  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          icon,
        }),
      });

      if (!res.ok) throw new Error();

      const newCategory = await res.json();

      setCategories((prev) => [newCategory, ...prev]);

      toast("Category created", "success");

      setName("");
    } catch {
      toast("Failed to create category", "error");
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/categories/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setCategories((prev) =>
        prev.filter((c) => c._id !== deleteId)
      );

      toast("Category deleted", "success");
    } catch {
      toast("Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Categories
        </h2>
        <p className="text-sm text-gray-500">
          Organize your platform content
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {TYPES.map((t) => {
          const Icon = t.icon;

          return (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                ${
                  type === t.value
                    ? "bg-white shadow text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Icon />
              {t.label}
              <span className="text-xs bg-gray-200 px-2 rounded-full">
                {counts[t.value] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* CREATE (ONE LINE CLEAN) */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
            placeholder="Category name..."
            className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* ✅ GLOBAL ICON PICKER */}
          <IconPicker value={icon} onChange={setIcon} />

          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="h-11 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            Add Category
          </button>

        </div>
      </div>

      {/* MODERN LIST */}
      <div className="space-y-3">

        {loading ? (
          <div className="bg-white rounded-xl p-6 text-gray-400 text-sm border">
            Loading...
          </div>
        ) : !categories.length ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-400 border">
            No categories yet
          </div>
        ) : (
          categories.map((cat) => {
            const Icon =
              FaIcons[cat.icon] || FaIcons.FaFolder;

            return (
              <div
                key={cat._id}
                className="flex items-center justify-between px-5 py-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 flex items-center justify-center shadow-sm">
                    <Icon className="text-sm" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      /{cat.slug}
                    </p>
                  </div>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => setDeleteId(cat._id)}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 transition group"
                >
                  <FaTrash className="text-gray-400 group-hover:text-red-500 text-sm transition" />
                </button>

              </div>
            );
          })
        )}

      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">

            <p className="mb-4 text-sm text-gray-700">
              Delete this category?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="text-sm px-3 py-1.5 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}