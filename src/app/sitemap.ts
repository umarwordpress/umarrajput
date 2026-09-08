import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { caseStudies } from '@/data/caseStudies';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
