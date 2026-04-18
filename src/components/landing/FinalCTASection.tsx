import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="bg-gray-950 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Stop Sending Resumes Into the Void.
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Every day you wait is another job you miss. Build your resume now.
          It&apos;s free to start.
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
          Pay once. No subscription. Join 500+ job seekers.
        </p>
      </div>
    </section>
  );
}
