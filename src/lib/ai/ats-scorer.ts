export interface ATSScore {
  overall: number;
  sections: {
    summary: number;
    experience: number;
    skills: number;
    format: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

interface ResumeData {
  professionalSummary: string;
  experience: Array<{
    title: string;
    company: string;
    dates: string;
    bullets: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    date?: string;
  }>;
  certifications?: string[];
}

function extractKeywords(text: string): string[] {
  const lower = text.toLowerCase();

  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need',
    'dare', 'ought', 'used', 'this', 'that', 'these', 'those', 'i', 'me',
    'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'them',
    'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'how', 'all',
    'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
    'just', 'because', 'as', 'until', 'while', 'about', 'between', 'through',
    'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out',
    'off', 'over', 'under', 'again', 'further', 'then', 'once', 'also',
    'able', 'experience', 'work', 'working', 'role', 'team', 'including',
    'etc', 'per', 'via', 'well', 'new', 'using', 'within',
  ]);

  // Extract multi-word phrases
  const phrases: string[] = [];
  const phrasePatterns = [
    /(?:machine learning|deep learning|data science|project management)/gi,
    /(?:ci\/cd|a\/b testing|ui\/ux|rest api|graphql api)/gi,
    /(?:problem solving|team leadership|cross[- ]functional)/gi,
    /(?:full[- ]stack|front[- ]end|back[- ]end|real[- ]time)/gi,
    /(?:cloud computing|version control|agile methodology)/gi,
    /(?:customer service|quality assurance|business development)/gi,
    /(?:supply chain|financial analysis|risk management)/gi,
    /(?:content marketing|social media|search engine)/gi,
  ];

  for (const pattern of phrasePatterns) {
    const matches = lower.match(pattern);
    if (matches) {
      phrases.push(...matches.map((m) => m.toLowerCase().trim()));
    }
  }

  // Extract single-word keywords
  const words = lower
    .replace(/[^a-z0-9+#/./-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  return [...new Set([...phrases, ...words])];
}

function getResumeFullText(resume: ResumeData): string {
  const parts: string[] = [
    resume.professionalSummary,
    ...resume.experience.flatMap((e) => [e.title, e.company, ...e.bullets]),
    ...resume.skills.technical,
    ...resume.skills.soft,
    ...resume.education.map((e) => `${e.degree} ${e.field || ''} ${e.institution}`),
    ...(resume.certifications || []),
  ];
  return parts.join(' ').toLowerCase();
}

function scoreSummary(resume: ResumeData, jdKeywords: string[]): number {
  if (!resume.professionalSummary) return 0;

  let score = 0;
  const summary = resume.professionalSummary.toLowerCase();
  const wordCount = summary.split(/\s+/).length;

  // Length check (ideal: 30-60 words)
  if (wordCount >= 30 && wordCount <= 60) score += 25;
  else if (wordCount >= 20 && wordCount <= 80) score += 15;
  else score += 5;

  // Keyword density in summary
  const matchCount = jdKeywords.filter((kw) => summary.includes(kw)).length;
  const keywordRatio = jdKeywords.length > 0 ? matchCount / Math.min(jdKeywords.length, 15) : 0;
  score += Math.round(keywordRatio * 40);

  // Contains quantified results
  if (/\d+[%+]|\$\d|[0-9]+ ?(year|month|project|client|team)/i.test(resume.professionalSummary)) {
    score += 20;
  }

  // Has action-oriented language
  const actionWords = ['led', 'managed', 'developed', 'built', 'drove', 'increased', 'reduced', 'improved', 'delivered', 'achieved'];
  if (actionWords.some((w) => summary.includes(w))) {
    score += 15;
  }

  return Math.min(100, score);
}

function scoreExperience(resume: ResumeData, jdKeywords: string[]): number {
  if (!resume.experience.length) return 0;

  let score = 0;
  const allBullets = resume.experience.flatMap((e) => e.bullets);
  const totalBullets = allBullets.length;

  // Average bullets per role (3-5 ideal)
  const avgBullets = totalBullets / resume.experience.length;
  if (avgBullets >= 3 && avgBullets <= 5) score += 20;
  else if (avgBullets >= 2 && avgBullets <= 7) score += 10;
  else score += 5;

  // Bullets start with action verbs
  const actionVerbs = [
    'led', 'managed', 'developed', 'created', 'designed', 'implemented',
    'built', 'launched', 'drove', 'increased', 'reduced', 'improved',
    'delivered', 'achieved', 'established', 'streamlined', 'optimized',
    'spearheaded', 'orchestrated', 'transformed', 'accelerated', 'generated',
    'negotiated', 'collaborated', 'mentored', 'analyzed', 'resolved',
  ];
  const actionBullets = allBullets.filter((b) =>
    actionVerbs.some((v) => b.toLowerCase().startsWith(v))
  ).length;
  const actionRatio = totalBullets > 0 ? actionBullets / totalBullets : 0;
  score += Math.round(actionRatio * 25);

  // Quantified achievements
  const quantifiedBullets = allBullets.filter((b) =>
    /\d+%|\$[\d,]+|\d+ ?(x|times|percent)|increased.*\d|reduced.*\d|saved.*\d/i.test(b)
  ).length;
  const quantifiedRatio = totalBullets > 0 ? quantifiedBullets / totalBullets : 0;
  score += Math.round(quantifiedRatio * 25);

  // Keyword match in experience
  const expText = allBullets.join(' ').toLowerCase();
  const matchCount = jdKeywords.filter((kw) => expText.includes(kw)).length;
  const keywordRatio = jdKeywords.length > 0 ? matchCount / Math.min(jdKeywords.length, 15) : 0;
  score += Math.round(keywordRatio * 30);

  return Math.min(100, score);
}

function scoreSkills(resume: ResumeData, jdKeywords: string[]): number {
  const allSkills = [
    ...resume.skills.technical,
    ...resume.skills.soft,
  ].map((s) => s.toLowerCase());

  if (allSkills.length === 0) return 0;

  let score = 0;

  // Number of skills (8-15 ideal)
  if (allSkills.length >= 8 && allSkills.length <= 15) score += 20;
  else if (allSkills.length >= 5 && allSkills.length <= 20) score += 10;
  else score += 5;

  // Skills matching JD keywords
  const matchCount = jdKeywords.filter((kw) =>
    allSkills.some((s) => s.includes(kw) || kw.includes(s))
  ).length;
  const keywordRatio = jdKeywords.length > 0 ? matchCount / Math.min(jdKeywords.length, 15) : 0;
  score += Math.round(keywordRatio * 50);

  // Has both technical and soft skills
  if (resume.skills.technical.length > 0 && resume.skills.soft.length > 0) {
    score += 15;
  }

  // Technical skills ratio (should be higher than soft)
  if (resume.skills.technical.length >= resume.skills.soft.length) {
    score += 15;
  }

  return Math.min(100, score);
}

function scoreFormat(resume: ResumeData): number {
  let score = 0;

  // Has all major sections
  if (resume.professionalSummary) score += 20;
  if (resume.experience.length > 0) score += 20;
  if (resume.skills.technical.length > 0 || resume.skills.soft.length > 0) score += 15;
  if (resume.education.length > 0) score += 15;

  // Experience has proper date ranges
  const hasDates = resume.experience.every((e) => e.dates && e.dates.length > 3);
  if (hasDates) score += 15;

  // No overly long bullets (under 150 chars each)
  const allBullets = resume.experience.flatMap((e) => e.bullets);
  const shortBullets = allBullets.filter((b) => b.length <= 150).length;
  const bulletRatio = allBullets.length > 0 ? shortBullets / allBullets.length : 1;
  score += Math.round(bulletRatio * 15);

  return Math.min(100, score);
}

function generateSuggestions(
  resume: ResumeData,
  jdKeywords: string[],
  missingKeywords: string[],
  sectionScores: ATSScore['sections']
): string[] {
  const suggestions: string[] = [];

  if (missingKeywords.length > 3) {
    const topMissing = missingKeywords.slice(0, 5).join(', ');
    suggestions.push(
      `Add these missing keywords from the job description: ${topMissing}`
    );
  }

  if (sectionScores.summary < 60) {
    suggestions.push(
      'Strengthen your professional summary by including quantified achievements and more keywords from the job description.'
    );
  }

  const allBullets = resume.experience.flatMap((e) => e.bullets);
  const quantifiedCount = allBullets.filter((b) =>
    /\d+%|\$[\d,]+|\d+ ?(x|times)/i.test(b)
  ).length;
  if (allBullets.length > 0 && quantifiedCount / allBullets.length < 0.5) {
    suggestions.push(
      'Add more quantified achievements (numbers, percentages, dollar amounts) to your experience bullets.'
    );
  }

  if (resume.skills.technical.length < 5) {
    suggestions.push(
      'Add more technical skills that match the job requirements to improve ATS keyword matching.'
    );
  }

  const actionVerbs = ['led', 'managed', 'developed', 'created', 'built', 'launched', 'drove', 'improved'];
  const startsWithAction = allBullets.filter((b) =>
    actionVerbs.some((v) => b.toLowerCase().startsWith(v))
  ).length;
  if (allBullets.length > 0 && startsWithAction / allBullets.length < 0.5) {
    suggestions.push(
      'Start more bullet points with strong action verbs (Led, Developed, Implemented, etc.) to strengthen impact.'
    );
  }

  if (
    (!resume.certifications || resume.certifications.length === 0) &&
    jdKeywords.some((kw) => ['certified', 'certification', 'certificate', 'license'].includes(kw))
  ) {
    suggestions.push(
      'The job description mentions certifications. Consider adding relevant certifications if you have any.'
    );
  }

  return suggestions.slice(0, 5);
}

export function scoreResume(resume: ResumeData, jobDescription: string): ATSScore {
  const jdKeywords = extractKeywords(jobDescription);
  const resumeText = getResumeFullText(resume);

  const matchedKeywords = jdKeywords.filter((kw) => resumeText.includes(kw));
  const missingKeywords = jdKeywords.filter((kw) => !resumeText.includes(kw));

  const sections = {
    summary: scoreSummary(resume, jdKeywords),
    experience: scoreExperience(resume, jdKeywords),
    skills: scoreSkills(resume, jdKeywords),
    format: scoreFormat(resume),
  };

  const overall = Math.round(
    sections.summary * 0.2 +
    sections.experience * 0.35 +
    sections.skills * 0.25 +
    sections.format * 0.2
  );

  const suggestions = generateSuggestions(resume, jdKeywords, missingKeywords, sections);

  return {
    overall,
    sections,
    matchedKeywords: [...new Set(matchedKeywords)],
    missingKeywords: [...new Set(missingKeywords)].slice(0, 20),
    suggestions,
  };
}
