import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Paste Any Job Description',
    description:
      'Copy the job listing. Our AI extracts every keyword, skill, and requirement the employer is looking for.',
  },
  {
    number: '02',
    title: 'AI Tailors Your Resume',
    description:
      'Your experience gets rewritten with the right keywords, action verbs, and measurable results. ATS-optimized automatically.',
  },
  {
    number: '03',
    title: 'Download and Apply',
    description:
      'Choose from 5 professional templates. Download your resume as PDF or DOCX. Apply with confidence.',
  },
];

function MockScreen({ step }: { step: number }) {
  return (
    <div className="bg-gray-800 rounded-xl aspect-video p-6 flex flex-col gap-3">
      {step === 0 && (
        <>
          <div className="h-3 w-24 bg-gray-700 rounded" />
          <div className="flex-1 bg-gray-900/50 rounded-lg p-4 flex flex-col gap-2">
            <div className="h-2 w-full bg-gray-700 rounded" />
            <div className="h-2 w-4/5 bg-gray-700 rounded" />
            <div className="h-2 w-3/4 bg-gray-700 rounded" />
            <div className="h-2 w-5/6 bg-gray-700 rounded" />
            <div className="h-2 w-2/3 bg-gray-700 rounded" />
          </div>
          <div className="h-8 w-32 bg-emerald-500/30 rounded-lg" />
        </>
      )}
      {step === 1 && (
        <>
          <div className="flex gap-3 flex-1">
            <div className="flex-1 bg-gray-900/50 rounded-lg p-3 flex flex-col gap-2">
              <div className="h-2 w-16 bg-gray-700 rounded" />
              <div className="h-2 w-full bg-emerald-500/30 rounded" />
              <div className="h-2 w-4/5 bg-emerald-500/30 rounded" />
              <div className="h-2 w-full bg-gray-700 rounded" />
              <div className="h-2 w-3/4 bg-emerald-500/30 rounded" />
            </div>
            <div className="w-20 flex flex-col gap-2 pt-3">
              <div className="h-4 w-full bg-emerald-500/20 rounded text-[8px] text-emerald-400 flex items-center justify-center">
                ATS
              </div>
              <div className="h-2 w-full bg-gray-700 rounded" />
              <div className="h-2 w-3/4 bg-gray-700 rounded" />
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="flex gap-4 flex-1">
            <div className="flex-1 bg-gray-900/50 rounded-lg p-3 flex flex-col gap-1.5">
              <div className="h-2.5 w-20 bg-gray-600 rounded" />
              <div className="h-1.5 w-full bg-gray-700 rounded" />
              <div className="h-1.5 w-4/5 bg-gray-700 rounded" />
              <div className="h-2.5 w-16 bg-gray-600 rounded mt-1" />
              <div className="h-1.5 w-full bg-gray-700 rounded" />
              <div className="h-1.5 w-3/5 bg-gray-700 rounded" />
            </div>
            <div className="w-16 flex flex-col gap-2">
              <div className="h-8 w-8 bg-gray-700 rounded" />
              <div className="h-8 w-8 bg-gray-700 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 flex-1 bg-emerald-500/30 rounded-lg" />
            <div className="h-8 flex-1 bg-gray-700 rounded-lg" />
          </div>
        </>
      )}
    </div>
  );
}

export default function FeatureSection() {
  return (
    <section className="bg-gray-950 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          3 Steps. 30 Seconds. Interview-Ready.
        </h2>

        <div className="mt-16 flex flex-col gap-20">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div
                  className={cn(
                    'order-1',
                    isEven ? 'md:order-2' : 'md:order-1'
                  )}
                >
                  <MockScreen step={i} />
                </div>
                <div
                  className={cn(
                    'order-2',
                    isEven ? 'md:order-1' : 'md:order-2'
                  )}
                >
                  <span className="text-6xl font-bold text-white/10">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
