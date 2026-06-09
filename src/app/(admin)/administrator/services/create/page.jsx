import CreateServiceWizard from "@/components/admin/services/create/CreateServiceWizard";

export default function CreateServicePage() {
  return (
    <div className="max-w-[1100px] mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Add New Service
        </h1>
        <p className="text-sm text-gray-500">
          Dashboard / Services / Create
        </p>
      </div>

      <CreateServiceWizard />
    </div>
  );
}