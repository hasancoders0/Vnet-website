"use client";

import Image from "next/image";
import { FaBullseye, FaHeart, FaLightbulb, FaUsers, FaStar } from "react-icons/fa";

const values = [
  {
    icon: <FaHeart className="text-base" />,
    title: "Integrity",
    desc: "We believe in transparency, honesty and building lasting trust with our clients.",
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    icon: <FaLightbulb className="text-base" />,
    title: "Innovation",
    desc: "We embrace new ideas and technologies to create better digital solutions.",
    iconStyle: "bg-sky-50 border-sky-200/60 text-sky-600",
  },
  {
    icon: <FaUsers className="text-base" />,
    title: "Collaboration",
    desc: "We work together, value diverse perspectives and achieve more as a team.",
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
  {
    icon: <FaStar className="text-base" />,
    title: "Excellence",
    desc: "We are committed to delivering the highest quality in everything we do.",
    iconStyle: "bg-pink-50 border-pink-200/60 text-pink-600",
  },
];

export default function AboutMission() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            Our Purpose
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight">
            Our Mission & Values
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT BIG CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-2xl border bg-blue-50 border-blue-200/60 text-blue-600 flex items-center justify-center">
                  <FaBullseye className="text-base" />
                </div>
                <h3 className="text-[18px] font-semibold text-slate-900">
                  Our Mission
                </h3>
              </div>

              <p className="text-[14px] text-slate-500 leading-[1.7]">
                To create digital products, tools, and resources that empower individuals and businesses to achieve more in the digital world.
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-[180px] mt-8">
              <Image
                src="/website-components/mountain.png"
                alt="mission illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* RIGHT VALUES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {values.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 flex flex-col hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl border flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                  <div className={`${item.iconStyle}`}>{item.icon}</div>
                </div>

                <h4 className="text-[15px] font-semibold text-slate-900 mb-1.5 leading-snug">
                  {item.title}
                </h4>

                <p className="text-[13px] text-slate-500 leading-[1.65] flex-grow">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}