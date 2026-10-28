import { motion } from 'motion/react';
import { Hammer, TrendingUp, HeartHandshake, ArrowRight, MapPin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export function About() {
  const principles = [
    {
      index: '01',
      title: 'Build to Understand',
      description:
        'Theory clicks fastest when you build something real with it. I turn classroom programming concepts and ideas directly into working prototypes.',
      icon: Hammer,
    },
    {
      index: '02',
      title: 'Consistency Beats Talent',
      description:
        'Engineering is a compounding habit. Showing up daily to practice logic, test edge cases, and refine workflows creates lasting skill.',
      icon: TrendingUp,
    },
    {
      index: '03',
      title: 'Solve for Real People',
      description:
        'Even in my first year, I customized and delivered a dedicated business & PDF tool for a real client because useful software removes everyday friction.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 border-b border-slate-200/80 dark:border-slate-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smooth Fade-In Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 max-w-3xl mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">01</span>
            <span aria-hidden="true">/</span>
            <span>About &amp; Builder Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Curiosity first. <span className="text-slate-500 dark:text-slate-400 font-normal">Progress always.</span>
          </h2>
        </motion.div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Authentic Bio Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
              I believe the best way to learn computer science is to build projects that run, break, and teach you how real software comes together.
            </p>

            <p>
              I am currently in my 1st Year of <strong>B.Tech in Computer Science &amp; Engineering</strong> at{' '}
              <strong>Ramdeobaba University (RBU)</strong>, Nagpur. My core focus is strengthening programming logic in{' '}
              <strong>C</strong> and <strong>Python</strong> while using modern AI-assisted workflows thoughtfully to prototype, debug, and turn ideas into usable applications.
            </p>

            <p>
              Rather than waiting years to start building, I dive straight into practical problems: customizing and shipping a PDF &amp; workflow app for a commercial client, designing a food safety inspection app, and building browser logic games to sharpen state and algorithmic thinking.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Nagpur, Maharashtra (440003)</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-slate-900 dark:text-slate-100 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                >
                  {PERSONAL_INFO.secondaryEmail}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-500/10 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>See Shipped &amp; Active Projects</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>

          {/* Right: Three Pillars Cards */}
          <div className="lg:col-span-6 space-y-4">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.index}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/85 dark:bg-slate-900/80 backdrop-blur-xs card-glow hover:border-indigo-400/60 dark:hover:border-indigo-400/50 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
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
