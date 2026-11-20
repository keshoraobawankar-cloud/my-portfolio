import { flushSync } from 'react-dom';
import { PortfolioTheme } from '../types';
import { getThemeSnapProfile } from './scrollSnap';

export const THEME_CROSSFADE_DURATION_MS = 450;

export const THEME_CANVAS_CLASS: Record<PortfolioTheme, string> = {
  noir: 'noir-canvas text-slate-100',
  barcelona: 'barcelona-canvas text-slate-900',
  paper: 'paper-canvas text-slate-900',
  comic: 'comic-canvas text-slate-950',
  playground: 'playground-canvas text-slate-100',
  system: 'system-canvas text-cyan-50',
};

export interface FallbackCrossFadePayload {
  id: number;
  fromTheme: PortfolioTheme;
  toTheme: PortfolioTheme;
}

export interface ThemeCrossFadeOptions {
  fromTheme: PortfolioTheme;
  toTheme: PortfolioTheme;
  applyTheme: () => void;
  onFallbackStart?: (payload: FallbackCrossFadePayload) => void;
  onComplete?: () => void;
}

let activeTransitionToken = 0;
let fallbackCleanupTimer: number | undefined;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function supportsViewTransitions(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === 'function'
  );
}

/**
 * Synchronously syncs theme classes, data attributes, and storage on <html>
 * so View Transition snapshots and CSS font/background/scroll-snap variables
 * update in the exact same frame as React state.
 */
export function applyThemeDomAttributes(theme: PortfolioTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const isDark = theme === 'noir' || theme === 'playground' || theme === 'system';
  const snapProfile = getThemeSnapProfile(theme);

  root.dataset.theme = theme;
  root.dataset.snapAlign = `${snapProfile.primaryAlign}-${snapProfile.secondaryAlign}`;
  root.classList.toggle('dark', isDark);
  root.classList.toggle('comic-mode', theme === 'comic');
  root.classList.toggle('system-mode', theme === 'system');

  try {
    localStorage.setItem('harsh-portfolio-vibe', theme);
  } catch {
    // Ignore storage access errors in restricted iframe contexts
  }
}

/**
 * Runs a smooth cross-fade animation utility when switching themes so
 * complex backgrounds (gradients, patterns) and font styles transition seamlessly.
 *
 * - Primary path: View Transitions API (`document.startViewTransition` + `flushSync`)
 *   for an exact 60fps GPU-composited pixel cross-fade between old & new states.
 * - Fallback path: CSS color/typography transition classes + outgoing backdrop veil.
 * - Accessibility: Skips animation immediately when `prefers-reduced-motion` is enabled.
 */
export function runThemeCrossFade({
  fromTheme,
  toTheme,
  applyTheme,
  onFallbackStart,
  onComplete,
}: ThemeCrossFadeOptions): void {
  if (fromTheme === toTheme || typeof document === 'undefined' || prefersReducedMotion()) {
    applyThemeDomAttributes(toTheme);
    applyTheme();
    onComplete?.();
    return;
  }

  const token = ++activeTransitionToken;
  const root = document.documentElement;

  if (fallbackCleanupTimer !== undefined) {
    window.clearTimeout(fallbackCleanupTimer);
    fallbackCleanupTimer = undefined;
  }

  if (supportsViewTransitions()) {
    // Suppress mid-frame inline CSS transitions during synchronous capture so
    // ::view-transition-new(root) snapshots 100% of the new background & font styles.
    root.classList.remove('theme-crossfade-fallback');
    root.classList.add('theme-vt-capturing', 'theme-crossfading');

    try {
      const vt = (
        document as Document & {
          startViewTransition: (cb: () => void) => {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        }
      ).startViewTransition(() => {
        flushSync(() => {
          applyThemeDomAttributes(toTheme);
          applyTheme();
        });
      });

      vt.ready
        .then(() => {
          if (token === activeTransitionToken) {
            root.classList.remove('theme-vt-capturing');
          }
        })
        .catch(() => {
          if (token === activeTransitionToken) {
            root.classList.remove('theme-vt-capturing');
          }
        });

      vt.finished
        .catch(() => {
          // Ignore AbortError when user switches themes rapidly
        })
        .finally(() => {
          if (token === activeTransitionToken) {
            root.classList.remove('theme-vt-capturing', 'theme-crossfading');
            onComplete?.();
          }
        });

      return;
    } catch {
      root.classList.remove('theme-vt-capturing', 'theme-crossfading');
      // Fall through cleanly to fallback cross-fade
    }
  }

  // Fallback cross-fade path for browsers without View Transitions support
  root.classList.add('theme-crossfade-fallback', 'theme-crossfading');
  onFallbackStart?.({ id: token, fromTheme, toTheme });

  applyThemeDomAttributes(toTheme);
  applyTheme();

  fallbackCleanupTimer = window.setTimeout(() => {
    if (token === activeTransitionToken) {
      root.classList.remove('theme-crossfade-fallback', 'theme-crossfading');
      fallbackCleanupTimer = undefined;
      onComplete?.();
    }
  }, THEME_CROSSFADE_DURATION_MS + 40);
}
