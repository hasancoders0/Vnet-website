import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Icon from "@/components/ui/Icon";

const fallbackServices = [
  {
    title: "Website Development",
    desc: "Modern, responsive and SEO-friendly websites that represent your brand and convert visitors into customers.",
    price: "$199",
    icon: "FaCode",
    gradient: "from-blue-500 to-blue-600",
    features: ["Custom Design", "Responsive Layout", "SEO Optimized", "Fast Performance"],
  },
  {
    title: "Web Application Development",
    desc: "Scalable and secure web applications tailored to your business needs and built for performance.",
    price: "$499",
    icon: "FaLayerGroup",
    gradient: "from-purple-500 to-indigo-500",
    features: ["Custom Functionality", "Secure & Scalable", "API Integration", "Database Solutions"],
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies that increase your visibility, traffic and help you generate more leads.",
    price: "$149",
    icon: "FaBullseye",
    gradient: "from-emerald-400 to-emerald-500",
    features: ["SEO Optimization", "Google Ads", "Content Strategy", "Social Media"],
  },
];

const gradients = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-indigo-500",
  "from-emerald-400 to-emerald-500",
  "from-orange-400 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-sky-400 to-blue-600",
];

const iconThemes = {
  "from-blue-500 to-blue-600": "bg-blue-50 border-blue-200/60 text-blue-600",
  "from-purple-500 to-indigo-500": "bg-purple-50 border-purple-200/60 text-purple-600",
  "from-emerald-400 to-emerald-500": "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  "from-orange-400 to-orange-500": "bg-orange-50 border-orange-200/60 text-orange-600",
  "from-pink-500 to-rose-500": "bg-pink-50 border-pink-200/60 text-pink-600",
  "from-sky-400 to-blue-600": "bg-sky-50 border-sky-200/60 text-sky-600",
};

const normalizeServices = (items = []) =>
  items.map((item, index) => {
    const gradient = gradients[index % gradients.length];
    return {
      title: item.title,
      desc: item.shortDescription || "Explore this service and see how it can help your business grow.",
      price: item.pricing?.[0]?.price ? `$${item.pricing[0].price}` : "Custom",
      icon: item.features?.[0]?.icon || "FaCode",
      gradient: gradient,
      iconStyle: iconThemes[gradient] || "bg-blue-50 border-blue-200/60 text-blue-600",
      features: item.features?.length
        ? item.features.slice(0, 4).map((feature) => feature.label)
        : ["Modern Design", "Responsive Layout", "SEO Optimized", "Fast Performance"],
      slug: item.slug,
    };
  });

export default function ServicesGrid({ services = [] }) {
  const displayServices = services.length ? normalizeServices(services) : fallbackServices;

  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider">
            What We Offer
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold mt-4 text-slate-900 tracking-tight">
            Our Core Services
          </h2>

          <p className="text-slate-500 mt-3 text-sm max-w-md mx-auto leading-relaxed">
            High-quality services to help you build, grow and scale your business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((item, index) => {
            const Wrapper = item.slug ? Link : "div";
            const wrapperProps = item.slug ? { href: `/services/${item.slug}` } : {};

            return (
              <Wrapper
                key={item.slug || index}
                {...wrapperProps}
                className="group relative block"
              >
                {/* Gradient Border on Hover */}
                <div
                  className={`
                    absolute -inset-[1px]
                    rounded-2xl
                    bg-gradient-to-br
                    ${item.gradient}
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  `}
                />

                {/* Card Content */}
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200/70
                    bg-white
                    p-6
                    transition-all
                    duration-500
                    hover:-translate-y-1.5
                    group-hover:bg-slate-50
                    h-full
                    flex
                    flex-col
                  "
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-11 h-11
                      flex items-center justify-center
                      rounded-2xl
                      border
                      text-[16px]
                      transition-transform duration-500
                      group-hover:scale-110
                      ${item.iconStyle}
                    `}
                  >
                    <Icon name={item.icon} />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mt-4">
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-gray-500 mt-2 leading-[1.65] flex-grow group-hover:text-gray-600 transition-colors">
                    {item.desc}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-5 text-[13px]">
                    {item.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        {/* Custom Check Marker */}
                        <span
                          className="
                            flex-shrink-0
                            w-4 h-4
                            rounded-full
                            bg-emerald-50
                            border border-emerald-200/70
                            flex items-center justify-center
                            text-emerald-600
                          "
                        >
                          <FaCheck className="text-[8px]" />
                        </span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Starting at{" "}
                      <span className="text-blue-600">{item.price}</span>
                    </p>

                    {/* Sliding View Details */}
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
                      View Details
                      <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}