export const site = {
  name: 'Ilmee De Silva',
  firstName: 'Ilmee',
  role: 'Full-Stack Software Engineer',
  url: 'https://ilmeedesilva.vercel.app',
  description:
    'Full-stack software engineer in Colombo, Sri Lanka. Backend-focused: Python, FastAPI, Java, microservices, AWS and Azure. I build APIs, LLM agents and architecture tooling that hold up under testing.',
  location: 'Colombo, Sri Lanka',
  timezone: 'Asia/Colombo',
  email: 'ilmeedesilva@gmail.com',
  phone: '+94 77 290 9244',
  phoneHref: 'tel:+94772909244',
  github: 'https://github.com/ilmeedesilva',
  githubUser: 'ilmeedesilva',
  linkedin: 'https://www.linkedin.com/in/ilmeedesilva/',
  devto: 'https://dev.to/ilmeedesilva',
  devtoUser: 'ilmeedesilva',
  cv: '/Ilmee-De-Silva-CV.pdf',
  available: true,
};

export const nav = [
  { href: '/#work', label: 'Work', id: 'work' },
  { href: '/#research', label: 'Research', id: 'research' },
  { href: '/#experience', label: 'Experience', id: 'experience' },
  { href: '/#about', label: 'About', id: 'about' },
  { href: '/#writing', label: 'Writing', id: 'writing' },
  { href: '/#contact', label: 'Contact', id: 'contact' },
];

export const impact = [
  { value: '3+ yrs', label: 'shipping production backend, cloud and AI systems' },
  { value: 'First Class', label: 'BSc (Hons) in Computing, Coventry University' },
  { value: '30 / 0', label: 'true / false positives for my MESA research on real repos' },
  { value: 'Open source', label: 'patchpilot, an AI agent published on PyPI' },
];

export type Workstream = { title: string; summary: string; points: string[]; stack: string[]; writing?: string[] };

export const experience = {
  company: 'Novigi Pty Ltd',
  role: 'Full-Stack Software Engineer',
  period: 'Jun 2023 – Present',
  location: 'Australia & Sri Lanka',
  intro:
    'I deliver end to end for Australian enterprise clients: backend development, cloud integration, QA, release management and UAT.',
  workstreams: [
    {
      title: 'AI-Tax DataSmart',
      summary: 'An AI document extraction pipeline for superannuation tax data.',
      points: [
        'Architected Python/FastAPI services that pull structured tax fields out of multi-page fund statements with inconsistent layouts.',
        'Part of the team that turned a month-long manual review into a matter of days, with fewer human errors in a compliance-critical workflow.',
        'Designed Azure AI Search indexes (schemas, fields, scoring profiles) over Blob Storage for semantic retrieval of PDF content.',
        'Built LLM prompt chains with structured output parsing, plus SQL stored procedures for validation, classification and exception flagging.',
        'Mapped Australian superannuation tax-reporting rules to data models alongside domain experts.',
      ],
      stack: ['Python', 'FastAPI', 'Azure AI Search', 'Blob Storage', 'LLMs', 'SQL Server'],
      writing: [
        'building-semantic-search-with-azure-ai-search',
        'solving-azure-ai-search-index-limits-with-partitioning',
        'combining-ai-and-algorithmic-search-for-financial-values',
      ],
    },
    {
      title: 'Apex Corro: SmartCommunications',
      summary: 'Automated correspondence for regulated Australian funds.',
      points: [
        'Built and configured automated client-letter templates in SmartCommunications for Acurity funds.',
        'Designed XML/XSD data models to keep field mapping accurate across regulated fund correspondence.',
        'Turned business requirements into template designs and data-mapping specs with stakeholders.',
      ],
      stack: ['SmartCommunications', 'XML', 'XSD', 'Data mapping'],
    },
    {
      title: 'Internal platforms & integrations',
      summary: 'Connecting the business systems a company actually runs on.',
      points: [
        'Built and maintained AWS Lambda integrations across Zoho, ProjectWorks, Employment Hero, Xero and BambooHR.',
        'Built Apache Airflow pipelines that sync data between platforms and databases for more accurate reporting.',
        'Acted as release manager: coordinated production releases, wrote release notes, ran UAT demos and support handovers.',
        'Owned regression testing and QA, and wrote documentation that shortened onboarding for new engineers.',
      ],
      stack: ['AWS Lambda', 'Apache Airflow', 'REST APIs', 'Postman', 'Azure DevOps'],
    },
  ] satisfies Workstream[],
};

export const priorRoles = [
  { role: 'Personal Assistant to CEO', org: 'Ndurance (Pvt) Ltd · Yeti Isotonic', period: 'Jun 2022 – Jun 2023' },
  { role: 'Secretary to Managing Director', org: 'Micronet Global Services (Pvt) Ltd', period: 'Sep 2021 – Jun 2022' },
  { role: 'Training & Development Assistant', org: 'Sri Lanka Badminton Association', period: 'Jan 2021 – Aug 2021' },
  { role: 'Executive, Sports & Projects', org: 'McLarens Holdings Limited', period: 'Jun 2015 – Dec 2020' },
];

export const skills = [
  {
    group: 'Backend & APIs',
    items: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'Node.js', 'Express', 'REST API design', 'JWT auth', 'OpenAPI / Swagger', 'Pydantic', 'Prisma'],
    proof: ['patchpilot', 'mesa', 'tuk-tuk-tracking-api'],
  },
  {
    group: 'Microservices & Architecture',
    items: ['Microservice design', 'Service boundaries', 'Anti-pattern detection', 'Static analysis (AST)', 'Graph modelling', 'Fitness functions & CI gates', 'Architecture governance', 'Design Science Research'],
    proof: ['mesa', 'tuk-tuk-tracking-api'],
  },
  {
    group: 'AI & ML',
    items: ['LLM agents (tool use)', 'Claude API', 'Prompt chains + structured output', 'RAG', 'Azure AI Search', 'PyTorch', 'Transfer learning', 'Grad-CAM++'],
    proof: ['patchpilot', 'dr-triage', 'resume-reviewer'],
  },
  {
    group: 'Data',
    items: ['SQL Server stored procedures', 'PostgreSQL', 'Neo4j', 'NetworkX', 'Apache Airflow', 'ETL pipelines', 'Data modelling'],
    proof: ['mesa', 'tuk-tuk-tracking-api'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS Lambda', 'API Gateway', 'S3', 'CloudWatch', 'Azure AI Search', 'Azure Blob Storage', 'Docker', 'Docker Compose', 'GitHub Actions', 'CI/CD', 'Vercel'],
    proof: ['patchpilot', 'tuk-tuk-tracking-api'],
  },
  {
    group: 'Frontend & Mobile',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Cytoscape.js', 'Swift', 'SwiftUI', 'Core Data'],
    proof: ['mesa', 'clinicflow', 'receiptsnap'],
  },
  {
    group: 'Delivery',
    items: ['Agile / Scrum', 'Release management', 'UAT', 'QA & regression testing', 'Technical writing', 'XML / XSD'],
    proof: [],
  },
];

export const education = [
  { title: 'BSc (Hons) in Computing', org: 'Coventry University', period: '2025 – 2026', note: 'First Class Honours' },
  { title: 'Higher National Diploma in Software Engineering', org: 'NIBM, Colombo', period: '2024', note: 'GPA 3.94' },
  { title: 'Diploma in Software Engineering', org: 'NIBM, Colombo', period: '2023', note: 'GPA 4.0 · Batch top · Gold medalist' },
];

export const certifications = [
  'Microsoft Azure Data Fundamentals (DP-900) Exam Prep Specialization, 2024',
  'Machine Learning with Apache Spark, IBM, 2024',
  'Python for Data Science and AI, Coursera, 2024',
  'Introduction to SQL Window Functions, Coursera, 2024',
  'Learn Next.js, Scrimba, 2026',
  'AZ-900 Azure Fundamentals (in progress)',
];

export const athletics = [
  'Junior and senior national badminton player, representing Sri Lanka internationally',
  'World Junior U-19 Championships (Malaysia, 2014)',
  'Asian Junior U-19 (2013) and ANA Asia Youth U-17 / U-15 (Japan, 2010–11)',
  'Women’s U-25 Champion, 2nd Student Olympic International Games (2015–16)',
  'National Open U-17 Singles Champion (2013); multiple All-Island age-group titles',
];
