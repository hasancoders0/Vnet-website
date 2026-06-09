"use client";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

export default function ReviewStep({ data }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", {
          cache: "no-store",
        });

        const result = await res.json();
        setCategories(result.data || []);
      } catch {
        console.error("Category fetch failed");
      }
    };

    fetchCategories();
  }, []);

  const categoryName =
    categories.find((c) => c._id === data.category)?.name || "-";

  const Icon = (name) => {
    const I = FaIcons[name] || FaIcons.FaStar;
    return <I className="text-purple-500 text-sm" />;
  };

  const safe = (val) => val || "-";

  const seo = data.seo || {};
  const whatYouGet = data.whatYouGet || {};

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Final Review
        </h3>
        <p className="text-sm text-gray-500">
          Make sure everything looks perfect before publishing
        </p>
      </div>

      {/* ================= BASIC ================= */}
      <Section title="Basic Info">
        <Grid>
          <Row label="Title" value={safe(data.title)} />
          <Row label="Slug" value={safe(seo.slug)} />
          <Row label="Category" value={categoryName} />
          <Row label="Badge" value={safe(data.badge)} />
        </Grid>
      </Section>

      {/* ================= DESCRIPTION ================= */}
      <Section title="Description">
        {data.fullDescription ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: data.fullDescription,
            }}
          />
        ) : (
          <p className="text-sm text-gray-400">
            No description provided
          </p>
        )}
      </Section>

      {/* ================= FEATURES ================= */}
      {data.features?.length > 0 && (
        <Section title="Features">
          <div className="grid md:grid-cols-2 gap-3">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                {Icon(f.icon)}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= WHAT YOU GET ================= */}
      {(whatYouGet.description || whatYouGet.items?.length > 0) && (
        <Section title="What You Get">
          {whatYouGet.description && (
            <p className="text-sm text-gray-600 mb-3">
              {whatYouGet.description}
            </p>
          )}

          <ul className="space-y-2 text-sm">
            {whatYouGet.items?.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-500">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ================= PRICING ================= */}
      {data.pricing?.length > 0 && (
        <Section title="Pricing Plans">
          <div className="grid md:grid-cols-3 gap-5">
            {data.pricing.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border transition
                ${
                  plan.highlighted
                    ? "border-purple-500 shadow-md scale-[1.02]"
                    : "border-gray-200"
                }`}
              >
                <h5 className="font-semibold text-gray-800">
                  {plan.title}
                </h5>

                <p className="text-3xl font-bold mt-2">
                  ${plan.price || 0}
                </p>

                <p className="text-xs text-gray-500 mb-3">
                  {plan.deliveryTime}
                </p>

                {plan.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {plan.description}
                  </p>
                )}

                <ul className="space-y-1 text-sm">
                  {plan.features?.map((f, j) => (
                    <li key={j}>✔ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= PROCESS ================= */}
      {data.process?.length > 0 && (
        <Section title="Process">
          <div className="space-y-2 text-sm text-gray-600">
            {data.process.map((p, i) => (
              <div key={i}>
                <p className="font-medium">{p.title}</p>
                <p className="text-gray-500">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= FAQ ================= */}
      {data.faq?.length > 0 && (
        <Section title="FAQ">
          <div className="space-y-4">
            {data.faq.map((f, i) => (
              <div key={i}>
                <p className="font-medium text-gray-800">
                  {f.question}
                </p>
                <p className="text-sm text-gray-500">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ================= SEO ================= */}
      <Section title="SEO">
        <Grid>
          <Row label="Meta Title" value={safe(seo.metaTitle)} />
          <Row label="Meta Description" value={safe(seo.metaDescription)} />
          <Row label="Keyword" value={safe(seo.focusKeyword)} />
        </Grid>
      </Section>

    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-800">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="text-sm text-gray-600">
      <span className="text-gray-400">{label}:</span>{" "}
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {children}
    </div>
  );
}