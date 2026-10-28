import { GraduationCap, Briefcase, Award, Quote } from 'lucide-react';
import { MILESTONES, PERSONAL_INFO } from '../data/portfolioData';

export function Journey() {
  return (
    <section id="journey" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">05</span>
            <span aria-hidden="true">/</span>
            <span>ACADEMIC FOUNDATION & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Early days. <span className="text-slate-400 dark:text-slate-500 font-normal">Ambitious trajectory.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            From first lines of code to shipping client tools and pursuing engineering excellence at Ramdeobaba University.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Milestones timeline */}
          <div className="lg:col-span-8 space-y-6">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {idx === 0 ? <GraduationCap className="w-4 h-4" /> : idx === 1 ? <Briefcase className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    <span>{m.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{m.year}</span>
                  </div>
                  {m.isCurrent && (
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      Current Chapter
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {m.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.organization} · {m.location}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono">Takeaway:</span>{' '}
                  {m.takeaway}
                </div>
              </div>
            ))}
          </div>

          {/* Right column: Editorial Quote card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 to-slate-50 dark:from-slate-900 dark:to-indigo-950/30 space-y-4">
              <Quote className="w-8 h-8 text-indigo-500/40" />
              <blockquote className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                "{PERSONAL_INFO.coreTenet}"
              </blockquote>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Talent without daily practice quickly turns into stagnation. By sitting down every day to write, test, debug, and learn, complicated concepts become second nature.
              </p>
              <div className="pt-3 border-t border-indigo-200/60 dark:border-indigo-900/50 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Harsh Bawankar</span>
                <span className="text-indigo-600 dark:text-indigo-400">Nagpur, 2026</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2 text-xs">
              <span className="font-mono text-slate-400 uppercase tracking-wider block text-[11px]">
                Ramdeobaba University (RBU)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Ramdeobaba University is a premier autonomous engineering institution in Nagpur, Maharashtra known for rigorous technical education and strong maker culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
