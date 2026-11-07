import { site } from './site';

const DAY = 60 * 60 * 24;

export type RepoInfo = { pushedAt: string; stars: number; language: string | null };

/** Latest push date + stars per repo, refreshed daily. Fails soft: the page never depends on GitHub being up. */
export async function getRepoInfo(): Promise<Record<string, RepoInfo>> {
  try {
    const res = await fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: DAY },
    });
    if (!res.ok) return {};
    const repos: { name: string; pushed_at: string; stargazers_count: number; language: string | null }[] = await res.json();
    return Object.fromEntries(repos.map((r) => [r.name, { pushedAt: r.pushed_at, stars: r.stargazers_count, language: r.language }]));
  } catch {
    return {};
  }
}

export type ExternalPost = { title: string; url: string; date: string; description: string; readingTime?: number };

const fallbackPosts: ExternalPost[] = [
  {
    title: 'My AI agent now opens its own pull requests every Monday',
    url: 'https://dev.to/ilmeedesilva/my-ai-agent-now-opens-its-own-pull-requests-every-monday-4fji',
    date: '2026-11-03',
    description: 'Turning patchpilot into a scheduled GitHub Action that picks, upgrades and fixes a dependency on its own.',
  },
  {
    title: 'I built an AI agent that fixes the code a dependency upgrade breaks',
    url: 'https://dev.to/ilmeedesilva/i-built-an-ai-agent-that-fixes-the-code-a-dependency-upgrade-breaks-2664',
    date: '2026-10-29',
    description: 'How patchpilot works, and what I learned building a tool-use agent loop on the Claude API.',
  },
];

/** Posts from dev.to, refreshed daily, falling back to a known list. */
export async function getDevtoPosts(): Promise<ExternalPost[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${site.devtoUser}&per_page=10`, { next: { revalidate: DAY } });
    if (!res.ok) return fallbackPosts;
    const data: { title: string; url: string; published_at: string; description: string; reading_time_minutes: number }[] = await res.json();
    if (!data.length) return fallbackPosts;
    return data.map((a) => ({ title: a.title, url: a.url, date: a.published_at.slice(0, 10), description: a.description, readingTime: a.reading_time_minutes }));
  } catch {
    return fallbackPosts;
  }
}

export function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}
