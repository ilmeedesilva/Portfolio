const DEFAULT_MODEL = "gpt-4.1-mini";

function extractTextFromResponse(data) {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n");
}

function parseJson(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("The AI response was not valid JSON.");
    }
    return JSON.parse(match[0]);
  }
}

function validatePayload(body) {
  const resume = String(body?.resume || "").trim();
  const job = String(body?.job || "").trim();

  if (!resume || !job) {
    return { error: "Resume and job description are required." };
  }

  if (resume.length > 25000 || job.length > 25000) {
    return { error: "Please shorten the resume or job description. Each input must be under 25,000 characters." };
  }

  return { resume, job };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "AI analysis is not configured yet. Add OPENAI_API_KEY in Vercel environment variables.",
      code: "missing_api_key",
    });
  }

  const validated = validatePayload(req.body);
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }

  const { resume, job } = validated;

  const prompt = `
Analyze this resume against the job description.

Return ONLY valid JSON with this exact shape:
{
  "score": number,
  "summary": string,
  "missingKeywords": string[],
  "strengths": string[],
  "suggestions": string[],
  "interviewQuestions": string[]
}

Rules:
- score must be an integer from 0 to 100.
- missingKeywords should contain the most important missing or weakly represented skills/phrases.
- suggestions should be practical and specific.
- Do not invent experience that is not in the resume.
- Keep each array to 4-7 items.

RESUME:
${resume}

JOB DESCRIPTION:
${job}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        input: [
          {
            role: "system",
            content: "You are a precise technical recruiter and resume reviewer. You return only valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_output_tokens: 1200,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "OpenAI request failed.",
      });
    }

    const parsed = parseJson(extractTextFromResponse(data));
    return res.status(200).json({
      score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
      summary: String(parsed.summary || "Analysis complete."),
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      interviewQuestions: Array.isArray(parsed.interviewQuestions) ? parsed.interviewQuestions : [],
      source: "ai",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Unable to analyze the documents.",
    });
  }
}
