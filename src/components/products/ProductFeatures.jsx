import {
  FaBolt,
  FaShieldAlt,
  FaSyncAlt,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: FaBolt,
    title: "Instant Access",
    desc: "Get your products instantly after purchase",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    desc: "100% secure payments through trusted gateways",
  },
  {
    icon: FaSyncAlt,
    title: "Regular Updates",
    desc: "Free lifetime updates on all digital products",
  },
  {
    icon: FaHeadset,
    title: "Dedicated Support",
    desc: "We’re here to help you anytime you need",
  },
];

export default function ProductFeatures() {
  return (
    <section className="px-4 pb-20">
      <div className="max-w-[1200px] mx-auto">

        <div className="bg-white rounded-2xl border border-gray-200 
          shadow-sm grid grid-cols-1 md:grid-cols-4 overflow-hidden">

          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className={`flex items-start gap-4 p-6 ${
                  i !== features.length - 1
                    ? "border-b md:border-b-0 md:border-r border-gray-200"
                    : ""
                }`}
              >

                {/* ICON */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center
                  bg-gradient-to-br from-purple-100 to-blue-100">

                  <Icon className="text-purple-600 text-lg" />

                </div>

                {/* TEXT */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}