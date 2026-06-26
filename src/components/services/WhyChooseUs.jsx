import {
  FaShieldAlt,
  FaBolt,
  FaCog,
  FaHeadset,
} from "react-icons/fa";

const items = [
  {
    title: "Expert Team",
    desc: "Skilled professionals with real-world experience delivering top-tier solutions.",
    icon: FaShieldAlt,
    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },
  {
    title: "On-Time Delivery",
    desc: "We value your time and strictly adhere to our project schedules.",
    icon: FaBolt,
    iconStyle: "bg-purple-50 border-purple-200/60 text-purple-600",
  },
  {
    title: "Quality Focused",
    desc: "We never compromise on quality, adhering to the highest industry standards.",
    icon: FaCog,
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    title: "24/7 Support",
    desc: "Our dedicated support team is always available to assist you.",
    icon: FaHeadset,
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#f8fafc]">
      <div className="max-w-[1180px] mx-auto text-center">
        {/* HEADER */}
        <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider">
          Why Choose Us
        </span>

        <h2 className="text-[30px] md:text-[38px] font-bold mt-4 text-slate-900 tracking-tight">
          Why Clients Choose Us
        </h2>

        <p className="text-slate-500 mt-3 text-sm max-w-md mx-auto leading-relaxed">
          We combine expertise, speed, and dedication to bring your digital vision to life.
        </p>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border border-slate-200/70
                  bg-white
                  p-6
                  h-full
                  text-left
                  transition-all
                  duration-500
                  hover:-translate-y-1.5
                  group-hover:bg-slate-50
                  hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)]
                "
              >
                {/* ICON */}
                <div
                  className={`
                    w-12 h-12
                    rounded-2xl
                    border
                    flex items-center justify-center
                    text-[18px]
                    transition-transform duration-300
                    group-hover:scale-110
                    ${item.iconStyle}
                  `}
                >
                  <Icon />
                </div>

                {/* TITLE */}
                <h3 className="mt-5 text-[15px] font-semibold text-gray-800 leading-snug">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-[13px] text-gray-500 mt-2 leading-[1.65] group-hover:text-gray-600 transition-colors">
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