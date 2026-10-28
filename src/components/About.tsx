import { Compass, Hammer, TrendingUp, HeartHandshake, ArrowRight, MapPin, Mail, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface AboutProps {
  onOpenAudition: () => void;
}

export function About({ onOpenAudition }: AboutProps) {
  const principles = [
    {
      index: '01',
      title: 'Build to Understand',
      description: 'Theory only clicks when you try to implement it. I transform conceptual CS knowledge immediately into working code and user interfaces.',
      icon: Hammer,
    },
    {
      index: '02',
      title: 'Consistency Beats Talent',
      description: 'Coding isn’t an innate gift; it is a compounding discipline. Daily problem-solving, bug fixing, and continuous iteration yield undeniable growth.',
      icon: TrendingUp,
    },
    {
      index: '03',
      title: 'Solve for Real People',
      description: 'Even as a first-year student, I delivered a customized app for an actual client because useful software solves tangible friction.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">01</span>
            <span aria-hidden="true">/</span>
            <span>THE PERSON BEHIND THE CRAFT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Curiosity first. <span className="text-slate-400 dark:text-slate-500 font-normal">Progress always.</span>
          </h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio narrative */}
          <div className="lg:col-span-6 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              I believe the most effective way to master computer science is to build things that run, break, and teach you how they truly operate.
            </p>

            <p>
              I am currently enrolled in my 1st Year of <strong>B.Tech in Computer Science & Engineering</strong> at{' '}
              <strong>Ramdeobaba University (RBU)</strong>, Nagpur. My focus centers on solidifying core computer science
              fundamentals — writing clean semantic HTML5 and responsive CSS3, writing deterministic logic in C, and scripting
              in Python.
            </p>

            <p>
              Unlike passive tutorials, my journey is driven by practical execution. I have already customized and delivered a
              dedicated PDF business tool for a paying client, developed two interactive logic games to explore state machines,
              and am actively architecting a food safety audit application.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Nagpur, Maharashtra (440003)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAudition();
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
              >
                <span>Read Technical Club Audition Rationale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Three Pillars Cards */}
          <div className="lg:col-span-6 space-y-4">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.index}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-600 font-semibold">
                      {item.index}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-11">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
