import type { Metadata } from "next";
import PricingSection from "@/components/landing/PricingSection";

export const metadata: Metadata = {
  title: "Pricing - ResumeAI",
  description:
    "Simple, transparent pricing for ResumeAI. Pay once, no subscription, no auto-renewal. Build ATS-optimized resumes with AI starting free.",
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it really one-time payment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Pay once, download your resume, and you're done. No recurring charges, no auto-renewal, no surprises.",
          },
        },
        {
          "@type": "Question",
          name: "What's included in the free plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can build unlimited resumes with AI, get ATS scores, and preview your resume. Download requires a paid plan.",
          },
        },
        {
          "@type": "Question",
          name: "Can I upgrade from Basic to Pro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Pay the difference ($10) to unlock unlimited downloads, DOCX format, AI cover letter, and 30-day access.",
          },
        },
        {
          "@type": "Question",
          name: "How long do I have access?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Basic: 1 PDF download, available immediately. Pro: unlimited downloads for 30 days from purchase.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer refunds?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, within 7 days if you haven't downloaded your resume. Contact us at support@resumeai.site.",
          },
        },
        {
          "@type": "Question",
          name: "Is my resume ATS-compatible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All 5 templates are designed for ATS compatibility. Our checker validates against 23 industry-standard criteria.",
          },
        },
        {
          "@type": "Question",
          name: "Can I build multiple resumes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Free: unlimited AI-generated resumes with preview. Basic: 1 PDF download. Pro: unlimited PDF and DOCX downloads for 30 days.",
          },
        },
        {
          "@type": "Question",
          name: "What payment methods do you accept?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All major credit cards via Gumroad.",
          },
        },
      ],
    }),
  },
};

const faqItems = [
  {
    question: "Is it really one-time payment?",
    answer:
      "Yes. Pay once, download your resume, and you're done. No recurring charges, no auto-renewal, no surprises.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "You can build unlimited resumes with AI, get ATS scores, and preview your resume. Download requires a paid plan.",
  },
  {
    question: "Can I upgrade from Basic to Pro?",
    answer:
      "Yes! Pay the difference ($10) to unlock unlimited downloads, DOCX format, AI cover letter, and 30-day access.",
  },
  {
    question: "How long do I have access?",
    answer:
      "Basic: 1 PDF download, available immediately. Pro: unlimited downloads for 30 days from purchase.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, within 7 days if you haven't downloaded your resume. Contact us at support@resumeai.site.",
  },
  {
    question: "Is my resume ATS-compatible?",
    answer:
      "Yes. All 5 templates are designed for ATS compatibility. Our checker validates against 23 industry-standard criteria.",
  },
  {
    question: "Can I build multiple resumes?",
    answer:
      "Free: unlimited AI-generated resumes with preview. Basic: 1 PDF download. Pro: unlimited PDF and DOCX downloads for 30 days.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "All major credit cards via Gumroad.",
  },
];

function FAQAccordion() {
  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => (
        <details key={index} className="group rounded-lg border border-gray-200 bg-white">
          <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="ml-4 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-4 text-gray-600 animate-[fadeIn_0.2s_ease-in-out]">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Pay once. No subscription. No auto-renewal.
        </p>
      </section>

      <PricingSection />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <FAQAccordion />
      </section>
    </main>
  );
}
