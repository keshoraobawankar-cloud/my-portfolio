import { useState, useEffect, useRef, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioTheme } from '../types';
import { useLocale } from '../context/LocaleContext';
import { sounds } from '../utils/audio';
import { fireThemeConfetti } from '../utils/confetti';

interface ReadProgressBarProps {
  mainRef: RefObject<HTMLElement | null>;
  theme: PortfolioTheme;
  onOpenShortcuts?: () => void;
}

const LONG_FORM_SECTIONS = [
  { id: 'about', index: '01', en: 'About', hi: 'परिचय' },
  { id: 'projects', index: '02', en: 'Projects', hi: 'प्रोजेक्ट्स' },
  { id: 'skills', index: '03', en: 'Toolkit', hi: 'टूलकिट' },
  { id: 'arcade', index: '04', en: 'Arcade', hi: 'आर्केड' },
  { id: 'journey', index: '05', en: 'Journey', hi: 'सफ़र' },
] as const;

export function ReadProgressBar({ mainRef, theme, onOpenShortcuts }: ReadProgressBarProps) {
  const { locale } = useLocale();
  const [progress, setProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('about');
  const [inReadingZone, setInReadingZone] = useState(false);

  const themeRef = useRef<PortfolioTheme>(theme);
  themeRef.current = theme;
  const hasInitializedRef = useRef(false);
  const celebratedMilestonesRef = useRef<Set<50 | 100>>(new Set());

  useEffect(() => {
    let rafId: number | null = null;

    const handleMilestoneCheck = (ratio: number) => {
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        // Pre-mark already-passed thresholds on initial scroll restoration so mount never auto-fires
        if (ratio >= 0.5) celebratedMilestonesRef.current.add(50);
        if (ratio >= 0.98) celebratedMilestonesRef.current.add(100);
        return;
      }

      if (ratio >= 0.98 && !celebratedMilestonesRef.current.has(100)) {
        celebratedMilestonesRef.current.add(50);
        celebratedMilestonesRef.current.add(100);
        fireThemeConfetti(themeRef.current, 'reading-milestone');
        sounds.playSuccess();
      } else if (ratio >= 0.5 && !celebratedMilestonesRef.current.has(50)) {
        celebratedMilestonesRef.current.add(50);
        fireThemeConfetti(themeRef.current, 'reading-halfway');
      }
    };

    const calculateReadingProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const headerOffset = 80;

      const firstEl = document.getElementById(LONG_FORM_SECTIONS[0].id);
      const lastEl = document.getElementById(LONG_FORM_SECTIONS[LONG_FORM_SECTIONS.length - 1].id);

      let nextProgress = 0;

      if (firstEl && lastEl) {
        const startTop = firstEl.getBoundingClientRect().top + scrollTop - headerOffset;
        const lastRect = lastEl.getBoundingClientRect();
        const endBottom = lastRect.bottom + scrollTop - viewportHeight * 0.75;
        const totalDistance = Math.max(1, endBottom - startTop);

        const ratio = (scrollTop - startTop) / totalDistance;
        nextProgress = Math.min(1, Math.max(0, ratio));
        setProgress(nextProgress);
        setInReadingZone(scrollTop >= startTop - 120);
      } else if (mainRef.current) {
        const mainEl = mainRef.current;
        const rect = mainEl.getBoundingClientRect();
        const mainTop = rect.top + scrollTop;
        const scrollable = Math.max(1, mainEl.offsetHeight - viewportHeight);
        nextProgress = Math.min(1, Math.max(0, (scrollTop - mainTop) / scrollable));
        setProgress(nextProgress);
        setInReadingZone(nextProgress > 0.08);
      }

      handleMilestoneCheck(nextProgress);

      // Determine active long-form chapter crossing the reading focal line
      const readingFocalY = viewportHeight * 0.36;
      let currentActive: string = LONG_FORM_SECTIONS[0].id;
      for (const sec of LONG_FORM_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= readingFocalY) {
          currentActive = sec.id;
        }
      }
      setActiveSectionId(currentActive);
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          rafId = null;
          calculateReadingProgress();
        });
      }
    };

    calculateReadingProgress();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (mainRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(mainRef.current);
    }

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, [mainRef]);

  const safeProgress = Number.isFinite(progress) ? progress : 0;
  const percent = Math.round(safeProgress * 100);

  const isDarkTheme = theme === 'noir' || theme === 'playground' || theme === 'system';

  const barGradientClass =
    theme === 'noir'
      ? 'bg-gradient-to-r from-[#f47280] via-[#f6e2bc] to-[#a78bfa]'
      : theme === 'barcelona'
        ? 'bg-gradient-to-r from-[#2e1a47] via-[#6d4aff] to-[#e07a5f]'
        : theme === 'comic'
          ? 'bg-gradient-to-r from-[#e11d48] via-[#f59e0b] to-[#0f172a]'
          : theme === 'playground'
            ? 'bg-gradient-to-r from-[#38bdf8] via-[#34d399] to-[#a78bfa]'
            : theme === 'system'
              ? 'bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#818cf8]'
              : 'bg-gradient-to-r from-slate-900 via-indigo-600 to-rose-600';

  const scrollToSection = (id: string) => {
    sounds.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Viewport Reading Progress Bar (Compositor scaleX) */}
      <div
        role="progressbar"
        aria-label={locale === 'hi' ? 'पठन प्रगति बार' : 'Portfolio reading progress'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className={`fixed top-0 left-0 right-0 z-[45] h-[3px] pointer-events-none transition-colors duration-150 ${
          safeProgress > 0
            ? isDarkTheme
              ? 'bg-white/10'
              : 'bg-slate-900/10'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`h-full w-full origin-left will-change-transform ${barGradientClass}`}
          style={{ transform: `scaleX(${safeProgress.toFixed(5)})` }}
        />
      </div>

      {/* Desktop Reading Journey Rail (Appears in long-form sections, zero mobile sticky footprint) */}
      <AnimatePresence>
        {inReadingZone && (
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label={locale === 'hi' ? 'अनुभाग पठन प्रगति' : 'Section reading journey'}
            className={`hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-2.5 p-2.5 rounded-2xl border backdrop-blur-md shadow-sm ${
              isDarkTheme
                ? 'bg-[#0d1322]/85 border-slate-800/90 text-slate-300'
                : 'bg-white/85 border-slate-200/90 text-slate-700'
            }`}
          >
            <div className="w-full flex items-center justify-between gap-2 px-1 text-[10px] font-mono tabular-nums">
              <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {locale === 'hi' ? 'पठन' : 'Read'}
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {percent}%
              </span>
            </div>

            <div className="relative flex flex-col gap-1 pl-2.5">
              {/* Vertical track background + scaleY progress fill */}
              <div
                aria-hidden="true"
                className={`absolute left-0.5 top-1.5 bottom-1.5 w-[2px] rounded-full overflow-hidden ${
                  isDarkTheme ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <div
                  className="w-full h-full origin-top bg-indigo-500 dark:bg-indigo-400 will-change-transform"
                  style={{ transform: `scaleY(${safeProgress.toFixed(5)})` }}
                />
              </div>

              {LONG_FORM_SECTIONS.map((sec) => {
                const isActive = activeSectionId === sec.id;
                const label = locale === 'hi' ? sec.hi : sec.en;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap text-left ${
                      isActive
                        ? isDarkTheme
                          ? 'bg-indigo-500/15 text-white font-semibold'
                          : 'bg-indigo-50 text-indigo-700 font-semibold'
                        : isDarkTheme
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span className={isActive ? 'text-indigo-500 dark:text-indigo-400' : 'opacity-60'}>
                      {sec.index}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {onOpenShortcuts && (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onOpenShortcuts();
                }}
                title={locale === 'hi' ? 'कीबोर्ड शॉर्टकट्स (?)' : 'Keyboard shortcuts (?)'}
                aria-label={locale === 'hi' ? 'कीबोर्ड शॉर्टकट्स (?)' : 'Keyboard shortcuts (?)'}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1 pt-2 border-t text-[10px] font-mono transition-colors cursor-pointer ${
                  isDarkTheme
                    ? 'border-slate-800 text-slate-400 hover:text-white'
                    : 'border-slate-200 text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>{locale === 'hi' ? 'शॉर्टकट्स' : 'Keys'}</span>
                <kbd className="px-1.5 py-0.5 rounded border border-current/25 font-bold">?</kbd>
              </button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
