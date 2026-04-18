import type { GeneratedResume as AIResume } from '@/lib/ai/generate';

export interface ClientResume {
  summary: string;
  experience: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    bullets: string[];
  }>;
  skills: string[];
  education: Array<{ degree: string; school: string; year: string }>;
}

export type AnyResume = ClientResume | AIResume;

export function isClientResume(r: AnyResume): r is ClientResume {
  return typeof (r as ClientResume).summary === 'string' && Array.isArray((r as ClientResume).skills);
}

export function toAIResume(r: AnyResume): AIResume {
  if (!isClientResume(r)) return r;
  return {
    professionalSummary: r.summary,
    experience: r.experience.map((e) => ({
      title: e.jobTitle,
      company: e.company,
      dates: e.currentlyWorking
        ? `${e.startDate} – Present`
        : `${e.startDate}${e.endDate ? ` – ${e.endDate}` : ''}`,
      bullets: e.bullets,
    })),
    skills: { technical: r.skills, soft: [] },
    education: r.education.map((ed) => ({
      institution: ed.school,
      degree: ed.degree,
      date: ed.year,
    })),
    certifications: [],
  };
}

export function toClientResume(r: AnyResume): ClientResume {
  if (isClientResume(r)) return r;
  const tech = Array.isArray(r.skills?.technical) ? r.skills.technical : [];
  const soft = Array.isArray(r.skills?.soft) ? r.skills.soft : [];
  return {
    summary: r.professionalSummary,
    experience: r.experience.map((e) => {
      const dates = (e.dates || '').split(/\s*[–\-]\s*/);
      const start = dates[0] || '';
      const endRaw = dates[1] || '';
      const currentlyWorking = /present|current/i.test(endRaw);
      return {
        jobTitle: e.title,
        company: e.company,
        startDate: start,
        endDate: currentlyWorking ? '' : endRaw,
        currentlyWorking,
        bullets: e.bullets || [],
      };
    }),
    skills: [...tech, ...soft],
    education: (r.education || []).map((ed) => ({
      degree: ed.degree,
      school: ed.institution,
      year: ed.date || '',
    })),
  };
}
