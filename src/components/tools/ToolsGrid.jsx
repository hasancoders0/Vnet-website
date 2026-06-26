"use client";

import { FaCode, FaImage, FaChartLine, FaLock } from "react-icons/fa";
import ToolCard from "./ToolCard";

const tools = [
  {
    title: "JSON Formatter",
    desc: "Format and validate JSON data instantly.",
    category: "Development",
    type: "Free",
    icon: <FaCode />,
  },
  {
    title: "Image Compressor",
    desc: "Compress images without losing quality.",
    category: "Utilities",
    type: "Free",
    icon: <FaImage />,
  },
  {
    title: "SEO Analyzer",
    desc: "Analyze and improve SEO performance.",
    category: "SEO",
    type: "Freemium",
    icon: <FaChartLine />,
  },
  {
    title: "Password Generator",
    desc: "Generate strong secure passwords.",
    category: "Security",
    type: "Free",
    icon: <FaLock />,
  },
];

export default function ToolsGrid() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            Our Collection
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight mb-3">
            Browse All Tools
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Find the perfect tool to solve your problems.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <ToolCard key={i} tool={tool} />
          ))}
        </div>

      </div>
    </section>
  );
}