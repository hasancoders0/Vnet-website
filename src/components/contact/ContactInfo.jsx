"use client";
import { SITE_CONFIG } from "@/config/site";
import Link from "@/components/ui/AppLink";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaComments,
} from "react-icons/fa";

const contactMethods = [
  {
    icon: <FaEnvelope className="text-base" />,
    title: "Email Us",

    value: SITE_CONFIG.email,

    sub: "We will respond within 24 hours",

    iconStyle: "bg-purple-50 border-purple-200/60 text-purple-600",
  },

  {
    icon: <FaPhoneAlt className="text-base" />,
    title: "Call Us",

    value: SITE_CONFIG.phone,

    sub: SITE_CONFIG.businessHours,

    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },

  {
    icon: <FaMapMarkerAlt className="text-base" />,
    title: "Our Office",

    value: SITE_CONFIG.address.line1,

    sub: SITE_CONFIG.address.line2,

    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },

  {
    icon: <FaComments className="text-base" />,
    title: "Live Chat",

    value: "Available on our website",

    sub: SITE_CONFIG.businessHours,

    isChat: true,

    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },

];

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 md:p-8 h-full flex flex-col">
      {/* Header */}
      <h3 className="text-[18px] font-bold text-slate-900 tracking-tight mb-1.5">
        Get in Touch
      </h3>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-8">
        Choose the best way to reach us.
      </p>

      {/* Methods List */}
      <div className="space-y-6 flex-grow">
        {contactMethods.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`
                w-12 h-12 
                rounded-2xl 
                border 
                flex items-center justify-center 
                flex-shrink-0
                transition-transform duration-300
                hover:scale-110
                ${item.iconStyle}
              `}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-slate-900 mb-0.5">
                {item.title}
              </p>
              {item.type === "email" ? (
                <a
                  href={`mailto:${item.value}`}
                  className="text-[13px] text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item.value}
                </a>
              ) : item.type === "phone" ? (
                <a
                  href={`tel:${item.value}`}
                  className="text-[13px] text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-[13px] text-slate-600 leading-snug">
                  {item.value}
                </p>
              )}
              <p className="text-[12px] text-slate-400 mt-1">{item.sub}</p>

              {/* Chat Action Button */}
              {item.isChat && (
                <Link
                  href="/coming-soon"
                  className="
                    inline-block
                    mt-3
                    text-[12px]
                    font-medium
                    px-4
                    py-2
                    rounded-full
                    border border-slate-200/70
                    text-slate-600
                    hover:bg-slate-50
                    hover:border-slate-300
                    hover:text-slate-800
                    active:scale-95
                    transition-all duration-200
                  "
                >
                  Live Chat Coming Soon →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
