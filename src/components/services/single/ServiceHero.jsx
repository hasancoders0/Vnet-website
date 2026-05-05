"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function ServiceHero({ data }) {
  return (
    <div className="relative pt-28 pb-32">

      <div className="max-w-[1240px] mx-auto px-6">

        {/* BREADCRUMB */}
        <p className="text-sm text-white/50 mb-6">
          Home <span className="mx-2">›</span>
          Services <span className="mx-2">›</span>
          <span className="text-white font-medium">{data.title}</span>
        </p>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-white/10 border border-white/10 text-blue-400">
              {data.badge}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {data.title.split(" ")[0]}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {data.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="text-white/60 mb-6 max-w-lg">
              {data.subtitle}
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3 mb-8">
              {data.features.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                >
                  <Icon name={item.icon} className="text-blue-400 text-sm" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <Button>Get Started</Button>
              <Button variant="outline">View Projects</Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              <AppImage
                src={data.heroImage}
                alt={data.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}