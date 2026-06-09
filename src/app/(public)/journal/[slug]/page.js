import BlogContent from "@/components/journal/blog/BlogContent";
import BlogSidebar from "@/components/journal/blog/BlogSidebar";
import { notFound } from "next/navigation";
import AppImage from "@/components/ui/AppImage";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import "@/models/Category";

export const dynamic = "force-dynamic";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const flattenContent = (sections = []) =>
  sections.flatMap((section, sectionIndex) => {
    const heading = section.title
      ? [
          {
            type: "heading",
            id: section.id || slugify(section.title) || `section-${sectionIndex + 1}`,
            text: section.title,
          },
        ]
      : [];

    const blocks = (section.blocks || []).flatMap((block, blockIndex) => {
      const id = block.id || `${sectionIndex + 1}-${blockIndex + 1}`;

      if (block.type === "text" && block.content) {
        return [{ type: "paragraph", text: stripHtml(block.content) }];
      }

      if (block.type === "list") {
        return [{ type: "list", items: block.items || [] }];
      }

      if (block.type === "quote" && block.quote) {
        return [{ type: "highlight", variant: "purple", text: block.quote }];
      }

      if (block.type === "split") {
        return [
          ...(block.title ? [{ type: "heading", id, text: block.title }] : []),
          ...(block.description
            ? [{ type: "paragraph", text: stripHtml(block.description) }]
            : []),
        ];
      }

      return [];
    });

    return [...heading, ...blocks];
  });

const estimateReadTime = (content) => {
  const words = content
    .map((item) => [item.text, ...(item.items || [])].filter(Boolean).join(" "))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const mapPost = (blog) => {
  const content = flattenContent(blog.content || []);

  return {
    _id: blog._id.toString(),
    slug: blog.slug,
    title: blog.title,
    description: blog.shortDescription || blog.metaDescription || "",
    category: blog.category?.name || "Journal",
    date: formatDate(blog.createdAt),
    readTime: estimateReadTime(content),
    views: "",
    image: blog.featuredImage || blog.metaImage || "/website-components/default-image.png",
    author: {
      name: "VNet Team",
      image: "/website-components/default-image.png",
    },
    content,
  };
};

async function getPost(slug) {
  await connectDB();

  const blog = await Blog.findOne({ slug, status: "published" })
    .populate("category", "name")
    .lean();

  return blog ? mapPost(blog) : null;
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <div className="relative">
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

      <section className="pt-28 pb-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <BlogContent post={post} />
          </div>

          <div className="sticky top-24 h-fit">
            <BlogSidebar post={post} />
          </div>
        </div>
      </section>

      <div className="bg-gray-50 h-20" />
    </div>
  );
}
