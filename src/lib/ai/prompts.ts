import type { GenerateResumeInput } from '@/lib/validations';

type JobCategory =
  | 'technology'
  | 'marketing'
  | 'design'
  | 'business'
  | 'healthcare'
  | 'education';

const categoryKeywords: Record<JobCategory, string[]> = {
  technology: [
    'software', 'developer', 'engineer', 'programming', 'code', 'frontend',
    'backend', 'fullstack', 'devops', 'cloud', 'api', 'database', 'machine learning',
    'data science', 'cybersecurity', 'infrastructure', 'sre', 'python', 'javascript',
    'typescript', 'java', 'react', 'node', 'aws', 'azure', 'gcp', 'kubernetes',
    'docker', 'ci/cd', 'agile', 'scrum', 'technical', 'system', 'architecture',
  ],
  marketing: [
    'marketing', 'seo', 'sem', 'content', 'social media', 'brand', 'campaign',
    'analytics', 'growth', 'acquisition', 'retention', 'copywriting', 'email marketing',
    'digital marketing', 'ppc', 'advertising', 'crm', 'funnel', 'conversion',
    'engagement', 'influencer', 'pr', 'public relations',
  ],
  design: [
    'design', 'ux', 'ui', 'user experience', 'user interface', 'figma', 'sketch',
    'adobe', 'photoshop', 'illustrator', 'graphic', 'visual', 'prototype',
    'wireframe', 'typography', 'interaction design', 'product design', 'creative',
  ],
  business: [
    'business', 'strategy', 'operations', 'finance', 'accounting', 'sales',
    'revenue', 'consulting', 'management', 'project manager', 'product manager',
    'analyst', 'stakeholder', 'roi', 'budget', 'forecasting', 'procurement',
    'supply chain', 'logistics', 'negotiation', 'partnership',
  ],
  healthcare: [
    'healthcare', 'medical', 'clinical', 'patient', 'nursing', 'physician',
    'pharmacy', 'therapeutic', 'diagnosis', 'treatment', 'hospital', 'health',
    'biomedical', 'fda', 'hipaa', 'ehr', 'emr', 'laboratory', 'research',
  ],
  education: [
    'education', 'teaching', 'curriculum', 'instructor', 'professor', 'academic',
    'student', 'learning', 'training', 'pedagogy', 'assessment', 'classroom',
    'school', 'university', 'tutoring', 'e-learning', 'lms',
  ],
};

export function detectJobCategory(jd: string): JobCategory {
  const lower = jd.toLowerCase();
  const scores: Record<JobCategory, number> = {
    technology: 0,
    marketing: 0,
    design: 0,
    business: 0,
    healthcare: 0,
    education: 0,
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        scores[category as JobCategory]++;
      }
    }
  }

  let best: JobCategory = 'business';
  let bestScore = 0;
  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      best = category as JobCategory;
    }
  }

  return best;
}

export function getCareerSituationPrompt(situation: string): string {
  const prompts: Record<string, string> = {
    currently_employed:
      'The candidate is currently employed. Focus on highlighting current achievements, quantified results, and progressive responsibility. Emphasize what they have accomplished in their current role and frame experience as an upward trajectory.',
    career_switcher:
      'The candidate is switching careers. Extract transferable skills from their previous experience and translate them into the language of the new target field. Highlight adaptability, relevant soft skills, and any cross-functional experience that bridges both domains.',
    returning_after_gap:
      'The candidate is returning to work after a career gap. Frame any gap period positively (e.g., caregiving, education, personal development). Emphasize the relevance and strength of pre-gap experience, and highlight any skills maintained or developed during the gap.',
    recent_graduate:
      'The candidate is a recent graduate. Prioritize academic projects, internships, coursework, and extracurricular activities. Place education section before experience. Highlight potential, eagerness to learn, and any practical experience gained through projects or volunteer work.',
    experienced_professional:
      'The candidate is an experienced professional (10+ years). Focus on the last 10-15 years of experience with detailed accomplishments. Use an executive summary style. Emphasize leadership, strategic impact, mentorship, and large-scale results. Earlier roles can be summarized briefly.',
  };

  return prompts[situation] || prompts['currently_employed'];
}

export function buildResumePrompt(data: GenerateResumeInput): string {
  const category = detectJobCategory(data.jobDescription);
  const situationPrompt = getCareerSituationPrompt(data.careerSituation);

  const experienceText = data.experience
    .map(
      (exp) =>
        `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate || 'N/A'})${exp.description ? `: ${exp.description}` : ''}`
    )
    .join('\n');

  const educationText = data.education
    ? data.education
        .map(
          (edu) =>
            `- ${edu.degree}${edu.field ? ` in ${edu.field}` : ''} from ${edu.institution}${edu.graduationDate ? ` (${edu.graduationDate})` : ''}`
        )
        .join('\n')
    : 'Not provided';

  const skillsText = data.skills?.length
    ? data.skills.join(', ')
    : 'Not provided';

  return `You are an expert resume writer specializing in ${category} roles. Create an ATS-optimized resume tailored to the following job description.

## Career Situation
${situationPrompt}

## Target Job Description
${data.jobDescription}

## Candidate Information
Name: ${data.personalInfo.name}
Email: ${data.personalInfo.email}
${data.personalInfo.phone ? `Phone: ${data.personalInfo.phone}` : ''}
${data.personalInfo.location ? `Location: ${data.personalInfo.location}` : ''}
${data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin}` : ''}

## Work Experience
${experienceText}

## Education
${educationText}

## Existing Skills
${skillsText}

## Instructions
1. Analyze the job description to identify key requirements, skills, and keywords.
2. Rewrite the candidate's experience with strong action verbs and quantified achievements where possible.
3. Match the resume language closely to the job description for maximum ATS compatibility.
4. Tailor the professional summary to directly address the target role.
5. Organize skills into technical and soft skill categories.

Return ONLY valid JSON in this exact format (no markdown, no code fences):
{
  "professionalSummary": "2-3 sentence summary tailored to the job",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "dates": "Start - End",
      "bullets": ["Achievement 1 with metrics", "Achievement 2 with metrics", "Achievement 3"]
    }
  ],
  "skills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1", "skill2"]
  },
  "education": [
    {
      "institution": "School Name",
      "degree": "Degree",
      "field": "Field of Study",
      "date": "Graduation Date"
    }
  ],
  "certifications": []
}`;
}
