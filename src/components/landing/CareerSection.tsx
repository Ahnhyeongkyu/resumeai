const cards = [
  {
    title: 'Career Switcher',
    description:
      'Changing industries? AI translates your transferable skills into the language your new field understands.',
  },
  {
    title: 'Returning After Gap',
    description:
      '4-year break? AI frames your gap positively and highlights what matters to employers right now.',
  },
  {
    title: 'Recent Graduate',
    description:
      'No experience? AI turns your projects, internships, and coursework into compelling bullet points.',
  },
  {
    title: 'Senior Professional',
    description:
      '20 years of experience? AI distills your career into a focused, impactful 2-page resume.',
  },
];

export default function CareerSection() {
  return (
    <section className="bg-gray-950 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Built for Every Career Stage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-emerald-500/50 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
