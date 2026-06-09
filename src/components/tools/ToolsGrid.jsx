import ToolCard from "./ToolCard";

const tools = [
  {
    title: "JSON Formatter",
    desc: "Format and validate JSON data instantly.",
    category: "Development",
    type: "Free",
    icon: "{ }",
  },
  {
    title: "Image Compressor",
    desc: "Compress images without losing quality.",
    category: "Utilities",
    type: "Free",
    icon: "🖼️",
  },
  {
    title: "SEO Analyzer",
    desc: "Analyze and improve SEO performance.",
    category: "SEO",
    type: "Freemium",
    icon: "📊",
  },
  {
    title: "Password Generator",
    desc: "Generate strong secure passwords.",
    category: "Security",
    type: "Free",
    icon: "🔐",
  },
];

export default function ToolsGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[1200px] mx-auto">

        <div className="text-center mb-10">
          <span className="text-xs px-4 py-1 bg-purple-100 text-purple-600 rounded-full">
            Our Collection
          </span>

          <h2 className="text-3xl font-semibold mt-4">
            Browse All Tools
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Find the perfect tool to solve your problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((t, i) => (
            <ToolCard key={i} tool={t} />
          ))}
        </div>

      </div>
    </section>
  );
}