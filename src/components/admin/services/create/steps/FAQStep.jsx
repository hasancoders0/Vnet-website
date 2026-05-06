"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaChevronDown } from "react-icons/fa";

import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";
import FormField from "@/components/ui/form/FormField";

export default function FAQStep({ data, setData }) {
  const faqs = data.faq || [];
  const [active, setActive] = useState(null);

  // ================= ADD =================
  const addFAQ = () => {
    setData((prev) => ({
      ...prev,
      faq: [...(prev.faq || []), { question: "", answer: "" }],
    }));

    setActive(faqs.length);
  };

  // ================= REMOVE =================
  const removeFAQ = (index) => {
    setData((prev) => ({
      ...prev,
      faq: (prev.faq || []).filter((_, i) => i !== index),
    }));

    // fix active index
    if (active === index) setActive(null);
  };

  // ================= UPDATE =================
  const updateFAQ = (index, key, value) => {
    setData((prev) => {
      const updated = [...(prev.faq || [])];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return {
        ...prev,
        faq: updated,
      };
    });
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

      {/* EMPTY */}
      {faqs.length === 0 && (
        <div className="border border-dashed rounded-xl p-6 text-center text-sm text-gray-400">
          No FAQs yet. Add your first question.
        </div>
      )}

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
                type="button"
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
                <div className="px-4 pb-4 pt-3 border-t space-y-4">
                  {/* QUESTION */}
                  <FormField label="Question" required>
                    <Input
                      placeholder="Enter question..."
                      value={item.question}
                      onChange={(e) =>
                        updateFAQ(i, "question", e.target.value)
                      }
                    />
                  </FormField>

                  {/* ANSWER */}
                  <FormField label="Answer" required>
                    <Textarea
                      placeholder="Enter answer..."
                      value={item.answer}
                      onChange={(e) =>
                        updateFAQ(i, "answer", e.target.value)
                      }
                      rows={3}
                    />
                  </FormField>

                  {/* DELETE */}
                  <div className="flex justify-end">
                    <button
                      type="button"
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
        type="button"
        onClick={addFAQ}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 transition"
      >
        <FaPlus />
        Add FAQ
      </button>
    </div>
  );
}