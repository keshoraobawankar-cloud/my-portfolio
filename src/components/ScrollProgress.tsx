import { useState, useEffect, RefObject } from 'react';
import { PortfolioTheme } from '../types';

interface ScrollProgressProps {
  mainRef: RefObject<HTMLElement | null>;
  theme: PortfolioTheme;
}

export function ScrollProgress({ mainRef, theme }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const calculateProgress = () => {
      const mainEl = mainRef.current;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;

      if (!mainEl) {
        const docScrollable = document.documentElement.scrollHeight - viewportHeight;
        const fallback = docScrollable > 0 ? scrollTop / docScrollable : 0;
        setProgress(Math.min(1, Math.max(0, fallback)));
        return;
      }

      const rect = mainEl.getBoundingClientRect();
      const mainTop = rect.top + scrollTop;
      const scrollableDistance = mainEl.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        const docScrollable = document.documentElement.scrollHeight - viewportHeight;
        const fallback = docScrollable > 0 ? scrollTop / docScrollable : 0;
        setProgress(Math.min(1, Math.max(0, fallback)));
        return;
      }

      const scrolledThroughMain = scrollTop - mainTop;
      const ratio = scrolledThroughMain / scrollableDistance;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    const handleScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          rafId = null;
          calculateProgress();
        });
      }
    };

    calculateProgress();

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    const mainEl = mainRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (mainEl && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleScrollOrResize);
      resizeObserver.observe(mainEl);
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      resizeObserver?.disconnect();
    };
  }, [mainRef]);

  const safeProgress = Number.isFinite(progress) ? progress : 0;
  const percent = Math.round(safeProgress * 100);

  const stops =
    theme === 'noir'
      ? ['#f47280', '#f6e2bc', '#a78bfa']
      : theme === 'barcelona'
        ? ['#2e1a47', '#6d4aff', '#e07a5f']
        : ['#18181b', '#4f46e5', '#db2777'];

  return (
    <div
      role="progressbar"
      aria-label="Main content scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={`fixed top-0 left-0 right-0 z-[45] h-[3px] pointer-events-none transition-colors duration-150 ${
        safeProgress > 0
          ? theme === 'noir'
            ? 'bg-white/10'
            : 'bg-slate-900/10'
          : 'bg-transparent'
      }`}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scroll-progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="50%" stopColor={stops[1]} />
            <stop offset="100%" stopColor={stops[2]} />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100"
          height="1"
          fill="url(#scroll-progress-gradient)"
          transform={`scale(${safeProgress.toFixed(5)}, 1)`}
        />
      </svg>
    </div>
  );
}
