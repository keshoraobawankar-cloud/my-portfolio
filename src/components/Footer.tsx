import { ArrowUp, FileText, Heart, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface FooterProps {
  onOpenResume: () => void;
  onOpenAudition: () => void;
}

export function Footer({ onOpenResume, onOpenAudition }: FooterProps) {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <a
              href="#hero"
              onClick={scrollToTop}
              className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white font-sans"
            >
              Harsh Bawankar
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              B.Tech CSE Student · Ramdeobaba University (RBU), Nagpur
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 dark:text-slate-400">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAudition();
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Audition Mode
            </button>
            <button
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

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <span>
            © {new Date().getFullYear()} Harsh Bawankar. Built with clean code & consistency.
          </span>
          <span className="italic">
            "Consistency beats natural talent."
          </span>
        </div>
      </div>
    </footer>
  );
}
