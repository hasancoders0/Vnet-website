"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import CommonBackground from "@/components/ui/CommonBackground";

import { FiArrowRight, FiFolder, FiCheckCircle } from "react-icons/fi";

export default function ServiceHero({ data }) {
  const words = data.title?.split(" ") || [];

  return (
    <CommonBackground>
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-36 md:pb-48">
        {/* Glow */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px]" />

        <div className="max-w-[1240px] mx-auto px-5 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/40 mb-10">
            <span>Home</span>
            <span>›</span>
            <span>Services</span>
            <span>›</span>

            <span className="text-white/80">{data.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div>
              {/* Badge */}
              {data.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                  <FiCheckCircle />
                  {data.badge}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                {words[0]}{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {words.slice(1).join(" ")}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-white/65 leading-8 max-w-xl mb-8">
                {data.subtitle}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {(data.features || []).slice(0, 6).map((item, i) => (
                  <div
                    key={i}
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-white/5
                      border border-white/10
                      backdrop-blur-sm
                      text-sm text-white/80
                      hover:border-blue-500/30
                      transition-all
                    "
                  >
                    <Icon name={item.icon} className="text-blue-400 text-sm" />

                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" rightIcon={<FiArrowRight />}>
                  Get Started
                </Button>

                <Button variant="outline" size="lg" leftIcon={<FiFolder />}>
                  View Projects
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl scale-90" />

              {/* Image Card */}
              <div
                className="
                  relative
                  h-[280px]
                  md:h-[420px]
                  rounded-3xl
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                "
              >
                <AppImage
                  src={data.heroImage}
                  alt={data.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <div
                className="
                  hidden md:flex
                  absolute
                  -bottom-6
                  -left-6
                  px-5 py-4
                  rounded-2xl
                  bg-slate-900/90
                  border border-white/10
                  backdrop-blur-xl
                  items-center gap-3
                "
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <FiCheckCircle className="text-blue-400" />
                </div>

                <div>
                  <p className="text-white font-semibold text-sm">
                    Professional Service
                  </p>

                  <p className="text-white/50 text-xs">
                    Trusted by 100+ Clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CommonBackground>
  );
}
