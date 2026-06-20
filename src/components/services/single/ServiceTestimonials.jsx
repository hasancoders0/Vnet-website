"use client";

import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "James Anderson",
    role: "CEO, TechNova",
    rating: 5,
    message:
      "Visionary Network delivered an exceptional website that exceeded our expectations. The performance, design, and overall experience were outstanding.",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, GrowthLabs",
    rating: 5,
    message:
      "The team transformed our vision into a professional platform. Communication was excellent and the final result was beyond expectations.",
  },
  {
    name: "Michael Brown",
    role: "Marketing Director",
    rating: 5,
    message:
      "Fast delivery, modern design and excellent support. We continue to work with Visionary Network for all our web projects.",
  },
];

const stats = [
  {
    value: "150+",
    label: "Projects Completed",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
  },
  {
    value: "24/7",
    label: "Support",
  },
  {
    value: "5+",
    label: "Years Experience",
  },
];

export default function ServiceTestimonials() {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[active];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#020617]">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[140px]" />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-medium mb-5">
              TESTIMONIAL
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
              What Our Clients Say
            </h2>

            <FaQuoteLeft className="text-blue-400 text-2xl md:text-3xl opacity-70 mb-5" />

            {/* Rating */}
            <div className="flex gap-1 mb-5">
              {Array.from({
                length: testimonial.rating,
              }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
            </div>

            {/* Message */}
            <div className="min-h-[140px] md:min-h-[190px]">
              <p className="text-white/75 text-lg md:text-2xl leading-8 md:leading-10 transition-all duration-300">
                “{testimonial.message}”
              </p>
            </div>

            {/* Author */}
            <div className="mb-8">
              <h4 className="text-white text-lg md:text-xl font-semibold">
                {testimonial.name}
              </h4>

              <p className="text-white/50 text-sm md:text-base">
                {testimonial.role}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="
                  w-10 h-10 md:w-11 md:h-11
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-white
                  flex items-center justify-center
                  hover:bg-white/10
                  transition-all
                "
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="
                  w-10 h-10 md:w-11 md:h-11
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-white
                  flex items-center justify-center
                  hover:bg-white/10
                  transition-all
                "
              >
                <FiChevronRight />
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-2 md:ml-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${
                        active === index ? "w-8 bg-blue-500" : "w-2 bg-white/30"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((item, i) => (
              <div
                key={i}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur
                  p-6 md:p-8
                  transition-all duration-300
                  hover:bg-white/10
                  hover:-translate-y-1
                "
              >
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3">
                  {item.value}
                </h3>

                <p className="text-sm md:text-base text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
