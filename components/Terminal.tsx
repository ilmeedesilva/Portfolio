'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from './icons';

type Line =
  | { t: 'cmd'; text: string }
  | { t: 'info'; text: string }
  | { t: 'tool'; name: string; arg: string; note?: { ok: boolean; text: string } }
  | { t: 'link'; text: string; href: string };

// Trimmed from a real run: github.com/ilmeedesilva/patchpilot (README)
const SCRIPT: Line[] = [
  { t: 'cmd', text: 'patchpilot upgrade . pydantic --pr' },
  { t: 'info', text: 'Creating an isolated worktree on patchpilot/upgrade-pydantic' },
  { t: 'info', text: 'Starting a Docker sandbox (python:3.13-slim)' },
  { t: 'info', text: 'Running the tests before upgrading' },
  { t: 'info', text: 'Agent is upgrading pydantic' },
  { t: 'tool', name: 'get_latest_version', arg: '{"package": "pydantic"}' },
  { t: 'tool', name: 'pip_install', arg: '{"requirement": "pydantic==2.14.1"}' },
  { t: 'tool', name: 'run_tests', arg: '{}', note: { ok: false, text: 'fails: BaseSettings moved' } },
  { t: 'tool', name: 'pip_install', arg: '{"requirement": "pydantic-settings"}' },
  { t: 'tool', name: 'write_file', arg: '{"path": "app/config.py"}' },
  { t: 'tool', name: 'write_file', arg: '{"path": "app/models.py"}' },
  { t: 'tool', name: 'run_tests', arg: '{}', note: { ok: true, text: 'passes' } },
  { t: 'info', text: 'Re-running the tests to verify the agent’s work' },
  { t: 'link', text: 'Pull request opened → patchpilot-demo#1', href: 'https://github.com/ilmeedesilva/patchpilot-demo/pull/1' },
];

const DELAYS: Record<Line['t'], number> = { cmd: 0, info: 520, tool: 380, link: 700 };

export function Terminal() {
  const [count, setCount] = useState(0);
  const [typed, setTyped] = useState(0);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const cmd = (SCRIPT[0] as { text: string }).text;
  const done = count >= SCRIPT.length;

  // Start when visible; show everything immediately for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(cmd.length);
      setCount(SCRIPT.length);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStarted(true), { threshold: 0.3 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, [cmd.length]);

  useEffect(() => {
    if (!started) return;
    if (typed < cmd.length) {
      const id = setTimeout(() => setTyped((n) => n + 1), 38);
      return () => clearTimeout(id);
    }
    if (count < SCRIPT.length) {
      const next = SCRIPT[Math.max(count, 1)];
      const id = setTimeout(() => setCount((c) => Math.max(c, 1) + 1), count === 0 ? 350 : DELAYS[next.t]);
      return () => clearTimeout(id);
    }
  }, [started, typed, count, cmd.length, run]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count]);

  const replay = () => {
    setTyped(0);
    setCount(0);
    setRun((r) => r + 1);
    setStarted(true);
  };

  return (
    <div ref={rootRef} className="card overflow-hidden bg-[#0e0f11] text-[#e6e6e3] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)] dark:border-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-xs text-white/50">~/patchpilot-demo: zsh</span>
        <button
          type="button"
          onClick={replay}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] text-white/60 transition-opacity hover:bg-white/10 hover:text-white ${done ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          aria-label="Replay terminal animation"
          tabIndex={done ? 0 : -1}
        >
          <Play width={11} height={11} /> replay
        </button>
      </div>
      <div
        ref={bodyRef}
        className="h-[300px] overflow-y-auto px-4 py-4 font-mono text-[12px] leading-relaxed sm:h-[340px] sm:text-[13px]"
      >
        <p className="sr-only">Replay of a real patchpilot run: it upgrades pydantic, fixes the code the upgrade broke, re-runs the tests and opens a pull request.</p>
        <p className="whitespace-pre-wrap break-words">
          <span className="text-[#ff9164]">$</span> {cmd.slice(0, typed)}
          {typed < cmd.length && <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[2px] animate-blink bg-white/80" />}
        </p>
        {SCRIPT.slice(1, Math.max(count, 1)).map((line, i) => (
          <TermLine key={`${run}-${i}`} line={line} />
        ))}
        {done && (
          <p className="mt-1">
            <span className="text-[#ff9164]">$</span> <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[2px] animate-blink bg-white/80" />
          </p>
        )}
      </div>
    </div>
  );
}

function TermLine({ line }: { line: Line }) {
  if (line.t === 'info') return <p className="whitespace-pre-wrap break-words text-white/85"><span className="text-white/40">•</span> {line.text}</p>;
  if (line.t === 'tool')
    return (
      <p className="whitespace-pre-wrap break-words pl-3 text-white/60">
        <span className="text-[#7cc7ff]">→ {line.name}</span> <span className="text-white/45">{line.arg}</span>
        {line.note && <span className={line.note.ok ? 'text-[#4ade80]' : 'text-[#f87171]'}>{'  '}# {line.note.text}</span>}
      </p>
    );
  if (line.t === 'link')
    return (
      <p className="mt-1 whitespace-pre-wrap break-words">
        <span className="text-[#4ade80]">✓</span>{' '}
        <a href={line.href} target="_blank" rel="noreferrer" className="text-[#4ade80] underline decoration-[#4ade80]/40 underline-offset-4 hover:decoration-[#4ade80]">
          {line.text}
        </a>
      </p>
    );
  return null;
}
