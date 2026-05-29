// Resume EXAMPLE pages (/resume-examples/[role]). Distinct from /resume/[job-title]
// (builder guides): these are full, visible sample resumes — summary + metric-driven
// experience bullets + skills + ATS keywords — targeting "[role] resume example"
// search intent (StandOut CV model). Every field is unique per role (no duplication
// with the pseo builder pages) to avoid thin/duplicate-content deindexing.

export interface ResumeExample {
  slug: string;
  role: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  experienceBullets: string[];
  skills: string[];
  atsKeywords: string[];
  whatWorks: { title: string; content: string }[];
  related: string[];
}

export const resumeExamples: ResumeExample[] = [
  {
    slug: "software-engineer",
    role: "Software Engineer",
    metaTitle: "Software Engineer Resume Example (2026) — Bullets & ATS Keywords | ResumeAI",
    metaDescription:
      "A real software engineer resume example: professional summary, metric-driven experience bullets, skills, and the ATS keywords recruiters scan for. Free to copy and adapt.",
    summary:
      "Full-stack software engineer with 6 years building and scaling web applications used by millions. Strengths in distributed systems, performance optimization, and shipping reliably with strong testing and CI/CD discipline. Comfortable owning features end to end and mentoring teammates.",
    experienceBullets: [
      "Cut API p95 latency 40% (820ms → 490ms) across 12 endpoints by adding Redis caching and batching N+1 database queries.",
      "Led migration of a 200k-LOC monolith to modular services, reducing average deploy time from 35 minutes to 6 minutes.",
      "Built a GitHub Actions + Docker CI/CD pipeline that raised release frequency from weekly to 15+ deploys/day with a <1% rollback rate.",
      "Shipped a React + TypeScript design system adopted by 6 product teams, cutting UI bug tickets 35%.",
      "Mentored 4 junior engineers and introduced code-review standards that reduced production defects 28% quarter over quarter.",
    ],
    skills: [
      "TypeScript / JavaScript",
      "React & Next.js",
      "Node.js",
      "Python",
      "AWS",
      "Docker & Kubernetes",
      "PostgreSQL",
      "System Design",
      "CI/CD",
      "Unit & Integration Testing",
    ],
    atsKeywords: [
      "software engineer",
      "full-stack development",
      "REST API",
      "microservices",
      "agile",
      "test-driven development",
      "scalability",
      "code review",
    ],
    whatWorks: [
      {
        title: "Every bullet leads with a metric",
        content:
          "Recruiters scan for impact. Each line opens with a number (latency, deploy time, defect rate) so the value is obvious in two seconds.",
      },
      {
        title: "Verbs show scope, not tasks",
        content:
          "‘Led migration’, ‘Built pipeline’, ‘Shipped design system’ signal ownership — stronger than ‘responsible for’.",
      },
    ],
    related: ["data-analyst", "product-manager"],
  },
  {
    slug: "nurse",
    role: "Registered Nurse",
    metaTitle: "Nurse Resume Example (2026) — RN Bullets & ATS Keywords | ResumeAI",
    metaDescription:
      "A registered nurse (RN) resume example: professional summary, patient-care experience bullets with outcomes, clinical skills, and the ATS keywords hospitals screen for.",
    summary:
      "Compassionate registered nurse (RN, BSN) with 5 years in acute-care and med-surg settings. Known for safe, patient-centered care, strong clinical judgment under pressure, and precepting new-grad nurses. BLS/ACLS certified with a consistent record on safety and satisfaction metrics.",
    experienceBullets: [
      "Managed care for up to 6 acute-care patients per shift while maintaining a 98% patient-satisfaction score.",
      "Reduced medication-administration errors 22% by introducing a barcode double-check protocol adopted unit-wide.",
      "Precepted 8 new-grad nurses through a 12-week onboarding, raising 1-year retention from 70% to 90%.",
      "Coordinated discharge planning with multidisciplinary teams, cutting average length of stay 1.3 days.",
      "Sustained 100% compliance on hand-hygiene and infection-control audits across 4 consecutive quarters.",
    ],
    skills: [
      "Patient Assessment",
      "Medication Administration",
      "Epic EHR",
      "IV Therapy",
      "Wound Care",
      "Care Coordination",
      "BLS / ACLS",
      "Patient & Family Education",
    ],
    atsKeywords: [
      "registered nurse",
      "RN",
      "BSN",
      "patient care",
      "acute care",
      "EHR",
      "HIPAA",
      "ACLS",
    ],
    whatWorks: [
      {
        title: "Outcomes, not duties",
        content:
          "Instead of ‘administered medications’, the bullet shows the result — a 22% error reduction. Hospitals hire for safety outcomes.",
      },
      {
        title: "Certifications are explicit",
        content:
          "BLS/ACLS and Epic are named verbatim because ATS filters for these exact clinical credentials.",
      },
    ],
    related: ["accountant", "product-manager"],
  },
  {
    slug: "product-manager",
    role: "Product Manager",
    metaTitle: "Product Manager Resume Example (2026) — PM Bullets & ATS Keywords | ResumeAI",
    metaDescription:
      "A product manager resume example: outcome-driven summary, experience bullets tied to revenue and activation metrics, PM skills, and the ATS keywords hiring managers look for.",
    summary:
      "Outcome-driven product manager with 7 years shipping B2B SaaS from 0→1 and scaling mature products. Strong in discovery, funnel analysis, and prioritization; aligns engineering, design, and GTM around a clear north-star metric and ships measurable wins.",
    experienceBullets: [
      "Drove a 0→1 launch that reached $1.2M ARR in 9 months across 4,000 active teams.",
      "Increased activation rate 31% by redesigning onboarding from funnel analysis and 25 customer interviews.",
      "Prioritized a 40-item roadmap with RICE, aligning eng/design/GTM and shipping 18 features in two quarters.",
      "Cut churn 4.2pp by launching a usage-based health score and a proactive customer-success playbook.",
      "Defined the north-star metric and KR tree adopted org-wide; ran weekly reviews with ~6 live A/B tests.",
    ],
    skills: [
      "Product Discovery",
      "Roadmapping (RICE)",
      "User Research",
      "A/B Testing",
      "SQL",
      "Analytics (Amplitude)",
      "Agile / Scrum",
      "Go-to-Market",
    ],
    atsKeywords: [
      "product manager",
      "product roadmap",
      "KPI",
      "A/B testing",
      "user research",
      "SaaS",
      "stakeholder management",
      "go-to-market",
    ],
    whatWorks: [
      {
        title: "Ties work to business outcomes",
        content:
          "ARR, activation, churn — PMs are hired to move the business, so the bullets quantify business impact, not feature counts alone.",
      },
      {
        title: "Shows the prioritization method",
        content:
          "Naming RICE and the north-star metric signals process maturity that generic ‘managed the roadmap’ phrasing misses.",
      },
    ],
    related: ["data-analyst", "software-engineer"],
  },
  {
    slug: "data-analyst",
    role: "Data Analyst",
    metaTitle: "Data Analyst Resume Example (2026) — Bullets & ATS Keywords | ResumeAI",
    metaDescription:
      "A data analyst resume example: summary, experience bullets that quantify decisions and time saved, analytics skills (SQL, Python, Tableau), and the ATS keywords recruiters screen for.",
    summary:
      "Data analyst with 4 years turning raw data into decisions for marketing and operations teams. Fluent in SQL and Python, strong in experiment analysis and self-serve dashboards, and effective at translating findings into actions that stakeholders adopt.",
    experienceBullets: [
      "Built 12 self-serve Tableau dashboards that cut ad-hoc reporting requests 60%, saving the team ~15 hours/week.",
      "Surfaced a churn driver via cohort analysis that shaped a retention campaign lifting 90-day retention 8pp.",
      "Automated a weekly ETL in Python + SQL, removing 6 hours of manual spreadsheet work and 3 recurring data errors.",
      "Analyzed 20+ A/B tests (significance and power) guiding a $400k reallocation of marketing spend.",
      "Modeled pricing scenarios with finance, supporting a tiering change that raised ARPU 11%.",
    ],
    skills: [
      "SQL",
      "Python (pandas)",
      "Tableau / Power BI",
      "Excel",
      "Statistics & A/B Testing",
      "ETL",
      "Data Visualization",
      "Stakeholder Communication",
    ],
    atsKeywords: [
      "data analyst",
      "SQL",
      "Python",
      "Tableau",
      "dashboard",
      "A/B testing",
      "ETL",
      "data visualization",
    ],
    whatWorks: [
      {
        title: "Quantifies the decision, not just the analysis",
        content:
          "‘$400k reallocation’ and ‘ARPU +11%’ show the analysis changed a business decision — far stronger than ‘analyzed data’.",
      },
      {
        title: "Names the exact tools",
        content:
          "SQL, Python, and Tableau appear verbatim because ATS keyword filters match literal tool names.",
      },
    ],
    related: ["software-engineer", "accountant"],
  },
  {
    slug: "accountant",
    role: "Accountant",
    metaTitle: "Accountant Resume Example (2026) — CPA Bullets & ATS Keywords | ResumeAI",
    metaDescription:
      "An accountant resume example: CPA summary, experience bullets with close-time and accuracy metrics, accounting skills, and the ATS keywords employers screen for.",
    summary:
      "Detail-oriented accountant (CPA) with 6 years in full-cycle accounting and financial reporting. Strong in month-end close, reconciliations, and audit readiness; improves accuracy and turnaround through process standardization and ERP automation.",
    experienceBullets: [
      "Closed monthly books 3 days faster (8 → 5 days) by standardizing reconciliations and automating recurring journal entries.",
      "Managed a $4M AP/AR portfolio at 99.7% accuracy and cut overdue receivables 18% with a new collections cadence.",
      "Led annual audit preparation with zero material findings for 3 consecutive years.",
      "Implemented a NetSuite reporting workflow that reduced variance-analysis time 50%.",
      "Identified $120k in annual savings through vendor-contract and expense audits.",
    ],
    skills: [
      "GAAP",
      "Financial Reporting",
      "Account Reconciliation",
      "Accounts Payable / Receivable",
      "NetSuite / QuickBooks",
      "Advanced Excel",
      "Audit Preparation",
      "Month-End Close",
    ],
    atsKeywords: [
      "accountant",
      "CPA",
      "GAAP",
      "reconciliation",
      "accounts payable",
      "financial reporting",
      "month-end close",
      "audit",
    ],
    whatWorks: [
      {
        title: "Accuracy and speed are both quantified",
        content:
          "Finance leaders care about reliable, fast closes — ‘99.7% accuracy’ and ‘8→5 days’ hit both at once.",
      },
      {
        title: "Leads with credentials and systems",
        content:
          "CPA, GAAP, and NetSuite are named explicitly so the resume clears ATS filters built around those exact terms.",
      },
    ],
    related: ["data-analyst", "product-manager"],
  },
];

export const resumeExampleSlugs = resumeExamples.map((e) => e.slug);

export function getResumeExample(slug: string): ResumeExample | undefined {
  return resumeExamples.find((e) => e.slug === slug);
}
