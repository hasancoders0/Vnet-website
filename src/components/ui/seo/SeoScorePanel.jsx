"use client";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import { evaluateSEO } from "@/lib/seo/rules";

// ================= HELPERS =================
const normalize = (text = "") => text.toLowerCase().trim();

const normalizeSlug = (text = "") =>
  normalize(text).replace(/[^a-z0-9]+/g, "-");

const includesKeyword = (text, keyword) =>
  normalize(text).includes(normalize(keyword));

const slugIncludesKeyword = (slug, keyword) =>
  normalizeSlug(slug).includes(normalizeSlug(keyword));

// ================= WORD / DENSITY =================
const getWordCount = (text = "") =>
  text.trim().split(/\s+/).filter(Boolean).length;

const getKeywordCount = (text = "", keyword = "") => {
  if (!text || !keyword) return 0;

  const clean = normalize(text);
  const key = normalize(keyword);

  return clean.split(key).length - 1;
};

const getDensity = (text = "", keyword = "") => {
  const total = getWordCount(text);
  if (!total) return 0;

  const count = getKeywordCount(text, keyword);
  return (count / total) * 100;
};

const getDensityStatus = (density) => {
  if (density >= 1 && density <= 2.5) return "good";
  if (density >= 0.5 && density < 1) return "ok";
  if (density > 2.5) return "ok";
  return "bad";
};

// ================= STATUS =================
const getStatus = (condition) => {
  if (condition === true) return "good";
  if (condition === "ok") return "ok";
  return "bad";
};

const getColor = (status) => {
  if (status === "good") return "text-green-600";
  if (status === "ok") return "text-yellow-500";
  return "text-red-500";
};

const getIcon = (status) => {
  if (status === "good") return <FaCheckCircle />;
  if (status === "ok") return <FaExclamationCircle />;
  return <FaTimesCircle />;
};

// ================= SCORE =================
const calculateScore = (checks, issues) => {
  let score = 0;

  checks.forEach((c) => {
    const status = getStatus(c.status);

    if (status === "good") score += 15;
    if (status === "ok") score += 8;
  });

  // penalty
  score -= issues.length * 5;

  return Math.max(0, Math.min(score, 100));
};

// ================= COMPONENT =================
export default function SeoScorePanel({
  metaTitle = "",
  metaDescription = "",
  fullDescription = "",
  slug = "",
  focusKeyword = "",
  metaImage = "",
}) {
  const content = fullDescription || metaDescription;

  // 🔥 DENSITY
  const density = getDensity(content, focusKeyword);
  const densityStatus = getDensityStatus(density);

  // 🔥 SOURCE OF TRUTH
  const issues = evaluateSEO({
    title: metaTitle,
    description: metaDescription,
    keyword: focusKeyword,
    slug,
    fullDescription,
  });

  // 🔥 UI CHECKS
  const checks = [
    {
      label: "Title length (50–60 chars)",
      status:
        metaTitle.length >= 50 && metaTitle.length <= 60
          ? "good"
          : metaTitle.length > 40
          ? "ok"
          : "bad",
    },
    {
      label: "Description length (120–160 chars)",
      status:
        metaDescription.length >= 120 &&
        metaDescription.length <= 160
          ? "good"
          : metaDescription.length > 80
          ? "ok"
          : "bad",
    },
    {
      label: "Keyword in title",
      status:
        focusKeyword &&
        includesKeyword(metaTitle, focusKeyword),
    },
    {
      label: "Keyword in description",
      status:
        focusKeyword &&
        includesKeyword(metaDescription, focusKeyword),
    },
    {
      label: "Keyword in slug",
      status:
        focusKeyword &&
        slugIncludesKeyword(slug, focusKeyword),
    },
    {
      label: `Keyword density (${density.toFixed(1)}%)`,
      status: densityStatus,
    },
    {
      label: "Open Graph image set",
      status: !!metaImage,
    },
  ];

  const score = calculateScore(checks, issues);

  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 50
      ? "text-yellow-500"
      : "text-red-500";

  const barColor =
    score >= 80
      ? "bg-green-500"
      : score >= 50
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-gray-800">
          SEO Analysis
        </h4>

        <span className={`text-sm font-semibold ${scoreColor}`}>
          {score}/100
        </span>
      </div>

      {/* PROGRESS */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* CHECKLIST */}
      <div className="space-y-3">
        {checks.map((check, i) => {
          const status = getStatus(check.status);

          return (
            <div
              key={i}
              className="flex items-center gap-3 text-sm"
            >
              <span className={getColor(status)}>
                {getIcon(status)}
              </span>

              <span
                className={`${
                  status === "good"
                    ? "text-gray-700"
                    : "text-gray-500"
                }`}
              >
                {check.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 🔥 ISSUES */}
      {issues.length > 0 && (
        <div className="pt-3 border-t border-gray-100 space-y-1">
          {issues.map((issue, i) => (
            <p
              key={i}
              className="text-xs text-red-500 flex items-center gap-2"
            >
              ⚠ {issue.text}
            </p>
          ))}
        </div>
      )}

      {/* ✅ PERFECT STATE */}
      {issues.length === 0 && (
        <p className="text-xs text-green-600 pt-2">
          ✔ Perfect SEO Optimization
        </p>
      )}

      {/* FOOTER */}
      {focusKeyword && (
        <p className="text-xs text-gray-400 pt-2">
          Ideal keyword density: 1% – 2.5%
        </p>
      )}
    </div>
  );
}