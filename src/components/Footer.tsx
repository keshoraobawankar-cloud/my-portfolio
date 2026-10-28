import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PortfolioTheme } from '../types';
import { sounds } from '../utils/audio';

interface FooterProps {
  theme: PortfolioTheme;
  onChangeTheme: (theme: PortfolioTheme) => void;
  onOpenResume: () => void;
}

export function Footer({ theme, onChangeTheme, onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-[#090d16]/95 py-12 text-xs font-mono backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <a
              href="#hero"
              onClick={scrollToTop}
              className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Harsh Bawankar
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              B.Tech CSE Student · Ramdeobaba University (RBU), Nagpur
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-600 dark:text-slate-400">
            <a
              href="#projects"
              onClick={() => sounds.playClick()}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={() => sounds.playClick()}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Toolkit
            </a>
            <a
              href="#arcade"
              onClick={() => sounds.playClick()}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Arcade
            </a>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Resume PDF
            </button>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/90">
              {(
                [
                  { id: 'noir', label: 'Dark' },
                  { id: 'barcelona', label: 'Mesh' },
                  { id: 'paper', label: 'Light' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onChangeTheme(opt.id);
                  }}
                  className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    theme === opt.id
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-indigo-400/60 text-slate-600 dark:text-slate-300 transition-all duration-150 hover:scale-[1.04] active:scale-[0.97] cursor-pointer"
              aria-label="Back to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-500 text-[11px] text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} Harsh Bawankar · Primary: {PERSONAL_INFO.email}
          </span>
          <span className="italic text-slate-500 dark:text-slate-400">
            "{PERSONAL_INFO.coreTenet}"
          </span>
        </div>
      </div>
    </footer>
  );
}
