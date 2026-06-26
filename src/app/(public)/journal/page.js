import JournalHero from "@/components/journal/JournalHero";
import JournalSidebar from "@/components/journal/JournalSidebar";
import FeaturedArticle from "@/components/journal/FeaturedArticle";
import ArticlesGrid from "@/components/journal/ArticlesGrid";
import Pagination from "@/components/ui/Pagination";
import { PAGINATION } from "@/config/pagination";

import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import "@/models/Category";
import BlogCollectionSchema from "@/components/seo/BlogCollectionSchema";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";

const PAGE_SIZE = PAGINATION.BLOG;
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
      ]),
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

  category: {
    name: blog.category?.name || "Journal",
    slug: blog.category?.slug || "",
    icon: blog.category?.icon || "FaFolder",
  },

  tags: blog.tags || [],

  date: formatDate(blog.createdAt),

  readTime: estimateReadTime(blog),

  image: blog.featuredImage || blog.metaImage || "",
});
async function getCategories() {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
  })
    .populate("category", "name slug icon")
    .lean();

  const map = {};

  blogs.forEach((blog) => {
    if (!blog.category) return;

    const key = blog.category.slug;

    if (!map[key]) {
      map[key] = {
        name: blog.category.name,
        slug: blog.category.slug,
        icon: blog.category.icon,
        count: 0,
      };
    }

    map[key].count++;
  });

  return Object.values(map);
}
async function getTags() {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
  }).select("tags");

  const tagMap = {};

  blogs.forEach((blog) => {
    (blog.tags || []).forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  return Object.entries(tagMap)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

async function getAllPublishedArticles() {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
  })
    .populate("category", "name slug icon")
    .lean();

  return blogs.map(mapArticle);
}
async function getArticles({
  search = "",
  category = "",
  tag = "",
  sort = "newest",
  page = 1,
  limit = PAGE_SIZE,
}) {
  await connectDB();

  const query = {
    status: "published",
  };

  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        contentText: {
          $regex: search,
          $options: "i",
        },
      },
      {
        focusKeyword: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const blogs = await Blog.find(query)
    .populate("category", "name slug icon")
    .sort({ createdAt: -1 })
    .lean();

  let results = blogs;

  if (category) {
    results = results.filter((blog) => blog.category?.slug === category);
  }

  if (tag) {
    results = results.filter((blog) =>
      blog.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }
  if (sort === "oldest") {
    results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (sort === "az") {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "za") {
    results.sort((a, b) => b.title.localeCompare(a.title));
  }
  const totalArticles = results.length;

  const paginatedResults = results.slice((page - 1) * limit, page * limit);

  return {
    articles: paginatedResults.map(mapArticle),
    totalArticles,
  };
}
export const metadata = generatePageMetadata("journal", "/journal");
export default async function JournalPage({ searchParams }) {
  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";
  const tag = params?.tag || "";
  const sort = params?.sort || "newest";

  const page = Number(params?.page || 1);
  const limit =
    !search && !category && !tag && page === 1 ? PAGE_SIZE + 1 : PAGE_SIZE;

  const baseParams = new URLSearchParams();

  if (search) baseParams.set("search", search);
  if (category) baseParams.set("category", category);
  if (tag) baseParams.set("tag", tag);
  if (sort) baseParams.set("sort", sort);

  const [{ articles, totalArticles }, allPublishedArticles, categories, tags] =
    await Promise.all([
      getArticles({
        search,
        category,
        tag,
        sort,
        page,
        limit,
      }),
      getAllPublishedArticles(),
      getCategories(),
      getTags(),
    ]);

  const showFeatured = !search && !category && !tag && page === 1;

  const featuredArticle = showFeatured && articles.length ? articles[0] : null;

  const displayArticles = showFeatured ? articles.slice(1) : articles;

  const gridTotalPages = Math.max(
    1,
    Math.ceil((showFeatured ? totalArticles - 1 : totalArticles) / PAGE_SIZE),
  );

  return (
    <>
      <BlogCollectionSchema articles={allPublishedArticles} />
      <JournalHero />

      <section className="bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-4 gap-8">
          <JournalSidebar
            categories={categories}
            tags={tags}
            search={search}
            activeCategory={category}
            activeTag={tag}
          />

          <div id="results" className="lg:col-span-3">
            {showFeatured && featuredArticle && (
              <FeaturedArticle article={featuredArticle} />
            )}

            <ArticlesGrid
              articles={displayArticles}
              totalArticles={totalArticles}
              page={page}
              pageSize={PAGE_SIZE}
              search={search}
              category={category}
              tag={tag}
              sort={sort}
            />

            <Pagination
              page={page}
              totalPages={gridTotalPages}
              baseQuery={baseParams.toString()}
            />
          </div>
        </div>
      </section>
    </>
  );
}
