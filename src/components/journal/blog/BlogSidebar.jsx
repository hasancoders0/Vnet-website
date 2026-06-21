"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaLink } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function BlogSidebar({ post, relatedPosts = [] }) {
  const [active, setActive] = useState("");

  const tocItems = useMemo(() => {
    return (
      post?.sections?.flatMap((section, sectionIndex) => {
        const items = [];

        if (section.title) {
          items.push({
            id:
              section.id ||
              section.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, ""),
            label: section.title,
          });
        }

        (section.blocks || []).forEach((block, blockIndex) => {
          if (block.type === "split" && block.title) {
            items.push({
              id: block.id || `${sectionIndex + 1}-${blockIndex + 1}`,
              label: block.title,
            });
          }
        });

        return items;
      }) || []
    );
  }, [post]);

  useEffect(() => {
    if (!tocItems.length) return;

    const handleScroll = () => {
      let current = "";

      tocItems.forEach((item) => {
        const el = document.getElementById(item.id);

        if (el && window.scrollY >= el.offsetTop - 140) {
          current = item.id;
        }
      });

      setActive(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tocItems]);

  return (
    <div className="space-y-6">
      {/* AUTHOR */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
        <AppImage
          src={post?.author?.image}
          alt={post?.author?.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full mx-auto object-cover"
        />

        <h3 className="mt-4 text-[16px] font-semibold text-gray-900">
          {post?.author?.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Senior Web Developer & Writer
        </p>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          Sharing practical knowledge about web development, SEO, digital
          marketing, modern technologies, and online growth.
        </p>

        <div className="flex justify-center gap-3 mt-4">
          {[FaTwitter, FaLinkedinIn, FaFacebookF, FaLink].map((Icon, i) => (
            <div
              key={i}
              className="
                w-9 h-9
                rounded-full
                border border-gray-200
                flex items-center justify-center
                text-gray-600
                hover:bg-purple-600
                hover:text-white
                transition
                cursor-pointer
              "
            >
              <Icon className="text-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
      {tocItems.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">
            Table of Contents
          </h3>

          <ul className="space-y-3 text-sm">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-start gap-3 pl-3 border-l-2 transition ${
                    active === item.id
                      ? "border-purple-500 text-purple-600 font-medium"
                      : "border-transparent text-gray-600 hover:text-purple-600"
                  }`}
                >
                  <span className="text-xs mt-[2px]">{i + 1}.</span>

                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SHARE */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Share this article</h3>

        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <FaFacebookF />
          </div>

          <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
            <FaTwitter />
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
            <FaLinkedinIn />
          </div>

          <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
            <FaLink />
          </div>
        </div>
      </div>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Related Articles</h3>

            <Link href="/journal" className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors group">
              View All
              <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1"/>
            </Link>
          </div>

          <div className="space-y-4">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/journal/${item.slug}`}
                className="flex gap-3 group"
              >
                <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SUBSCRIBE */}
      <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-purple-600 to-blue-500">
        <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>

        <p className="text-sm text-white/80 mb-4">
          Subscribe to our newsletter and never miss our latest articles.
        </p>

        <input type="email" placeholder="Enter your email" className=" w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 bg-white outline-none mb-3"/>

        <button className=" w-full py-2.5 rounded-lg bg-white text-purple-600 font-medium transition-all duration-300 hover:bg-gray-100 inline-flex items-center justify-center gap-2 group">
          Subscribe
          <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1"/>
        </button>
      </div>
    </div>
  );
}
