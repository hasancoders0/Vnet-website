import JournalHero from "@/components/journal/JournalHero";
import JournalSidebar from "@/components/journal/JournalSidebar";
import FeaturedArticle from "@/components/journal/FeaturedArticle";
import ArticlesGrid from "@/components/journal/ArticlesGrid";

export default function JournalPage() {
  return (
    <>
      <JournalHero />

      <section className="bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-4 gap-8">

          <JournalSidebar />

          <div className="lg:col-span-3">
            <FeaturedArticle />
            <ArticlesGrid />
          </div>

        </div>
      </section>
    </>
  );
}