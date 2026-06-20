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
        return "max-w-6xl mx-auto lg:grid-cols-4";
      default:
        return "lg:grid-cols-5";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-6">
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            OUR PROCESS
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Our Working Process
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            A simple and transparent workflow designed to deliver
            high-quality results efficiently and on time.
          </p>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden lg:block relative">
          {process.length > 1 && (
            <div className="absolute top-8 left-0 right-0 z-0">
              <div className="max-w-[1000px] mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>
          )}

          <div
            className={`grid gap-10 relative z-10 ${getGridClass()}`}
          >
            {process.map((step, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="
                      w-16 h-16
                      rounded-2xl
                      bg-white
                      border border-slate-200
                      shadow-sm
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:-translate-y-1
                      group-hover:shadow-lg
                      group-hover:border-blue-200
                    "
                  >
                    <Icon
                      name={step.icon}
                      className="
                        text-blue-600
                        text-2xl
                      "
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-500 leading-7 max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

          <div className="space-y-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="relative flex gap-4"
              >
                {/* Icon */}
                <div
                  className="
                    relative z-10
                    w-12 h-12
                    rounded-xl
                    bg-white
                    border border-slate-200
                    shadow-sm
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  <Icon
                    name={step.icon}
                    className="text-blue-600 text-lg"
                  />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-6">
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