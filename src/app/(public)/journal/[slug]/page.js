import BlogContent from "@/components/journal/blog/BlogContent";
import BlogSidebar from "@/components/journal/blog/BlogSidebar";
import { notFound } from "next/navigation";
import CommonBackground from "@/components/ui/CommonBackground";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import "@/models/Category";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || "",
    metaImage: blog.metaImage || "",
    focusKeyword: blog.focusKeyword || "",
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    category: blog.category
      ? {
          _id: blog.category._id?.toString(),
          name: blog.category.name,
          icon: blog.category.icon,
        }
      : null,
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
    .populate("category", "name icon _id")
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
    .select(
      `
  title
  slug
  featuredImage
  metaImage
  shortDescription
  metaDescription
  createdAt
  content
  category
`,
    )
    .populate("category", "name icon")
    .limit(3)
    .lean();

  return posts.map((post) => ({
    title: post.title,

    slug: post.slug,

    description: post.shortDescription || post.metaDescription || "",

    category: post.category?.name || "Journal",

    readTime: estimateReadTime(flattenContent(post.content || [])),

    image:
      post.featuredImage ||
      post.metaImage ||
      "/website-components/default-image.png",

    date: formatDate(post.createdAt),
  }));
}
async function getAdjacentPosts(currentPostId) {
  await connectDB();

  const currentPost = await Blog.findById(currentPostId)
    .select("createdAt")
    .lean();

  if (!currentPost) {
    return {
      previous: null,
      next: null,
    };
  }

  const previous = await Blog.findOne({
    status: "published",
    createdAt: { $lt: currentPost.createdAt },
  })
    .sort({ createdAt: -1 })
    .select("title slug")
    .lean();

  const next = await Blog.findOne({
    status: "published",
    createdAt: { $gt: currentPost.createdAt },
  })
    .sort({ createdAt: 1 })
    .select("title slug")
    .lean();

  return {
    previous: previous
      ? {
          title: previous.title,
          slug: previous.slug,
        }
      : null,

    next: next
      ? {
          title: next.title,
          slug: next.slug,
        }
      : null,
  };
}
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) return notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vnet-it.com";

  const url = `${siteUrl}/journal/${post.slug}`;

  const title = post.metaTitle || `${post.title} | Visionary Network`;

  const description =
    post.metaDescription ||
    post.description ||
    "Read the latest insights from Visionary Network.";

  const image =
    post.metaImage || post.image || "/website-components/og-image.jpg";

  return {
    title,
    description,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "article",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  const relatedPosts = await getRelatedPosts(post.categoryId, post.slug);

  const adjacentPosts = await getAdjacentPosts(post._id);
  const breadcrumbs = [
    {
      name: "Home",
      path: "",
    },
    {
      name: "Journal",
      path: "/journal",
    },
    {
      name: post.title,
      path: `/journal/${post.slug}`,
    },
  ];

  return (
    <>
      <ArticleSchema post={post} />
      <BreadcrumbSchema items={breadcrumbs} />
      <CommonBackground>
        <div className="h-160" />
      </CommonBackground>

      <section className="-mt-120 pb-20 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <BlogContent
              post={post}
              relatedPosts={relatedPosts}
              adjacentPosts={adjacentPosts}
            />
          </div>

          <div className="sticky top-24 h-fit">
            <BlogSidebar post={post} relatedPosts={relatedPosts} />
          </div>
        </div>
      </section>
    </>
  );
}
