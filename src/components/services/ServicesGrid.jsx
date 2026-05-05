import {
  FaCode,
  FaLayerGroup,
  FaBullseye,
  FaComments,
  FaShoppingBag,
  FaWordpress,
  FaCheckCircle,
} from "react-icons/fa";

const services = [
  {
    title: "Website Development",
    desc: "Modern, responsive and SEO-friendly websites that represent your brand and convert visitors into customers.",
    price: "$199",
    icon: FaCode,
    gradient: "from-blue-500 to-blue-600",
    features: [
      "Custom Design",
      "Responsive Layout",
      "SEO Optimized",
      "Fast Performance",
    ],
  },
  {
    title: "Web Application Development",
    desc: "Scalable and secure web applications tailored to your business needs and built for performance.",
    price: "$499",
    icon: FaLayerGroup,
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Custom Functionality",
      "Secure & Scalable",
      "API Integration",
      "Database Solutions",
    ],
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies that increase your visibility, traffic and help you generate more leads.",
    price: "$149",
    icon: FaBullseye,
    gradient: "from-green-400 to-emerald-500",
    features: [
      "SEO Optimization",
      "Google Ads",
      "Content Strategy",
      "Social Media",
    ],
  },
  {
    title: "Consultation",
    desc: "Get expert advice and strategic guidance to take your business to the next level.",
    price: "$99/hr",
    icon: FaComments,
    gradient: "from-orange-400 to-orange-500",
    features: [
      "Business Strategy",
      "Digital Transformation",
      "Technology Consulting",
      "Growth Planning",
    ],
  },
  {
    title: "Shopify Development",
    desc: "Custom Shopify stores that are beautiful, fast and designed to boost your sales.",
    price: "$299",
    icon: FaShoppingBag,
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Custom Store Design",
      "App Integration",
      "Theme Customization",
      "Store Optimization",
    ],
  },
  {
    title: "WordPress Development",
    desc: "Powerful WordPress websites and solutions that are easy to manage and scale.",
    price: "$199",
    icon: FaWordpress,
    gradient: "from-blue-400 to-blue-600",
    features: [
      "Custom Themes",
      "Speed Optimization",
      "Plugin Development",
      "Maintenance",
    ],
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">

      <div className="max-w-[1200px] mx-auto">

        {/* ===== HEADER ===== */}
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

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group bg-white border border-gray-200 rounded-2xl p-6 
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* ICON */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white 
                  bg-gradient-to-r ${item.gradient} shadow-md`}
                >
                  <Icon />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold mt-5">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* FEATURES */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 text-sm">
                  {item.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-blue-500 text-xs" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-6">

                  <p className="text-sm font-semibold text-blue-600">
                    Starting at {item.price}
                  </p>

                  <button className="text-sm px-4 py-1.5 rounded-full border border-gray-300 
                    hover:bg-gray-100 transition">
                    View Details →
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}