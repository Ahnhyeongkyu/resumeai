'use client';

import { useEffect, useRef, useState } from 'react';

const sectionBars = [
  { label: 'Summary', score: 95 },
  { label: 'Experience', score: 88 },
  { label: 'Skills', score: 90 },
  { label: 'Format', score: 95 },
];

const matchedKeywords = ['React', 'TypeScript', 'Node.js'];
const missingKeywords = ['GraphQL', 'AWS'];

function CircularGauge({ score, animate }: { score: number; animate: boolean }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * (animate ? score : 0)) / 100;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#1f2937"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-[1500ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white">
          {animate ? score : 0}
        </span>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Know Your Score Before You Apply
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4">
          Our ATS checker analyzes your resume against 23 criteria. See exactly
          which keywords match, which are missing, and get specific suggestions
          to improve your score.
        </p>

        <div
          ref={sectionRef}
          className="mt-12 flex flex-col md:flex-row gap-8"
        >
          {/* Resume Preview Mock — 60% */}
          <div className="w-full md:w-[60%] bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="space-y-4">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-2 w-full bg-gray-100 rounded" />
              <div className="h-2 w-5/6 bg-gray-100 rounded" />
              <div className="h-2 w-4/5 bg-gray-100 rounded" />
              <div className="mt-6 h-3 w-28 bg-gray-200 rounded" />
              <div className="h-2 w-full bg-gray-100 rounded" />
              <div className="h-2 w-3/4 bg-gray-100 rounded" />
              <div className="h-2 w-5/6 bg-gray-100 rounded" />
              <div className="h-2 w-2/3 bg-gray-100 rounded" />
              <div className="mt-6 h-3 w-20 bg-gray-200 rounded" />
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'].map(
                  (s) => (
                    <div
                      key={s}
                      className="h-6 px-3 bg-gray-100 rounded text-xs text-gray-500 flex items-center"
                    >
                      {s}
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 h-3 w-24 bg-gray-200 rounded" />
              <div className="h-2 w-full bg-gray-100 rounded" />
              <div className="h-2 w-4/5 bg-gray-100 rounded" />
            </div>
          </div>

          {/* ATS Score Panel — 40% */}
          <div className="w-full md:w-[40%] bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              ATS Score
            </h3>
            <CircularGauge score={92} animate={animate} />

            <div className="mt-6 space-y-3">
              {sectionBars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{bar.label}</span>
                    <span className="font-semibold text-gray-900">
                      {bar.score}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-[1500ms] ease-out"
                      style={{ width: animate ? `${bar.score}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">
                Matched Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full border border-red-200 flex items-center gap-1"
                  >
                    {kw}
                    <button
                      type="button"
                      className="w-4 h-4 bg-red-100 rounded-full text-red-500 text-xs flex items-center justify-center hover:bg-red-200 transition-colors"
                      aria-label={`Add ${kw}`}
                    >
                      +
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
