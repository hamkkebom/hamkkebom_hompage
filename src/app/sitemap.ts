import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE_URL = "https://hamkkebom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", lastMod: new Date("2026-03-18"), priority: 1.0, freq: "weekly" as const },
    { path: "/services/video", lastMod: new Date("2026-03-18"), priority: 0.9, freq: "monthly" as const },
    { path: "/services/marketing", lastMod: new Date("2026-03-18"), priority: 0.9, freq: "monthly" as const },
    { path: "/services/education", lastMod: new Date("2026-03-18"), priority: 0.9, freq: "monthly" as const },
    { path: "/services/planning", lastMod: new Date("2026-03-18"), priority: 0.9, freq: "monthly" as const },
    { path: "/works", lastMod: new Date("2026-03-18"), priority: 0.9, freq: "weekly" as const },
    { path: "/join", lastMod: new Date("2026-10-08"), priority: 0.9, freq: "weekly" as const },
    { path: "/about", lastMod: new Date("2026-03-01"), priority: 0.8, freq: "monthly" as const },
    { path: "/about/intro", lastMod: new Date("2026-03-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/about/org", lastMod: new Date("2026-03-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/about/location", lastMod: new Date("2026-03-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/contact", lastMod: new Date("2026-03-01"), priority: 0.8, freq: "monthly" as const },
    { path: "/faq", lastMod: new Date("2026-03-18"), priority: 0.7, freq: "monthly" as const },
    // /square는 noindex이므로 sitemap에서 제외
  ];

  const staticEntries = staticRoutes.map(({ path, lastMod, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: lastMod,
    changeFrequency: freq,
    priority,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
