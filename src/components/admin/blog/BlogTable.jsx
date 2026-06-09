"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/useToast";

import DataTable from "@/components/ui/DataTable";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function BlogTable() {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/blogs", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Fetch failed");
      }

      setBlogs(data.data || []);
    } catch (err) {
      toast(err.message || "Failed to load blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blogs/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast("Blog deleted successfully", "success");

      // 🔥 refresh
      fetchBlogs();
    } catch (err) {
      toast(err.message || "Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  // ================= STATUS TOGGLE =================
  const toggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "published"
        ? "draft"
        : "published";

    try {
      // optimistic update
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast("Status updated", "success");
    } catch (err) {
      toast(err.message || "Failed to update", "error");

      // rollback
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, status: currentStatus }
            : b
        )
      );
    }
  };

  // ================= COLUMNS =================
  const columns = [
    {
      label: "Post",
      accessor: "title",
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-800">
            {value || "Untitled"}
          </p>
          <p className="text-xs text-gray-400">
            /{row.slug}
          </p>
        </div>
      ),
    },
    {
      label: "Category",
      accessor: "category",
      render: (value) => value?.name || "—",
    },
    {
      label: "Status",
      accessor: "status",
      render: (value, row) => {
        const isPublished = value === "published";

        return (
          <button
            onClick={() => toggleStatus(row._id, value)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition
              ${
                isPublished
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
              }`}
          >
            <FaCircle className="text-[8px]" />
            {isPublished ? "Published" : "Draft"}
          </button>
        );
      },
    },
    {
      label: "Sections",
      accessor: "content",
      render: (value) => value?.length || 0,
    },
    {
      label: "Date",
      accessor: "createdAt",
      render: (value) =>
        value
          ? new Date(value).toLocaleDateString()
          : "—",
    },
    {
      label: "Actions",
      accessor: "_id",
      className: "text-right",
      render: (_, row) => (
        <div className="flex justify-end gap-2">

          {/* VIEW */}
          <button
            onClick={() =>
              router.push(`/journal/${row.slug}`)
            }
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FaEye className="text-gray-500" />
          </button>

          {/* EDIT */}
          <button
            onClick={() =>
              router.push(
                `/administrator/blog/edit/${row._id}`
              )
            }
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FaEdit className="text-gray-500" />
          </button>

          {/* DELETE */}
          <button
            onClick={() => setDeleteId(row._id)}
            className="p-2 rounded-md hover:bg-red-50"
          >
            <FaTrash className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={blogs}
        loading={loading}
        emptyText="No blog posts found"
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Blog"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}