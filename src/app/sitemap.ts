import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 14400; // Recalculates paths dynamically every 4 hours (14400 seconds)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rootDomain = "https://www.gurunanakacademydehradun.org";

  const standardPortals = [
    {
      url: `${rootDomain}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${rootDomain}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${rootDomain}/admission`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${rootDomain}/boarding`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${rootDomain}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${rootDomain}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${rootDomain}/facilities`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${rootDomain}/co-curricular`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${rootDomain}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic dynamic paths from school events
  const dynamicSchoolEvents = [
    { slug: "interhouse-quiz-competition-2025", updated: "2025-09-27" },
    { slug: "friendly-teachers-match-2025", updated: "2025-09-27" },
  ];

  const dynamicEventPortals = dynamicSchoolEvents.map((event) => ({
    url: `${rootDomain}/events/${event.slug}`,
    lastModified: new Date(event.updated),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...standardPortals, ...dynamicEventPortals];
}
