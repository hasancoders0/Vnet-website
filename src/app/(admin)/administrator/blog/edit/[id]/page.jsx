"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/useToast";

import CreateBlogWizard from "@/components/admin/blog/create/CreateBlogWizard";

export default function EditBlogPage() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/blogs/${id}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch blog");
        }

        setBlog(data.data);
      } catch (err) {
        toast(err.message || "Error loading blog", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading blog...
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!blog) {
    return (
      <div className="p-6 text-sm text-red-500">
        Blog not found
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <div>
      <CreateBlogWizard
        initialData={blog}
        mode="edit"
      />
    </div>
  );
}