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

export async function generateResume(input: ResumeInput): Promise<GeneratedResume> {
  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are an expert ATS resume writer. Generate a professional resume tailored to this job description.

JOB DESCRIPTION:
${input.jobDescription}

CANDIDATE INFO:
Name: ${input.fullName}
Email: ${input.email}
Phone: ${input.phone}
Experience Summary: ${input.experienceSummary}

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "professionalSummary": "2-3 sentence professional summary tailored to the job",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "2022 - Present",
      "bullets": ["Achievement 1 with metrics", "Achievement 2 with metrics", "Achievement 3"]
    }
  ],
  "skills": ["Skill1", "Skill2", "...up to 12 relevant skills"],
  "education": [
    {
      "degree": "Degree Name",
      "school": "University Name",
      "year": "2020"
    }
  ]
}

RULES:
- Include ATS keywords from the job description naturally
- Use action verbs and quantified achievements
- Generate 2-3 experience entries based on the candidate's summary
- Skills should match job requirements
- Keep it professional and concise`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text);
}

export interface ATSScoreResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export async function calculateATSScore(
  resume: GeneratedResume,
  jobDescription: string
): Promise<ATSScoreResult> {
  const resumeText = [
    resume.professionalSummary,
    ...resume.experience.flatMap((e) => [e.title, ...e.bullets]),
    ...resume.skills,
  ]
    .join(" ")
    .toLowerCase();

  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Analyze ATS keyword match between this resume and job description.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON (no markdown, no code blocks):
{
  "score": <number 0-100>,
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["Add X keyword to improve score by Y%", "..."]
}

Score based on: keyword density match, skills alignment, experience relevance. Be realistic.`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text);
}
