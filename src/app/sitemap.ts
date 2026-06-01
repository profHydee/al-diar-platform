import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { menuItems, blogPosts } from "@/lib/mock/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = ["", "/menu", "/order", "/reservations", "/catering", "/locations", "/about", "/blog", "/contact"].map(
    (path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })
  );

  const menuRoutes = menuItems.map((m) => ({ url: `${base}/menu/${m.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 }));
  const blogRoutes = blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.5 }));

  return [...staticRoutes, ...menuRoutes, ...blogRoutes];
}
