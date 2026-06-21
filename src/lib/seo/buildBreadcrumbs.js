const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function buildBreadcrumbs(items = []) {
  return items.map((item) => ({
    name: item.name,
    url: `${SITE_URL}${item.path}`,
  }));
}