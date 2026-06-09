"use client";

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaComments } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Get in Touch
      </h3>
      <p className="text-gray-500 text-sm mb-8">
        Choose the best way to reach us.
      </p>

      <div className="space-y-6">

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <FaEnvelope className="text-purple-500 text-sm" />
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm">Email Us</p>
            <p className="text-gray-500 text-xs">
              support@visionarynetwork.com
            </p>
            <p className="text-gray-400 text-xs">
              We will respond within 24 hours
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <FaPhoneAlt className="text-green-500 text-sm" />
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm">Call Us</p>
            <p className="text-gray-500 text-xs">+1 (123) 456-7890</p>
            <p className="text-gray-400 text-xs">
              Mon - Fri, 9AM - 6PM
            </p>
          </div>
        </div>

        {/* Office */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
            <FaMapMarkerAlt className="text-pink-500 text-sm" />
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm">Our Office</p>
            <p className="text-gray-500 text-xs">
              123 Innovation Drive <br />
              Suite 500, Tech City <br />
              New York, NY 10001, USA
            </p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FaComments className="text-blue-500 text-sm" />
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm">Live Chat</p>
            <p className="text-gray-500 text-xs">
              Available on our website
            </p>
            <p className="text-gray-400 text-xs mb-2">
              Mon - Fri, 9AM - 6PM
            </p>

            <button className="text-xs px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Start Chat →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}