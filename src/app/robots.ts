import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/seo-1000-methods.md",
        ],
      },
    ],
    sitemap: "https://hamkkebom.com/sitemap.xml",
  };
}
