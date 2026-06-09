import { includesNormalized, slugMatchesKeyword } from "./utils";
import { calculateKeywordDensity } from "./analyzer";
import { SEO_CONFIG } from "@/config/seo.config";

export function calculateSEOScore({
  title = "",
  description = "",
  fullDescription = "",
  keyword = "",
  slug = "",
  image = "",
}) {
  let score = 0;

  // ================= TITLE =================
  if (
    title.length >= SEO_CONFIG.title.min &&
    title.length <= SEO_CONFIG.title.max
  ) {
    score += 15;
  }

  if (includesNormalized(title, keyword)) {
    score += 15;
  }

  // ================= DESCRIPTION =================
  if (
    description.length >= SEO_CONFIG.description.min &&
    description.length <= SEO_CONFIG.description.max
  ) {
    score += 15;
  }

  if (includesNormalized(description, keyword)) {
    score += 15;
  }

  // ================= SLUG =================
  if (slugMatchesKeyword(slug, keyword)) {
    score += 10;
  }

  // ================= IMAGE =================
  if (image) {
    score += 10;
  }

  // ================= DENSITY =================
  const density = calculateKeywordDensity(
    fullDescription || description,
    keyword
  );

  if (
    density >= SEO_CONFIG.keywordDensity.min &&
    density <= SEO_CONFIG.keywordDensity.max
  ) {
    score += 10;
  }

  return Math.min(score, 100);
}