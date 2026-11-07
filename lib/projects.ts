export type Category = 'AI' | 'Backend' | 'ML' | 'Mobile';

export type ProjectImage = { src: string; alt: string; width: number; height: number; caption?: string; tall?: boolean };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  categories: Category[];
  year: string;
  context: string;
  repo?: string;
  links: { label: string; href: string }[];
  stack: string[];
  stats: { value: string; label: string }[];
  problem: string;
  pipeline: string[];
  decisions: { title: string; body: string }[];
  results: string[];
  images: ProjectImage[];
  cover?: ProjectImage;
  research?: { title: string; authors: string[]; affiliation: string; status: string; abstract: string; questions: string[] };
};

export const projects: Project[] = [
  {
    slug: 'patchpilot',
    name: 'patchpilot',
    tagline: 'An AI agent that upgrades a dependency, fixes the code that breaks, and opens the pull request.',
    summary:
      'Dependabot bumps the version number; when the build breaks, the fix is still on you. patchpilot does that part. It upgrades inside a Docker sandbox, reads the failing tests and changelog, edits the code, and keeps going until the tests pass.',
    categories: ['AI', 'Backend'],
    year: '2026',
    context: 'Open-source · published on PyPI',
    repo: 'patchpilot',
    links: [
      { label: 'GitHub', href: 'https://github.com/ilmeedesilva/patchpilot' },
      { label: 'PyPI', href: 'https://pypi.org/project/patchpilot/' },
      { label: 'PR it opened', href: 'https://github.com/ilmeedesilva/patchpilot-demo/pull/1' },
      { label: 'PR it opened on its own', href: 'https://github.com/ilmeedesilva/patchpilot-demo/pull/3' },
      { label: 'Write-up', href: 'https://dev.to/ilmeedesilva/i-built-an-ai-agent-that-fixes-the-code-a-dependency-upgrade-breaks-2664' },
    ],
    stack: ['Python 3.11+', 'Claude API (tool use)', 'Docker', 'git worktrees', 'GitHub Actions', 'GitHub CLI', 'pytest'],
    stats: [
      { value: 'pipx install', label: 'published on PyPI with CI' },
      { value: 'v1 → v2', label: 'pydantic migration done end to end' },
      { value: 'Weekly', label: 'GitHub Action opens PRs unattended' },
    ],
    problem:
      'Major-version upgrades are where dependency bots stop helping. The bump is one line; the breaking changes are scattered through your code. Engineers put these upgrades off until they are risky.',
    pipeline: [
      'Read dependency files',
      'Isolated git worktree',
      'Locked-down Docker sandbox',
      'Baseline test run',
      'Agent loop: upgrade → test → read failures → edit',
      'Re-run tests independently',
      'Commit + open PR',
    ],
    decisions: [
      {
        title: 'A hand-written agent loop',
        body: 'I wrote the tool-use loop directly against the Claude API instead of using a framework, so every tool (pip_install, run_tests, write_file, read_changelog) and its guard rails are explicit and testable.',
      },
      {
        title: 'Never trust the model’s word',
        body: 'When the agent says it’s done, patchpilot re-runs the tests itself before committing. If they still fail, the PR opens as a draft and says so.',
      },
      {
        title: 'Sandbox first',
        body: 'Project code runs in Docker as a non-root user with capped resources, and only the repo is mounted. Work happens in a temporary git worktree, so your checkout is never touched.',
      },
      {
        title: 'No tokens to leak',
        body: 'Pull requests go through the GitHub CLI, so patchpilot never handles a GitHub token itself.',
      },
    ],
    results: [
      'Upgraded a demo app from pydantic v1 to v2: moved BaseSettings to pydantic-settings, rewrote validators, and wrote the PR description listing each breaking change.',
      'Running as a scheduled GitHub Action, it picked marshmallow 3 → 4 by itself, fixed the code, and opened a PR with no one involved.',
      'Packaged and published to PyPI with CI, a quick-start guide and a write-up on dev.to.',
    ],
    cover: { src: '/assets/work/patchpilot-demo.gif', alt: 'Terminal recording of patchpilot upgrading pydantic and opening a pull request', width: 1955, height: 1075 },
    images: [
      { src: '/assets/work/patchpilot-demo.gif', alt: 'patchpilot upgrading pydantic 1 to 2 and opening a pull request', width: 1955, height: 1075, caption: 'A real run: upgrading pydantic 1 → 2 and opening the PR.' },
      { src: '/assets/work/patchpilot-action.gif', alt: 'The patchpilot GitHub Action picking marshmallow and opening a pull request', width: 1180, height: 952, caption: 'The GitHub Action’s first unattended run on patchpilot-demo.' },
    ],
  },
  {
    slug: 'mesa',
    name: 'MESA',
    tagline: 'My final-year research: a static analysis tool that finds architectural anti-patterns between microservices, before anything is deployed.',
    summary:
      'MESA treats a set of microservice repositories as one product. It reads source code and configuration without running anything, builds a graph of how services really call each other and share data, and detects five anti-patterns. Every finding comes with the file, line, confidence and limitations behind it. Health scores, governance policies and a CI fitness gate turn those findings into decisions.',
    categories: ['Backend', 'AI'],
    year: '2026',
    context: 'Final-year research · paper in preparation',
    repo: 'MESA',
    links: [{ label: 'Code, benchmarks & raw results', href: 'https://github.com/ilmeedesilva/MESA' }],
    stack: ['Python', 'FastAPI', 'Typer CLI', 'Pydantic', 'NetworkX', 'Neo4j', 'PostgreSQL', 'React', 'TypeScript', 'Cytoscape.js', 'Docker Compose'],
    stats: [
      { value: '30 / 0 / 0', label: 'TP / FP / FN on 3 real public microservice systems' },
      { value: '76 / 76', label: 'seeded findings reproduced across 8 benchmark systems' },
      { value: '≤ 25%', label: 'recall from two frontier LLMs on the same real repos' },
    ],
    research: {
      title: 'MESA: A Cross-Service Static Analysis Tool for Detecting Architectural Anti-Patterns in Microservice-Based Software Systems',
      authors: ['K. I. W. De Silva', 'M. W. Wadumulla'],
      affiliation: 'School of Computing and Engineering, NIBM · BSc (Hons) Computing, Coventry University',
      status: 'Paper in preparation for publication',
      abstract:
        'Anti-patterns such as dependency cycles, shared databases and hard-coded service addresses form between the services of a microservice system, where single-repository analysers miss them and runtime tracing needs a deployed system. Built through Design Science Research, MESA extracts service interactions from code and configuration into a graph and detects five anti-patterns with graph- and rule-based detectors, attaching evidence and stated limitations to every finding. It reproduced all 76 seeded findings and, after two refinements, identified all 30 labelled hard-coded dependencies in three public systems with no false positives. Two general-purpose LLMs, including the top-ranked model on SWE-bench Verified, recovered at most 25% of the labelled dependencies in the real systems and were not fully consistent across repeated runs.',
      questions: [
        'How can architectural information be collected from multiple repositories and configuration files?',
        'Which graph-based and rule-based techniques can identify anti-patterns in a service interaction model?',
        'How can findings be presented clearly for architecture evaluation and governance?',
        'How well does the prototype detect the selected anti-patterns on benchmark systems?',
      ],
    },
    problem:
      'Microservices move complexity out of each codebase and into the connections between services: network calls, configuration and shared infrastructure. Each service can look clean on its own while the system has dependency cycles, shared databases, chatty synchronous calls and hard-coded endpoints. Single-repository linters can’t see this, and tracing tools only work once the system is deployed and taking traffic.',
    pipeline: [
      'Read-only repository ingestion (path, archive or GitHub URL)',
      'Weighted, multi-signal service discovery',
      'Static fact extraction: Python AST, Java, JS/TS, Go, config',
      'Directed multigraph of services and databases (NetworkX → Neo4j)',
      'Five detectors: cycles, shared DB, chatty, hard-coded, God Service',
      'Evidence ledger, health score, governance & CI fitness gate',
    ],
    decisions: [
      {
        title: 'Evidence on every finding',
        body: 'Each finding carries the rule that fired, the services involved, the file and line, a confidence rationale and its limitations. That is what made it possible to trace every false positive to its source.',
      },
      {
        title: 'Deterministic detection, AI only to explain',
        body: 'Detection is graph and rule based, so the same code always gives the same answer. An optional LLM can restate a finding in plain language, but it never decides what is found.',
      },
      {
        title: 'Report the bad numbers too',
        body: 'Sock Shop first scored 0.19 precision (17 of 21 findings false). The cause was context, not the rules: URLs in comments, contract mocks and self-referencing tests. Two narrow fixes brought it to 1.0, with regression tests.',
      },
      {
        title: 'Reject fixes that cost recall',
        body: 'Excluding all test directories removed the false positives but also dropped real findings. I measured it against every benchmark, reverted it, and kept the narrower rules.',
      },
      {
        title: 'Tested against frontier LLMs',
        body: 'I ran Claude Sonnet 5 and Claude Opus 5 five times per system with the same taxonomy and scoring. Neither exceeded F1 0.40 on the real repositories, and neither gave the same answer every time.',
      },
      {
        title: 'Never execute target code',
        body: 'Repositories are mounted read-only and only parsed, so MESA is safe to run on untrusted code and cheap enough to run in CI (under 0.6 s per corpus).',
      },
    ],
    results: [
      'Real repositories (Online Boutique, a Spring Boot sample, Sock Shop): 30 true positives, 0 false positives, 0 false negatives.',
      'Seeded benchmark of 8 systems and 32 services: 76 / 76 findings, service discovery F1 0.98.',
      'Fully deterministic across repeated runs; both LLM baselines were not, and recalled at most 25% on the real systems.',
      'Analysis in under 0.6 s per corpus with ~58 MB peak memory; 112 automated tests, 80% coverage, lint-clean.',
      'Fitness gate passed Online Boutique (88.9) and Sock Shop (78.4) and failed the Spring sample (70.1), returning a non-zero exit code for CI.',
      'Limitations stated openly: literal addresses only, real-code validation covers one anti-pattern type, single-reviewer ground truth.',
    ],
    cover: { src: '/assets/work/mesa-graph.webp', alt: 'MESA architecture graph with risky dependencies highlighted in red and health scores', width: 1345, height: 602 },
    images: [
      { src: '/assets/work/mesa-graph.webp', alt: 'MESA dependency graph and health scores', width: 1345, height: 602, caption: 'Dependency graph: risky calls in red, with service, domain and system health.' },
      { src: '/assets/work/mesa-ai-baseline.webp', alt: 'MESA compared with Claude Sonnet 5 and Claude Opus 5', width: 1340, height: 609, caption: 'MESA vs. two general-purpose LLMs, five runs per system.' },
      { src: '/assets/work/mesa-findings.webp', alt: 'Findings with evidence panels', width: 1600, height: 775, caption: 'Every finding links to the file and line that caused it.' },
      { src: '/assets/work/mesa-fitness-gate.webp', alt: 'Architecture fitness gate passing', width: 1600, height: 772, caption: 'The fitness gate: the same check that runs in CI as mesa gate.' },
      { src: '/assets/work/mesa-architecture.webp', alt: 'MESA system architecture diagram', width: 1800, height: 1490, caption: 'System architecture: React frontend, FastAPI, analysis core, PostgreSQL and Neo4j.' },
    ],
  },
  {
    slug: 'dr-triage',
    name: 'DR-Triage',
    tagline: 'Explainable, order-aware diabetic retinopathy screening from retinal photos.',
    summary:
      'A computer-vision model that grades diabetic retinopathy into 5 stages, decides whether to refer the patient, shows a calibrated confidence, and flags uncertain cases. A heatmap shows where it looked, and a chatbot answers questions with cited sources.',
    categories: ['ML', 'AI'],
    year: '2026',
    context: 'Computer Vision coursework',
    repo: 'Diabetic-Retinopathy-Stage-Detection',
    links: [{ label: 'GitHub', href: 'https://github.com/ilmeedesilva/Diabetic-Retinopathy-Stage-Detection' }],
    stack: ['PyTorch', 'EfficientNetV2-S', 'CBAM attention', 'OpenCV', 'Grad-CAM++', 'MC-Dropout', 'RAG chatbot'],
    stats: [
      { value: '0.854', label: 'quadratic weighted kappa (test)' },
      { value: '0.979', label: 'AUC for “refer to ophthalmologist”' },
      { value: '3,662', label: 'clinician-graded images (APTOS 2019)' },
    ],
    problem:
      'Disease stages are ordered. Calling Proliferative DR “No DR” is far worse than confusing two adjacent stages, but a plain softmax classifier treats both mistakes the same. A screening tool also has to show why it decided and refuse bad photos.',
    pipeline: [
      'Image-quality gate',
      'Circle crop → green channel → CLAHE → Ben Graham',
      'EfficientNetV2-S + CBAM',
      'Stage, ordinal (CORN) & referable heads',
      'Temperature scaling + MC-Dropout',
      'Grad-CAM++ overlay + RetinaBot',
    ],
    decisions: [
      {
        title: 'Order-aware loss',
        body: 'A CORN ordinal head plus a kappa-aware loss penalises distant mistakes harder than near ones, which matches how clinicians grade.',
      },
      {
        title: 'Know when not to answer',
        body: 'A quality gate rejects blurred, dark or off-centre photos before prediction. MC-Dropout flags low-certainty cases for human review.',
      },
      {
        title: 'Explain, don’t just predict',
        body: 'Grad-CAM++ shows which regions drove each grade. RetinaBot answers follow-up questions from cited screening-guideline snippets instead of free-form generation.',
      },
    ],
    results: ['Test QWK 0.854 and referable-DR AUC 0.979 with calibrated probabilities.', 'A working triage app that grades, explains, refuses poor images and answers questions.'],
    cover: { src: '/assets/work/dr-gradcam.webp', alt: 'Grad-CAM++ heatmaps over retinal fundus photographs', width: 1800, height: 602 },
    images: [
      { src: '/assets/work/dr-gradcam.webp', alt: 'Grad-CAM++ heatmaps for correct and incorrect predictions', width: 1800, height: 602, caption: 'Grad-CAM++ on correct (green) and incorrect (red) predictions.' },
      { src: '/assets/work/dr-pipeline.webp', alt: 'Preprocessing steps on a fundus image', width: 1800, height: 347, caption: 'Preprocessing: crop, green channel, CLAHE, Ben Graham normalisation.' },
      { src: '/assets/work/dr-app-grade.webp', alt: 'Triage app grading a fundus image', width: 900, height: 360, caption: 'The triage app: grade, referral decision and confidence.' },
    ],
  },
  {
    slug: 'clinicflow',
    name: 'ClinicFlow',
    tagline: 'An iOS app that tells outpatients where to go next and how long they’ll wait.',
    summary:
      'A SwiftUI app for a single outpatient clinic. It covers booking, live queue status for consultation, lab and pharmacy, a chatbot that gives indoor directions, and family profiles so one person can manage everyone’s visits.',
    categories: ['Mobile'],
    year: '2026',
    context: 'iOS coursework · team of 2',
    repo: 'ClinicFlow',
    links: [
      { label: 'GitHub', href: 'https://github.com/ilmeedesilva/ClinicFlow' },
      { label: 'Figma', href: 'https://www.figma.com/design/RFo7AUWolN3ZAgX7hFGIOm/ClinicFlow?node-id=344-4298' },
    ],
    stack: ['Swift', 'SwiftUI', 'MVVM', 'ObservableObject', 'Local notifications', 'Figma'],
    stats: [
      { value: '3', label: 'parallel queues tracked in one view' },
      { value: '8', label: 'use cases designed from stakeholder input' },
      { value: '44pt', label: 'minimum touch targets for elderly users' },
    ],
    problem:
      'Clinic patients aren’t mainly stressed by how long they wait. They’re stressed by not knowing: whether they missed their turn, where the lab is, or what comes after the pharmacy.',
    pipeline: ['Sign in (OTP / Apple / Google)', 'Book consultation', 'Live queue status', 'Lab booking', 'Pharmacy upload', 'Indoor-navigation chatbot'],
    decisions: [
      {
        title: 'Transparency beats speed',
        body: 'The key insight: making the queue visible lowers anxiety even when the wait stays the same. So every flow moves through clear states (Awaiting → Your turn → Done).',
      },
      {
        title: 'MVVM with shared app state',
        body: 'Consultation, lab and pharmacy can all run at once. ObservableObject view models and an EnvironmentObject keep the multi-queue dashboard consistent.',
      },
      {
        title: 'Designed for Mr. Perera, 67',
        body: 'Personas drove the UI: large type, high contrast, shallow navigation and plain-language instructions.',
      },
    ],
    results: ['A working SwiftUI MVP with simulated real-time queue transitions and notifications.', 'A full Figma prototype, personas and use-case documentation.'],
    cover: { src: '/assets/work/clinicflow-status.webp', alt: 'ClinicFlow queue status screens', width: 1222, height: 614 },
    images: [
      { src: '/assets/work/clinicflow-booking.webp', alt: 'ClinicFlow consultation booking flow screens', width: 1500, height: 684, caption: 'Booking flow: specialty → doctor → time slot → location.' },
      { src: '/assets/work/clinicflow-status.webp', alt: 'ClinicFlow consultation status progression', width: 1222, height: 614, caption: 'Queue states move from awaiting to your turn to completed.' },
      { src: '/assets/work/clinicflow-queue.webp', alt: 'Queue status overview screen', width: 367, height: 741, caption: 'All active queues in one place.', tall: true },
      { src: '/assets/work/clinicflow-chatbot.webp', alt: 'Chatbot giving indoor directions on a clinic map', width: 340, height: 743, caption: 'Chatbot directions with a highlighted route.', tall: true },
      { src: '/assets/work/clinicflow-notifications.webp', alt: 'Notifications screen', width: 416, height: 858, caption: 'Turn, lab and follow-up notifications.', tall: true },
    ],
  },
  {
    slug: 'receiptsnap',
    name: 'ReceiptSnap',
    tagline: 'Snap a receipt, track spending, split bills. A native iOS expense app.',
    summary:
      'An iOS app that reads receipts with on-device OCR and turns them into categorised expenses. It adds budgets with overspend alerts, bill splitting, spending reports, and a Face ID or passcode lock.',
    categories: ['Mobile'],
    year: '2026',
    context: 'iOS project',
    repo: 'ReceiptSnapApp',
    links: [{ label: 'GitHub', href: 'https://github.com/ilmeedesilva/ReceiptSnapApp' }],
    stack: ['Swift', 'SwiftUI', 'Core Data', 'On-device OCR', 'Face ID / LocalAuthentication', 'MVVM'],
    stats: [
      { value: '10', label: 'feature modules' },
      { value: 'Offline', label: 'Core Data persistence' },
      { value: 'Face ID', label: 'biometric app lock' },
    ],
    problem: 'Receipts get lost and expenses get guessed. Logging them by hand is tedious enough that most people stop.',
    pipeline: ['Scan receipt', 'OCR extraction', 'Categorise', 'Budget check', 'Split / report'],
    decisions: [
      { title: 'Feature-module architecture', body: 'Auth, Biometric, Budget, Dashboard, Receipts, Reports and more are separate modules, each with its own views and view models.' },
      { title: 'Validation tested', body: 'Core Data validation rules have unit tests, so bad data never reaches budgets or reports.' },
    ],
    results: ['Full flows for OCR receipts, budgets with exceeded alerts, splits, reports, notifications and biometric security.'],
    images: [],
  },
  {
    slug: 'tuk-tuk-tracking-api',
    name: 'Tuk-Tuk Tracking API',
    tagline: 'A serverless REST API for real-time three-wheeler tracking for Sri Lankan law enforcement.',
    summary:
      'Tracks tuk-tuk locations and logs their movement history for police use. Built on Express with Prisma and PostgreSQL, deployed serverlessly on AWS Lambda behind API Gateway, with JWT auth and Swagger docs.',
    categories: ['Backend'],
    year: '2026',
    context: 'Web API coursework',
    repo: 'tuk-tuk-tracking-web-api',
    links: [{ label: 'GitHub', href: 'https://github.com/ilmeedesilva/tuk-tuk-tracking-web-api' }],
    stack: ['Node.js 20', 'Express', 'Prisma', 'PostgreSQL (Supabase)', 'AWS Lambda', 'API Gateway', 'CloudWatch', 'JWT', 'Swagger'],
    stats: [
      { value: 'Serverless', label: 'Lambda + API Gateway' },
      { value: '15m / 7d', label: 'access / refresh token lifetimes' },
      { value: 'OpenAPI', label: 'documented with Swagger' },
    ],
    problem: 'Law enforcement needs a reliable, auditable record of where vehicles are and where they have been, served through an API that scales to zero when idle.',
    pipeline: ['Client', 'API Gateway (rate limits)', 'Lambda (Express via serverless-http)', 'Prisma → Postgres (pgBouncer)', 'CloudWatch logs'],
    decisions: [
      { title: 'Connection pooling for serverless', body: 'Lambda can open many short-lived connections. Routing Prisma through pgBouncer keeps PostgreSQL from running out of them.' },
      { title: 'Short-lived tokens', body: 'JWT access tokens last 15 minutes and refresh tokens 7 days, with bcrypt-hashed credentials.' },
    ],
    results: ['A deployed, documented API with JWT auth, centralised logging and Swagger docs.'],
    images: [],
  },
  {
    slug: 'resume-reviewer',
    name: 'AI Resume Reviewer',
    tagline: 'Compare a resume against a real job description: match score, keyword gaps, interview questions.',
    summary:
      'Upload a PDF or DOCX, or paste text. Documents are parsed in the browser, then a server route asks an LLM for a structured review. If no AI key is set, it falls back to local keyword analysis, so the demo never breaks.',
    categories: ['AI'],
    year: '2026',
    context: 'Live demo on this site',
    links: [{ label: 'Try it live', href: '/apps/resume-reviewer' }],
    stack: ['Next.js route handler', 'LLM structured output', 'Browser PDF / DOCX parsing', 'TypeScript'],
    stats: [
      { value: 'Live', label: 'runs on this site' },
      { value: '6', label: 'file formats parsed client-side' },
      { value: 'Fallback', label: 'works without an API key' },
    ],
    problem: 'Job seekers can’t tell which keywords and experience a role actually screens for, or how far their resume is from it.',
    pipeline: ['Upload / paste', 'Client-side parsing', 'API route', 'LLM structured JSON', 'Score, gaps, questions'],
    decisions: [{ title: 'Degrade gracefully', body: 'Without an API key the route switches to keyword analysis, so the demo always returns something useful.' }],
    results: ['A usable tool anyone can try from this portfolio.'],
    images: [],
  },
];

export const featuredSlug = 'patchpilot';
export const researchSlug = 'mesa';

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectNeighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return { previous: projects[i - 1], next: projects[i + 1] };
}
