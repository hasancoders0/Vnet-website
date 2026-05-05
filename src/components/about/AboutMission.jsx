"use client";

import Image from "next/image";
import { FaBullseye, FaHeart, FaLightbulb, FaUsers, FaStar } from "react-icons/fa";

export default function AboutMission() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-xs px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
            OUR PURPOSE
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Our Mission & Values
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT BIG CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaBullseye className="text-purple-500 text-sm" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Our Mission
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                To create digital products, tools, and resources that empower individuals and businesses to achieve more in the digital world.
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-[160px]">
              <Image
                src="/website-components/mountain.png"
                alt="mission"
                fill
                className="object-contain"
              />
            </div>

          </div>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Integrity */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FaHeart className="text-green-500 text-sm" />
                </div>
                <p className="font-medium text-gray-900">Integrity</p>
              </div>
              <p className="text-sm text-gray-600">
                We believe in transparency, honesty and building trust.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaLightbulb className="text-indigo-500 text-sm" />
                </div>
                <p className="font-medium text-gray-900">Innovation</p>
              </div>
              <p className="text-sm text-gray-600">
                We embrace new ideas and technologies to create better solutions.
              </p>
            </div>

            {/* Collaboration */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <FaUsers className="text-orange-500 text-sm" />
                </div>
                <p className="font-medium text-gray-900">Collaboration</p>
              </div>
              <p className="text-sm text-gray-600">
                We work together, value diverse perspectives and achieve more.
              </p>
            </div>

            {/* Excellence */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaStar className="text-blue-500 text-sm" />
                </div>
                <p className="font-medium text-gray-900">Excellence</p>
              </div>
              <p className="text-sm text-gray-600">
                We are committed to delivering high quality in everything we do.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}