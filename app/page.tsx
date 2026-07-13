import { PortfolioBehavior } from '@/components/PortfolioBehavior';

export default function PortfolioPage() {
  return (
    <>
      <header className="site-header" data-header>
            <a className="brand" href="#home" aria-label="Ilmee De Silva home">
              <img className="nav-avatar" src="/assets/profile.png" alt="Ilmee De Silva" />
              <span>Ilmee De Silva</span>
            </a>
            <button className="nav-toggle" type="button" aria-label="Open navigation" data-nav-toggle>
              <span></span>
              <span></span>
            </button>
            <nav className="site-nav" data-nav>
              <a href="#profile">Profile</a>
              <a href="#projects">Projects</a>
              <a href="#proof">Proof</a>
              <a href="#skills">Skills</a>
              <a href="#writing">Writing</a>
              <a className="nav-cta" href="#contact">Contact</a>
              <button className="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false"><span className="theme-icon sun" aria-hidden="true">☼</span><span className="theme-thumb" aria-hidden="true"></span><span className="theme-icon moon" aria-hidden="true">◐</span></button>
            </nav>
          </header>

          <main>
            <section className="hero" id="home" aria-label="Introduction">
              <img
                className="hero-image"
                src="/assets/engineering-hero.png"
                alt="Modern engineering workspace with code, APIs, database tables, and AI system diagrams"
              />
              <div className="hero-overlay"></div>
              <div className="hero-shell">
              <div className="hero-content">
                <p className="eyebrow">Full-Stack Software Engineer | Backend • AI • Cloud</p>
                <h1><span>Full-Stack Software Engineer</span> focused on Backend, AI & Cloud Systems.</h1>
                <div className="hero-copy">
                  <p>
                    I build reliable backend systems, practical AI-powered applications,
                    REST APIs, database-driven workflows, and clean full-stack user experiences.
                  </p>
                  <p>
                    My strongest area is backend engineering, with hands-on experience across
                    APIs, databases, cloud integrations, and intelligent document-based systems.
                  </p>
                </div>
                <div className="hero-actions">
                  <a className="button primary" href="#projects">View Projects</a>
                  <a className="button secondary" href="#contact">Get In Touch</a>
                </div>
                <dl className="proof-strip" aria-label="Profile highlights">
                  <div>
                    <dt>Current Focus</dt>
                    <dd>Full-stack with backend focus</dd>
                  </div>
                  <div>
                    <dt>Core Stack</dt>
                    <dd>Python, FastAPI, React.js, Next.js, AWS, Azure</dd>
                  </div>
                  <div>
                    <dt>Best At</dt>
                    <dd>APIs, data, AWS/Azure cloud and AI</dd>
                  </div>
                </dl>
              </div>
              <figure className="hero-portrait" aria-label="Profile picture">
                <div className="portrait-frame">
                  <img src="/assets/profile.png" alt="Ilmee De Silva" />
                </div>
              </figure>
              </div>
            </section>

            <section className="section profile-section" id="profile">
              <div className="section-heading">
                <p className="eyebrow">Profile</p>
                <h2>Full-stack capability with a strong backend engineering center.</h2>
              </div>
              <div className="profile-panel">
                <div className="profile-summary">
                  <p className="profile-kicker">Ilmee De Silva</p>
                  <h3>Full-Stack Software Engineer mainly focused on backend engineering, AI-powered systems, APIs, databases, and cloud integrations.</h3>
                  <p>
                    I can work across the full stack, while my strongest area is designing
                    reliable backend systems and connecting them to useful, clean user experiences.
                  </p>
                </div>
                <div className="profile-grid">
                  <a className="profile-item" href="#home"><span className="profile-icon" aria-hidden="true">◌</span><span><strong>Name</strong>Ilmee De Silva</span></a>
                  <a className="profile-item" href="#projects"><span className="profile-icon" aria-hidden="true">⌘</span><span><strong>Role</strong>Full-Stack Software Engineer</span></a>
                  <a className="profile-item" href="#skills"><span className="profile-icon" aria-hidden="true">▦</span><span><strong>Main Focus</strong>Backend Engineering</span></a>
                  <a className="profile-item" href="#contact"><span className="profile-icon" aria-hidden="true">⌖</span><span><strong>Location</strong>Sri Lanka</span></a>
                  <a className="profile-item" href="tel:+94772909244"><span className="profile-icon" aria-hidden="true">☎</span><span><strong>Phone</strong>+94 77 290 9244</span></a>
                  <a className="profile-item" href="mailto:ilmeedesilva@gmail.com"><span className="profile-icon" aria-hidden="true">@</span><span><strong>Email</strong>ilmeedesilva@gmail.com</span></a>
                  <a className="profile-item" href="#skills"><span className="profile-icon" aria-hidden="true">⌂</span><span><strong>Degree</strong>BSc (Hons) in Computing — Software Engineering</span></a>
                  <a className="profile-item" href="#skills"><span className="profile-icon" aria-hidden="true">✦</span><span><strong>Skills Focus</strong>FastAPI, Python, Java, JavaScript, TypeScript, SQL Server, React.js, Next.js, Tailwind CSS, AWS, Azure AI, REST APIs</span></a>
                  <a className="profile-item" href="https://www.linkedin.com/in/ilmeedesilva/" target="_blank" rel="noreferrer"><span className="profile-icon" aria-hidden="true">in</span><span><strong>LinkedIn</strong>linkedin.com/in/ilmeedesilva</span></a>
                  <a className="profile-item" href="https://github.com/ilmeedesilva" target="_blank" rel="noreferrer"><span className="profile-icon" aria-hidden="true">GH</span><span><strong>GitHub</strong>github.com/ilmeedesilva</span></a>
                  <a className="profile-item wide" href="#projects"><span className="profile-icon" aria-hidden="true">↗</span><span><strong>Current Focus</strong>Building AI-powered applications and scalable backend systems.</span></a>
                </div>
              </div>
            </section>

            <section className="section" id="projects">
              <div className="section-heading split">
                <div>
                  <p className="eyebrow">Flagship Projects</p>
                  <h2>Selected work shaped like real products.</h2>
                </div>
                <a className="text-link" href="#contact">Request walkthrough</a>
              </div>
              <div className="project-grid">
                <article className="project-card featured">
                  <div className="card-meta">
                    <span>In build</span>
                    <span>Portfolio platform</span>
                  </div>
                  <h3>EngineerOS</h3>
                  <p>
                    A personal AI engineering platform combining portfolio, case
                    studies, live demos, writing, and practical career tools in one
                    polished product experience.
                  </p>
                  <div className="project-actions">
                    <a href="#contact">Discuss roadmap</a>
                    <a href="#proof">View proof points</a>
                  </div>
                  <ul className="tag-list">
                    <li>Product Design</li>
                    <li>Backend APIs</li>
                    <li>AI Workflows</li>
                    <li>Portfolio System</li>
                  </ul>
                </article>
                <article className="project-card">
                  <div className="card-meta">
                    <span>Planned</span>
                    <span>AI product</span>
                  </div>
                  <h3>AI Resume Reviewer</h3>
                  <p>
                    Upload a resume and compare it with a job description to surface
                    missing keywords, weak bullets, ATS gaps, and interview preparation
                    questions.
                  </p>
                  <div className="project-actions">
                    <a href="./apps/resume-reviewer/">View prototype</a>
                    <a href="#contact">Walkthrough</a>
                  </div>
                  <ul className="tag-list">
                    <li>FastAPI</li>
                    <li>OpenAI</li>
                    <li>Vector Search</li>
                    <li>Reports</li>
                  </ul>
                </article>
                <article className="project-card">
                  <div className="card-meta">
                    <span>Planned</span>
                    <span>AI coach</span>
                  </div>
                  <h3>AI Interview Coach</h3>
                  <p>
                    Practice behavioral, technical, and coding interviews with adaptive
                    follow-up questions, scoring, feedback, and a generated improvement
                    plan.
                  </p>
                  <div className="project-actions">
                    <a href="#contact">Walkthrough</a>
                  </div>
                  <ul className="tag-list">
                    <li>Speech</li>
                    <li>Evaluation</li>
                    <li>Authentication</li>
                    <li>Dashboards</li>
                  </ul>
                </article>
                <article className="project-card">
                  <div className="card-meta">
                    <span>Experience area</span>
                    <span>Knowledge systems</span>
                  </div>
                  <h3>Engineering Knowledge Hub</h3>
                  <p>
                    A document intelligence system for uploading PDFs and internal
                    docs, indexing them, and asking reliable questions over technical
                    knowledge.
                  </p>
                  <div className="project-actions">
                    <a href="#contact">Walkthrough</a>
                  </div>
                  <ul className="tag-list">
                    <li>Azure AI Search</li>
                    <li>Embeddings</li>
                    <li>Blob Storage</li>
                    <li>RAG</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="section band" id="proof">
              <div className="section-heading">
                <p className="eyebrow">Proof of Work</p>
                <h2>Each case study is designed to show judgment, not just screenshots.</h2>
              </div>
              <div className="case-grid">
                <article>
                  <span>01</span>
                  <h3>Problem Framing</h3>
                  <p>
                    Clear explanation of the user problem, constraints, data flow, and
                    why the system needs to exist.
                  </p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Architecture</h3>
                  <p>
                    API boundaries, storage choices, search/indexing approach, AI flow,
                    and the tradeoffs behind each decision.
                  </p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Engineering Quality</h3>
                  <p>
                    README, diagrams, tests, deployment notes, performance thinking,
                    and a usable demo when the project is ready.
                  </p>
                </article>
              </div>
            </section>

            <section className="section skills-section" id="skills">
              <div className="section-heading">
                <p className="eyebrow">Capabilities</p>
                <h2>Full-stack range with backend, AI, API, database, and cloud depth.</h2>
              </div>
              <div className="skills-grid">
                <div>
                  <h3>Backend</h3>
                  <p>Python, FastAPI, Java, REST APIs, service design, validation, integrations, testing.</p>
                </div>
                <div>
                  <h3>Frontend</h3>
                  <p>React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, responsive UI, accessibility, component-driven pages.</p>
                </div>
                <div>
                  <h3>Data</h3>
                  <p>SQL Server, stored procedures, query thinking, data workflows, reporting logic.</p>
                </div>
                <div>
                  <h3>Cloud + AI</h3>
                  <p>Azure AI Search, search indexes, Azure OpenAI, embeddings, RAG, Blob Storage, Azure Functions, document pipelines.</p>
                </div>
                <div>
                  <h3>AWS Cloud</h3>
                  <p>AWS Lambda, S3, CloudWatch, API Gateway basics, IAM basics, serverless workflows, cloud monitoring.</p>
                </div>
                <div>
                  <h3>API Integration</h3>
                  <p>REST API design, JSON contracts, authentication flows, third-party services, error handling.</p>
                </div>
                <div>
                  <h3>Document AI</h3>
                  <p>PDF/DOCX parsing, text extraction, semantic search, resume analysis, knowledge workflows.</p>
                </div>
                <div>
                  <h3>Engineering Practice</h3>
                  <p>Git, Docker basics, API docs, performance testing, clean READMEs, case studies.</p>
                </div>
                <div>
                  <h3>Deployment + Tools</h3>
                  <p>GitHub, Vercel, AWS Lambda, S3, CloudWatch, IAM basics, environment variables, browser debugging, release checks.</p>
                </div>
              </div>
            </section>

            <section className="section" id="writing">
              <div className="section-heading split">
                <div>
                  <p className="eyebrow">Writing</p>
                  <h2>Technical notes that show how I think.</h2>
                </div>
                <a className="text-link" href="#contact">Suggest topic</a>
              </div>
              <div className="writing-list">
                <a className="writing-card" href="/writing/building-semantic-search-with-azure-ai-search">
                  <span className="writing-thumb"><img src="/assets/blog/semantic-search-cover.png" alt="" /><strong>Engineering Story</strong></span>
                  <h3>Building Semantic Search with Azure AI Search</h3>
                  <span>Hybrid search, metadata filters, and backend decisions for financial documents.</span>
                </a>
                <a className="writing-card" href="/writing/solving-azure-ai-search-index-limits-with-partitioning">
                  <span className="writing-thumb"><img src="/assets/blog/index-partitioning-cover.png" alt="" /><strong>Architecture</strong></span>
                  <h3>Solving Azure AI Search Index Limits with a Reusable Partitioning Strategy</h3>
                  <span>How deterministic bucket routing avoided an index scaling problem.</span>
                </a>
                <a className="writing-card" href="/writing/combining-ai-and-algorithmic-search-for-financial-values">
                  <span className="writing-thumb"><img src="/assets/blog/financial-values-cover.png" alt="" /><strong>Debugging</strong></span>
                  <h3>Combining AI and Algorithmic Search to Locate Financial Values in Documents</h3>
                  <span>Improving an existing feature that struggled with small numeric values.</span>
                </a>
              </div>
            </section>

            <section className="section contact-section" id="contact">
              <div>
                <p className="eyebrow">Contact</p>
                <h2>Open to full-stack software engineering roles and AI/backend projects.</h2>
                <p>
                  I am open to full-stack software engineering roles, backend-heavy product work, AI applications, and teams that value ownership, learning, and practical problem solving.
                </p>
              </div>
              <div className="contact-actions" aria-label="Contact links">
                <a className="button primary" href="mailto:ilmeedesilva@gmail.com">Email</a>
                <a className="button secondary" href="https://www.linkedin.com/in/ilmeedesilva/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="button secondary" href="https://github.com/ilmeedesilva" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div>
              <a className="footer-brand" href="#home">Ilmee De Silva</a>
              <p>Full-Stack Software Engineer · Backend, AI, APIs, databases and cloud integrations</p>
            </div>
            <nav className="footer-nav" aria-label="Footer links">
              <a href="#profile">Profile</a>
              <a href="#projects">Projects</a>
              <a href="mailto:ilmeedesilva@gmail.com">Email</a>
              <a href="https://github.com/ilmeedesilva" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/ilmeedesilva/" target="_blank" rel="noreferrer">LinkedIn</a>
            </nav>
          </footer>
      <PortfolioBehavior />
    </>
  );
}
