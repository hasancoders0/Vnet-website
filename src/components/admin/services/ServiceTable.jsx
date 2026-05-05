"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/useToast";

export default function ServiceTable() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/services", {
        cache: "no-store",
      });

      const data = await res.json();

      setServices(data.data || []);
    } catch {
      toast("Failed to load services", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchServices();
    };
    load();
  }, []);

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/services/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setServices((prev) => prev.filter((s) => s._id !== deleteId));

      toast("Service deleted", "success");
    } catch {
      toast("Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400">Loading services...</p>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!services.length) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm">
          No services found. Create your first service 🚀
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-7 px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
          <span>Service</span>
          <span>Category</span>
          <span>Status</span>
          <span>Features</span>
          <span>Date</span>
          <span className="text-right col-span-2">Actions</span>
        </div>

        {/* ROWS */}
        {services.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-7 px-6 py-5 items-center text-sm border-b last:border-0 border-gray-50 hover:bg-gray-50/40 transition"
          >
            <div className="font-medium text-gray-800">
              {item.title || "Untitled"}
            </div>

            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs w-fit">
              {item.badge || "General"}
            </span>

            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs w-fit">
              Active
            </span>

            <span className="text-gray-500">
              {item.features?.length || 0}
            </span>

            <span className="text-gray-400 text-sm">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 col-span-2">

              {/* VIEW */}
              <button
                onClick={() => router.push(`/services/${item.slug}`)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <FaEye className="text-gray-500" />
              </button>

              {/* EDIT */}
              <button
                onClick={() =>
                  router.push(`/administrator/services/edit/${item._id}`)
                }
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <FaEdit className="text-gray-500" />
              </button>

              {/* DELETE */}
              <button
                onClick={() => setDeleteId(item._id)}
                className="p-2 rounded-md hover:bg-red-50 transition"
              >
                <FaTrash className="text-red-500" />
              </button>

            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div className="px-6 py-4 text-sm text-gray-400 bg-gray-50/40">
          {services.length} services
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Service
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}