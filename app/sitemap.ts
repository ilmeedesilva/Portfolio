import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { site } from '@/lib/site';
import { articles } from '@/lib/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'weekly', priority: 1 },
    ...projects.filter((p) => p.slug !== 'resume-reviewer').map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
    { url: `${site.url}/apps/resume-reviewer`, priority: 0.6 },
    ...articles.map((a) => ({ url: `${site.url}/writing/${a.slug}`, priority: 0.7 })),
  ];
}
