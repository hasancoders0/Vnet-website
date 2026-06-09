import { normalizeText } from "./utils";

export function generateSeoSuggestions({
  title = "",
  description = "",
  keyword = "",
}) {
  const suggestions = [];

  const cleanTitle = title.trim();
  const cleanDesc = description.trim();

  const keywordLower = normalizeText(keyword);

  // ================= TITLE =================
  if (cleanTitle.length < 50) {
    suggestions.push({
      type: "title",
      label: "Improve Title Length",
      value: `${keyword} | ${cleanTitle}`,
    });
  }

  if (
    keyword &&
    !normalizeText(cleanTitle).includes(keywordLower)
  ) {
    suggestions.push({
      type: "title",
      label: "Add keyword to title",
      value: `${keyword} | ${cleanTitle}`,
    });
  }

  // ================= DESCRIPTION =================
  if (cleanDesc.length < 120) {
    suggestions.push({
      type: "description",
      label: "Expand description",
      value: `${keyword}. ${cleanDesc} Learn more about ${keyword} and improve performance.`,
    });
  }

  if (
    keyword &&
    !normalizeText(cleanDesc).includes(keywordLower)
  ) {
    suggestions.push({
      type: "description",
      label: "Add keyword to description",
      value: `${keyword}. ${cleanDesc}`,
    });
  }

  // ================= ADVANCED =================
  if (keyword) {
    suggestions.push({
      type: "title",
      label: "High CTR title",
      value: `Best ${keyword} Services | Scalable & Fast`,
    });

    suggestions.push({
      type: "description",
      label: "High converting description",
      value: `Professional ${keyword} solutions built with modern technology. Fast, scalable, and optimized for SEO and performance.`,
    });
  }

  return suggestions;
}