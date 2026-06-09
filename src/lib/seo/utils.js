export const normalizeText = (text = "") =>
  text.toLowerCase().trim();

export const normalizeSlug = (text = "") =>
  normalizeText(text).replace(/[^a-z0-9]+/g, "-");

export const normalizeKeyword = (text = "") =>
  normalizeText(text).replace(/[-_]/g, " ");

export const includesNormalized = (text = "", keyword = "") => {
  const t = normalizeText(text);
  const k = normalizeKeyword(keyword);
  return t.includes(k);
};

export const slugMatchesKeyword = (slug = "", keyword = "") => {
  const s = normalizeSlug(slug);
  const k = normalizeSlug(keyword);
  return s.includes(k);
};