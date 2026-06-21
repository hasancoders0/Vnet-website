import BlogContent from "@/components/journal/blog/BlogContent";
import BlogSidebar from "@/components/journal/blog/BlogSidebar";
import { notFound } from "next/navigation";
import CommonBackground from "@/components/ui/CommonBackground";
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
            id:
              section.id ||
              slugify(section.title) ||
              `section-${sectionIndex + 1}`,
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
  const sections = blog.content || [];

  return {
    _id: blog._id.toString(),
    categoryId: blog.category?._id?.toString(),
    slug: blog.slug,
    title: blog.title,
    description: blog.shortDescription || blog.metaDescription || "",
    category: blog.category?.name || "Journal",
    date: formatDate(blog.createdAt),

    readTime: estimateReadTime(flattenContent(blog.content || [])),

    views: "",

    image:
      blog.featuredImage ||
      blog.metaImage ||
      "/website-components/default-image.png",

    author: {
      name: "VNet Team",
      image: "/website-components/default-image.png",
    },

    sections,
  };
};

async function getPost(slug) {
  await connectDB();

  const blog = await Blog.findOne({ slug, status: "published" })
    .populate("category", "name _id")
    .lean();

  return blog ? mapPost(blog) : null;
}
async function getRelatedPosts(categoryId, currentSlug) {
  await connectDB();

  const posts = await Blog.find({
    category: categoryId,
    status: "published",
    slug: { $ne: currentSlug },
  })
    .select("title slug featuredImage metaImage createdAt")
    .limit(3)
    .lean();

  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    image:
      post.featuredImage ||
      post.metaImage ||
      "/website-components/default-image.png",
    date: formatDate(post.createdAt),
  }));
}
export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const relatedPosts = await getRelatedPosts(post.categoryId, post.slug);
  if (!post) return notFound();

  return (
    <>
      <CommonBackground overlay>
        <div className="h-160" />
      </CommonBackground>

      <section className="-mt-120 pb-20 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <BlogContent post={post} />
          </div>

          <div className="sticky top-24 h-fit">
            <BlogSidebar post={post} relatedPosts={relatedPosts} />
          </div>
        </div>
      </section>
    </>
  );
}
