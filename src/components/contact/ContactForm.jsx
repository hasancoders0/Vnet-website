"use client";

import { FaPaperPlane } from "react-icons/fa";

export default function ContactForm() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Send Us a Message
      </h3>
      <p className="text-gray-500 text-sm mb-8">
        Fill out the form below and we will get back to you.
      </p>

      <form className="space-y-5">

        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="John"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
            />
          </div>

        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="How can we help you?"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            placeholder="Write your message here..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm resize-none"
          />
        </div>

        {/* Button */}
        <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium shadow hover:scale-[1.03] transition">
          Send Message
          <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <FaPaperPlane className="text-xs" />
          </span>
        </button>

      </form>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
            ⏱
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Business Hours
            </p>
            <p className="text-xs text-gray-500">
              Mon - Fri: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
            🎧
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              We are here to help!
            </p>
            <p className="text-xs text-gray-500">
              Our team is available during business hours.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}