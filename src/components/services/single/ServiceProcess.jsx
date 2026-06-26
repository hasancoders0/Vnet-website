"use client";

import Icon from "@/components/ui/Icon";

export default function ServiceProcess({ process = [] }) {
  if (!process.length) return null;

  const getGridClass = () => {
    switch (process.length) {
      case 1:
        return "max-w-sm mx-auto lg:grid-cols-1";
      case 2:
        return "max-w-2xl mx-auto lg:grid-cols-2";
      case 3:
        return "max-w-4xl mx-auto lg:grid-cols-3";
      case 4:
        return "max-w-5xl mx-auto lg:grid-cols-4";
      default:
        return "lg:grid-cols-5";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc]">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-6">
        
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            Our Process
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight mb-4">
            Our Working Process
          </h2>

          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            A simple and transparent workflow designed to deliver
            high-quality results efficiently and on time.
          </p>
        </div>

        {/* ================= DESKTOP VERSION ================= */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          {process.length > 1 && (
            <div className="absolute top-7 left-0 right-0 z-0">
              <div className="max-w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>
          )}

          <div className={`grid gap-10 relative z-10 ${getGridClass()}`}>
            {process.map((step, index) => (
              <div key={index} className="text-center group">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      border
                      bg-blue-50
                      border-blue-200/60
                      text-blue-600
                      flex items-center justify-center
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon name={step.icon} className="text-xl" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-[13px] text-slate-500 leading-[1.65] max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE VERSION ================= */}
        <div className="lg:hidden relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-slate-200/80" />

          <div className="space-y-8">
            {process.map((step, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className="
                    relative z-10
                    w-11 h-11
                    rounded-xl
                    border
                    bg-blue-50
                    border-blue-200/60
                    text-blue-600
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  <Icon name={step.icon} className="text-base" />
                </div>

                {/* Content */}
                <div className="pt-0.5">
                  {/* Step Number */}
                  <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-widest mb-1 block">
                    STEP {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[13px] text-slate-500 leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}