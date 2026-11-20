import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioTheme } from '../types';

export type PortfolioSectionKey =
  | 'about'
  | 'projects'
  | 'skills'
  | 'arcade'
  | 'journey'
  | 'contact';

const THEME_SECTION_EMOJIS: Record<
  PortfolioTheme,
  Record<PortfolioSectionKey, readonly [string, string]>
> = {
  noir: {
    about: ['🌑', '💻'],
    projects: ['⚡', '🛠️'],
    skills: ['🧬', '⚙️'],
    arcade: ['🕹️', '👾'],
    journey: ['🚀', '🧭'],
    contact: ['📡', '✉️'],
  },
  barcelona: {
    about: ['🎨', '☀️'],
    projects: ['✨', '📐'],
    skills: ['🖌️', '🧩'],
    arcade: ['🎲', '🌈'],
    journey: ['🏛️', '🌅'],
    contact: ['💌', '🌸'],
  },
  paper: {
    about: ['📝', '☕'],
    projects: ['📂', '✏️'],
    skills: ['📐', '🔧'],
    arcade: ['♟️', '🎯'],
    journey: ['📖', '🎓'],
    contact: ['📮', '🤝'],
  },
  comic: {
    about: ['💥', '🦸'],
    projects: ['💬', '⚡'],
    skills: ['🥊', '✏️'],
    arcade: ['🎮', '💢'],
    journey: ['📖', '🌟'],
    contact: ['📣', '💨'],
  },
  playground: {
    about: ['🤖', '🧲'],
    projects: ['🧪', '🧱'],
    skills: ['⚛️', '🔋'],
    arcade: ['🛸', '🎱'],
    journey: ['🔭', '🛰️'],
    contact: ['📶', '💬'],
  },
  system: {
    about: ['💠', '🔮'],
    projects: ['📜', '⚔️'],
    skills: ['🧿', '📊'],
    arcade: ['🏆', '🛡️'],
    journey: ['🌌', '⏳'],
    contact: ['✨', '📨'],
  },
};

interface ThemeHeaderEmojiProps {
  section: PortfolioSectionKey;
  theme: PortfolioTheme;
}

export function ThemeHeaderEmoji({ section, theme }: ThemeHeaderEmojiProps) {
  const [frameIndex, setFrameIndex] = useState<0 | 1>(0);

  useEffect(() => {
    setFrameIndex(0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setFrameIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3200);

    return () => window.clearInterval(timer);
  }, [theme]);

  const emoji = THEME_SECTION_EMOJIS[theme][section][frameIndex];

  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center w-5 h-5 shrink-0 select-none overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${theme}-${section}-${frameIndex}`}
          initial={{ opacity: 0, y: -6, scale: 0.75, rotate: -12 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 6, scale: 0.75, rotate: 12 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-sm leading-none"
        >
          {emoji}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
