import Anthropic from "@anthropic-ai/sdk";

let _anthropic: Anthropic | null = null;
function getAnthropic(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _anthropic;
}

export interface ResumeInput {
  jobDescription: string;
  fullName: string;
  email: string;
  phone: string;
  experienceSummary: string;
}

export interface GeneratedResume {
  professionalSummary: string;
  experience: { title: string; company: string; period: string; bullets: string[] }[];
  skills: string[];
  education: { degree: string; school: string; year: string }[];
}

// Detect job category for prompt specialization
function detectJobCategory(jobDescription: string): string {
  const jd = jobDescription.toLowerCase();
  if (/software|developer|engineer|frontend|backend|fullstack|devops|sre|cloud|data engineer/i.test(jd)) return "tech";
  if (/marketing|seo|content|social media|brand|growth|digital marketing/i.test(jd)) return "marketing";
  if (/design|ux|ui|graphic|creative|figma|photoshop/i.test(jd)) return "design";
  if (/product manager|program manager|project manager|scrum|agile master/i.test(jd)) return "management";
  if (/nurse|doctor|physician|pharmacist|clinical|healthcare|medical/i.test(jd)) return "healthcare";
  if (/teacher|professor|instructor|education|curriculum|teaching/i.test(jd)) return "education";
  if (/analyst|finance|accounting|audit|banking|investment/i.test(jd)) return "finance";
  if (/sales|account|business development|revenue|quota/i.test(jd)) return "sales";
  return "general";
}

const CATEGORY_GUIDANCE: Record<string, string> = {
  tech: "Focus on technical skills, system scale, performance improvements, and architecture decisions. Use metrics like latency reduction, uptime, requests/sec, code coverage. Include specific tech stack versions.",
  marketing: "Emphasize campaign ROI, conversion rates, traffic growth, lead generation metrics. Show channel expertise and data-driven decision making.",
  design: "Highlight design systems, user research methodologies, usability improvements, and tools. Include portfolio-worthy projects with measurable user impact.",
  management: "Focus on team size managed, project budgets, delivery timelines, stakeholder management, and strategic outcomes. Show cross-functional leadership.",
  healthcare: "Emphasize patient outcomes, care quality metrics, certifications, compliance adherence, and team collaboration in clinical settings.",
  education: "Highlight student achievement improvements, curriculum development, innovative teaching methods, and professional development.",
  finance: "Focus on deal sizes, portfolio values, risk reduction, compliance, audit results, and financial modeling accuracy.",
  sales: "Emphasize revenue generated, quota attainment (%), deal sizes, pipeline growth, and client retention rates.",
  general: "Focus on measurable achievements, leadership examples, and skills directly matching the job description.",
};

export async function generateResume(input: ResumeInput): Promise<GeneratedResume> {
  const category = detectJobCategory(input.jobDescription);
  const guidance = CATEGORY_GUIDANCE[category];

  // Step 1: Extract key requirements from JD
  const extractionResult = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: `Analyze this job description and extract key information. Return ONLY valid JSON (no markdown):
{
  "jobTitle": "the exact job title",
  "requiredSkills": ["skill1", "skill2", ...],
  "preferredSkills": ["skill1", "skill2", ...],
  "keyResponsibilities": ["resp1", "resp2", ...],
  "experienceLevel": "entry|mid|senior|executive",
  "industryKeywords": ["keyword1", "keyword2", ...]
}

JOB DESCRIPTION:
${input.jobDescription}`,
    }],
  });

  const extraction = JSON.parse(
    extractionResult.content[0].type === "text" ? extractionResult.content[0].text : "{}"
  );

  // Step 2: Generate tailored resume content
  const resumeResult = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2500,
    messages: [{
      role: "user",
      content: `You are an elite resume writer who has helped 10,000+ candidates land jobs at top companies. Generate a resume that will pass ATS screening AND impress human recruiters.

CANDIDATE:
Name: ${input.fullName}
Email: ${input.email}
Phone: ${input.phone}
Background: ${input.experienceSummary}

TARGET ROLE: ${extraction.jobTitle || "the role described below"}
EXPERIENCE LEVEL: ${extraction.experienceLevel || "mid"}
REQUIRED SKILLS: ${(extraction.requiredSkills || []).join(", ")}
PREFERRED SKILLS: ${(extraction.preferredSkills || []).join(", ")}
KEY RESPONSIBILITIES: ${(extraction.keyResponsibilities || []).join(", ")}
INDUSTRY KEYWORDS: ${(extraction.industryKeywords || []).join(", ")}

CATEGORY-SPECIFIC GUIDANCE: ${guidance}

${extraction.experienceLevel === "entry" ? `
ENTRY-LEVEL RULES:
- Emphasize projects, internships, coursework, and transferable skills
- Use action verbs that show initiative despite limited experience
- Focus on learning agility and potential
- Include relevant certifications, coursework, and academic projects
` : ""}

${extraction.experienceLevel === "executive" ? `
EXECUTIVE RULES:
- Focus on strategic impact, P&L responsibility, team building
- Emphasize last 10-15 years most heavily
- Include board-level or C-suite interactions
- Show transformation and turnaround stories
` : ""}

Return ONLY valid JSON (no markdown, no code blocks):
{
  "professionalSummary": "2-3 compelling sentences. Start with '${extraction.experienceLevel === "entry" ? "Motivated" : "Results-driven"}' or similar strong opener. Include years of experience, top 2-3 skills from the required list, and a standout achievement with a specific metric.",
  "experience": [
    {
      "title": "Job Title matching or close to target role",
      "company": "Company Name (realistic, based on candidate background)",
      "period": "YYYY - Present (or YYYY - YYYY)",
      "bullets": [
        "Start with strong action verb + specific achievement + metric (e.g., 'Increased conversion rate by 35% through...')",
        "Each bullet should contain at least one keyword from the required skills",
        "3-4 bullets per role, each demonstrating a different skill area"
      ]
    }
  ],
  "skills": ["Include ALL required skills first, then preferred skills, up to 12 total"],
  "education": [{"degree": "Degree", "school": "University", "year": "YYYY"}]
}

QUALITY RULES:
- Every bullet MUST have a quantified metric (%, $, #, time saved)
- Never use vague language ("various", "multiple", "several" — always be specific)
- Skills section MUST include at least 80% of required skills from the JD
- Generate 2-3 experience entries appropriate for the experience level
- Make it sound like a real person, not AI-generated`,
    }],
  });

  const resumeText = resumeResult.content[0].type === "text" ? resumeResult.content[0].text : "{}";
  let resume: GeneratedResume;
  try {
    resume = JSON.parse(resumeText);
  } catch {
    // Try to extract JSON from potential markdown wrapping
    const jsonMatch = resumeText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      resume = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Failed to parse resume JSON");
    }
  }

  // Step 3: Polish and optimize
  const polishResult = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2500,
    messages: [{
      role: "user",
      content: `Review and polish this resume for ATS optimization and natural language quality. Fix any issues:

1. Ensure every bullet starts with a past-tense action verb (Led, Developed, Increased, etc.)
2. Verify all metrics are realistic and specific
3. Check that skills match the job description keywords exactly (same spelling/capitalization)
4. Ensure the professional summary reads naturally, not robotic
5. Make sure there are no repetitive sentence structures

REQUIRED JD KEYWORDS THAT MUST APPEAR: ${(extraction.requiredSkills || []).join(", ")}

CURRENT RESUME:
${JSON.stringify(resume)}

Return the polished version as ONLY valid JSON with the exact same structure. Fix issues but keep the overall content. If it's already good, return it unchanged.`,
    }],
  });

  const polishedText = polishResult.content[0].type === "text" ? polishResult.content[0].text : "";
  try {
    return JSON.parse(polishedText);
  } catch {
    const jsonMatch = polishedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return resume; // Return unpolished if parsing fails
  }
}

export interface ATSScoreResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  breakdown: {
    keywordMatch: number;
    sectionStructure: number;
    formatting: number;
    overall: number;
  };
}

export async function calculateATSScore(
  resume: GeneratedResume,
  jobDescription: string
): Promise<ATSScoreResult> {
  const resumeText = [
    resume.professionalSummary,
    ...resume.experience.flatMap((e) => [e.title, e.company, ...e.bullets]),
    ...resume.skills,
    ...resume.education.map((e) => `${e.degree} ${e.school}`),
  ].join(" ");

  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [{
      role: "user",
      content: `You are an ATS (Applicant Tracking System) simulator. Analyze this resume against the job description as a real ATS would.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Evaluate based on these criteria:
1. **Keyword Match (40% weight)**: How many required/preferred skills and keywords appear in the resume?
2. **Section Structure (20% weight)**: Does it have standard ATS-parseable sections (Summary, Experience, Skills, Education)?
3. **Formatting (20% weight)**: Are dates standardized? Are bullet points used? Is it clean?
4. **Content Quality (20% weight)**: Are achievements quantified? Do bullets start with action verbs?

Return ONLY valid JSON (no markdown):
{
  "score": <weighted total 0-100>,
  "matchedKeywords": ["exact keywords found in both resume and JD"],
  "missingKeywords": ["important JD keywords NOT in resume - max 8"],
  "suggestions": [
    "Specific, actionable suggestion with expected score improvement, e.g., 'Add Python to your skills section (+3 points)'",
    "Another suggestion..."
  ],
  "breakdown": {
    "keywordMatch": <0-100>,
    "sectionStructure": <0-100>,
    "formatting": <0-100>,
    "overall": <0-100 same as score>
  }
}

Be realistic and analytical. Don't inflate scores. A perfect match should be 90-95, not 100.`,
    }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "{}";
  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ["Unable to analyze. Please try again."],
      breakdown: { keywordMatch: 0, sectionStructure: 0, formatting: 0, overall: 0 },
    };
  }
}
