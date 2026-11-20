import { motion } from 'motion/react';
import { Hammer, TrendingUp, HeartHandshake, ArrowRight, MapPin, Mail } from 'lucide-react';
import { useSectionContent } from '../services/ContentService';
import { KineticWordArrange } from './KineticWordArrange';
import { ThemeHeaderEmoji } from './ThemeHeaderEmoji';
import { ReadingTimeTag } from './ReadingTimeTag';
import { PortfolioTheme } from '../types';
import { sounds } from '../utils/audio';

export function About({ theme }: { theme: PortfolioTheme }) {
  const { locale, content } = useSectionContent('about');
  const { copy, contact } = content;
  const principleIcons = [Hammer, TrendingUp, HeartHandshake];

  return (
    <section
      id="about"
      data-snap-role="primary"
      className="portfolio-snap-section py-16 sm:py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smooth Fade-In Section Header + Kinetic Word Arrange */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 max-w-3xl mb-10 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <ThemeHeaderEmoji section="about" theme={theme} />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">01</span>
            <span aria-hidden="true">/</span>
            <span>{copy.sectionLabel}</span>
            <ReadingTimeTag section="about" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            <KineticWordArrange
              key={`about-${locale}`}
              trigger="inView"
              intensity="section"
              segments={[
                { text: copy.headingLead },
                { text: copy.headingMuted, className: 'text-slate-500 dark:text-slate-400 font-normal' },
              ]}
            />
          </h2>
        </motion.div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Authentic Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base"
          >
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
              {copy.leadParagraph}
            </p>

            <p>
              {copy.bodyParagraph1BeforeDegree}
              <strong>{copy.degreeStrong}</strong>
              {copy.bodyParagraph1BetweenDegreeAndUni}
              <strong>{copy.uniStrong}</strong>
              {copy.bodyParagraph1AfterUniBeforeC}
              <strong>{copy.cStrong}</strong>
              {copy.andWord}
              <strong>{copy.pythonStrong}</strong>
              {copy.bodyParagraph1AfterPython}
            </p>

            <p>{copy.bodyParagraph2}</p>

            <div className="pt-2 space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>{copy.locationPin}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-slate-900 dark:text-slate-100 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                >
                  {contact.email}
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${contact.secondaryEmail}`}
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                >
                  {contact.secondaryEmail}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-500/10 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>{copy.cta}</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right: Three Pillars Cards */}
          <div className="lg:col-span-6 space-y-4">
            {copy.principles.map((item, idx) => {
              const Icon = principleIcons[idx];
              return (
                <motion.div
                  key={item.index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/85 dark:bg-slate-900/80 backdrop-blur-xs card-glow hover:border-indigo-400/60 dark:hover:border-indigo-400/50 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 font-semibold shrink-0">
                      {item.index}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:pl-12">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
