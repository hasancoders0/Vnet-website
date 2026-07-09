"use client";

import Link from "@/components/ui/AppLink";
import { useEffect } from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
    console.error("Error digest:", error?.digest);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] px-6">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <FaExclamationTriangle className="text-3xl text-red-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Something went wrong
        </h1>

        <p className="text-white/60 mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or return home.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 transition"
          >
            <FaHome />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}