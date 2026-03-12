import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://hamkkebom.com";

async function getWorkIds(): Promise<string[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("videos")
      .select("streamUid")
      .order("createdAt", { ascending: false });

    if (error || !data) return [];
    return data.map((v) => v.streamUid).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/about/intro",
    "/about/org",
    "/about/location",
    "/services/education",
    "/services/planning",
    "/services/video",
    "/services/marketing",
    "/works",
    "/contact",
    "/faq",
    "/square",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.8 : 0.7,
  }));

  const workIds = await getWorkIds();
  const workEntries = workIds.map((id) => ({
    url: `${BASE_URL}/works/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...workEntries];
}
