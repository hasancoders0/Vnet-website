import {
  FaShieldAlt,
  FaBolt,
  FaCog,
  FaHeadset,
} from "react-icons/fa";

const items = [
  {
    title: "Expert Team",
    desc: "Skilled professionals with real-world experience.",
    icon: FaShieldAlt,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "On-Time Delivery",
    desc: "We value your time and deliver on schedule.",
    icon: FaBolt,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Quality Focused",
    desc: "We never compromise on quality and best practices.",
    icon: FaCog,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always here to help you.",
    icon: FaHeadset,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">

      <div className="max-w-[1180px] mx-auto text-center">

        {/* HEADER */}
        <span className="text-[11px] px-4 py-1.5 rounded-full bg-green-100 text-green-600 font-medium tracking-wide">
          WHY CHOOSE US
        </span>

        <h2 className="text-[32px] md:text-[38px] font-semibold mt-4 tracking-tight">
          Why Clients Choose Us
        </h2>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group rounded-2xl p-6 text-left 
                bg-white border border-gray-100 
                shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]
                transition-all duration-300"
              >

                {/* ICON */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
                  <Icon className={`${item.color}`} size={18} />
                </div>

                {/* TITLE */}
                <h3 className="mt-5 text-[15px] font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}