import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ReadProgressBar } from './components/ReadProgressBar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { InteractiveGames } from './components/InteractiveGames';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ShortcutsModal, ShortcutToast } from './components/ShortcutsModal';
import { QuickContactFab } from './components/QuickContactFab';
import { ThemeCrossFadeOverlay } from './components/ThemeCrossFadeOverlay';
import { ThematicDivider } from './components/ThematicDivider';
import { LocaleContext } from './context/LocaleContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import {
  applyThemeDomAttributes,
  FallbackCrossFadePayload,
  runThemeCrossFade,
  THEME_CANVAS_CLASS,
} from './utils/themeTransition';
import { sounds } from './utils/audio';
import { Locale, PortfolioTheme } from './types';

export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harsh-portfolio-vibe');
      if (
        saved === 'noir' ||
        saved === 'barcelona' ||
        saved === 'paper' ||
        saved === 'comic' ||
        saved === 'playground' ||
        saved === 'system'
      ) {
        return saved;
      }
    }
    return 'noir';
  });

  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harsh-portfolio-locale');
      if (saved === 'en' || saved === 'hi') {
        return saved;
      }
    }
    return 'en';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harsh-portfolio-sound');
      if (saved === 'false') return false;
    }
    return true;
  });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [fallbackTransition, setFallbackTransition] =
    useState<FallbackCrossFadePayload | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const themeRef = useRef<PortfolioTheme>(theme);
  themeRef.current = theme;

  useLayoutEffect(() => {
    applyThemeDomAttributes(theme);
    sounds.setTheme(theme);
  }, [theme]);

  useLayoutEffect(() => {
    sounds.setEnabled(soundEnabled);
    try {
      localStorage.setItem('harsh-portfolio-sound', String(soundEnabled));
    } catch {
      // Ignore storage access errors
    }
  }, [soundEnabled]);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem('harsh-portfolio-locale', locale);
  }, [locale]);

  const switchTheme = useCallback((nextTheme: PortfolioTheme) => {
    const currentTheme = themeRef.current;
    if (nextTheme === currentTheme) return;

    runThemeCrossFade({
      fromTheme: currentTheme,
      toTheme: nextTheme,
      applyTheme: () => {
        themeRef.current = nextTheme;
        setTheme(nextTheme);
      },
      onFallbackStart: (payload) => {
        setFallbackTransition(payload);
      },
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const prev = themeRef.current;
    const next: PortfolioTheme =
      prev === 'noir' || prev === 'playground' || prev === 'system' ? 'paper' : 'noir';
    switchTheme(next);
  }, [switchTheme]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sounds.setEnabled(next);
      if (next) {
        sounds.playClick();
      }
      return next;
    });
  }, []);

  const { feedback } = useKeyboardShortcuts({
    locale,
    onOpenResume: () => setResumeOpen(true),
    onToggleTheme: toggleTheme,
    onToggleLocale: toggleLocale,
    shortcutsOpen,
    setShortcutsOpen,
  });

  const navigateToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const canvasClass = THEME_CANVAS_CLASS[theme];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      <div className={`min-h-screen transition-colors duration-300 overflow-x-clip ${canvasClass}`}>
        {/* Long-Form Reading Progress Bar & Journey Rail */}
        <ReadProgressBar
          mainRef={mainRef}
          theme={theme}
          onOpenShortcuts={() => setShortcutsOpen(true)}
        />

        {/* Primary Top Bar */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onSelectTheme={switchTheme}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          locale={locale}
          onChangeLocale={setLocale}
          onOpenResume={() => setResumeOpen(true)}
          onNavigateToSection={navigateToSection}
        />

        {/* Main Content */}
        <main ref={mainRef}>
          <Hero
            theme={theme}
            onChangeTheme={switchTheme}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            onOpenResume={() => setResumeOpen(true)}
          />
          <StatsStrip />
          <About theme={theme} />
          <ThematicDivider theme={theme} sectionIndex={0} />
          <Projects theme={theme} />
          <ThematicDivider theme={theme} sectionIndex={1} />
          <Skills theme={theme} />
          <ThematicDivider theme={theme} sectionIndex={2} />
          <InteractiveGames theme={theme} />
          <ThematicDivider theme={theme} sectionIndex={3} />
          <Journey theme={theme} />
          <ThematicDivider theme={theme} sectionIndex={4} />
          <Contact theme={theme} />
        </main>

        {/* Footer */}
        <Footer
          theme={theme}
          onChangeTheme={switchTheme}
          onOpenResume={() => setResumeOpen(true)}
          onOpenShortcuts={() => setShortcutsOpen(true)}
        />

        {/* Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Keyboard Shortcuts Guide & Toast */}
        <ShortcutsModal
          isOpen={shortcutsOpen}
          onClose={() => setShortcutsOpen(false)}
          onNavigate={navigateToSection}
          onOpenResume={() => setResumeOpen(true)}
          onToggleTheme={toggleTheme}
          onToggleLocale={toggleLocale}
        />
        <ShortcutToast feedback={feedback} />

        {/* Theme-Aware Floating Quick Contact Button & Popup */}
        <QuickContactFab theme={theme} />

        {/* Fallback Cross-Fade Veil (for browsers without View Transitions API) */}
        <ThemeCrossFadeOverlay
          transition={fallbackTransition}
          onFinish={(id) =>
            setFallbackTransition((prev) => (prev?.id === id ? null : prev))
          }
        />
      </div>
    </LocaleContext.Provider>
  );
}
