"use client";

import { useState } from "react";
import { FiSend, FiClock, FiHeadphones } from "react-icons/fi";
import { toast } from "@/hooks/useToast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast("Message sent successfully!", "success");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast(error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 md:p-8 h-full flex flex-col">
      {/* Header */}
      <h3 className="text-[18px] font-bold text-slate-900 tracking-tight mb-1.5">
        Send Us a Message
      </h3>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-8">
        Fill out the form below and we will get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[13px] text-slate-600 font-medium mb-1.5 block">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200/70 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="text-[13px] text-slate-600 font-medium mb-1.5 block">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200/70 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-[13px] text-slate-600 font-medium mb-1.5 block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200/70 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="text-[13px] text-slate-600 font-medium mb-1.5 block">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200/70 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-[13px] text-slate-600 font-medium mb-1.5 block">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Write your message here..."
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200/70 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full sm:w-auto
            inline-flex items-center justify-center gap-2.5 
            px-7 py-3.5 rounded-xl 
            text-sm font-semibold 
            bg-slate-900 text-white 
            hover:bg-slate-800
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
            active:scale-[0.98]
            transition-all duration-200
          "
        >
          {loading ? "Sending..." : "Send Message"}
          <FiSend className="w-4 h-4" />
        </button>
      </form>

      {/* Bottom Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
        {/* Business Hours */}
        <div className="flex items-center gap-3.5 bg-slate-50/50 border border-slate-200/70 rounded-xl p-4">
          <div className="w-10 h-10 rounded-xl border border-blue-200/60 bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
            <FiClock className="text-sm" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900">
              Business Hours
            </p>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Mon - Fri: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Support Info */}
        <div className="flex items-center gap-3.5 bg-slate-50/50 border border-slate-200/70 rounded-xl p-4">
          <div className="w-10 h-10 rounded-xl border border-emerald-200/60 bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <FiHeadphones className="text-sm" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900">
              We are here to help!
            </p>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Our team is available during business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
