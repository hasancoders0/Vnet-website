"use client";

import * as FaIcons from "react-icons/fa";

export default function ReviewStep({ data }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-10 space-y-20">

      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          {data.badge && (
            <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
              {data.badge}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {data.title || "Service Title"}
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            {data.subtitle}
          </p>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {data.fullDescription || data.shortDescription}
          </p>

          {/* TAGS */}
          {data.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {data.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* IMAGE */}
        {data.heroImage && (
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center text-sm text-gray-400">
            Image Preview:
            <div className="mt-2 text-xs break-all">
              {data.heroImage}
            </div>
          </div>
        )}
      </section>

      {/* ================= FEATURES ================= */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">
          Features
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {data.features?.map((f, i) => {
            const Icon = FaIcons[f.icon] || FaIcons.FaStar;

            return (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <Icon className="text-purple-600" />
                <span className="text-sm text-gray-700">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          What You Get
        </h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {data.whatYouGet?.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <span className="text-green-500 text-lg">✔</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-10 text-center">
          Pricing Plans
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.pricing?.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 transition-all
              ${
                plan.highlighted
                  ? "bg-white shadow-2xl scale-[1.05] border border-purple-500"
                  : "bg-white shadow-sm border border-gray-100"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 right-4 text-xs text-white bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>

              <p className="text-sm text-gray-500">
                {plan.description}
              </p>

              <h2 className="text-3xl font-bold mt-4 text-gray-900">
                ${plan.price}
              </h2>

              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {plan.features?.map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">
          Process
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {data.process?.map((step, i) => {
            const Icon = FaIcons[step.icon] || FaIcons.FaRocket;

            return (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Icon className="text-purple-600 text-sm" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">
          FAQ
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {data.faq?.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <p className="font-medium text-gray-900">
                {f.question}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}