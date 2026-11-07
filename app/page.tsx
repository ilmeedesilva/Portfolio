import Image from 'next/image';
import Link from 'next/link';
import { CopyButton, LocalTime, RevealObserver } from '@/components/client-bits';
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from '@/components/icons';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Terminal } from '@/components/Terminal';
import { WorkGrid } from '@/components/WorkGrid';
import { formatMonth, getDevtoPosts, getRepoInfo } from '@/lib/live';
import { featuredSlug, getProject, projects, researchSlug } from '@/lib/projects';
import { athletics, certifications, education, experience, impact, priorRoles, site, skills } from '@/lib/site';
import { articles } from '@/lib/writing';

export const revalidate = 86400;

export default async function HomePage() {
  const [repos, posts] = await Promise.all([getRepoInfo(), getDevtoPosts()]);
  const featured = getProject(featuredSlug)!;
  const others = projects.filter((p) => p.slug !== featuredSlug && p.slug !== researchSlug);
  const research = getProject(researchSlug)!;
  const updated = Object.fromEntries(projects.filter((p) => p.repo && repos[p.repo]).map((p) => [p.slug, formatMonth(repos[p.repo!].pushedAt)]));

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line/10 bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur">
                <span className="inline-flex items-center gap-2 text-ink">
                  <span className="h-2 w-2 animate-pulse-dot rounded-full bg-ok" aria-hidden />
                  Open to full-stack & backend roles
                </span>
                <span aria-hidden className="hidden sm:inline">·</span>
                <span>
                  {site.location} · <LocalTime timeZone={site.timezone} />
                </span>
              </p>
              <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.2rem]" style={{ textWrap: 'balance' }}>
                Engineer by trade. <span className="font-serif font-normal italic tracking-normal text-accent-ink">Disciplined by training.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I’m {site.firstName}, a full-stack software engineer who lives on the backend: Python, FastAPI, Java and microservices on AWS and
                Azure. Over 3+ years of shipping production systems, I’ve kept the same standard:{' '}
                <span className="text-ink">measure carefully, test thoroughly, and refine until it holds</span>.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="#work" className="btn-primary">
                  See my work <ArrowRight />
                </Link>
                <a href={site.cv} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Download /> Download CV
                </a>
                <span className="flex items-center gap-1 sm:ml-2">
                  <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-ink">
                    <Github width={20} height={20} />
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-ink">
                    <Linkedin width={20} height={20} />
                  </a>
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <Terminal />
              <p className="mt-3 flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted">
                <span>↑ A real run of patchpilot, my open-source AI agent.</span>
                <Link href="/work/patchpilot" className="link-underline text-ink">
                  How it works
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- Impact ---------------- */}
        <section aria-label="Highlights" className="border-y border-line/10 bg-surface/50">
          <dl className="container grid grid-cols-2 lg:grid-cols-4">
            {impact.map((m, i) => (
              <div key={m.label} className={`py-8 pr-4 ${i % 2 ? 'pl-4 sm:pl-6' : ''} ${i > 0 ? 'lg:border-l lg:border-line/10 lg:pl-6' : ''} ${i >= 2 ? 'border-t border-line/10 lg:border-t-0' : ''}`}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-xl font-semibold tracking-tight sm:text-3xl">{m.value}</dd>
                <dd className="mt-1 text-sm leading-snug text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------- Work ---------------- */}
        <section id="work" className="section">
          <div className="container">
            <SectionHead eyebrow="Selected work" title="Things I’ve built, with proof." sub="Each project links to its code, a live demo, or the pull request it opened." />

            <article data-reveal className="card mb-6 grid overflow-hidden lg:grid-cols-[1fr_1.15fr]">
              <div className="flex flex-col p-6 sm:p-10">
                <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-white">Featured</span>
                  {featured.context}
                  {updated[featured.slug] && <span>· updated {updated[featured.slug]}</span>}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{featured.name}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{featured.tagline}</p>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line/10 pt-6">
                  {featured.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-base font-semibold sm:text-lg">{s.value}</dd>
                      <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                  <Link href={`/work/${featured.slug}`} className="btn-primary">
                    Read the case study <ArrowRight />
                  </Link>
                  {featured.links.slice(0, 2).map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-ghost">
                      {l.label} <ArrowUpRight />
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative flex items-center border-t border-line/10 bg-[#0e0f11] lg:border-l lg:border-t-0">
                <Image src={featured.cover!.src} alt={featured.cover!.alt} width={featured.cover!.width} height={featured.cover!.height} unoptimized className="h-auto w-full object-contain" />
              </div>
            </article>

            <WorkGrid projects={others} updated={updated} />
          </div>
        </section>

        {/* ---------------- Research ---------------- */}
        <section id="research" className="section border-t border-line/10">
          <div className="container">
            <SectionHead
              eyebrow="Final-year research"
              title="Can static analysis beat frontier LLMs at finding architecture problems?"
              sub="For my BSc (Hons) I built MESA and tested it against seeded benchmarks, real open-source systems and two general-purpose LLMs. The paper is in preparation for publication."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
              <article data-reveal className="card flex flex-col p-6 sm:p-8">
                <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                  <span className="rounded-full border border-accent/40 px-2 py-0.5 text-accent-ink">{research.research!.status}</span>
                  <span>Design Science Research</span>
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-snug sm:text-[1.7rem]">{research.research!.title}</h3>
                <p className="mt-3 text-sm text-muted">{research.research!.authors.join(', ')}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">{research.summary}</p>
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line/10 pt-6">
                  {research.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-lg font-semibold sm:text-xl">{s.value}</dd>
                      <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                  <Link href={`/work/${research.slug}`} className="btn-primary">
                    Read the research <ArrowRight />
                  </Link>
                  <a href={research.links[0].href} target="_blank" rel="noreferrer" className="btn-ghost">
                    Code & data <ArrowUpRight />
                  </a>
                </div>
              </article>
              <div className="grid gap-6">
                <figure data-reveal className="card overflow-hidden">
                  <Image src="/assets/work/mesa-graph.webp" alt="MESA dependency graph with risky calls highlighted" width={1345} height={602} sizes="(min-width:1024px) 560px, 100vw" className="h-auto w-full" />
                  <figcaption className="border-t border-line/10 px-5 py-3 text-xs text-muted">The dependency graph: risky calls in red, with health scores per service.</figcaption>
                </figure>
                <div data-reveal className="card p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Headline result</p>
                  <p className="mt-3 text-[15px] leading-relaxed">
                    On real repositories, MESA found <span className="font-semibold">every labelled dependency with zero false positives</span>, the
                    same way on every run. Claude Sonnet 5 and Claude Opus 5 (the top model on SWE-bench Verified) found at most{' '}
                    <span className="font-semibold">25%</span> and didn’t give the same answer every time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Experience ---------------- */}
        <section id="experience" className="section border-t border-line/10 bg-surface/40">
          <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionHead eyebrow="Experience" title="3+ years shipping for enterprise clients." />
              <div className="card mt-8 p-6">
                <p className="text-lg font-semibold">{experience.role}</p>
                <p className="mt-1 text-muted">{experience.company}</p>
                <p className="mt-4 flex flex-wrap gap-2">
                  <span className="chip">{experience.period}</span>
                  <span className="chip">{experience.location}</span>
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted">{experience.intro}</p>
              </div>
            </div>

            <ol className="relative space-y-6 border-l border-line/10 pl-6 sm:pl-8">
              {experience.workstreams.map((w) => (
                <li key={w.title} data-reveal className="relative">
                  <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-bg bg-accent sm:-left-[39px]" aria-hidden />
                  <h3 className="text-xl font-semibold tracking-tight">{w.title}</h3>
                  <p className="mt-1 text-muted">{w.summary}</p>
                  <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed">
                    {w.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {w.stack.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                  {w.writing && (
                    <p className="mt-4 text-sm text-muted">
                      I wrote about this work:{' '}
                      {w.writing.map((slug, i) => {
                        const a = articles.find((x) => x.slug === slug);
                        return a ? (
                          <span key={slug}>
                            {i > 0 && ' · '}
                            <Link href={`/writing/${slug}`} className="link-underline text-ink">{a.category}</Link>
                          </span>
                        ) : null;
                      })}
                    </p>
                  )}
                </li>
              ))}
              <li data-reveal className="relative">
                <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-bg bg-muted sm:-left-[39px]" aria-hidden />
                <h3 className="text-base font-semibold">Before software · 2015 – 2023</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Operations and executive roles where I learned how businesses actually run, which helps now that I’m the one automating them.
                </p>
                <ul className="mt-4 divide-y divide-line/10 rounded-xl border border-line/10">
                  {priorRoles.map((r) => (
                    <li key={r.org} className="flex flex-col gap-0.5 px-4 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <span>
                        <span className="font-medium">{r.role}</span>
                        <span className="text-muted"> · {r.org}</span>
                      </span>
                      <span className="shrink-0 font-mono text-xs text-muted">{r.period}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className="section">
          <div className="container">
            <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
              <div data-reveal className="mx-auto w-full max-w-[320px]">
                <Image src="/assets/profile.webp" alt={`Portrait of ${site.name}`} width={720} height={720} sizes="320px" className="aspect-square w-full rounded-3xl object-cover" />
              </div>
              <div>
                <SectionHead eyebrow="About" title="Different path. Same discipline." />
                <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed text-muted">
                  <p>
                    Before software, I was a junior and senior national badminton player and represented Sri Lanka internationally. I then spent several
                    years in operations roles, learning how businesses actually run, before moving into software engineering: a diploma as <span className="text-ink">batch top and gold medallist</span>,
                    then a <span className="text-ink">First Class BSc (Hons) in Computing</span>, while working as an engineer since 2023.
                  </p>
                  <p>
                    I like building systems people can trust. In practice that means re-running the tests instead of trusting the agent, reporting the
                    evaluation numbers that came out badly, and writing documentation the next engineer will actually use.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              <InfoCard title="Education">
                <ul className="space-y-4">
                  {education.map((e) => (
                    <li key={e.title}>
                      <p className="font-medium">{e.title}</p>
                      <p className="text-sm text-muted">
                        {e.org} · {e.period}
                      </p>
                      {e.note && <p className="mt-1 text-sm text-accent-ink">{e.note}</p>}
                    </li>
                  ))}
                </ul>
              </InfoCard>
              <InfoCard title="Certifications">
                <ul className="space-y-2.5 text-sm">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </InfoCard>
              <InfoCard title="Beyond code: badminton">
                <ul className="space-y-2.5 text-sm">
                  {athletics.map((a) => (
                    <li key={a} className="flex gap-2.5">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>
          </div>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section id="skills" className="section border-t border-line/10 bg-surface/40">
          <div className="container">
            <SectionHead eyebrow="Toolkit" title="What I work with, and where I’ve used it." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((g) => (
                <div key={g.group} data-reveal className="card flex flex-col p-6">
                  <h3 className="font-semibold">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-md bg-raised px-2 py-1 text-[13px]">{s}</li>
                    ))}
                  </ul>
                  {g.proof.length > 0 && (
                    <p className="mt-auto pt-5 text-xs text-muted">
                      Used in{' '}
                      {g.proof.map((slug, i) => (
                        <span key={slug}>
                          {i > 0 && ', '}
                          <Link href={`/work/${slug}`} className="link-underline text-ink">{getProject(slug)?.name}</Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Writing ---------------- */}
        <section id="writing" className="section">
          <div className="container">
            <SectionHead eyebrow="Writing" title="How I think, written down." sub="Engineering notes from production work, plus build logs on dev.to." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug} href={`/writing/${a.slug}`} data-reveal className="card group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-line/10">
                    <Image src={a.coverImage} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {a.category} · {a.readingTime}
                    </p>
                    <h3 className="mt-2 font-semibold leading-snug tracking-tight group-hover:text-accent-ink">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">On dev.to</p>
              <ul className="divide-y divide-line/10 border-y border-line/10">
                {posts.map((p) => (
                  <li key={p.url}>
                    <a href={p.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                      <time dateTime={p.date} className="shrink-0 font-mono text-xs text-muted sm:w-24">
                        {formatMonth(p.date)}
                      </time>
                      <span className="flex-1">
                        <span className="font-medium group-hover:text-accent-ink">{p.title}</span>
                        <span className="mt-1 block text-sm text-muted">{p.description}</span>
                      </span>
                      <ArrowUpRight className="hidden shrink-0 text-muted sm:block" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="section border-t border-line/10">
          <div className="container">
            <div data-reveal className="card relative overflow-hidden p-6 sm:p-12 lg:p-16">
              <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
              <div className="relative">
                <p className="eyebrow">Contact</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl" style={{ textWrap: 'balance' }}>
                  Let’s build something <span className="font-serif font-normal italic text-accent-ink">reliable.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg text-muted">
                  I’m open to full-stack and backend-heavy roles, especially on AI products. I’m based in Colombo (UTC+5:30) and used to working across
                  time zones with Australian teams.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a href={`mailto:${site.email}`} className="btn-primary !min-h-[52px] !px-6 text-base">
                    <Mail /> {site.email}
                  </a>
                  <CopyButton value={site.email} label="Copy email" className="btn-ghost" />
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <a href={site.phoneHref} className="inline-flex items-center gap-2 text-muted hover:text-ink">
                    <Phone /> {site.phone}
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                    <Linkedin /> LinkedIn
                  </a>
                  <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                    <Github /> GitHub
                  </a>
                  <a href={site.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                    <Download /> CV (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2 mt-4">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="card p-6">
      <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-muted">{title}</h3>
      {children}
    </div>
  );
}
