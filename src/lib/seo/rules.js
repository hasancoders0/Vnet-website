import { SEO_CONFIG } from "@/config/seo.config";
import { includesNormalized, slugMatchesKeyword } from "./utils";
import { calculateKeywordDensity } from "./analyzer";

export function evaluateSEO({
  title = "",
  description = "",
  keyword = "",
  slug = "",
  fullDescription = "",
}) {
  const rules = [];

  // ================= TITLE =================
  if (
    title.length < SEO_CONFIG.title.min ||
    title.length > SEO_CONFIG.title.max
  ) {
    rules.push({
      type: "error",
      text: `Title should be ${SEO_CONFIG.title.min}-${SEO_CONFIG.title.max} chars`,
    });
  }

  // ================= DESCRIPTION =================
  if (
    description.length < SEO_CONFIG.description.min ||
    description.length > SEO_CONFIG.description.max
  ) {
    rules.push({
      type: "error",
      text: `Description should be ${SEO_CONFIG.description.min}-${SEO_CONFIG.description.max} chars`,
    });
  }

  // ================= KEYWORD =================
  if (!includesNormalized(title, keyword)) {
    rules.push({
      type: "error",
      text: "Keyword not in title",
    });
  }

  if (!includesNormalized(description, keyword)) {
    rules.push({
      type: "error",
      text: "Keyword not in description",
    });
  }

  if (!slugMatchesKeyword(slug, keyword)) {
    rules.push({
      type: "error",
      text: "Keyword not in URL",
    });
  }

  // ❌ REMOVE density from here
  // 👉 handled only in SeoScorePanel

  return rules;
}