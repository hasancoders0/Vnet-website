"use client";

import AppImage from "@/components/ui/AppImage";
import CommonBackground from "@/components/ui/CommonBackground";
import { FaBolt, FaShieldAlt, FaUserFriends, FaEnvelope } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="text-base" />,
    title: "Quick Response",
    desc: "We reply within 24 hours",
    iconStyle: "bg-purple-500/10 border-purple-400/20 text-purple-400",
  },
  {
    icon: <FaShieldAlt className="text-base" />,
    title: "Trusted Support",
    desc: "Your data is safe with us",
    iconStyle: "bg-blue-500/10 border-blue-400/20 text-blue-400",
  },
  {
    icon: <FaUserFriends className="text-base" />,
    title: "Real People",
    desc: "Talk to our friendly team",
    iconStyle: "bg-emerald-500/10 border-emerald-400/20 text-emerald-400",
  },
];

export default function ContactHero() {
  return (
    <CommonBackground>
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-32 lg:pb-40">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ================= LEFT ================= */}
          <div className="text-white">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-8">
              <FaEnvelope className="w-3 h-3 text-blue-400" />
              Contact Us
            </span>

            {/* Title */}
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Let’s Talk About <br />
              Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Next Project
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed max-w-[520px] mb-10">
              Have a question or want to work together? We’d love to hear from you.
              Send us a message and we’ll respond as soon as possible.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              {features.map((item, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0 ${item.iconStyle}`}>
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-white font-medium text-[14px]">
                      {item.title}
                    </p>
                    <p className="text-white/50 text-[12px] mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <AppImage
                src="/website-components/contact-top.png"
                alt="contact illustration"
                width={580}
                height={480}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </section>
    </CommonBackground>
  );
}