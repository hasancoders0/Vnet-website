"use client";

import Image from "next/image";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

export default function AboutTeam() {
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

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-xs px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
            OUR TEAM
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Meet the People Behind Visionary Network
          </h2>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition"
            >

              {/* IMAGE */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* NAME */}
              <h3 className="text-sm font-semibold text-gray-900">
                {member.name}
              </h3>

              {/* ROLE */}
              <p className="text-xs text-indigo-600 font-medium mb-2">
                {member.role}
              </p>

              {/* DESC */}
              <p className="text-xs text-gray-500 mb-4">
                {member.desc}
              </p>

              {/* SOCIAL */}
              <div className="flex justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                  <FaTwitter className="text-gray-600 text-xs" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                  <FaLinkedin className="text-gray-600 text-xs" />
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <button className="px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition">
            Join Our Team
          </button>
        </div>

      </div>
    </section>
  );
}