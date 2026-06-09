import {
  generateMetaTitle,
  generateMetaDescription,
} from "@/lib/seo/generator";

import { calculateKeywordDensity } from "@/lib/seo/analyzer";

export function useSeo({
  title,
  description,
  keyword,
}) {
  const metaTitle = generateMetaTitle(title, keyword);
  const metaDescription = generateMetaDescription(description, keyword);

  const density = calculateKeywordDensity(description, keyword);

  return {
    metaTitle,
    metaDescription,
    density,
  };
}