import { FiArrowRight } from "react-icons/fi";

export default function ToolCard({ tool }) {
  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        border border-slate-200/70
        shadow-sm
        p-6
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)]
        h-full
        flex
        flex-col
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          rounded-2xl
          border border-slate-200/70
          bg-slate-100
          flex items-center justify-center
          text-slate-600
          text-lg
          mb-4
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        {tool.icon}
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-gray-800 leading-snug">
        {tool.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-slate-500 leading-[1.65] mt-1.5 flex-grow">
        {tool.desc}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-4">
        <span className="rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1">
          {tool.category}
        </span>
        <span className="rounded-full bg-slate-50 text-slate-500 text-[11px] font-medium px-2.5 py-1">
          {tool.type}
        </span>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
          Free to use
        </span>

        {/* Sliding Open Tool Text */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            text-[12px]
            font-semibold
            text-blue-600
            opacity-0
            translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-500
          "
        >
          Open Tool
          <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}