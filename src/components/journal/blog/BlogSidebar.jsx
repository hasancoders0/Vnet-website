"use client";

import Link from "next/link";
import { toast } from "@/hooks/useToast";
import AppImage from "@/components/ui/AppImage";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaLink,
} from "react-icons/fa";
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

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://vnet-it.com"
  ).replace(/\/$/, "");

  const articleUrl = `${siteUrl}/journal/${post.slug}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast("Link copied successfully!", "success");
    } catch (err) {
      toast("Failed to copy link", "error");
      console.error(err);
    }
  };

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  return (
    <div className="space-y-5">
      {/* AUTHOR CARD */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm text-center">
        <AppImage
          src={post?.author?.image}
          alt={post?.author?.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-slate-100"
        />
        <h3 className="mt-4 text-[16px] font-semibold text-slate-900">
          {post?.author?.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Senior Web Developer & Writer
        </p>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          Sharing practical knowledge about web development, SEO, digital
          marketing, modern technologies, and online growth.
        </p>
      </div>

      {/* TABLE OF CONTENTS */}
      {tocItems.length > 0 && (
        <div className="hidden lg:block bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 text-[15px]">
            Table of Contents
          </h3>

          <ul className="space-y-1 text-sm">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`
                    flex items-start gap-3 pl-3 py-2 pr-2 border-l-2 transition-all duration-200 rounded-r-lg
                    ${
                      active === item.id
                        ? "border-blue-500 text-blue-600 font-medium bg-blue-50/50"
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }
                  `}
                >
                  <span className="text-[11px] mt-[3px] text-slate-400 font-mono min-w-[16px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SHARE THIS ARTICLE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 text-[15px]">
          Share this article
        </h3>

        <div className="flex gap-3">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 hover:scale-105 transition-all duration-200"
          >
            <FaFacebookF className="text-sm" />
          </a>

          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-100 hover:scale-105 transition-all duration-200"
          >
            <FaTwitter className="text-sm" />
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-100 hover:scale-105 transition-all duration-200"
          >
            <FaLinkedinIn className="text-sm" />
          </a>

          <button
            onClick={copyLink}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:scale-105 hover:text-slate-700 transition-all duration-200"
          >
            <FaLink className="text-sm" />
          </button>
        </div>
      </div>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-900 text-[15px]">
              Related Articles
            </h3>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors group"
            >
              View All
              <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/journal/${item.slug}`}
                className="flex gap-3 group"
              >
                <div className="relative w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                  <AppImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SUBSCRIBE NEWSLETTER */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white">
        <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
          Subscribe to our newsletter and never miss our latest articles.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="
            w-full px-4 py-3 rounded-xl text-sm text-slate-800 
            placeholder:text-slate-400 bg-white 
            outline-none mb-3 
            focus:ring-2 focus:ring-blue-500/30 focus:border-transparent
            transition-all duration-200
          "
        />

        <button className="
          w-full py-3 rounded-xl bg-blue-600 text-white 
          font-medium text-sm hover:bg-blue-700 
          transition-all duration-300 
          inline-flex items-center justify-center gap-2 group
          shadow-sm shadow-blue-600/20
        ">
          Subscribe
          <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}