import Link from 'next/link';
import { cn } from '@/lib/utils';

const avatars = [
  { initials: 'JK', bg: 'bg-emerald-500' },
  { initials: 'SM', bg: 'bg-blue-500' },
  { initials: 'AR', bg: 'bg-purple-500' },
  { initials: 'TL', bg: 'bg-amber-500' },
  { initials: 'NY', bg: 'bg-rose-500' },
];

export default function HeroSection() {
  return (
    <section className="bg-gray-950 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Your Resume Gets <span className="text-emerald-500">6 Seconds</span>.
          {' '}Make Them Count.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
          Paste any job description. AI builds an ATS-optimized resume in 30
          seconds. No templates. No guesswork.
        </p>

        <div className="mt-8">
          <Link
            href="/builder"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Build My Resume Free
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Pay once. No subscription. No auto-renewal.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {avatars.map((avatar) => (
              <div
                key={avatar.initials}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold ring-2 ring-gray-950',
                  avatar.bg
                )}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-400">
            Join 500+ job seekers who landed interviews
          </span>
        </div>
      </div>
    </section>
  );
}
