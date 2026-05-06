"use client";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

export default function ReviewStep({ data }) {
  const [categories, setCategories] = useState([]);

  // ================= FETCH ALL CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", {
          cache: "no-store",
        });

        const result = await res.json();
        setCategories(result.data || []);
      } catch (err) {
        console.error("Category fetch failed");
      }
    };

    fetchCategories();
  }, []);

  // ================= FIND CATEGORY NAME =================
  const categoryName =
    categories.find((c) => c._id === data.category)?.name || "-";

  const Icon = (name) => {
    const I = FaIcons[name] || FaIcons.FaStar;
    return <I className="text-purple-500 text-sm" />;
  };

  const safe = (val) => val || "-";

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
      <Section title="Basic Info">
        <Row label="Title" value={safe(data.title)} />
        <Row label="Slug" value={safe(data.slug)} />

        {/* ✅ FIXED CATEGORY */}
        <Row label="Category" value={categoryName} />

        <Row label="Badge" value={safe(data.badge)} />
      </Section>

      {/* DESCRIPTION */}
      <Section title="Description">
        <p className="text-sm text-gray-600">
          {safe(data.shortDescription)}
        </p>

        {data.fullDescription && (
          <div
            className="prose prose-sm mt-3 max-w-none"
            dangerouslySetInnerHTML={{
              __html: data.fullDescription,
            }}
          />
        )}
      </Section>

      {/* FEATURES */}
      {data.features?.length > 0 && (
        <Section title="Features">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                {Icon(f.icon)}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* SUPPORT */}
      <Section title="Support">
        <p className="text-sm text-gray-600">
          {safe(data.support?.duration)} •{" "}
          {safe(data.support?.type)}
        </p>
      </Section>

      {/* WHAT YOU GET */}
      {data.whatYouGet?.length > 0 && (
        <Section title="What You Get">
          <ul className="space-y-2 text-sm text-gray-600">
            {data.whatYouGet.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span>✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* PRICING */}
      {data.pricing?.length > 0 && (
        <Section title="Pricing Plans">
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
                  ${plan.price || 0}
                </p>

                <p className="text-xs text-gray-500 mb-3">
                  {safe(plan.deliveryTime)}
                </p>

                <ul className="text-sm space-y-1">
                  {plan.features?.map((f, j) => (
                    <li key={j}>✔ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* PROCESS */}
      {data.process?.length > 0 && (
        <Section title="Process">
          <div className="space-y-2 text-sm text-gray-600">
            {data.process.map((p, i) => (
              <p key={i}>
                <b>{p.title}:</b> {p.description}
              </p>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {data.faq?.length > 0 && (
        <Section title="FAQ">
          <div className="space-y-3 text-sm text-gray-600">
            {data.faq.map((f, i) => (
              <div key={i}>
                <p className="font-medium">{f.question}</p>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* SEO */}
      <Section title="SEO">
        <Row label="Title" value={safe(data.metaTitle)} />
        <Row
          label="Description"
          value={safe(data.metaDescription)}
        />
      </Section>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h4 className="font-semibold text-gray-800 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <p className="text-sm text-gray-600">
      <b>{label}:</b> {value}
    </p>
  );
}