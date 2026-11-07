# ilmeedesilva.vercel.app

Personal portfolio of Ilmee De Silva, Full-Stack Software Engineer (backend, AI & cloud).

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where things live

| What | Where |
|---|---|
| Profile, experience, skills, education | `lib/site.ts` |
| Projects and case studies (`/work/[slug]`) | `lib/projects.ts` |
| On-site articles (`/writing/[slug]`) | `lib/writing.ts` |
| GitHub "last updated" dates and dev.to posts, refreshed daily | `lib/live.ts` |
| Home page | `app/page.tsx` |
| Design tokens (light/dark) | `app/globals.css`, `tailwind.config.ts` |
| Downloadable CV | `public/Ilmee-De-Silva-CV.pdf` |
| AI Resume Reviewer demo | `app/apps/resume-reviewer`, `app/api/analyze` |

To add a project, add an entry to `projects` in `lib/projects.ts`. Its card, case-study page, command-menu entry and sitemap entry are generated from that data.

## Features

- Hero terminal that replays a real patchpilot run
- ⌘K / Ctrl+K command menu for jumping to sections, projects and actions
- Light and dark themes that follow the OS setting, with a manual toggle
- Filterable project grid and a case-study page for each project
- Generated Open Graph image, sitemap and robots.txt
- Respects `prefers-reduced-motion`

## Resume Reviewer AI setup

The `/apps/resume-reviewer` demo calls `/api/analyze`. To enable AI analysis, set these in Vercel → Settings → Environment Variables:

```text
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini   # optional
```

Without a key, it falls back to local keyword analysis.
