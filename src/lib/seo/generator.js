// ================= HELPERS =================
const cleanText = (text = "") =>
  text.replace(/<[^>]*>/g, "").trim();

const normalize = (text = "") =>
  text.toLowerCase().trim();

// Avoid cutting words in middle
const trimSmart = (text = "", max = 160) => {
  if (text.length <= max) return text;

  const trimmed = text.slice(0, max);
  return trimmed.slice(0, trimmed.lastIndexOf(" "));
};

// ================= META TITLE =================
export function generateMetaTitle(title = "", keyword = "") {
  if (!title) return "";

  let result = title.trim();

  // ensure keyword is included
  if (
    keyword &&
    !normalize(result).includes(normalize(keyword))
  ) {
    result = `${keyword} | ${result}`;
  }

  // trim to 60 chars (SEO standard)
  if (result.length > 60) {
    result = trimSmart(result, 60);
  }

  return result;
}

// ================= META DESCRIPTION =================
export function generateMetaDescription(
  description = "",
  keyword = ""
) {
  if (!description) return "";

  let text = cleanText(description);

  // ensure keyword included
  if (
    keyword &&
    !normalize(text).includes(normalize(keyword))
  ) {
    text = `${keyword}. ${text}`;
  }

  // ideal length 120–160
  if (text.length > 160) {
    text = trimSmart(text, 160);
  }

  // ensure minimum quality
  if (text.length < 120 && keyword) {
    text += ` Learn more about ${keyword} and improve your results.`;
  }

  return text;
}

// ================= AUTO OPTIMIZER =================
export function autoOptimizeSEO({
  title = "",
  fullDescription = "",
  keyword = "",
  image = "",
}) {
  const cleanDesc = cleanText(fullDescription);

  // ---------------- TITLE ----------------
  const metaTitle = generateMetaTitle(title, keyword);

  // ---------------- DESCRIPTION ----------------
  let metaDescription = generateMetaDescription(
    cleanDesc,
    keyword
  );

  // ---------------- KEYWORD DENSITY ----------------
  const words = cleanDesc.split(/\s+/).length;

  const keywordCount =
    keyword && cleanDesc
      ? cleanDesc
          .toLowerCase()
          .split(normalize(keyword)).length - 1
      : 0;

  const density =
    words > 0 ? (keywordCount / words) * 100 : 0;

  // if density too low → boost keyword slightly
  if (keyword && density < 1) {
    metaDescription = `${keyword}. ${metaDescription}`;
  }

  // ---------------- SLUG ----------------
  const base = keyword || title;

  const slug = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    metaTitle,
    metaDescription,
    metaImage: image || "",
    slug,
  };
}