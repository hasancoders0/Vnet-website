import BlogContent from "@/components/journal/blog/BlogContent";
import BlogSidebar from "@/components/journal/blog/BlogSidebar";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import AppImage from "@/components/ui/AppImage";

export default async function SingleBlogPage({ params }) {
  // ✅ Fix for Next.js async params
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  // 🔍 Find post
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return notFound();

  return (
    <div className="relative">

      {/* 🔥 FULL-WIDTH BACKGROUND IMAGE */}
      <div className="absolute top-0 left-0 w-full -z-10">
        <AppImage
          src="/website-components/single-blog-top.png"
          alt="background"
          width={1920}
          height={500}
          priority
          className="w-full h-auto object-cover object-top"
        />
      </div>

      {/* 📄 MAIN CONTENT */}
      <section className="pt-28 pb-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            <BlogContent post={post} />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sticky top-24 h-fit">
            <BlogSidebar post={post} />
          </div>

        </div>
      </section>

      {/* 🔽 LIGHT BOTTOM SECTION */}
      <div className="bg-gray-50 h-20"></div>

    </div>
  );
}