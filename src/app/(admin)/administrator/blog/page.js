import BlogStats from "@/components/admin/blog/BlogStats";
import BlogFilters from "@/components/admin/blog/BlogFilters";
import BlogTable from "@/components/admin/blog/BlogTable";

export default function BlogPage() {
  return (
    <div>

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Blog / Journal
        </h1>
        <p className="text-sm text-gray-500">
          Dashboard / Blog
        </p>
      </div>

      {/* STATS */}
      <BlogStats />

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">

        {/* FILTERS */}
        <BlogFilters />

        {/* TABLE */}
        <BlogTable />

      </div>

    </div>
  );
}