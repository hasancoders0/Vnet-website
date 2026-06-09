import {
  FaSmile,
  FaBolt,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  {
    icon: FaSmile,
    title: "Easy to Use",
    desc: "Simple, intuitive and user-friendly tools.",
  },
  {
    icon: FaBolt,
    title: "Fast & Reliable",
    desc: "Blazing fast performance you can count on.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Private",
    desc: "Your data is 100% secure and never stored.",
  },
  {
    icon: FaSyncAlt,
    title: "Always Updated",
    desc: "Regular updates with new features.",
  },
];

export default function ToolsFeatures() {
  return (
    <section className="px-4 pb-20">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border grid md:grid-cols-4 overflow-hidden">

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

              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon className="text-purple-600" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {item.desc}
                </p>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}