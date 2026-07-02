const resumeInput = document.querySelector("#resume");
const jobInput = document.querySelector("#job");
const analyzeButton = document.querySelector("[data-analyze]");
const fileInputs = document.querySelectorAll("[data-file-input]");
const clearButtons = document.querySelectorAll("[data-clear]");
const score = document.querySelector("[data-score]");
const scoreLabel = document.querySelector("[data-score-label]");
const missingList = document.querySelector("[data-missing]");
const strengthsList = document.querySelector("[data-strengths]");
const suggestionsList = document.querySelector("[data-suggestions]");
const questionsList = document.querySelector("[data-questions]");
const resultPanel = document.querySelector(".result-panel");
const parserStatus = document.querySelector("[data-parser-status]");

const inputs = {
  resume: resumeInput,
  job: jobInput,
};

const fileState = {
  resume: { selected: false, parsed: false, name: "" },
  job: { selected: false, parsed: false, name: "" },
};

const stopWords = new Set([
  "and", "the", "for", "with", "you", "your", "our", "are", "that", "this",
  "from", "will", "have", "has", "can", "but", "not", "all", "any", "into",
  "their", "they", "them", "job", "role", "work", "team", "using", "use",
]);

const skillHints = [
  "python", "fastapi", "sql", "server", "azure", "openai", "api", "apis",
  "rest", "docker", "git", "testing", "cloud", "database", "document",
  "search", "javascript", "typescript", "react", "node", "aws", "lambda",
  "performance", "security", "authentication", "ci", "cd",
];

const textExtensions = [".txt", ".md", ".csv", ".json", ".log"];

if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
}

function setParserStatus(message, type = "info") {
  parserStatus.textContent = message;
  parserStatus.dataset.status = type;
}

function updateParserStatus() {
  const pdfReady = Boolean(window.pdfjsLib);
  const docxReady = Boolean(window.mammoth);

  if (pdfReady && docxReady) {
    setParserStatus("PDF, DOCX, and text parsing are ready. AI analysis runs when both inputs have text.", "success");
  } else if (pdfReady || docxReady) {
    setParserStatus("Some document parsers loaded. Text files still work; refresh if PDF/DOCX parsing is unavailable.", "warning");
  } else {
    setParserStatus("External PDF/DOCX parsers did not load. Text files and pasted text still work.", "warning");
  }
}

window.addEventListener("load", updateParserStatus);
window.setTimeout(updateParserStatus, 1200);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function updateCount(kind) {
  const counter = document.querySelector(`[data-count="${kind}"]`);
  const total = countWords(inputs[kind].value);
  counter.textContent = `${total} ${total === 1 ? "word" : "words"}`;
}

function setFileStatus(kind, message) {
  document.querySelector(`[data-file-status="${kind}"]`).textContent = message;
}

function getExtension(file) {
  const lowerName = file.name.toLowerCase();
  return lowerName.includes(".") ? lowerName.slice(lowerName.lastIndexOf(".")) : "";
}

function isTextFile(file) {
  const extension = getExtension(file);
  return file.type.startsWith("text/") || textExtensions.includes(extension);
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error(`Could not read ${file.name}`)));
    reader.readAsText(file);
  });
}

function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error(`Could not read ${file.name}`)));
    reader.readAsArrayBuffer(file);
  });
}

async function parsePdf(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF parser is still loading or unavailable. Refresh and try again.");
  }

  const buffer = await readAsArrayBuffer(file);
  const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }

  return pages.join("\n\n");
}

async function parseDocx(file) {
  if (!window.mammoth) {
    throw new Error("DOCX parser is still loading or unavailable. Refresh and try again.");
  }

  const buffer = await readAsArrayBuffer(file);
  const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value || "";
}

async function extractText(file) {
  const extension = getExtension(file);

  if (isTextFile(file)) {
    return readAsText(file);
  }

  if (extension === ".pdf" || file.type === "application/pdf") {
    return parsePdf(file);
  }

  if (
    extension === ".docx" ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return parseDocx(file);
  }

  throw new Error("Unsupported file type. Please upload PDF, DOCX, TXT, MD, CSV, or JSON.");
}

function topKeywords(text, limit = 24) {
  const counts = new Map();
  tokenize(text).forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, limit);
}

function renderList(target, items) {
  target.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

function showInputMessage() {
  const resume = resumeInput.value.trim();
  const job = jobInput.value.trim();
  const notes = [];

  if (!resume && fileState.resume.selected && !fileState.resume.parsed) {
    notes.push(`Resume file "${fileState.resume.name}" could not be parsed into text.`);
  }

  if (!job && fileState.job.selected && !fileState.job.parsed) {
    notes.push(`JD file "${fileState.job.name}" could not be parsed into text.`);
  }

  score.textContent = "--";
  scoreLabel.textContent = "Add readable text for both documents before analyzing.";
  renderList(missingList, notes.length ? notes : ["Resume and job description text are both required."]);
  renderList(strengthsList, ["Upload PDF/DOCX/TXT files or paste the text into the boxes."]);
  renderList(suggestionsList, ["If a PDF is scanned as an image, copy/paste text manually or use an OCR version."]);
  renderList(questionsList, ["After both boxes contain text, the analysis can run."]);
}

function buildLocalAnalysis(resume, job) {
  const resumeWords = new Set(tokenize(resume));
  const jobKeywords = topKeywords(job, 32);
  const matched = jobKeywords.filter((word) => resumeWords.has(word));
  const missing = jobKeywords.filter((word) => !resumeWords.has(word)).slice(0, 8);
  const scoreValue = Math.round((matched.length / Math.max(jobKeywords.length, 1)) * 100);
  const detectedSkills = skillHints.filter((skill) => resume.toLowerCase().includes(skill));

  return {
    score: scoreValue,
    summary:
      scoreValue >= 75
        ? "Strong alignment. Improve proof, metrics, and role-specific wording."
        : scoreValue >= 50
          ? "Good base. Add missing keywords and clearer impact statements."
          : "Needs tailoring. The resume should mirror more of the target role.",
    missingKeywords: missing.length ? missing : ["No obvious high-frequency keyword gaps found."],
    strengths: detectedSkills.length
      ? detectedSkills.slice(0, 6).map((skill) => `Shows evidence of ${skill}.`)
      : ["Resume has content, but technical strengths are not explicit enough."],
    suggestions: [
      "Add 2-3 measurable bullets with impact, scale, speed, cost, users, or accuracy.",
      "Mirror important job-description language naturally in your experience section.",
      "Move the strongest matching skills closer to the top of the resume.",
      missing[0] ? `Add a truthful example that demonstrates ${missing[0]}.` : "Add a short project summary that proves your backend and AI experience.",
    ],
    interviewQuestions: [
      "Tell me about a backend system you designed and the tradeoffs you made.",
      "How have you used APIs, databases, or cloud services to solve a real problem?",
      missing[0]
        ? `What experience do you have related to ${missing[0]}?`
        : "Which project best proves you can do this role?",
      "How would you improve this system if it had to support more users?",
    ],
    source: "local",
  };
}

async function requestAiAnalysis(resume, job) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume, job }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "AI analysis failed.");
  }

  return response.json();
}

function renderAnalysis(result) {
  score.textContent = `${Math.round(Number(result.score) || 0)}%`;
  scoreLabel.textContent =
    result.source === "ai"
      ? `${result.summary} Powered by AI analysis.`
      : `${result.summary} Local fallback analysis used.`;
  renderList(missingList, result.missingKeywords || []);
  renderList(strengthsList, result.strengths || []);
  renderList(suggestionsList, result.suggestions || []);
  renderList(questionsList, result.interviewQuestions || []);
}

async function analyze(options = {}) {
  const { scroll = true, preferAi = true } = options;
  const resume = resumeInput.value.trim();
  const job = jobInput.value.trim();

  analyzeButton.textContent = preferAi ? "Running AI analysis..." : "Analyzing...";
  analyzeButton.disabled = true;

  if (!resume || !job) {
    showInputMessage();
    analyzeButton.textContent = "Analyze Match";
    analyzeButton.disabled = false;
    if (scroll) {
      resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  try {
    const result = preferAi ? await requestAiAnalysis(resume, job) : buildLocalAnalysis(resume, job);
    renderAnalysis(result);
  } catch (error) {
    const fallback = buildLocalAnalysis(resume, job);
    renderAnalysis(fallback);
    scoreLabel.textContent = `${fallback.summary} AI unavailable: ${error.message}`;
  } finally {
    analyzeButton.textContent = "Analyze Match";
    analyzeButton.disabled = false;
    if (scroll) {
      resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function maybeAutoAnalyze() {
  if (resumeInput.value.trim() && jobInput.value.trim()) {
    window.clearTimeout(maybeAutoAnalyze.timer);
    maybeAutoAnalyze.timer = window.setTimeout(() => analyze({ scroll: false, preferAi: true }), 650);
  }
}

async function handleFile(file, kind) {
  if (!file) {
    fileState[kind] = { selected: false, parsed: false, name: "" };
    setFileStatus(kind, "No file selected");
    return;
  }

  fileState[kind] = { selected: true, parsed: false, name: file.name };
  setFileStatus(kind, `Parsing ${file.name}...`);

  try {
    const text = (await extractText(file)).trim();
    if (!text) {
      throw new Error("No readable text found. This can happen with scanned image PDFs.");
    }

    inputs[kind].value = text;
    fileState[kind].parsed = true;
    updateCount(kind);
    setFileStatus(kind, `${file.name} parsed successfully`);
    maybeAutoAnalyze();
  } catch (error) {
    inputs[kind].value = "";
    updateCount(kind);
    setFileStatus(kind, `${file.name}: ${error.message}`);
    showInputMessage();
  }
}

fileInputs.forEach((input) => {
  input.addEventListener("change", () => handleFile(input.files[0], input.dataset.fileInput));
});

Object.entries(inputs).forEach(([kind, input]) => {
  input.addEventListener("input", () => {
    updateCount(kind);
    if (input.value.trim()) {
      fileState[kind].parsed = true;
    }
    maybeAutoAnalyze();
  });
  updateCount(kind);
});

clearButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.clear;
    const fileInput = document.querySelector(`[data-file-input="${kind}"]`);
    inputs[kind].value = "";
    fileInput.value = "";
    fileState[kind] = { selected: false, parsed: false, name: "" };
    updateCount(kind);
    setFileStatus(kind, "No file selected");
  });
});

analyzeButton.addEventListener("click", () => analyze({ scroll: true, preferAi: true }));
