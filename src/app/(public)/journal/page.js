import JournalHero from "@/components/journal/JournalHero";
import JournalSidebar from "@/components/journal/JournalSidebar";
import FeaturedArticle from "@/components/journal/FeaturedArticle";
import ArticlesGrid from "@/components/journal/ArticlesGrid";
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

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const estimateReadTime = (blog) => {
  const text = [
    blog.title,
    blog.shortDescription,
    ...(blog.content || []).flatMap((section) =>
      (section.blocks || []).flatMap((block) => [
        stripHtml(block.content),
        block.title,
        stripHtml(block.description),
        block.quote,
        ...(block.items || []),
      ])
    ),
  ]
    .filter(Boolean)
    .join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const mapArticle = (blog) => ({
  _id: blog._id.toString(),
  slug: blog.slug,
  title: blog.title,
  description: blog.shortDescription || blog.metaDescription || "",
  category: blog.category?.name || "Journal",
  date: formatDate(blog.createdAt),
  readTime: estimateReadTime(blog),
  image: blog.featuredImage || blog.metaImage || "/website-components/default-image.png",
});

async function getArticles() {
  await connectDB();

  const blogs = await Blog.find({ status: "published" })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();

  return blogs.map(mapArticle);
}

export default async function JournalPage() {
  const articles = await getArticles();
  const [featuredArticle, ...latestArticles] = articles;

  return (
    <>
      <JournalHero />

      <section className="bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-4 gap-8">
          <JournalSidebar />

          <div className="lg:col-span-3">
            <FeaturedArticle article={featuredArticle} />
            <ArticlesGrid articles={latestArticles.length ? latestArticles : articles} />
          </div>
        </div>
      </section>
    </>
  );
}
