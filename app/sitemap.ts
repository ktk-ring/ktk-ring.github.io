import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ktkring.com/", changeFrequency: "monthly", priority: 1 },
    { url: "https://ktkring.com/portfolio/", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://ktkring.com/apps/", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://ktkring.com/editables/", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://ktkring.com/wordsalad/", changeFrequency: "yearly", priority: 0.5 },
  ];
}
