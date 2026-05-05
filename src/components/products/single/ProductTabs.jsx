"use client";

import { useState } from "react";

import OverviewTab from "./tabs/OverviewTab";
import FeaturesTab from "./tabs/FeaturesTab";
import IncludedTab from "./tabs/IncludedTab";
import ChangelogTab from "./tabs/ChangelogTab";
import ReviewsTab from "./tabs/ReviewsTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "included", label: "What's Included" },
  { id: "changelog", label: "Changelog" },
  { id: "reviews", label: "Reviews" },
];

export default function ProductTabs({ product, reviews = [] }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section className="bg-gray-50 py-20 -mt-16 relative z-10">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* TAB HEADER */}
        <div className="flex gap-6 border-b border-gray-200 mb-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-600" />
              )}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="bg-white rounded-2xl p-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">

              {activeTab === "overview" && (
                <OverviewTab product={product} />
              )}

              {activeTab === "features" && (
                <FeaturesTab product={product} />
              )}

              {activeTab === "included" && (
                <IncludedTab product={product} />
              )}

              {activeTab === "changelog" && (
                <ChangelogTab product={product} />
              )}

              {activeTab === "reviews" && (
                <ReviewsTab reviews={reviews} />
              )}

            </div>

            {/* RIGHT SIDE (ONLY HIRE US) */}
            <div className="space-y-6">

              <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br from-[#0b1a3a] via-[#1a2b5c] to-[#4c1d95]">

                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#8b5cf6,_transparent)]" />

                <div className="relative z-10">

                  <h4 className="text-lg font-semibold mb-2">
                    Need Customization?
                  </h4>

                  <p className="text-sm text-white/80 mb-4">
                    We can customize this template as per your requirements.
                  </p>

                  <button className="px-4 py-2 bg-white text-purple-600 text-sm font-medium rounded-lg hover:opacity-90 transition">
                    Hire Us →
                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}