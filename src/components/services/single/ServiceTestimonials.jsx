"use client";

import { FaStar } from "react-icons/fa";

const testimonial = {
  name: "James Anderson",
  role: "CEO, TechNova",
  message:
    "Visionary Network delivered an exceptional website that exceeded our expectations. The performance, design, and overall experience were outstanding.",
  rating: 5,
};

export default function ServiceTestimonials() {
  return (
    <section className="py-20 bg-[#020617] text-white relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <p className="text-sm text-blue-400 mb-2">
            TESTIMONIAL
          </p>

          <h2 className="text-3xl font-semibold mb-6">
            What Our Clients Say
          </h2>

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
          </div>

          {/* Message */}
          <p className="text-white/70 text-lg mb-6 leading-relaxed">
            “{testimonial.message}”
          </p>

          {/* Client */}
          <div>
            <h4 className="font-semibold">
              {testimonial.name}
            </h4>
            <p className="text-white/50 text-sm">
              {testimonial.role}
            </p>
          </div>

        </div>

        {/* RIGHT (Stats Cards) */}
        <div className="grid grid-cols-2 gap-6">

          {[
            { value: "150+", label: "Projects Completed" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support" },
            { value: "5+", label: "Years Experience" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur hover:bg-white/10 transition"
            >
              <h3 className="text-2xl font-bold">
                {item.value}
              </h3>
              <p className="text-white/60 text-sm">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}