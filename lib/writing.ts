export type ArticleSection = {
  heading: string;
  body?: string[];
  callout?: string;
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  code?: { language: string; value: string };
};

export type BlogArticle = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  coverImage: string;
  datePosted: string;
  category: string;
  readingTime: string;
  technologies: string[];
  summary: string;
  sections: ArticleSection[];
};

export const articles: BlogArticle[] = [
  {
    slug: 'building-semantic-search-with-azure-ai-search',
    title: 'Building Semantic Search with Azure AI Search',
    subtitle: 'How I evaluated semantic and hybrid search for an enterprise financial document workflow.',
    cover: 'A clean diagram-style image showing financial reports flowing from blob storage into Azure AI Search, then into a FastAPI search service.',
    coverImage: '/assets/blog/semantic-search-cover.png',
    datePosted: '15 June 2026',
    category: 'Search Architecture',
    readingTime: '8 min read',
    technologies: ['Python', 'FastAPI', 'Azure AI Search', 'Azure Blob Storage', 'Azure OpenAI', 'SQL Server'],
    summary: 'How documents become searchable knowledge.',
    sections: [
      {
        heading: 'Introduction',
        body: [
          'The problem started with a very normal request: make financial documents easier to search. The interesting part was that the documents were not written for machines. They had tables, report sections, fund names, small notes, repeated wording, and plenty of financial language that only made sense in context.',
          'I was working on the backend and search side of an enterprise financial platform. My role was not to make a flashy AI demo. It was to understand whether Azure AI Search could help us build a reliable search service that worked with real reports, real document storage, and backend APIs that other parts of the platform could trust.',
        ],
      },
      {
        heading: 'Background',
        body: [
          'The platform already had financial documents stored and managed through backend workflows. The next challenge was retrieval: given a report, a fund, or a user query, how do we find the most relevant content without forcing the user to know the exact wording inside the document?',
          'Traditional keyword search was useful, but it struggled when the wording changed. Semantic search was attractive because it could rank passages by meaning. Hybrid search became the practical choice because financial users still need exact terms, identifiers, dates, and domain-specific phrases to matter.',
        ],
        callout: 'The goal was not to replace deterministic search. The goal was to combine exact search and semantic ranking in a way that made financial document retrieval more useful.',
      },
      {
        heading: 'Problem',
        body: [
          'The search service needed to connect several pieces: documents in Azure Blob Storage, metadata in SQL Server, indexing through Azure AI Search, and REST APIs exposed through FastAPI. Each piece had its own constraints.',
          'The design question was: how much intelligence should live in the search index, and how much should remain in the backend service layer?',
        ],
        table: {
          head: ['Decision area', 'Option', 'Trade-off'],
          rows: [
            ['Search mode', 'Keyword only', 'Precise but weak when users do not know exact wording'],
            ['Search mode', 'Semantic only', 'Better meaning-based ranking but less predictable for identifiers'],
            ['Search mode', 'Hybrid', 'More balanced, but requires careful scoring and filtering'],
            ['Storage', 'Blob-first documents', 'Scales well, but metadata must be kept aligned'],
          ],
        },
      },
      {
        heading: 'Investigation',
        body: [
          'I researched Azure AI Search from the perspective of a backend engineer: indexing model, searchable fields, filterable metadata, semantic ranking, query modes, and how the service would behave when connected to real document workflows.',
          'The most important discovery was that metadata mattered as much as the text. A financial report is not just content. It belongs to a fund, a document type, a period, and a processing workflow. Without metadata filters, search results can become technically relevant but operationally wrong.',
        ],
        code: {
          language: 'mermaid',
          value: `flowchart LR
  A[Financial documents] --> B[Azure Blob Storage]
  B --> C[Indexing workflow]
  D[SQL Server metadata] --> C
  C --> E[Azure AI Search index]
  F[FastAPI search API] --> E
  F --> G[Application user]`,
        },
      },
      {
        heading: 'Solution',
        body: [
          'The backend integration used Azure AI Search as a retrieval layer, while keeping routing, validation, and metadata decisions in the API layer. That gave us a cleaner separation: the index handled retrieval, while FastAPI controlled the product behavior.',
          'Hybrid search was selected because it gave us both sides of the problem: keyword matching for exact financial terms and semantic ranking for natural-language queries.',
        ],
        code: {
          language: 'python',
          value: `def search_documents(query, fund_id, report_type):
    filters = {
        "fundId": fund_id,
        "reportType": report_type,
    }

    return search_client.search(
        text=query,
        query_type="semantic",
        search_mode="hybrid",
        filters=filters,
        top=10,
    )`,
        },
      },
      {
        heading: 'Lessons learned',
        list: [
          'Semantic search is only as useful as the metadata around it.',
          'Hybrid search is a better default for financial documents than semantic-only search.',
          'Backend APIs should hide search-provider complexity from the rest of the product.',
          'Search design is an architecture problem, not just a query problem.',
        ],
      },
      {
        heading: 'Future improvements',
        body: [
          'The next improvements I would explore are better evaluation sets, query logging, ranking comparison, and a small feedback loop so we can understand which search results users actually choose. Search quality should be measured, not guessed.',
        ],
      },
      {
        heading: 'Closing thoughts',
        body: [
          'This work taught me that AI search becomes valuable when it is grounded in practical backend design. The impressive part is not a semantic query by itself. It is the whole path from document storage to index design to API behavior to a result the user can trust.',
        ],
      },
    ],
  },
  {
    slug: 'solving-azure-ai-search-index-limits-with-partitioning',
    title: 'Solving Azure AI Search Index Limits with a Reusable Partitioning Strategy',
    subtitle: 'How a deterministic index allocation strategy avoided a scaling problem before it became production debt.',
    cover: 'A technical architecture image showing many funds routed into 40 reusable search index buckets.',
    coverImage: '/assets/blog/index-partitioning-cover.png',
    datePosted: '22 May 2026',
    category: 'Backend Architecture',
    readingTime: '7 min read',
    technologies: ['Azure AI Search', 'Python', 'FastAPI', 'SQL Server', 'Search Indexing', 'Backend Architecture'],
    summary: 'A reusable strategy for routing funds into limited search indexes.',
    sections: [
      {
        heading: 'Introduction',
        body: [
          'One of the better engineering problems I worked on was not about adding a new feature. It was about preventing a future scaling failure. The system needed to index financial documents by fund, and the initial direction was simple: create one Azure AI Search index per fund.',
          'That model was easy to understand, but it had a ceiling. On the Basic tier, Azure AI Search allowed around 40 indexes. A platform with more than 40 funds would eventually hit the wall.',
        ],
      },
      {
        heading: 'Background',
        body: [
          'Each fund had unique documents and metadata. Keeping funds separated was important because search results should never mix unrelated financial content. The first instinct was physical separation: one fund, one index.',
          'Physical separation is clean until the infrastructure limit becomes part of the product limit. I wanted a design that kept the mental model of separation without creating hundreds of indexes.',
        ],
      },
      {
        heading: 'Problem',
        body: [
          'The issue was not just the number 40. The deeper issue was operational growth. If every new fund required a new index, then onboarding a fund also meant provisioning, naming, monitoring, and eventually hitting service limits.',
          'A search architecture should not become more fragile every time the business grows.',
        ],
        callout: 'The design constraint was clear: keep fund data separated in query behavior, but reuse a limited number of physical indexes.',
      },
      {
        heading: 'Investigation',
        body: [
          'The key observation was that fund IDs are unique. If fund IDs are unique, we can route them deterministically into shared buckets and still filter by fund metadata inside the bucket.',
          'That led to a simple allocation rule: indexBucket = fundId % 40. The result is stable, predictable, and does not require a lookup table for every search request.',
        ],
        code: {
          language: 'python',
          value: `MAX_INDEX_BUCKETS = 40

def resolve_index_name(fund_id: int) -> str:
    bucket = fund_id % MAX_INDEX_BUCKETS
    return f"financial-documents-{bucket:02d}"`,
        },
      },
      {
        heading: 'Solution',
        body: [
          'Instead of creating one index per fund, the system can create a fixed set of reusable indexes. Each fund routes to one bucket. Within that bucket, each document still stores fundId as filterable metadata.',
          'At query time, the backend resolves the index bucket from the fund ID and applies a metadata filter. That keeps results separated even though the physical index is shared.',
        ],
        code: {
          language: 'mermaid',
          value: `flowchart TD
  A[Fund ID] --> B[indexBucket = fundId % 40]
  B --> C[Reusable index bucket]
  C --> D[Documents from multiple funds]
  E[Search request] --> F[Resolve bucket]
  F --> G[Apply filter: fundId eq requested fund]
  G --> H[Return only matching fund results]`,
        },
      },
      {
        heading: 'Why this works',
        table: {
          head: ['Property', 'Why it matters'],
          rows: [
            ['Deterministic routing', 'The same fund always maps to the same index bucket'],
            ['Unique fund IDs', 'Metadata filtering can separate funds inside a shared bucket'],
            ['Fixed index count', 'The system stays within the Basic tier index limit'],
            ['Reusable architecture', 'New funds do not require new search infrastructure'],
          ],
        },
      },
      {
        heading: 'Trade-offs',
        body: [
          'The trade-off is that physical isolation becomes logical isolation. That means metadata correctness becomes very important. Every indexed document must carry the right fund ID, and every search query must apply the right filter.',
          'For this platform, that was a reasonable trade-off because it moved complexity into a predictable backend rule instead of spreading it across infrastructure provisioning.',
        ],
      },
      {
        heading: 'Lessons learned',
        list: [
          'Infrastructure limits should be treated as design inputs early.',
          'A small deterministic rule can remove a lot of operational complexity.',
          'Logical separation works when metadata is reliable and enforced by the backend.',
          'Simple architecture is not the same as simplistic architecture.',
        ],
      },
      {
        heading: 'Closing thoughts',
        body: [
          'I like this solution because it is not clever for its own sake. It is a small rule that turns a scaling limit into a reusable architecture. Those are the kinds of backend decisions that quietly keep systems maintainable.',
        ],
      },
    ],
  },
  {
    slug: 'combining-ai-and-algorithmic-search-for-financial-values',
    title: 'Combining AI and Algorithmic Search to Locate Financial Values in Documents',
    subtitle: 'How I improved an existing financial document search feature by pairing AI reasoning with deterministic matching.',
    cover: 'A document-debugging image showing highlighted numeric values, table rows, and an AI-plus-algorithm search pipeline.',
    coverImage: '/assets/blog/financial-values-cover.png',
    datePosted: '08 April 2026',
    category: 'Debugging AI Systems',
    readingTime: '9 min read',
    technologies: ['Python', 'FastAPI', 'Azure Document Intelligence', 'Azure OpenAI', 'Financial Documents', 'Debugging'],
    summary: 'Debugging small financial values that looked too similar to page and row numbers.',
    sections: [
      {
        heading: 'Introduction',
        body: [
          'This article is about improving an existing implementation, not building the original feature from scratch. I was assigned to investigate a bug in a financial document search workflow where the system sometimes struggled to locate small values such as 0, 1, 5, and 9.',
          'At first glance, the bug sounded small. In practice, small numeric values are some of the hardest things to locate in financial documents because they appear everywhere: page numbers, row numbers, footnotes, section references, table positions, and actual financial data.',
        ],
      },
      {
        heading: 'Background',
        body: [
          'The feature searched document content to locate values inside reports. The documents were financial, so the difference between a real value and an unrelated number mattered. A wrong match could point the user to a page number instead of the value they were trying to verify.',
          'The existing implementation already had AI-assisted behavior. My job was to investigate why it failed in edge cases and improve the reliability of the result selection.',
        ],
      },
      {
        heading: 'Problem',
        body: [
          'Small values created ambiguity. Searching for 9 in a long report can return almost anything. The number might be a page number, a table row, a section label, a date fragment, or the actual value in a financial table.',
          'Exact matching was not enough because it could find too many candidates. AI alone was not enough because the model still needed structured evidence to choose between similar candidates.',
        ],
        table: {
          head: ['Approach', 'What worked', 'What failed'],
          rows: [
            ['Exact matching', 'Found all appearances of the value', 'Returned too many unrelated candidates'],
            ['AI reasoning', 'Understood context better', 'Needed reliable candidate evidence'],
            ['Combined approach', 'Balanced context and determinism', 'Required more careful pipeline design'],
          ],
        },
      },
      {
        heading: 'Investigation',
        body: [
          'I started by comparing the wrong matches with nearby document text. The pattern became clear: the system was often selecting a numerically correct value in the wrong context.',
          'That changed the debugging question. It was no longer "can we find the number?" It became "can we find the number in the right neighborhood?" For financial documents, neighborhood matters: labels, nearby table headers, fund context, page region, and surrounding text all help explain whether a number is meaningful.',
        ],
        code: {
          language: 'mermaid',
          value: `flowchart LR
  A[Target value] --> B[Find exact numeric candidates]
  B --> C[Collect surrounding context]
  C --> D[Rank deterministic signals]
  D --> E[Ask AI to reason over shortlisted candidates]
  E --> F[Return best supported match]`,
        },
      },
      {
        heading: 'Solution',
        body: [
          'The improvement came from combining deterministic filtering with AI reasoning. The algorithm first gathered candidate locations using exact matching. Then it enriched each candidate with nearby context. Instead of asking AI to search the whole document blindly, the prompt could reason over a smaller set of candidates.',
          'This made the AI part more grounded. It was not guessing from a giant document. It was choosing between structured candidates produced by the algorithm.',
        ],
        code: {
          language: 'python',
          value: `def locate_financial_value(target_value, document_text):
    candidates = find_exact_numeric_matches(target_value, document_text)

    enriched = []
    for candidate in candidates:
        enriched.append({
            "value": candidate.value,
            "page": candidate.page,
            "nearby_text": get_context_window(document_text, candidate),
            "signals": score_deterministic_signals(candidate),
        })

    shortlist = rank_candidates(enriched)[:8]
    return ask_ai_to_select_best_supported_match(shortlist)`,
        },
      },
      {
        heading: 'What changed in my thinking',
        body: [
          'The useful lesson was that AI is stronger when the backend gives it a good problem shape. Asking a model to find a tiny value in a long report is vague. Asking it to compare eight candidate matches with context is much more reliable.',
          'The deterministic layer did the mechanical work. The AI layer helped with judgment. The final behavior was better because each part was used for what it was good at.',
        ],
        callout: 'For production AI features, the best architecture is often not AI versus algorithms. It is AI plus algorithms, with each layer reducing the other layer\'s weaknesses.',
      },
      {
        heading: 'Lessons learned',
        list: [
          'Small numeric values are high-noise search targets.',
          'Exact matching needs context scoring to be useful in documents.',
          'AI prompts improve when they receive structured candidates instead of raw uncertainty.',
          'Debugging AI features still requires normal engineering habits: isolate cases, inspect evidence, and test hypotheses.',
        ],
      },
      {
        heading: 'Future improvements',
        body: [
          'The next improvement would be a lightweight evaluation set of known target values and expected locations. That would make it easier to compare prompt changes, ranking changes, and document parsing changes without relying only on manual inspection.',
        ],
      },
      {
        heading: 'Closing thoughts',
        body: [
          'This bug was a good reminder that production AI work is often less glamorous than demos, but more interesting. The hard part is not calling a model. The hard part is shaping messy real-world evidence into a decision the system can defend.',
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}


export function getRelatedArticles(slug: string) {
  const related = articles.filter((article) => article.slug !== slug);
  return related.length >= 3 ? related.slice(0, 3) : [...related, ...articles.filter((article) => article.slug === slug)].slice(0, 3);
}

export function getArticleNeighbors(slug: string) {
  const index = articles.findIndex((article) => article.slug === slug);
  return {
    previous: index > 0 ? articles[index - 1] : undefined,
    next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined,
  };
}
