import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/square",
          "/_next/",
          "/forms/",
          "/guides/",
          "/seo-1000-methods.md",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/square", "/_next/", "/forms/"],
      },
    ],
    sitemap: "https://hamkkebom.com/sitemap.xml",
    host: "https://hamkkebom.com",
  };
}
