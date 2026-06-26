"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { toast } from "@/hooks/useToast";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/admin/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast("Login successful!");

      router.push("/administrator");
      router.refresh();
    } catch (error) {
      toast(error.message || "Invalid password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-5">
              <FiLock className="text-2xl text-blue-400" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Administrator Login
            </h1>

            <p className="text-white/50 text-sm mt-3">
              Enter your administrator password to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter administrator password"
                required
                autoFocus
                className="
                  w-full
                  px-4 py-3.5
                  rounded-2xl
                  bg-white/[0.05]
                  border border-white/10
                  text-white
                  placeholder:text-white/30
                  outline-none
                  transition-all
                  duration-200
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                flex items-center justify-center gap-2
                py-3.5
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-semibold
                transition-all
                duration-200
              "
            >
              {loading ? "Signing In..." : "Sign In"}

              {!loading && <FiArrowRight className="text-base" />}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-white/30 mt-8">
            Visionary Network • Secure Administrator Access
          </p>
        </div>
      </div>
    </section>
  );
}