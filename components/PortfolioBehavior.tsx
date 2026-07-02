'use client';

import { useEffect } from 'react';

export function PortfolioBehavior() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-header]');
    const nav = document.querySelector<HTMLElement>('[data-nav]');
    const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".site-nav a[href^='#']");
    const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');

    if (!header || !nav || !navToggle) return;

    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    const setTheme = (theme: string) => {
      const isDark = theme === 'dark';
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('theme', theme);
      themeToggle?.setAttribute('aria-pressed', String(isDark));
      themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    const onNavToggle = () => {
      const isOpen = nav.classList.toggle('is-open');
      header.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    const onNavClick = (event: Event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove('is-open');
        header.classList.remove('is-open');
        navToggle.setAttribute('aria-label', 'Open navigation');
      }
    };

    const onThemeClick = () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    };

    navToggle.addEventListener('click', onNavToggle);
    nav.addEventListener('click', onNavClick);
    themeToggle?.addEventListener('click', onThemeClick);

    const revealItems = document.querySelectorAll<HTMLElement>(
      '.section, .project-card, .case-grid article, .skills-grid div, .writing-list article, .profile-panel'
    );
    revealItems.forEach((item) => item.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => activeObserver.observe(section));
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
    setTheme(localStorage.getItem('theme') || 'light');

    const focusHandlers = [...navLinks].map((link) => {
      const handler = () => header.classList.add('is-scrolled');
      link.addEventListener('focus', handler);
      return { link, handler };
    });

    return () => {
      navToggle.removeEventListener('click', onNavToggle);
      nav.removeEventListener('click', onNavClick);
      themeToggle?.removeEventListener('click', onThemeClick);
      window.removeEventListener('scroll', updateHeader);
      revealObserver.disconnect();
      activeObserver.disconnect();
      focusHandlers.forEach(({ link, handler }) => link.removeEventListener('focus', handler));
    };
  }, []);

  return null;
}
