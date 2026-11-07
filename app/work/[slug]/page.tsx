import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RevealObserver } from '@/components/client-bits';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/icons';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getProject, getProjectNeighbors, projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name}: case study`, description: p.tagline, alternates: { canonical: `/work/${p.slug}` }, openGraph: { title: p.name, description: p.tagline } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { previous, next } = getProjectNeighbors(p.slug);
  const isExternal = (href: string) => href.startsWith('http');

  return (
    <>
      <SiteHeader />
      <main id="main" className="pb-10 pt-24 sm:pt-32">
        <article>
          <header className="container">
            <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
              <ArrowLeft /> All work
            </Link>
            <p className="mt-8 flex flex-wrap gap-2">
              {p.categories.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
              <span className="chip">{p.context}</span>
              <span className="chip">{p.year}</span>
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.035em] sm:text-7xl">{p.name}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl" style={{ textWrap: 'balance' }}>
              {p.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.links.map((l, i) =>
                isExternal(l.href) ? (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={i === 0 ? 'btn-primary' : 'btn-ghost'}>
                    {l.label} <ArrowUpRight />
                  </a>
                ) : (
                  <Link key={l.href} href={l.href} className={i === 0 ? 'btn-primary' : 'btn-ghost'}>
                    {l.label} <ArrowRight />
                  </Link>
                )
              )}
            </div>
          </header>

          <section aria-label="Key numbers" className="container mt-14">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-3">
              {p.stats.map((s) => (
                <div key={s.label} className="bg-surface p-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.value}</dd>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </section>

          {p.images[0] && (
            <figure className="container mt-6">
              <div className="card overflow-hidden bg-[#0e0f11]">
                <Image src={p.images[0].src} alt={p.images[0].alt} width={p.images[0].width} height={p.images[0].height} priority unoptimized={p.images[0].src.endsWith('.gif')} sizes="(min-width:1200px) 1150px, 100vw" className="h-auto w-full" />
              </div>
              {p.images[0].caption && <figcaption className="mt-3 text-sm text-muted">{p.images[0].caption}</figcaption>}
            </figure>
          )}

          <div className="container mt-16 grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Stack</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
                {p.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0 max-w-3xl space-y-16">
              <Block title="Overview">
                <p>{p.summary}</p>
              </Block>
              {p.research && (
                <section aria-labelledby="paper-heading" className="card p-6 sm:p-8">
                  <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                    <span className="rounded-full border border-accent/40 px-2 py-0.5 text-accent-ink">{p.research.status}</span>
                  </p>
                  <h2 id="paper-heading" className="mt-4 font-serif text-2xl leading-snug text-ink">{p.research.title}</h2>
                  <p className="mt-2 text-sm text-muted">
                    {p.research.authors.join(', ')} · {p.research.affiliation}
                  </p>
                  <h3 className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">Abstract</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.research.abstract}</p>
                  <h3 className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">Research questions</h3>
                  <ol className="mt-3 space-y-2 text-[15px] text-muted">
                    {p.research.questions.map((q, i) => (
                      <li key={q} className="flex gap-3">
                        <span className="font-mono text-xs text-accent-ink">RQ{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              <Block title="The problem">
                <p>{p.problem}</p>
              </Block>

              <Block title="How it works">
                <ol className="mt-2 grid gap-2">
                  {p.pipeline.map((step, i) => (
                    <li key={step} data-reveal className="flex items-stretch gap-3">
                      <span className="flex w-8 shrink-0 flex-col items-center">
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-line/15 bg-surface font-mono text-xs">{i + 1}</span>
                        {i < p.pipeline.length - 1 && <span className="w-px flex-1 bg-line/15" aria-hidden />}
                      </span>
                      <span className={`card flex-1 px-4 py-3 text-[15px] ${i === p.pipeline.length - 1 ? 'border-accent/40' : ''}`}>{step}</span>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title="Key decisions">
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.decisions.map((d) => (
                    <div key={d.title} data-reveal className="card p-5">
                      <h3 className="font-semibold text-ink">{d.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed">{d.body}</p>
                    </div>
                  ))}
                </div>
              </Block>

              <Block title="Results">
                <ul className="space-y-3">
                  {p.results.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span className="mt-1 text-ok" aria-hidden>✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              {p.images.length > 1 && (
                <Block title="Gallery">
                  <div className="grid gap-6">
                    {p.images.slice(1).filter((im) => !im.tall).map((im) => (
                      <figure key={im.src} data-reveal>
                        <div className="card overflow-hidden">
                          <Image src={im.src} alt={im.alt} width={im.width} height={im.height} unoptimized={im.src.endsWith('.gif')} sizes="(min-width:1024px) 768px, 100vw" className="h-auto w-full" />
                        </div>
                        {im.caption && <figcaption className="mt-2 text-sm text-muted">{im.caption}</figcaption>}
                      </figure>
                    ))}
                    {p.images.some((im) => im.tall) && (
                      <div className="-mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
                        {p.images.filter((im) => im.tall).map((im) => (
                          <figure key={im.src} data-reveal className="w-[62%] shrink-0 snap-start sm:w-auto">
                            <div className="overflow-hidden rounded-[22px] border border-line/10 bg-surface">
                              <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="(min-width:640px) 240px, 62vw" className="h-auto w-full" />
                            </div>
                            {im.caption && <figcaption className="mt-2 text-sm text-muted">{im.caption}</figcaption>}
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                </Block>
              )}
            </div>
          </div>

          <nav aria-label="More projects" className="container mt-24 grid gap-4 border-t border-line/10 pt-10 sm:grid-cols-2">
            {previous ? (
              <Link href={`/work/${previous.slug}`} className="card group p-6">
                <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft /> Previous</span>
                <span className="mt-2 block text-xl font-semibold group-hover:text-accent-ink">{previous.name}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link href={`/work/${next.slug}`} className="card group p-6 text-right">
                <span className="flex items-center justify-end gap-2 text-sm text-muted">Next <ArrowRight /></span>
                <span className="mt-2 block text-xl font-semibold group-hover:text-accent-ink">{next.name}</span>
              </Link>
            ) : (
              <Link href="/#contact" className="card group p-6 text-right">
                <span className="flex items-center justify-end gap-2 text-sm text-muted">Like what you see? <ArrowRight /></span>
                <span className="mt-2 block text-xl font-semibold group-hover:text-accent-ink">Get in touch</span>
              </Link>
            )}
          </nav>
        </article>
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="text-[17px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}
