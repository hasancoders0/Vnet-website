import ServiceStats from "@/components/admin/services/ServiceStats";
import ServiceFilters from "@/components/admin/services/ServiceFilters";
import ServiceTable from "@/components/admin/services/ServiceTable";

export default function ServicesPage() {
  return (
    <div>

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Services
        </h1>
        <p className="text-sm text-gray-500">
          Dashboard / Services
        </p>
      </div>

      <ServiceStats />

      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <ServiceFilters />
        <ServiceTable />
      </div>

    </div>
  );
}