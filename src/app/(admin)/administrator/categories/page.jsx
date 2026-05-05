"use client";

import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/useToast";
import * as FaIcons from "react-icons/fa";
import {
  FaLayerGroup,
  FaBox,
  FaBlog,
  FaTools,
  FaSearch,
  FaTrash,
  FaCubes,
} from "react-icons/fa";

const TYPES = [
  { label: "Services", value: "service", icon: FaLayerGroup },
  { label: "Products", value: "product", icon: FaBox },
  { label: "Templates", value: "template", icon: FaCubes }, // ✅ NEW
  { label: "Blog", value: "blog", icon: FaBlog },
  { label: "Tools", value: "tool", icon: FaTools },
];

const iconKeys = Object.keys(FaIcons).slice(0, 200);

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({});
  const [type, setType] = useState("service");

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("FaFolder");

  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");

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
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          type,
          icon,
        }),
      });

      if (!res.ok) throw new Error();

      toast("Category created", "success");

      setCategories((prev) => [
        { _id: Date.now(), name, slug: name, type, icon },
        ...prev,
      ]);

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

  // ================= ICON FILTER =================
  const filteredIcons = iconKeys.filter((i) =>
    i.toLowerCase().includes(search.toLowerCase())
  );

  const SelectedIcon = FaIcons[icon] || FaIcons.FaFolder;

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

      {/* CREATE (ONE LINE) */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

          {/* INPUT */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
            placeholder="Category name..."
            className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* ICON BUTTON */}
          <button
            onClick={() => setShowPicker(true)}
            className="h-11 px-3 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
          >
            <SelectedIcon className="text-purple-600" />
            <span className="text-sm text-gray-600 hidden sm:block">
              Icon
            </span>
          </button>

          {/* ADD BUTTON */}
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="h-11 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            Add Category
          </button>

        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-6 text-gray-400 text-sm">
            Loading...
          </div>
        ) : !categories.length ? (
          <div className="p-10 text-center text-gray-400">
            No categories yet
          </div>
        ) : (
          <div className="divide-y">
            {categories.map((cat) => {
              const Icon =
                FaIcons[cat.icon] || FaIcons.FaFolder;

              return (
                <div
                  key={cat._id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Icon />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {cat.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        /{cat.slug}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setDeleteId(cat._id)}
                    className="p-2 rounded-lg hover:bg-red-50"
                  >
                    <FaTrash className="text-red-500 text-sm" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ICON PICKER */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3 border rounded-lg px-3 py-2">
              <FaSearch className="text-gray-400" />
              <input
                placeholder="Search icon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-6 gap-3 max-h-[250px] overflow-y-auto">
              {filteredIcons.map((ic) => {
                const I = FaIcons[ic];

                return (
                  <button
                    key={ic}
                    onClick={() => {
                      setIcon(ic);
                      setShowPicker(false);
                    }}
                    className="p-2 border rounded-lg hover:bg-gray-100"
                  >
                    <I className="text-sm" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <p className="mb-4 text-sm">
              Delete this category?
            </p>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)}>
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
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