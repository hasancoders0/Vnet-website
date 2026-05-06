"use client";

import * as FaIcons from "react-icons/fa";

export default function ReviewStep({ data }) {
  const Icon = (name) => {
    const I = FaIcons[name] || FaIcons.FaStar;
    return <I className="text-purple-500 text-sm" />;
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Review Your Service
        </h3>
        <p className="text-sm text-gray-500">
          Check everything before publishing
        </p>
      </div>

      {/* BASIC INFO */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">
          Basic Info
        </h4>

        <div className="space-y-2 text-sm text-gray-600">
          <p><b>Title:</b> {data.title}</p>
          <p><b>Slug:</b> {data.slug}</p>
          <p><b>Category:</b> {data.category}</p>
          <p><b>Badge:</b> {data.badge || "-"}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">
          Description
        </h4>

        <p className="text-sm text-gray-600">
          {data.shortDescription}
        </p>
      </div>

      {/* FEATURES */}
      {data.features?.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">
            Features
          </h4>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                {Icon(f.icon)}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUPPORT */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">
          Support
        </h4>

        <p className="text-sm text-gray-600">
          {data.support?.duration} • {data.support?.type}
        </p>
      </div>

      {/* WHAT YOU GET */}
      {data.whatYouGet?.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">
            What You Get
          </h4>

          <ul className="space-y-2 text-sm text-gray-600">
            {data.whatYouGet.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span>✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PRICING */}
      {data.pricing?.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-4">
            Pricing Plans
          </h4>

          <div className="grid md:grid-cols-3 gap-4">
            {data.pricing.map((plan, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  plan.highlighted
                    ? "border-purple-500"
                    : "border-gray-200"
                }`}
              >
                <h5 className="font-semibold">{plan.title}</h5>

                <p className="text-2xl font-bold mt-1">
                  ${plan.price}
                </p>

                <p className="text-xs text-gray-500 mb-3">
                  {plan.deliveryTime}
                </p>

                <ul className="text-sm space-y-1">
                  {plan.features?.map((f, j) => (
                    <li key={j}>✔ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROCESS */}
      {data.process?.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">
            Process
          </h4>

          <div className="space-y-2 text-sm text-gray-600">
            {data.process.map((p, i) => (
              <p key={i}>
                <b>{p.title}:</b> {p.description}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {data.faq?.length > 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">
            FAQ
          </h4>

          <div className="space-y-3 text-sm text-gray-600">
            {data.faq.map((f, i) => (
              <div key={i}>
                <p className="font-medium">{f.question}</p>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">
          SEO
        </h4>

        <div className="text-sm text-gray-600 space-y-1">
          <p><b>Title:</b> {data.metaTitle}</p>
          <p><b>Description:</b> {data.metaDescription}</p>
        </div>
      </div>

    </div>
  );
}