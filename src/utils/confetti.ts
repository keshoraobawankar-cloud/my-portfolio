import { confetti, type ConfettiOptions } from '@tsparticles/confetti';
import { PortfolioTheme } from '../types';
import { prefersReducedMotion } from './themeTransition';

export type CelebrationTrigger = 'reading-milestone' | 'reading-halfway' | 'project-complete';

interface ThemeConfettiRecipe {
  colors: string[];
  shapes: string[];
  shapeOptions?: ConfettiOptions['shapeOptions'];
  flat: boolean;
  scalar: number;
  spread: number;
  startVelocity: number;
  gravity: number;
  decay: number;
  drift?: number;
  ticks: number;
  baseCount: number;
}

const THEME_CONFETTI_RECIPES: Record<PortfolioTheme, ThemeConfettiRecipe> = {
  // System Window / Isekai HUD: crisp 2D pixel-art square telemetry blocks
  system: {
    colors: ['#22d3ee', '#38bdf8', '#818cf8', '#a5f3fc', '#ffffff'],
    shapes: ['square'],
    flat: true,
    scalar: 0.88,
    spread: 76,
    startVelocity: 48,
    gravity: 1.15,
    decay: 0.91,
    ticks: 185,
    baseCount: 56,
  },
  // Comic Panel: bold primary manga bursts with 4-point stars, triangles & action glyphs
  comic: {
    colors: ['#e11d48', '#facc15', '#0f172a', '#2563eb', '#ffffff'],
    shapes: ['star', 'polygon', 'emoji'],
    shapeOptions: {
      star: { sides: 4 },
      polygon: { sides: 3 },
      emoji: { value: ['💥', '⚡', '★'] },
    },
    flat: true,
    scalar: 1.15,
    spread: 112,
    startVelocity: 52,
    gravity: 0.95,
    decay: 0.89,
    ticks: 175,
    baseCount: 62,
  },
  // Developer Dark (Noir): luminous indigo, emerald & warm amber sparks
  noir: {
    colors: ['#6366f1', '#10b981', '#a78bfa', '#f47280', '#f6e2bc'],
    shapes: ['circle', 'star', 'square'],
    shapeOptions: {
      star: { sides: 5 },
    },
    flat: false,
    scalar: 0.95,
    spread: 78,
    startVelocity: 42,
    gravity: 0.85,
    decay: 0.91,
    ticks: 190,
    baseCount: 54,
  },
  // Barcelona Mesh: warm sunset coral & lavender hexagons drifting smoothly
  barcelona: {
    colors: ['#eca67c', '#9a7ec7', '#6d4aff', '#e07a5f', '#faf7f2'],
    shapes: ['circle', 'polygon'],
    shapeOptions: {
      polygon: { sides: 6 },
    },
    flat: false,
    scalar: 1.05,
    spread: 86,
    startVelocity: 39,
    gravity: 0.74,
    decay: 0.92,
    drift: 0.35,
    ticks: 210,
    baseCount: 52,
  },
  // Editorial Paper: crisp ink & bookmark paper slips
  paper: {
    colors: ['#0f172a', '#4f46e5', '#e11d48', '#d97706', '#cbd5e1'],
    shapes: ['square', 'polygon'],
    shapeOptions: {
      polygon: { sides: 4 },
    },
    flat: false,
    scalar: 0.9,
    spread: 68,
    startVelocity: 36,
    gravity: 0.7,
    decay: 0.92,
    ticks: 200,
    baseCount: 48,
  },
  // Interactive Physics Lab: bright neon polyhedrons
  playground: {
    colors: ['#38bdf8', '#34d399', '#a78bfa', '#fbbf24', '#f472b6'],
    shapes: ['polygon', 'square', 'circle'],
    shapeOptions: {
      polygon: { sides: 5 },
    },
    flat: false,
    scalar: 1.0,
    spread: 82,
    startVelocity: 46,
    gravity: 0.92,
    decay: 0.9,
    ticks: 190,
    baseCount: 58,
  },
};

async function safeConfetti(options: ConfettiOptions): Promise<void> {
  try {
    await confetti({
      disableForReducedMotion: true,
      zIndex: 90,
      ...options,
    });
  } catch {
    // Gracefully ignore canvas/webgl initialization failures in restricted environments
  }
}

/**
 * Fires a theme-tailored confetti celebration powered by @tsparticles/confetti.
 */
export function fireThemeConfetti(
  theme: PortfolioTheme,
  trigger: CelebrationTrigger
): void {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  const recipe = THEME_CONFETTI_RECIPES[theme];
  const scaleMultiplier =
    trigger === 'reading-milestone' ? 1 : trigger === 'project-complete' ? 0.85 : 0.55;
  const count = Math.max(18, Math.round(recipe.baseCount * scaleMultiplier));

  const shared: ConfettiOptions = {
    colors: recipe.colors,
    shapes: recipe.shapes,
    shapeOptions: recipe.shapeOptions,
    flat: recipe.flat,
    scalar: recipe.scalar,
    spread: recipe.spread,
    startVelocity: recipe.startVelocity,
    gravity: recipe.gravity,
    decay: recipe.decay,
    drift: recipe.drift ?? 0,
    ticks: recipe.ticks,
  };

  if (trigger === 'reading-milestone') {
    // Dual-side finale cannon for completing the reading journey
    void safeConfetti({
      ...shared,
      count: Math.round(count * 0.65),
      angle: 60,
      origin: { x: 0.12, y: 0.72 },
    });

    window.setTimeout(() => {
      void safeConfetti({
        ...shared,
        count: Math.round(count * 0.65),
        angle: 120,
        origin: { x: 0.88, y: 0.72 },
      });
    }, 140);

    return;
  }

  if (trigger === 'project-complete') {
    // Centered modal-completion burst (higher velocity comic/pixel impact)
    void safeConfetti({
      ...shared,
      count,
      angle: 90,
      origin: { x: 0.5, y: 0.65 },
    });

    if (theme === 'comic' || theme === 'system') {
      window.setTimeout(() => {
        void safeConfetti({
          ...shared,
          count: Math.round(count * 0.45),
          angle: 90,
          spread: recipe.spread + 18,
          origin: { x: 0.5, y: 0.45 },
        });
      }, 110);
    }

    return;
  }

  // Subtle halfway reading milestone spark from the reading progress edge
  void safeConfetti({
    ...shared,
    count,
    angle: 115,
    origin: { x: 0.9, y: 0.28 },
  });
}
