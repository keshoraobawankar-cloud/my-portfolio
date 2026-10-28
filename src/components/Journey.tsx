import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award, Quote } from 'lucide-react';
import { MILESTONES, PERSONAL_INFO } from '../data/portfolioData';

export function Journey() {
  return (
    <section
      id="journey"
      className="py-16 sm:py-24 md:py-28 border-b border-slate-200/80 dark:border-slate-800/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 max-w-3xl mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">05</span>
            <span aria-hidden="true">/</span>
            <span>ACADEMIC FOUNDATION & MILESTONES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Early days.{' '}
            <span className="text-slate-400 dark:text-slate-500 font-normal">
              Ambitious trajectory.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            From first lines of C and Python to shipping real client utilities and studying Computer Science at Ramdeobaba University.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Milestones timeline */}
          <div className="lg:col-span-8 space-y-5">
            {MILESTONES.map((m, idx) => (
              <div
                key={m.title}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 space-y-4 card-glow hover:border-indigo-400/60 dark:hover:border-indigo-500/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {idx === 0 ? (
                      <GraduationCap className="w-4 h-4 shrink-0" />
                    ) : idx === 1 ? (
                      <Briefcase className="w-4 h-4 shrink-0" />
                    ) : (
                      <Award className="w-4 h-4 shrink-0" />
                    )}
                    <span>{m.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{m.year}</span>
                  </div>
                  {m.isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                      Current Chapter
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {m.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.organization} · {m.location}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/90 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    Takeaway:
                  </span>{' '}
                  {m.takeaway}
                </div>
              </div>
            ))}
          </div>

          {/* Right column: Editorial Quote card */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 sm:p-7 rounded-2xl border border-indigo-200/90 dark:border-indigo-500/30 bg-gradient-to-br from-indigo-50/80 to-white dark:from-slate-900/95 dark:to-indigo-950/35 space-y-4 card-glow hover:border-indigo-400/60">
              <Quote className="w-8 h-8 text-indigo-500/50" />
              <blockquote className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                "{PERSONAL_INFO.coreTenet}"
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Talent without daily practice stalls quickly. Sitting down every day to write logic, test ideas, debug errors, and finish projects turns complex problems into second nature.
              </p>
              <div className="pt-3 border-t border-indigo-200/60 dark:border-indigo-900/60 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>Harsh Bawankar</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Nagpur, 2026</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 space-y-2 text-xs card-glow hover:border-slate-300 dark:hover:border-slate-700">
              <span className="font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block text-[11px]">
                Ramdeobaba University (RBU)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Ramdeobaba University is an autonomous engineering institution in Nagpur, Maharashtra known for strong computer science fundamentals and an active student builder culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
