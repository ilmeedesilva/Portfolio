'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import { CommandPalette } from './CommandPalette';
import { Close, Download, Menu, Moon, Search, Sun } from './icons';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the nav item for the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== '/') {
      setActiveId(pathname.startsWith('/work') ? 'work' : pathname.startsWith('/writing') ? 'writing' : null);
      return;
    }
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const closePalette = useCallback(() => setPaletteOpen(false), []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          menuOpen ? 'border-b border-line/10 bg-bg' : scrolled ? 'border-b border-line/10 bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={`${site.name}, home`}>
            <Image src="/assets/profile.webp" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-1 ring-line/10" priority />
            <span className="whitespace-nowrap">{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                aria-current={activeId === n.id ? 'true' : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${activeId === n.id ? 'bg-raised text-ink' : 'text-muted hover:text-ink'}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-full border border-line/10 bg-surface/60 pl-3 pr-1.5 text-sm text-muted transition-colors hover:text-ink sm:flex"
              aria-label="Open command menu"
            >
              <Search />
              <span>Search</span>
              <kbd className="chip whitespace-nowrap">{isMac ? '⌘' : 'Ctrl'} K</kbd>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-ink"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
            </button>
            <a href={site.cv} target="_blank" rel="noreferrer" className="btn-primary hidden !min-h-[36px] !px-4 lg:inline-flex">
              <Download /> CV
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-raised lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="container border-t border-line/10 pb-6 pt-2 lg:hidden">
            <ul className="grid">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link href={n.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-line/10 py-4 text-lg">
                    {n.label}
                    <span className="font-mono text-xs text-muted">{n.id === activeId ? '●' : ''}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" className="btn-ghost" onClick={() => { setMenuOpen(false); setPaletteOpen(true); }}>
                <Search /> Search
              </button>
              <a href={site.cv} target="_blank" rel="noreferrer" className="btn-primary">
                <Download /> CV
              </a>
            </div>
          </nav>
        )}
      </header>
      <CommandPalette open={paletteOpen} onClose={closePalette} toggleTheme={toggleTheme} />
    </>
  );
}
