import {
  FaDesktop,
  FaPencilRuler,
  FaCode,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Discuss & Plan",
    desc: "We understand your goals, requirements and create a clear plan.",
    icon: FaDesktop,
    color: "bg-blue-100 text-blue-600",
    badge: "bg-blue-500",
  },
  {
    id: "02",
    title: "Design & Strategy",
    desc: "We create a strategy and design that aligns with your brand.",
    icon: FaPencilRuler,
    color: "bg-purple-100 text-purple-600",
    badge: "bg-purple-500",
  },
  {
    id: "03",
    title: "Develop & Build",
    desc: "Our team develops your solution with clean and scalable code.",
    icon: FaCode,
    color: "bg-teal-100 text-teal-600",
    badge: "bg-teal-500",
  },
  {
    id: "04",
    title: "Test & Optimize",
    desc: "We test everything thoroughly and optimize for performance.",
    icon: FaRocket,
    color: "bg-pink-100 text-pink-600",
    badge: "bg-pink-500",
  },
  {
    id: "05",
    title: "Deliver & Support",
    desc: "We deliver the final product and provide ongoing support.",
    icon: FaCheckCircle,
    color: "bg-orange-100 text-orange-600",
    badge: "bg-orange-500",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">

      <div className="max-w-[1200px] mx-auto text-center">

        {/* HEADER */}
        <span className="text-xs px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 font-medium">
          OUR PROCESS
        </span>

        <h2 className="text-[30px] md:text-[38px] font-bold mt-4">
          Our Simple Process
        </h2>

        <p className="text-gray-500 mt-3 text-sm">
          A proven process that ensures quality, transparency and on-time delivery.
        </p>

        {/* PROCESS */}
        <div className="mt-16 grid md:grid-cols-5 gap-6 items-center">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="relative flex flex-col items-center">

                {/* STEP BADGE */}
                <div className={`absolute -top-5 text-white text-xs w-8 h-8 flex items-center justify-center rounded-full ${step.badge}`}>
                  {step.id}
                </div>

                {/* CARD */}
                <div className="w-full bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition">

                  {/* ICON WRAPPER (BIG SOFT CIRCLE) */}
                  <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center relative">

                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color}`}>
                        <Icon />
                      </div>

                    </div>
                  </div>

                  {/* CONTENT */}
                  <h3 className="font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {step.desc}
                  </p>

                </div>

                {/* ARROW (DESKTOP ONLY) */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute right-[-18px] top-1/2 -translate-y-1/2 text-gray-300 text-xl">
                    →
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