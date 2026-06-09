import { FaArrowRight } from "react-icons/fa";

export default function ToolCard({ tool }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition">

      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
        <span className="text-purple-600 text-lg">{tool.icon}</span>
      </div>

      <h3 className="font-semibold text-gray-800">{tool.title}</h3>

      <p className="text-sm text-gray-500 mt-2">{tool.desc}</p>

      <div className="flex items-center gap-2 mt-3 text-xs">
        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
          {tool.category}
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded-full">
          {tool.type}
        </span>
      </div>

      <button className="mt-4 text-sm text-purple-600 flex items-center gap-1">
        Open Tool <FaArrowRight />
      </button>
    </div>
  );
}