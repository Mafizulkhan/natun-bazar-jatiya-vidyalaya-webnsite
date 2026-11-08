import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://mafizulkhan.github.io/natun-bazar-jatiya-vidyalaya-webnsite";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticDate = new Date("2026-11-08T00:00:00.000Z");

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/academics`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/admissions`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/notices`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/staff`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/admin`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
