import type { MetadataRoute } from 'next';
import { site, isPreview } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
