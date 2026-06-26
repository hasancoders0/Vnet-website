import {
  FaDesktop,
  FaPencilRuler,
  FaCode,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const steps = [
  {
    id: "01",
    title: "Discuss & Plan",
    desc: "We understand your goals, requirements and create a clear plan.",
    icon: FaDesktop,
    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },
  {
    id: "02",
    title: "Design & Strategy",
    desc: "We create a strategy and design that aligns with your brand.",
    icon: FaPencilRuler,
    iconStyle: "bg-purple-50 border-purple-200/60 text-purple-600",
  },
  {
    id: "03",
    title: "Develop & Build",
    desc: "Our team develops your solution with clean and scalable code.",
    icon: FaCode,
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    id: "04",
    title: "Test & Optimize",
    desc: "We test everything thoroughly and optimize for performance.",
    icon: FaRocket,
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
  {
    id: "05",
    title: "Deliver & Support",
    desc: "We deliver the final product and provide ongoing support.",
    icon: FaCheckCircle,
    iconStyle: "bg-pink-50 border-pink-200/60 text-pink-600",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* HEADER */}
        <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider">
          Our Process
        </span>

        <h2 className="text-[30px] md:text-[38px] font-bold mt-4 text-slate-900 tracking-tight">
          Our Simple Process
        </h2>

        <p className="text-slate-500 mt-3 text-sm max-w-md mx-auto leading-relaxed">
          A proven process that ensures quality, transparency, and on-time delivery.
        </p>

        {/* PROCESS GRID */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* CARD */}
                <div
                  className="
                    w-full
                    bg-white
                    rounded-2xl
                    border border-slate-200/70
                    p-6
                    transition-all duration-300
                    hover:shadow-md
                    hover:-translate-y-1
                    group
                    h-full
                    text-center
                  "
                >
                  {/* Step Number */}
                  <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-widest">
                    STEP {step.id}
                  </span>

                  {/* Icon */}
                  <div
                    className={`
                      w-12 h-12
                      rounded-2xl
                      border
                      flex items-center justify-center
                      text-lg
                      mx-auto
                      mt-4
                      transition-transform duration-300
                      group-hover:scale-110
                      ${step.iconStyle}
                    `}
                  >
                    <Icon />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-slate-900 mt-4 text-[15px] leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-slate-500 text-[13px] mt-2 leading-[1.65]">
                    {step.desc}
                  </p>
                </div>

                {/* CONNECTING ARROW (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div
                    className="
                      hidden md:flex
                      absolute
                      -right-3
                      top-1/2
                      -translate-y-1/2
                      z-10
                      w-6 h-6
                      bg-slate-50
                      border border-slate-200
                      rounded-full
                      items-center
                      justify-center
                      text-slate-400
                    "
                  >
                    <FiArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}