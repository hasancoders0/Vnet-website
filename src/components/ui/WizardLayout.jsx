"use client";

import Stepper from "@/components/ui/Stepper";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRocket,
} from "react-icons/fa";

export default function WizardLayout({
  title,
  description,
  steps = [],
  currentStep = 0,
  loading = false,
  onPrev,
  onNext,
  submitText = "Publish",
  updateText = "Update",
  mode = "create",
  children,
}) {
  const isLastStep =
    currentStep === steps.length - 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/70 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}

          <div className="mt-6">
            <Stepper
              steps={steps}
              current={currentStep}
            />
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="px-6 py-6 min-h-[500px]">
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </div>

      {/* FOOTER */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-gray-100">
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* LEFT */}
          <button
            type="button"
            onClick={onPrev}
            disabled={currentStep === 0 || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </button>

          {/* CENTER */}
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-gray-400">
              Progress
            </span>

            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          {/* RIGHT */}
          <button
            type="button"
            onClick={onNext}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}

            {!loading && isLastStep && (
              <FaRocket className="text-xs" />
            )}

            {!loading && !isLastStep && (
              <FaArrowRight className="text-xs" />
            )}

            {loading
              ? mode === "edit"
                ? "Updating..."
                : "Publishing..."
              : isLastStep
                ? mode === "edit"
                  ? updateText
                  : submitText
                : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}