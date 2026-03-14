import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://hamkkebom.com";

interface WorkData {
  uid: string;
  createdAt: string;
}

async function getWorkData(): Promise<WorkData[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("videos")
      .select("streamUid, createdAt")
      .order("createdAt", { ascending: false });

    if (error || !data) return [];
    return data
      .filter((v) => v.streamUid)
      .map((v) => ({ uid: v.streamUid, createdAt: v.createdAt }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "", lastMod: new Date("2026-03-01"), priority: 1.0, freq: "weekly" as const },
    { path: "/about", lastMod: new Date("2026-02-01"), priority: 0.8, freq: "monthly" as const },
    { path: "/about/intro", lastMod: new Date("2026-02-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/about/org", lastMod: new Date("2026-02-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/about/location", lastMod: new Date("2026-02-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/services/education", lastMod: new Date("2026-02-15"), priority: 0.8, freq: "monthly" as const },
    { path: "/services/planning", lastMod: new Date("2026-02-15"), priority: 0.8, freq: "monthly" as const },
    { path: "/services/video", lastMod: new Date("2026-02-15"), priority: 0.8, freq: "monthly" as const },
    { path: "/services/marketing", lastMod: new Date("2026-02-15"), priority: 0.8, freq: "monthly" as const },
    { path: "/works", lastMod: new Date("2026-03-01"), priority: 0.9, freq: "weekly" as const },
    { path: "/contact", lastMod: new Date("2026-01-01"), priority: 0.7, freq: "monthly" as const },
    { path: "/faq", lastMod: new Date("2026-01-01"), priority: 0.6, freq: "monthly" as const },
    // /square는 noindex이므로 sitemap에서 제외
  ];

  const staticEntries = staticRoutes.map(({ path, lastMod, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: lastMod,
    changeFrequency: freq,
    priority,
  }));

  const workData = await getWorkData();
  const workEntries = workData.map(({ uid, createdAt }) => ({
    url: `${BASE_URL}/works/${uid}`,
    lastModified: createdAt ? new Date(createdAt) : new Date("2026-01-01"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...workEntries];
}
