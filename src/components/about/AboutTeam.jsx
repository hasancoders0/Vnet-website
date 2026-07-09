"use client";

import Image from "next/image";
import Link from "@/components/ui/AppLink";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const team = [
  {
    name: "James Anderson",
    role: "Founder & CEO",
    img: "/website-components/user1.jpg",
    desc: "Visionary leader with a passion for building digital solutions that make a difference.",
  },
  {
    name: "Sophia Williams",
    role: "CTO",
    img: "/website-components/user3.jpg",
    desc: "Tech expert focused on creating powerful tools and seamless user experiences.",
  },
  {
    name: "Daniel Martinez",
    role: "Head of Design",
    img: "/website-components/user4.jpg",
    desc: "Design enthusiast crafting beautiful and user-friendly interfaces that inspire users.",
  },
  {
    name: "Olivia Thompson",
    role: "Marketing Lead",
    img: "/website-components/user2.jpg",
    desc: "Marketing strategist helping us connect with our audience and spread value.",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            Our Team
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight">
            Meet the People Behind Visionary Network
          </h2>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="
                group
                bg-white
                rounded-2xl
                border border-slate-200/70
                shadow-sm
                p-6
                text-center
                hover:-translate-y-1.5
                hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)]
                transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div className="w-20 h-20 mx-auto mb-5 relative rounded-full border-2 border-slate-100 overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* NAME */}
              <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">
                {member.name}
              </h3>

              {/* ROLE */}
              <p className="text-[11px] text-blue-600 font-medium uppercase tracking-wider mt-1 mb-3">
                {member.role}
              </p>

              {/* DESC */}
              <p className="text-[13px] text-slate-500 leading-[1.65] mb-5">
                {member.desc}
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex justify-center gap-2.5">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="
                    w-9 h-9 rounded-xl 
                    border border-slate-200/70 
                    bg-slate-50 
                    flex items-center justify-center 
                    text-slate-500 
                    hover:bg-slate-100 hover:text-slate-700 
                    active:scale-95
                    transition-all duration-200
                  "
                >
                  <FaTwitter className="text-xs" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="
                    w-9 h-9 rounded-xl 
                    border border-slate-200/70 
                    bg-slate-50 
                    flex items-center justify-center 
                    text-slate-500 
                    hover:bg-slate-100 hover:text-slate-700 
                    active:scale-95
                    transition-all duration-200
                  "
                >
                  <FaLinkedin className="text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-12">
          <Link
            href="/careers"
            className="
              inline-flex items-center gap-2.5 
              px-7 py-3.5 rounded-full 
              text-sm font-semibold 
              bg-slate-900 text-white 
              hover:bg-slate-800
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            Join Our Team
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}