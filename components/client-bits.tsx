'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from './icons';

/** Adds `is-visible` to [data-reveal] elements as they scroll into view. */
export function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function CopyButton({ value, label = 'Copy', className = '' }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${value}`;
        }
      }}
      aria-label={copied ? 'Copied' : `${label}: ${value}`}
    >
      {copied ? <Check /> : <Copy />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}

/** Live local time in Colombo, useful for recruiters in other time zones. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-US', { timeZone, hour: 'numeric', minute: '2-digit' });
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <span suppressHydrationWarning>{now ?? '—'}</span>;
}
