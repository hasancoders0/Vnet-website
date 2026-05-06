"use client";

import { useEffect, useState, useCallback } from "react";
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

export default function ServiceTable() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/services", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Fetch failed");
      }

      setServices(data.data || []);
    } catch (err) {
      toast(err.message || "Failed to load services", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= EFFECT =================
  useEffect(() => {
    const load = async () => {
      await fetchServices();
    };
    load();
  }, [fetchServices]);

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/services/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setServices((prev) =>
        prev.filter((s) => s._id !== deleteId)
      );

      toast("Service deleted successfully", "success");
    } catch (err) {
      toast(err.message || "Delete failed", "error");
    } finally {
      setDeleteId(null);
    }
  };

  // ================= STATUS TOGGLE =================
  const toggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "active" ? "draft" : "active";

    try {
      // optimistic update
      setServices((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, status: newStatus } : s
        )
      );

      const res = await fetch(`/api/services/${id}`, {
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
      setServices((prev) =>
        prev.map((s) =>
          s._id === id
            ? { ...s, status: currentStatus }
            : s
        )
      );
    }
  };

  // ================= COLUMNS =================
  const columns = [
    {
      label: "Service",
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
        const isActive = value === "active";

        return (
          <button
            onClick={() => toggleStatus(row._id, value)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition
              ${
                isActive
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
              }`}
          >
            <FaCircle className="text-[8px]" />
            {isActive ? "Active" : "Draft"}
          </button>
        );
      },
    },
    {
      label: "Features",
      accessor: "features",
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
              router.push(`/services/${row.slug}`)
            }
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaEye className="text-gray-500" />
          </button>

          {/* EDIT */}
          <button
            onClick={() =>
              router.push(
                `/administrator/services/edit/${row._id}`
              )
            }
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaEdit className="text-gray-500" />
          </button>

          {/* DELETE */}
          <button
            onClick={() => setDeleteId(row._id)}
            className="p-2 rounded-md hover:bg-red-50 transition"
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
        data={services}
        loading={loading}
        emptyText="No services found"
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}