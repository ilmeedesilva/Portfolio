import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleInteractions } from '@/components/ArticleInteractions';
import { articles, getArticle, getArticleNeighbors, getRelatedArticles } from '@/lib/writing';

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Ilmee De Silva`,
    description: article.subtitle,
  };
}

export default async function WritingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug);
  const { previous, next } = getArticleNeighbors(article.slug);

  return (
    <main className="article-page">
      <nav className="article-nav" aria-label="Article navigation">
        <Link href="/#writing">Back to writing</Link>
        <Link href="/">Portfolio</Link>
      </nav>

      <div className="article-frame">
        <aside className="article-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <nav>
            {article.sections.map((section) => (
              <a key={section.heading} href={`#${sectionId(section.heading)}`}>{section.heading}</a>
            ))}
          </nav>
        </aside>

        <article className="article-shell">
          <header className="article-hero">
            <div className="article-hero-copy">
              <p className="eyebrow">Engineering Writing</p>
              <h1>{article.title}</h1>
              <p className="article-subtitle">{article.subtitle}</p>
              <dl className="article-meta" aria-label="Article metadata">
                <div><dt>Date Posted</dt><dd>{article.datePosted}</dd></div>
                <div><dt>Reading Time</dt><dd>{article.readingTime}</dd></div>
                <div><dt>Category</dt><dd>{article.category}</dd></div>
                <div><dt>Author</dt><dd>Ilmee De Silva</dd></div>
              </dl>
              <div className="article-tech-list" aria-label="Technologies used">
                {article.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
            <div className="article-cover-image">
              <Image src={article.coverImage} alt="" width={1600} height={900} priority />
            </div>
          </header>

          <div className="article-body">
            {article.sections.map((section) => (
              <section key={section.heading} id={sectionId(section.heading)} className="article-section">
                <h2>{section.heading}</h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.callout ? <div className="article-callout">{section.callout}</div> : null}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? (
                  <div className="article-table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.table.head.map((cell) => (
                            <th key={cell}>{cell}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join('-')}>
                            {row.map((cell) => (
                              <td key={cell}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {section.code ? (
                  <pre className={`article-code language-${section.code.language}`}>
                    <code>{section.code.value}</code>
                  </pre>
                ) : null}
              </section>
            ))}

            <ArticleInteractions title={article.title} />

            <section className="related-articles" aria-label="Related articles">
              <div className="comments-heading">
                <h2>Related Articles</h2>
                <p>More engineering notes from the same portfolio writing system.</p>
              </div>
              <div className="related-grid">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/writing/${related.slug}`} className="related-card">
                    <Image src={related.coverImage} alt="" width={640} height={360} />
                    <span>{related.category}</span>
                    <h3>{related.title}</h3>
                    <p>{related.summary}</p>
                  </Link>
                ))}
              </div>
            </section>

            <nav className="article-bottom-nav" aria-label="Article pagination">
              {previous ? <Link href={`/writing/${previous.slug}`}>← Previous Article</Link> : <span />}
              <Link href="/#writing">Back to Writing</Link>
              {next ? <Link href={`/writing/${next.slug}`}>Next Article →</Link> : <span />}
            </nav>
          </div>
        </article>
      </div>
    </main>
  );
}
