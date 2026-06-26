"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBookOpen } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

import CardSlider from "@/components/ui/CardSlider";
import ArticleCard from "@/components/journal/ArticleCard";

gsap.registerPlugin(ScrollTrigger);

export default function Journal() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API Data
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        // FIXED: Check for both `data.blogs` (used in ArticlesGrid) and `data.data`
        const rawBlogs = data.blogs || data.data || [];

        if (Array.isArray(rawBlogs)) {
          const formattedBlogs = rawBlogs.slice(0, 10).map((blog) => ({
            slug: blog.slug || "",
            title: blog.title || "Untitled Article",
            description:
              blog.shortDescription ||
              blog.description ||
              blog.excerpt ||
              "Read this insightful article to learn more.",
            category: {
              name: blog.category?.name || blog.category || "General",
              slug: blog.category?.slug || "",
            },
            date: blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Oct 10, 2024",
            readTime: blog.readTime || "5 min read",
            image: blog.featuredImage || blog.image || "",
          }));

          setArticles(formattedBlogs);
        } else {
          console.error("API returned unexpected format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".journal-anim", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      }).from(
        sliderRef.current,
        {
          x: 60,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Fallback data in case the API fails or isn't connected yet
  const fallbackArticles = [
    {
      slug: "future-web-dev-2024",
      title: "The Future of Web Development in 2024",
      description:
        "Explore the upcoming trends, frameworks, and technologies shaping the digital landscape this year.",
      category: { name: "Technology", slug: "technology" },
      date: "Oct 15, 2024",
      readTime: "6 min read",
      image: "",
    },
    {
      slug: "increase-ecommerce-sales",
      title: "How to Increase E-commerce Sales Fast",
      description:
        "Proven strategies and UI tweaks that can boost your online store revenue by up to 40%.",
      category: { name: "Marketing", slug: "marketing" },
      date: "Oct 10, 2024",
      readTime: "5 min read",
      image: "",
    },
    {
      slug: "ui-ux-startups",
      title: "Why UI/UX is Crucial for Startups",
      description:
        "Learn why investing in user experience early on can save you thousands in development costs.",
      category: { name: "Design", slug: "design" },
      date: "Oct 05, 2024",
      readTime: "7 min read",
      image: "",
    },
    {
      slug: "react-best-practices",
      title: "React Performance Best Practices",
      description:
        "Optimize your React applications with these essential performance patterns and hooks.",
      category: { name: "Development", slug: "development" },
      date: "Sep 28, 2024",
      readTime: "8 min read",
      image: "",
    },
  ];

  // Use fetched articles or fallback
  const displayArticles =
    loading || articles.length === 0 ? fallbackArticles : articles;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 px-6 bg-[#f8fafc]"
    >
      <div className="max-w-[1280px] mx-auto lg:grid lg:grid-cols-[380px_1fr] lg:gap-12 lg:items-center">
        {/* ================= LEFT SIDE ================= */}
        <div className="w-full lg:sticky lg:top-32 text-center lg:text-left mb-10 lg:mb-0">
          {/* Badge */}
          <span className="journal-anim inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-6">
            <FaBookOpen className="w-3 h-3 text-blue-500" />
            Latest Articles
          </span>

          {/* Title */}
          <h2 className="journal-anim text-[30px] md:text-[38px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
            Our <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Journal
            </span>
          </h2>

          {/* Description */}
          <p className="journal-anim text-sm text-slate-500 leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
            Stay updated with the latest insights on design, development, and
            digital marketing.
          </p>

          {/* CTA Button */}
          <Link
            href="/journal"
            className="
              journal-anim inline-flex items-center gap-2.5 
              px-7 py-3.5 rounded-full 
              text-sm font-semibold 
              bg-slate-900 text-white 
              hover:bg-slate-800
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            Read All Articles
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ================= RIGHT SIDE SLIDER ================= */}
        <div ref={sliderRef} className="min-w-0">
          <CardSlider
            items={displayArticles}
            renderItem={(article) => (
              <ArticleCard
                slug={article.slug}
                title={article.title}
                description={article.description}
                category={article.category}
                date={article.date}
                readTime={article.readTime}
                image={article.image}
              />
            )}
            desktop={2}
            tablet={1}
            mobile={1}
            loop
            autoplay
            navigation
            pagination={false}
            centered={false}
            grabCursor
            className="px-2 lg:px-8"
          />
        </div>
      </div>
    </section>
  );
}
