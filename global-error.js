"use client";

import Link from "@/components/ui/AppLink";
import { FaHome, FaExclamationCircle } from "react-icons/fa";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#050816] px-6 text-white">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <FaExclamationCircle className="text-3xl text-red-400" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Critical Error
          </h1>

          <p className="text-white/60 leading-relaxed mb-8">
            Something went seriously wrong. Please return to the homepage or
            contact our support team.
          </p>

          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-xl
              bg-blue-600 text-white
              hover:bg-blue-700
              transition-colors
            "
          >
            <FaHome />
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}