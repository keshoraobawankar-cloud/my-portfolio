import { ArrowDownRight, Award, Compass, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TerminalCard } from './TerminalCard';
import { sounds } from '../utils/audio';

interface HeroProps {
  onOpenAudition: () => void;
  onOpenResume: () => void;
}

export function Hero({ onOpenAudition, onOpenResume }: HeroProps) {
  const scrollToProjects = () => {
    sounds.playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSkills = () => {
    sounds.playClick();
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    sounds.playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Left = Typographic hierarchy, Right = Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Presentation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker with subtle unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
                Ramdeobaba University (RBU)
              </span>
              <span aria-hidden="true">·</span>
              <span>B.Tech CSE (1st Year)</span>
              <span aria-hidden="true">·</span>
              <span>Nagpur, India</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] [text-wrap:balance]">
              Building as I learn, turning{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-teal-300">
                ideas into real products.
              </span>
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Hey, I'm <strong className="text-slate-900 dark:text-white font-semibold">{PERSONAL_INFO.name}</strong>. 
              A first-year Computer Science student and aspiring web developer who builds to understand. 
              Hands-on with HTML5, CSS3, C, and Python — with one client app shipped, two games in progress, 
              and a strong conviction that consistency beats natural talent.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Selected Builds</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAudition();
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-indigo-500" />
                <span>Audition Mode</span>
              </button>

              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Let's Connect</span>
                <span className="text-xs">↗</span>
              </button>
            </div>

            {/* Unboxed Motto / Tenet */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong className="text-slate-700 dark:text-slate-200 font-semibold">Core Principle:</strong>{' '}
                {PERSONAL_INFO.coreTenet} Daily commits, steady progress, and real craftsmanship.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Card */}
          <div className="lg:col-span-5">
            <TerminalCard
              onNavigateToProjects={scrollToProjects}
              onNavigateToSkills={scrollToSkills}
              onOpenAudition={onOpenAudition}
              onOpenResume={onOpenResume}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
