import CreateBlogWizard from "@/components/admin/blog/create/CreateBlogWizard";

export default function CreateBlogPage() {
  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Blog Post
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Build and publish a new blog article
        </p>
      </div>

      <CreateBlogWizard />
    </div>
  );
}