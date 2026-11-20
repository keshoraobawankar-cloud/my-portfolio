import { useEffect, useState, useRef } from 'react';
import { Locale } from '../types';
import { sounds } from '../utils/audio';

interface UseKeyboardShortcutsOptions {
  locale: Locale;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  onToggleLocale: () => void;
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export interface ShortcutFeedback {
  key: string;
  label: string;
}

const SECTION_SHORTCUTS: Record<
  string,
  { id: string; en: string; hi: string }
> = {
  h: { id: 'hero', en: 'Top / Hero', hi: 'शीर्ष / परिचय' },
  a: { id: 'about', en: 'About', hi: 'परिचय' },
  p: { id: 'projects', en: 'Projects', hi: 'प्रोजेक्ट्स' },
  t: { id: 'skills', en: 'Toolkit', hi: 'टूलकिट' },
  s: { id: 'skills', en: 'Toolkit', hi: 'टूलकिट' },
  g: { id: 'arcade', en: 'Arcade', hi: 'आर्केड' },
  j: { id: 'journey', en: 'Journey', hi: 'सफ़र' },
  c: { id: 'contact', en: 'Contact', hi: 'संपर्क' },
};

export function useKeyboardShortcuts({
  locale,
  onOpenResume,
  onToggleTheme,
  onToggleLocale,
  shortcutsOpen,
  setShortcutsOpen,
}: UseKeyboardShortcutsOptions) {
  const [feedback, setFeedback] = useState<ShortcutFeedback | null>(null);
  const timerRef = useRef<number | null>(null);

  const triggerFeedback = (key: string, label: string) => {
    setFeedback({ key: key.toUpperCase(), label });
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, 1600);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape' && shortcutsOpen) {
        setShortcutsOpen(false);
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        sounds.playClick();
        setShortcutsOpen((prev) => !prev);
        return;
      }

      // Avoid firing navigation keys while another modal is open
      const hasOpenDialog = document.querySelector('[role="dialog"]') !== null;
      if (hasOpenDialog || shortcutsOpen) return;

      const lower = e.key.toLowerCase();

      if (SECTION_SHORTCUTS[lower]) {
        const dest = SECTION_SHORTCUTS[lower];
        const el = document.getElementById(dest.id);
        if (el) {
          e.preventDefault();
          sounds.playClick();
          el.scrollIntoView({ behavior: 'smooth' });
          triggerFeedback(lower, locale === 'hi' ? dest.hi : dest.en);
        }
        return;
      }

      if (lower === 'r') {
        e.preventDefault();
        sounds.playClick();
        onOpenResume();
        triggerFeedback('R', locale === 'hi' ? 'रिज़्यूमे' : 'Resume');
        return;
      }

      if (lower === 'm') {
        e.preventDefault();
        sounds.playClick();
        onToggleTheme();
        triggerFeedback('M', locale === 'hi' ? 'थीम बदली गई' : 'Theme Toggled');
        return;
      }

      if (lower === 'l') {
        e.preventDefault();
        sounds.playClick();
        onToggleLocale();
        triggerFeedback(
          'L',
          locale === 'hi' ? 'English' : 'हिन्दी'
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [locale, onOpenResume, onToggleTheme, onToggleLocale, shortcutsOpen, setShortcutsOpen]);

  return { feedback };
}
