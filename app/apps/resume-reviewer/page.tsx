import Script from 'next/script';

export const metadata = {
  title: 'AI Resume Reviewer | Ilmee De Silva',
  description:
    'Upload or paste a resume and job description to get match scoring, keyword gaps, strengths, improvements, and interview questions.',
};

export default function ResumeReviewerPage() {
  return (
    <>
      <link rel="stylesheet" href="/legacy/resume-reviewer.css" />
      <header className="topbar" data-header>
            <a className="brand" href="https://ilmeedesilva.vercel.app/" aria-label="Ilmee De Silva portfolio">
              <img className="nav-avatar" src="/assets/profile.png" alt="Ilmee De Silva" />
              <span>
                <strong>Ilmee De Silva</strong>
                <small>AI Resume Reviewer</small>
              </span>
            </a>
            <nav className="site-nav" aria-label="Resume reviewer navigation">
              <a href="#review">Review</a>
              <a href="#results">Results</a>
              <a href="#how">Workflow</a>
              <a href="https://ilmeedesilva.vercel.app/">Portfolio</a>
              <button className="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false">
                <span className="theme-icon sun" aria-hidden="true">☼</span>
                <span className="theme-thumb" aria-hidden="true"></span>
                <span className="theme-icon moon" aria-hidden="true">◐</span>
              </button>
            </nav>
          </header>

          <main>
            <section className="hero reveal" aria-label="AI Resume Reviewer introduction">
              <div className="hero-content">
                <p className="eyebrow">Portfolio Product | Resume Intelligence</p>
                <h1>Review your resume against a real job description.</h1>
                <p className="hero-copy">
                  Upload documents or paste text to get a practical match score, keyword gaps,
                  strengths, improvement ideas, and interview questions. Built as part of Ilmee's
                  backend, AI, API, and product engineering portfolio.
                </p>
                <div className="hero-actions">
                  <a className="button primary" href="#review">Start Analysis</a>
                  <a className="button secondary" href="https://ilmeedesilva.vercel.app/#projects">View Portfolio</a>
                </div>
              </div>
              <aside className="product-card" aria-label="Product capabilities">
                <div className="product-orb" aria-hidden="true">AI</div>
                <p>Live document workflow</p>
                <h2>Resume + JD match engine</h2>
                <div className="capability-grid">
                  <span>PDF</span>
                  <span>DOCX</span>
                  <span>TXT</span>
                  <span>AI API</span>
                </div>
              </aside>
            </section>

            <section className="metrics-strip reveal" aria-label="Product highlights">
              <div>
                <span>Inputs</span>
                <strong>Upload or paste</strong>
              </div>
              <div>
                <span>Analysis</span>
                <strong>AI with local fallback</strong>
              </div>
              <div>
                <span>Output</span>
                <strong>Score, gaps, next steps</strong>
              </div>
            </section>

            <section className="review-shell" id="review">
              <div className="panel input-panel reveal">
                <div className="section-title">
                  <p className="eyebrow">Step 01 | Add Documents</p>
                  <h2>Upload files or paste the text.</h2>
                  <p>
                    Use PDF, DOCX, TXT, Markdown, CSV, or JSON files. You can also type directly
                    into either field when you want to test a quick edit.
                  </p>
                </div>

                <div className="parser-status" data-parser-status>
                  Parsers ready for text files. PDF/DOCX parsers load from CDN when the page opens.
                </div>

                <div className="input-grid">
                  <article className="document-card">
                    <div className="document-head">
                      <div className="step-icon" aria-hidden="true">01</div>
                      <div>
                        <label htmlFor="resume">Resume</label>
                        <p>Upload your resume or paste/write the latest version.</p>
                      </div>
                      <button className="text-button" type="button" data-clear="resume">Clear</button>
                    </div>
                    <label className="upload-box" htmlFor="resume-file">
                      <input
                        id="resume-file"
                        type="file"
                        accept=".txt,.md,.csv,.json,.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,text/csv,application/json"
                        data-file-input="resume"
                      />
                      <span>Upload resume file</span>
                      <small data-file-status="resume">No file selected</small>
                    </label>
                    <textarea id="resume" placeholder="Paste or write your resume text here..."></textarea>
                    <div className="input-meta">
                      <span data-count="resume">0 words</span>
                      <span>Resume content</span>
                    </div>
                  </article>

                  <article className="document-card">
                    <div className="document-head">
                      <div className="step-icon" aria-hidden="true">02</div>
                      <div>
                        <label htmlFor="job">Job description</label>
                        <p>Upload the target job post or paste/write the description.</p>
                      </div>
                      <button className="text-button" type="button" data-clear="job">Clear</button>
                    </div>
                    <label className="upload-box" htmlFor="job-file">
                      <input
                        id="job-file"
                        type="file"
                        accept=".txt,.md,.csv,.json,.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,text/csv,application/json"
                        data-file-input="job"
                      />
                      <span>Upload JD file</span>
                      <small data-file-status="job">No file selected</small>
                    </label>
                    <textarea id="job" placeholder="Paste or write the job description here..."></textarea>
                    <div className="input-meta">
                      <span data-count="job">0 words</span>
                      <span>Job description content</span>
                    </div>
                  </article>
                </div>

                <div className="action-row">
                  <button className="button primary analyze-button" type="button" data-analyze>Analyze Match</button>
                  <p>Runs AI analysis when available, then falls back to local keyword matching.</p>
                </div>
              </div>

              <aside className="panel result-panel reveal" id="results" aria-live="polite">
                <div className="section-title compact">
                  <p className="eyebrow">Step 02 | Results</p>
                  <h2>Actionable feedback.</h2>
                </div>
                <div className="score-card">
                  <span>Match Score</span>
                  <strong data-score>--</strong>
                  <p data-score-label>Add a resume and job description to begin.</p>
                </div>

                <div className="result-grid">
                  <section>
                    <h3>Top Missing Keywords</h3>
                    <ul data-missing>
                      <li>Waiting for analysis</li>
                    </ul>
                  </section>
                  <section>
                    <h3>Resume Strengths</h3>
                    <ul data-strengths>
                      <li>Waiting for analysis</li>
                    </ul>
                  </section>
                  <section>
                    <h3>Suggested Improvements</h3>
                    <ul data-suggestions>
                      <li>Waiting for analysis</li>
                    </ul>
                  </section>
                  <section>
                    <h3>Interview Questions</h3>
                    <ul data-questions>
                      <li>Waiting for analysis</li>
                    </ul>
                  </section>
                </div>
              </aside>
            </section>

            <section className="how reveal" id="how">
              <div className="section-title centered">
                <p className="eyebrow">Workflow</p>
                <h2>A simple product flow with real engineering underneath.</h2>
                <p>
                  The interface stays friendly for candidates while the workflow demonstrates
                  document parsing, API thinking, fallback behavior, and useful output design.
                </p>
              </div>
              <div className="how-grid">
                <article>
                  <span>01</span>
                  <h3>Parse</h3>
                  <p>Extract readable text from PDF, DOCX, and text-based files in the browser.</p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Analyze</h3>
                  <p>Compare resume evidence with role requirements using AI or local matching.</p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Improve</h3>
                  <p>Turn the gaps into clearer bullets, stronger keywords, and interview prep.</p>
                </article>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div>
              <strong>AI Resume Reviewer</strong>
              <p>A portfolio product by Ilmee De Silva.</p>
            </div>
            <nav aria-label="Footer navigation">
              <a href="https://ilmeedesilva.vercel.app/">Portfolio</a>
              <a href="https://github.com/ilmeedesilva" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/ilmeedesilva/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:ilmeedesilva@gmail.com">Email</a>
            </nav>
          </footer>
      <Script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js" strategy="afterInteractive" />
      <Script src="/legacy/resume-reviewer.js" strategy="afterInteractive" />
    </>
  );
}
