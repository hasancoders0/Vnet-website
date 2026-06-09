import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
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
    gradient: "from-green-400 to-emerald-500",
    features: ["SEO Optimization", "Google Ads", "Content Strategy", "Social Media"],
  },
];

const gradients = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-orange-400 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-sky-400 to-blue-600",
];

const normalizeServices = (items = []) =>
  items.map((item, index) => ({
    title: item.title,
    desc: item.shortDescription || "Explore this service and see how it can help your business grow.",
    price: item.pricing?.[0]?.price ? `$${item.pricing[0].price}` : "Custom",
    icon: item.features?.[0]?.icon || "FaCode",
    gradient: gradients[index % gradients.length],
    features: item.features?.length
      ? item.features.slice(0, 4).map((feature) => feature.label)
      : ["Modern Design", "Responsive Layout", "SEO Optimized", "Fast Performance"],
    slug: item.slug,
  }));

export default function ServicesGrid({ services = [] }) {
  const displayServices = services.length ? normalizeServices(services) : fallbackServices;

  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 font-medium">
            WHAT WE OFFER
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold mt-4">
            Our Core Services
          </h2>

          <p className="text-gray-500 mt-3 text-sm">
            High-quality services to help you build, grow and scale your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((item, index) => {
            const card = (
              <div
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${item.gradient} shadow-md`}
                >
                  <Icon name={item.icon} />
                </div>

                <h3 className="text-lg font-semibold mt-5">{item.title}</h3>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 text-sm">
                  {item.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <FaCheckCircle className="text-blue-500 text-xs" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm font-semibold text-blue-600">
                    Starting at {item.price}
                  </p>

                  <span className="text-sm px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                    View Details
                  </span>
                </div>
              </div>
            );

            return item.slug ? (
              <Link key={item.slug} href={`/services/${item.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={index}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
