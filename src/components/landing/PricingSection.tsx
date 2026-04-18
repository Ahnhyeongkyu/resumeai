import Link from 'next/link';
import { cn } from '@/lib/utils';

type Feature = { text: string; included: boolean };

interface Plan {
  name: string;
  price: string;
  period: string;
  subtitle: string;
  features: Feature[];
  cta: string;
  ctaStyle: 'solid' | 'outline';
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    subtitle: 'Forever free',
    features: [
      { text: 'AI resume generation', included: true },
      { text: 'ATS score (23 criteria)', included: true },
      { text: 'Preview and edit', included: true },
      { text: 'PDF download', included: false },
      { text: 'Remove watermark', included: false },
      { text: 'DOCX download', included: false },
      { text: 'AI cover letter', included: false },
      { text: '30-day access', included: false },
    ],
    cta: 'Start Free',
    ctaStyle: 'outline',
  },
  {
    name: 'Basic',
    price: '$9',
    period: 'one-time',
    subtitle: 'No subscription',
    popular: true,
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'PDF download (1 resume)', included: true },
      { text: 'Remove watermark', included: true },
      { text: 'DOCX download', included: false },
      { text: 'AI cover letter', included: false },
      { text: '30-day access', included: false },
    ],
    cta: 'Build My Resume',
    ctaStyle: 'solid',
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'one-time',
    subtitle: 'Best value',
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'Unlimited resumes', included: true },
      { text: 'DOCX download', included: true },
      { text: 'AI cover letter', included: true },
      { text: '30-day access', included: true },
    ],
    cta: 'Go Pro',
    ctaStyle: 'outline',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          One Resume Can Change Your Career. Starting at $9.
        </h2>
        <p className="text-gray-600 text-center mt-4">
          Unlike other builders, we don&apos;t trap you in a subscription.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'bg-white rounded-xl p-8 border shadow-sm hover:shadow-md transition-shadow relative',
                plan.popular
                  ? 'border-emerald-500 ring-2 ring-emerald-500 scale-105'
                  : 'border-gray-200'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-gray-500 ml-1">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2">
                    {feature.included ? (
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/builder"
                className={cn(
                  'block w-full text-center py-3 rounded-lg font-semibold transition-colors',
                  plan.ctaStyle === 'solid'
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
