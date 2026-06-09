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
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          FAQ Section
        </h3>
        <p className="text-sm text-gray-500">
          Add common questions and answers
        </p>
      </div>

      {/* ================= SECTION ================= */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-6 space-y-6">

        {/* EMPTY STATE */}
        {faqs.length === 0 && (
          <div className="border border-dashed rounded-xl p-10 text-center bg-white">
            <p className="text-sm text-gray-400">
              No FAQs added yet
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Add frequently asked questions to help users
            </p>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = active === i;

            return (
              <div
                key={i}
                className={`rounded-xl border transition overflow-hidden
                ${
                  isOpen
                    ? "border-purple-400 bg-white shadow-sm"
                    : "border-gray-200 bg-white hover:shadow-sm"
                }`}
              >

                {/* HEADER */}
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
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
                  <div className="px-5 pb-5 pt-3 border-t space-y-4">

                    {/* QUESTION */}
                    <FormField label="Question" required>
                      <Input
                        placeholder="e.g. How long does delivery take?"
                        value={item.question}
                        onChange={(e) =>
                          updateFAQ(i, "question", e.target.value)
                        }
                      />
                    </FormField>

                    {/* ANSWER */}
                    <FormField label="Answer" required>
                      <Textarea
                        placeholder="Provide a clear and helpful answer..."
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
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition text-xs"
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
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-purple-600 text-white hover:opacity-90 transition"
        >
          <FaPlus className="text-xs" />
          Add FAQ
        </button>

      </div>

    </div>
  );
}