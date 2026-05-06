"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreateServiceWizard from "@/components/admin/services/create/CreateServiceWizard";

export default function EditServicePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const res = await fetch(`/api/services/${id}`);
      const result = await res.json();
      setData(result.data);
    };

    fetchService();
  }, [id]);

  if (!data) {
    return <p className="p-6 text-sm text-gray-500">Loading...</p>;
  }

  return (
    <CreateServiceWizard
      initialData={data}
      mode="edit"
    />
  );
}