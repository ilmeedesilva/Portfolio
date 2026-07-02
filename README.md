# Ilmee Engineering Platform

This repository is evolving from a personal portfolio into a monorepo of deployable engineering products.

## Apps

- Root portfolio: current production portfolio at `ilmeedesilva.vercel.app`
- `apps/portfolio`: copy of the portfolio for future monorepo deployment
- `apps/resume-reviewer`: AI Resume Reviewer prototype

## Recommended Vercel Setup

Keep the current root deployment for the portfolio until you are ready to change it.

To deploy a separate app from this repo:

1. Go to Vercel Dashboard.
2. Select **Add New -> Project**.
3. Import the same GitHub repository.
4. Open **Root Directory**.
5. Choose the app folder, for example:

```text
apps/resume-reviewer
```

6. Deploy it as a separate Vercel project.

Suggested production domains:

```text
ilmeedesilva.vercel.app
resume-ilmee.vercel.app
interview-ilmee.vercel.app
blog-ilmee.vercel.app
labs-ilmee.vercel.app
```

## Local Preview

Open each app's `index.html` directly in the browser, or serve the repo with any static server.

## Next Apps

- AI Interview Coach
- Portfolio API
- Blog
- Experimental AI Labs
