export interface AffiliateLink {
  id: string;
  name: string;
  description: string;
  url: string;
  tracking: string;
  category: 'job_search' | 'interview' | 'coaching' | 'learning';
  badge?: string;
}

export const AFFILIATES: Record<string, AffiliateLink> = {
  linkedinPremium: {
    id: 'linkedin_premium',
    name: 'LinkedIn Premium',
    description: 'See who viewed your profile + InMail recruiters directly.',
    url: 'https://www.linkedin.com/premium/products',
    tracking: 'linkedin_premium',
    category: 'job_search',
    badge: '1 month free',
  },
  interviewingIo: {
    id: 'interviewing_io',
    name: 'Interviewing.io',
    description: 'Practice anonymous mock interviews with FAANG engineers.',
    url: 'https://interviewing.io/',
    tracking: 'interviewing_io',
    category: 'interview',
    badge: 'Free first session',
  },
  careerCoaching: {
    id: 'career_coaching',
    name: 'TopResume Coaching',
    description: '1-on-1 career coaching from certified resume writers.',
    url: 'https://www.topresume.com/career-coaching',
    tracking: 'career_coaching',
    category: 'coaching',
  },
  pramp: {
    id: 'pramp',
    name: 'Pramp',
    description: 'Free peer-to-peer mock interviews, scheduled instantly.',
    url: 'https://www.pramp.com/',
    tracking: 'pramp',
    category: 'interview',
    badge: 'Free',
  },
  coursera: {
    id: 'coursera',
    name: 'Coursera Plus',
    description: 'Unlimited access to 7,000+ courses from top universities.',
    url: 'https://www.coursera.org/courseraplus',
    tracking: 'coursera_plus',
    category: 'learning',
    badge: '7-day free trial',
  },
};

export const RESULT_PANEL_AFFILIATES = ['linkedinPremium', 'interviewingIo', 'careerCoaching'] as const;
export const POST_PURCHASE_AFFILIATES = ['linkedinPremium', 'pramp'] as const;

export function getJobAffiliates(jobSlug: string): AffiliateLink[] {
  const techJobs = [
    'software-engineer',
    'frontend',
    'backend',
    'fullstack',
    'ai-engineer',
    'ml-engineer',
    'mlops',
    'cloud-engineer',
    'devops',
    'sre',
    'cybersecurity',
    'data-engineer',
    'data-analyst',
    'blockchain-dev',
    'flutter',
    'solutions-architect',
    'prompt-engineer',
  ];
  const designJobs = ['ux-designer'];
  const pmJobs = ['product-manager', 'project-manager'];

  if (techJobs.includes(jobSlug)) {
    return [AFFILIATES.interviewingIo, AFFILIATES.coursera, AFFILIATES.linkedinPremium];
  }
  if (designJobs.includes(jobSlug)) {
    return [AFFILIATES.coursera, AFFILIATES.linkedinPremium, AFFILIATES.careerCoaching];
  }
  if (pmJobs.includes(jobSlug)) {
    return [AFFILIATES.linkedinPremium, AFFILIATES.coursera, AFFILIATES.careerCoaching];
  }
  return [AFFILIATES.linkedinPremium, AFFILIATES.coursera, AFFILIATES.careerCoaching];
}

export function trackAffiliateClick(source: string, productId: string): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as { gtag?: (cmd: string, name: string, params?: Record<string, unknown>) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', 'affiliate_click', {
      source,
      product_id: productId,
    });
  }
}
