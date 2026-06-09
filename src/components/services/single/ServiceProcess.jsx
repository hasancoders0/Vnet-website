"use client";

import Icon from "@/components/ui/Icon";

export default function ServiceProcess({ process }) {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-500 font-medium mb-2">
            OUR PROCESS
          </p>
          <h2 className="text-3xl font-semibold text-gray-900">
            Our Development Process
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            A simple, transparent workflow designed to deliver high-quality results efficiently.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-5 gap-8 relative">

          {/* LINE (desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gray-200 z-0" />

          {(process || []).map((step, i) => (
            <div
              key={i}
              className="relative z-10 text-center flex flex-col items-center group"
            >

              {/* ICON */}
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-100 mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <Icon
                  name={step.icon}
                  className="text-blue-500 text-xl"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* DESC */}
              <p className="text-xs text-gray-500 max-w-[180px] leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
