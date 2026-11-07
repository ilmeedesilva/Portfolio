'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Category, Project } from '@/lib/projects';
import { ArrowUpRight } from './icons';

const FILTERS: ('All' | Category)[] = ['All', 'AI', 'Backend', 'ML', 'Mobile'];

export function WorkGrid({ projects, updated }: { projects: Project[]; updated: Record<string, string> }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const shown = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))), [filter, projects]);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {FILTERS.map((f) => {
          const n = f === 'All' ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                filter === f ? 'border-ink bg-ink text-bg' : 'border-line/15 text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {f}
              <span className={`font-mono text-[11px] ${filter === f ? 'text-bg/60' : 'text-muted/70'}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="card group flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line/25 hover:shadow-[0_20px_50px_-20px_rgb(0_0_0/0.25)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-line/10 bg-raised">
                {p.cover ? (
                  <Image src={p.cover.src} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" unoptimized={p.cover.src.endsWith('.gif')} />
                ) : (
                  <PipelineThumb steps={p.pipeline} />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                  <span>{p.context}</span>
                  {updated[p.slug] && <span className="before:mr-2 before:content-['·']">updated {updated[p.slug]}</span>}
                </div>
                <h3 className="flex items-start justify-between gap-3 text-xl font-semibold tracking-tight">
                  {p.name}
                  <ArrowUpRight className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                <div className="mt-auto pt-5">
                  <p className="mb-3 text-sm">
                    <span className="font-semibold">{p.stats[0].value}</span> <span className="text-muted">{p.stats[0].label}</span>
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** For projects without screenshots: a mini architecture strip drawn from the project’s pipeline. */
function PipelineThumb({ steps }: { steps: string[] }) {
  return (
    <div className="grid-bg-strong absolute inset-0 flex flex-col justify-center gap-1.5 p-5">
      {steps.slice(0, 5).map((s, i) => (
        <div key={s} className="flex items-center gap-2" style={{ paddingLeft: `${i * 6}%` }}>
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent/15 font-mono text-[10px] text-accent-ink">{i + 1}</span>
          <span className="truncate rounded-md border border-line/10 bg-surface px-2 py-1 font-mono text-[11px] text-muted">{s}</span>
        </div>
      ))}
    </div>
  );
}
