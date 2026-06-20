import { MetadataRoute } from "next";
import { SAMPLE_EVENTS } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";

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
    {
      url: `${rootDomain}/pay-fee`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic paths from school events
  const eventPortals = SAMPLE_EVENTS.map((event) => ({
    url: `${rootDomain}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic paths from school blog posts
  let blogPortals: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogPortals = posts.map((post) => ({
      url: `${rootDomain}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error reading blog posts for sitemap generation:", error);
  }

  return [...standardPortals, ...eventPortals, ...blogPortals];
}
