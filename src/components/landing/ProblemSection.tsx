'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const cards = [
  {
    text: (
      <>
        <span className="font-semibold text-gray-900">75%</span> of resumes are
        rejected by ATS before a human ever sees them.
      </>
    ),
  },
  {
    text: (
      <>
        Generic resumes get filtered out instantly. Each job needs a tailored
        version.
      </>
    ),
  },
  {
    text: (
      <>
        Rewriting your resume for every application takes{' '}
        <span className="font-semibold text-gray-900">2+ hours</span>.
      </>
    ),
  },
  {
    text: (
      <>
        You apply, hear nothing, and never know why you were rejected.
      </>
    ),
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Why Most Resumes Never Get Read
        </h2>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={cn(
                'bg-gray-50 rounded-xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300',
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: visible ? `${i * 100}ms` : '0ms',
              }}
            >
              <p className="text-gray-600 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
