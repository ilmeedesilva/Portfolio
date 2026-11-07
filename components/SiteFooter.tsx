import Link from 'next/link';
import { nav, site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-line/10">
      <div className="container flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js & Tailwind, deployed on Vercel.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {nav.map((n) => (
            <Link key={n.id} href={n.href} className="hover:text-ink">
              {n.label}
            </Link>
          ))}
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
