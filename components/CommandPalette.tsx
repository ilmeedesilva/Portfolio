'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '@/lib/projects';
import { nav, site } from '@/lib/site';
import { ArrowRight, Search } from './icons';

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

export function CommandPalette({ open, onClose, toggleTheme }: { open: boolean; onClose: () => void; toggleTheme: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      onClose();
      router.push(href);
    };
    const ext = (href: string) => () => {
      onClose();
      window.open(href, '_blank', 'noopener,noreferrer');
    };
    return [
      ...nav.map((n) => ({ id: `nav-${n.id}`, group: 'Go to', label: n.label, run: go(n.href) })),
      ...projects.map((p) => ({ id: `p-${p.slug}`, group: 'Projects', label: p.name, hint: p.tagline, run: go(`/work/${p.slug}`) })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          onClose();
        },
      },
      { id: 'cv', group: 'Actions', label: 'Download CV (PDF)', run: ext(site.cv) },
      { id: 'theme', group: 'Actions', label: 'Toggle light / dark theme', run: () => { toggleTheme(); onClose(); } },
      { id: 'resume', group: 'Actions', label: 'Try the AI Resume Reviewer', run: go('/apps/resume-reviewer') },
      { id: 'gh', group: 'Links', label: 'GitHub', hint: 'github.com/ilmeedesilva', run: ext(site.github) },
      { id: 'li', group: 'Links', label: 'LinkedIn', hint: 'linkedin.com/in/ilmeedesilva', run: ext(site.linkedin) },
      { id: 'dev', group: 'Links', label: 'dev.to blog', hint: 'dev.to/ilmeedesilva', run: ext(site.devto) },
    ];
  }, [onClose, router, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.group} ${i.label} ${i.hint ?? ''}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  let lastGroup = '';
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="card w-full max-w-lg overflow-hidden shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line/10 px-4">
          <Search className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, sections, actions…"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
          />
          <kbd className="chip shrink-0">esc</kbd>
        </div>
        <ul ref={listRef} id="cmdk-list" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id} role="presentation">
                {header && <div className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">{header}</div>}
                <div
                  id={`cmdk-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={item.run}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${i === active ? 'bg-raised' : ''}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{item.label}</span>
                    {item.hint && <span className="block truncate text-xs text-muted">{item.hint}</span>}
                  </span>
                  {i === active && <ArrowRight className="shrink-0 text-accent-ink" />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t border-line/10 px-4 py-2 font-mono text-[11px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
        </div>
      </div>
    </div>
  );
}
