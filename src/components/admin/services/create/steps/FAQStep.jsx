"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaChevronDown } from "react-icons/fa";

export default function FAQStep({ data, setData }) {
  const faqs = data.faq || [];
  const [active, setActive] = useState(null);

  const addFAQ = () => {
    setData({
      ...data,
      faq: [...faqs, { question: "", answer: "" }],
    });
    setActive(faqs.length);
  };

  const removeFAQ = (index) => {
    const updated = faqs.filter((_, i) => i !== index);
    setData({ ...data, faq: updated });
  };

  const updateFAQ = (index, key, value) => {
    const updated = [...faqs];
    updated[index][key] = value;
    setData({ ...data, faq: updated });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          FAQ Section
        </h3>
        <p className="text-sm text-gray-500">
          Add common questions and answers
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = active === i;

          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >

              {/* HEADER */}
              <button
                onClick={() => setActive(isOpen ? null : i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition"
              >
                <span className="text-sm font-medium text-gray-800">
                  {item.question || "Untitled Question"}
                </span>

                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-purple-500" : ""
                  }`}
                />
              </button>

              {/* CONTENT */}
              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t space-y-4">

                  {/* QUESTION */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">
                      Question
                    </label>
                    <input
                      placeholder="Enter question..."
                      value={item.question}
                      onChange={(e) =>
                        updateFAQ(i, "question", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>

                  {/* ANSWER */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">
                      Answer
                    </label>
                    <textarea
                      placeholder="Enter answer..."
                      value={item.answer}
                      onChange={(e) =>
                        updateFAQ(i, "answer", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none"
                    />
                  </div>

                  {/* DELETE */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFAQ(i)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 transition text-xs"
                    >
                      <FaTrash className="text-red-500" />
                      Remove
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={addFAQ}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 transition"
      >
        <FaPlus />
        Add FAQ
      </button>
    </div>
  );
}