const resumeInput = document.querySelector("#resume");
const jobInput = document.querySelector("#job");
const analyzeButton = document.querySelector("[data-analyze]");
const score = document.querySelector("[data-score]");
const scoreLabel = document.querySelector("[data-score-label]");
const missingList = document.querySelector("[data-missing]");
const strengthsList = document.querySelector("[data-strengths]");
const suggestionsList = document.querySelector("[data-suggestions]");
const questionsList = document.querySelector("[data-questions]");

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

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stopWords.has(word));
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

function analyze() {
  const resume = resumeInput.value.trim();
  const job = jobInput.value.trim();

  if (!resume || !job) {
    score.textContent = "--";
    scoreLabel.textContent = "Paste both documents before analyzing.";
    renderList(missingList, ["Resume and job description are both required."]);
    renderList(strengthsList, ["Add more content to reveal strengths."]);
    renderList(suggestionsList, ["Paste real text from a target role for better feedback."]);
    renderList(questionsList, ["What role are you targeting, and why?"]);
    return;
  }

  const resumeWords = new Set(tokenize(resume));
  const jobKeywords = topKeywords(job, 32);
  const matched = jobKeywords.filter((word) => resumeWords.has(word));
  const missing = jobKeywords.filter((word) => !resumeWords.has(word)).slice(0, 8);
  const scoreValue = Math.round((matched.length / Math.max(jobKeywords.length, 1)) * 100);
  const detectedSkills = skillHints.filter((skill) => resume.toLowerCase().includes(skill));

  score.textContent = `${scoreValue}%`;
  scoreLabel.textContent =
    scoreValue >= 75
      ? "Strong alignment. Improve proof, metrics, and role-specific wording."
      : scoreValue >= 50
        ? "Good base. Add missing keywords and clearer impact statements."
        : "Needs tailoring. The resume should mirror more of the target role.";

  renderList(
    missingList,
    missing.length ? missing : ["No obvious high-frequency keyword gaps found."]
  );

  renderList(
    strengthsList,
    detectedSkills.length
      ? detectedSkills.slice(0, 6).map((skill) => `Shows evidence of ${skill}.`)
      : ["Resume has content, but technical strengths are not explicit enough."]
  );

  renderList(suggestionsList, [
    "Add 2-3 measurable bullets with impact, scale, speed, cost, users, or accuracy.",
    "Mirror important job-description language naturally in your experience section.",
    "Move the strongest matching skills closer to the top of the resume.",
    missing[0] ? `Add a truthful example that demonstrates ${missing[0]}.` : "Add a short project summary that proves your backend and AI experience.",
  ]);

  renderList(questionsList, [
    "Tell me about a backend system you designed and the tradeoffs you made.",
    "How have you used APIs, databases, or cloud services to solve a real problem?",
    missing[0]
      ? `What experience do you have related to ${missing[0]}?`
      : "Which project best proves you can do this role?",
    "How would you improve this system if it had to support more users?",
  ]);
}

analyzeButton.addEventListener("click", analyze);
