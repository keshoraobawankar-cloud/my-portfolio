import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  FileText,
  ArrowUpRight,
  Sun,
  Moon,
  Languages,
  Volume2,
  VolumeX,
  Compass,
  ChevronDown,
} from 'lucide-react';
import { Locale, PortfolioTheme } from '../types';
import { getTranslations } from '../data/translations';
import { ThemePreviewer } from './ThemePreviewer';
import { sounds } from '../utils/audio';

interface NavbarProps {
  theme: PortfolioTheme;
  onToggleTheme: () => void;
  onSelectTheme: (theme: PortfolioTheme) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  onOpenResume: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  onSelectTheme,
  soundEnabled,
  onToggleSound,
  locale,
  onChangeLocale,
  onOpenResume,
  onNavigateToSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hoveredPreviewTheme, setHoveredPreviewTheme] = useState<PortfolioTheme | null>(null);
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const quickNavRef = useRef<HTMLDivElement>(null);

  const t = getTranslations(locale);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileMenuOpen]);

  // Lightweight Scroll Spy for Quick Nav active section indicator
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'arcade', 'journey', 'contact'];
    const handleScrollSpy = () => {
      const marker = window.scrollY + 140;
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) {
          current = id;
        }
      }
      setActiveSectionId(current);
    };
    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Dismiss Quick Nav on outside click or Escape key
  useEffect(() => {
    if (!quickNavOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (quickNavRef.current && !quickNavRef.current.contains(e.target as Node)) {
        setQuickNavOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickNavOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [quickNavOpen]);

  const handleJumpToSection = (sectionId: string) => {
    sounds.playClick();
    setQuickNavOpen(false);
    setMobileMenuOpen(false);
    onNavigateToSection(sectionId);
  };

  const navLinks = [
    { id: 'about', label: t.nav.about, href: '#about', shortcut: 'a' },
    { id: 'projects', label: t.nav.projects, href: '#projects', shortcut: 'p' },
    { id: 'skills', label: t.nav.toolkit, href: '#skills', shortcut: 't' },
    { id: 'arcade', label: t.nav.arcade, href: '#arcade', shortcut: 'g' },
    { id: 'journey', label: t.nav.journey, href: '#journey', shortcut: 'j' },
  ];

  const quickNavSections = [
    { id: 'hero', num: '00', label: t.nav.quickNav.sections.hero, shortcut: 'H' },
    { id: 'about', num: '01', label: t.nav.quickNav.sections.about, shortcut: 'A' },
    { id: 'projects', num: '02', label: t.nav.quickNav.sections.projects, shortcut: 'P' },
    { id: 'skills', num: '03', label: t.nav.quickNav.sections.skills, shortcut: 'S' },
    { id: 'arcade', num: '04', label: t.nav.quickNav.sections.arcade, shortcut: 'G' },
    { id: 'journey', num: '05', label: t.nav.quickNav.sections.journey, shortcut: 'J' },
    { id: 'contact', num: '06', label: t.nav.quickNav.sections.contact, shortcut: 'C' },
  ];

  const isNoir = theme === 'noir';
  const isBarcelona = theme === 'barcelona';
  const isComic = theme === 'comic';
  const isDarkHeader = isNoir || theme === 'playground' || theme === 'system';

  const headerSurface = scrolled
    ? isDarkHeader
      ? 'bg-[#0b0f19]/88 backdrop-blur-md border-slate-800/90 shadow-sm'
      : isBarcelona
        ? 'bg-[#efe6f7]/85 backdrop-blur-md border-slate-900/10 shadow-sm'
        : isComic
          ? 'bg-[#fbf7ec]/95 backdrop-blur-md border-b-2 border-slate-950 shadow-sm'
          : 'bg-[#faf7f2]/88 backdrop-blur-md border-slate-200/90 shadow-sm'
    : 'bg-transparent border-transparent';

  const handleSelectLocale = (nextLocale: Locale) => {
    if (nextLocale !== locale) {
      sounds.playClick();
      onChangeLocale(nextLocale);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${headerSurface}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 md:gap-5 lg:gap-8 h-16 sm:h-20">
            {/* Zone 1: Single brand wordmark */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleJumpToSection('hero');
              }}
              className={`font-display inline-flex items-center text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 ${
                isDarkHeader ? 'text-white' : 'text-slate-950'
              }`}
            >
              {t.brandName}
            </a>

            {/* Zone 2: Concise single-line navigation links + Quick Nav dropdown */}
            <div className="flex items-center gap-4 xl:gap-6">
              <nav
                className={`hidden lg:flex items-center gap-4 xl:gap-6 text-xs sm:text-sm font-medium ${
                  isDarkHeader
                    ? 'text-slate-300'
                    : isBarcelona
                      ? 'text-slate-900/80 uppercase tracking-widest text-xs'
                      : isComic
                        ? 'text-slate-950 font-bold'
                        : 'text-slate-700'
                }`}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-keyshortcuts={link.shortcut}
                    onMouseEnter={() => sounds.playHover()}
                    onClick={(e) => {
                      e.preventDefault();
                      handleJumpToSection(link.id);
                    }}
                    className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                      activeSectionId === link.id
                        ? isDarkHeader
                          ? 'text-white font-semibold'
                          : 'text-slate-950 font-semibold'
                        : isDarkHeader
                          ? 'hover:text-white'
                          : 'hover:text-slate-950'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Quick Nav Dropdown */}
              <div ref={quickNavRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setQuickNavOpen((prev) => !prev);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  aria-haspopup="menu"
                  aria-expanded={quickNavOpen}
                  aria-label={t.nav.quickNav.ariaLabel}
                  title={t.nav.quickNav.ariaLabel}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 ${
                    isDarkHeader
                      ? theme === 'system'
                        ? 'border-cyan-400/45 bg-cyan-950/60 text-cyan-200 hover:border-cyan-400/80'
                        : 'border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-slate-600 hover:text-white'
                      : isComic
                        ? 'border-2 border-slate-950 bg-white text-slate-950 shadow-[2px_2px_0_#0f172a] hover:bg-amber-200'
                        : 'border-slate-300/80 bg-white/75 text-slate-800 hover:bg-white'
                  }`}
                >
                  <Compass
                    className={`w-3.5 h-3.5 shrink-0 ${
                      theme === 'system'
                        ? 'text-cyan-300'
                        : isComic
                          ? 'text-rose-600'
                          : isDarkHeader
                            ? 'text-indigo-400'
                            : 'text-indigo-600'
                    }`}
                  />
                  <span className="hidden sm:inline">{t.nav.quickNav.buttonLabel}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      quickNavOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {quickNavOpen && (
                    <motion.div
                      role="menu"
                      aria-label={t.nav.quickNav.menuHeader}
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2 z-50 w-64 rounded-2xl p-2 shadow-2xl backdrop-blur-md ${
                        isDarkHeader
                          ? theme === 'system'
                            ? 'bg-[#030916]/95 border border-cyan-400/45 text-cyan-50 shadow-[0_0_24px_-6px_rgba(34,211,238,0.3)]'
                            : 'bg-[#0f1628]/95 border border-slate-700/90 text-slate-100'
                          : isComic
                            ? 'bg-[#fbf7ec] border-2 border-slate-950 shadow-[5px_5px_0_#0f172a] text-slate-950'
                            : 'bg-white/95 border border-slate-200/95 text-slate-900'
                      }`}
                    >
                      <div
                        className={`px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold border-b mb-1 ${
                          isDarkHeader
                            ? 'text-slate-400 border-slate-800'
                            : isComic
                              ? 'text-rose-700 border-slate-950/20'
                              : 'text-slate-500 border-slate-200/80'
                        }`}
                      >
                        {t.nav.quickNav.menuHeader}
                      </div>

                      <div className="space-y-0.5">
                        {quickNavSections.map((item) => {
                          const isCurrent = activeSectionId === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="menuitem"
                              onMouseEnter={() => sounds.playHover()}
                              onClick={() => handleJumpToSection(item.id)}
                              className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                                isCurrent
                                  ? isDarkHeader
                                    ? theme === 'system'
                                      ? 'bg-cyan-400/15 text-cyan-200 font-semibold'
                                      : 'bg-indigo-500/20 text-white font-semibold'
                                    : isComic
                                      ? 'bg-amber-300 text-slate-950 font-bold border border-slate-950'
                                      : 'bg-indigo-50 text-indigo-700 font-semibold'
                                  : isDarkHeader
                                    ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                    : isComic
                                      ? 'text-slate-900 hover:bg-amber-100 font-medium'
                                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                              }`}
                            >
                              <span className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`font-mono text-[10px] shrink-0 ${
                                    isCurrent
                                      ? theme === 'system'
                                        ? 'text-cyan-300'
                                        : isComic
                                          ? 'text-rose-700 font-bold'
                                          : 'text-indigo-500'
                                      : isDarkHeader
                                        ? 'text-slate-500'
                                        : 'text-slate-400'
                                  }`}
                                >
                                  {item.num}
                                </span>
                                <span className="truncate">{item.label}</span>
                              </span>

                              <kbd
                                className={`font-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${
                                  isDarkHeader
                                    ? 'border-slate-700 bg-slate-900 text-slate-400'
                                    : isComic
                                      ? 'border-slate-950 bg-white text-slate-950 font-bold'
                                      : 'border-slate-200 bg-slate-50 text-slate-500'
                                }`}
                              >
                                {item.shortcut}
                              </kbd>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Zone 3: Language Switcher + Sun/Moon Theme Toggle + Primary Action + Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Language Switcher (EN / हिं) */}
              <div
                role="group"
                aria-label={t.nav.languageLabel}
                className={`hidden sm:inline-flex items-center p-0.5 rounded-full border transition-colors ${
                  isDarkHeader
                    ? 'border-slate-800 bg-slate-900/80'
                    : isComic
                      ? 'border-2 border-slate-950 bg-white'
                      : 'border-slate-300/80 bg-white/70'
                }`}
              >
                <span
                  className={`pl-2 pr-1 flex items-center ${
                    isDarkHeader ? 'text-slate-400' : 'text-slate-600'
                  }`}
                  aria-hidden="true"
                >
                  <Languages className="w-3.5 h-3.5" />
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectLocale('en')}
                  title={t.nav.switchToEnglish}
                  aria-label={t.nav.switchToEnglish}
                  aria-pressed={locale === 'en'}
                  className={`px-2 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                    locale === 'en'
                      ? isDarkHeader
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'bg-slate-950 text-white shadow-xs'
                      : isDarkHeader
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectLocale('hi')}
                  title={t.nav.switchToHindi}
                  aria-label={t.nav.switchToHindi}
                  aria-pressed={locale === 'hi'}
                  className={`px-2 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    locale === 'hi'
                      ? isDarkHeader
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'bg-slate-950 text-white shadow-xs'
                      : isDarkHeader
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  हिं
                </button>
              </div>

              {/* Theme-Tailored UI Sound Effect Toggle */}
              <button
                type="button"
                onClick={onToggleSound}
                onMouseEnter={() => sounds.playHover()}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? t.nav.muteSoundAria : t.nav.unmuteSoundAria}
                title={
                  soundEnabled
                    ? `${t.nav.soundOnLabel} · ${t.hero.themes[theme]}`
                    : t.nav.soundOffLabel
                }
                className={`p-2 rounded-full border transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                  soundEnabled
                    ? isDarkHeader
                      ? theme === 'system'
                        ? 'border-cyan-400/50 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/70'
                        : 'border-emerald-400/40 bg-slate-900/80 text-emerald-300 hover:border-emerald-400/70 hover:bg-slate-800'
                      : isComic
                        ? 'border-2 border-slate-950 bg-white text-rose-600 shadow-[2px_2px_0_#0f172a]'
                        : 'border-indigo-300/80 bg-white/80 text-indigo-600 hover:bg-white'
                    : isDarkHeader
                      ? 'border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300'
                      : isComic
                        ? 'border-2 border-slate-950 bg-slate-200 text-slate-600 shadow-[2px_2px_0_#0f172a]'
                        : 'border-slate-300/70 bg-white/50 text-slate-400 hover:text-slate-700'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <div
                className="relative"
                onMouseEnter={() => {
                  setPreviewOpen(true);
                  sounds.playHover();
                }}
                onMouseLeave={() => {
                  setPreviewOpen(false);
                  setHoveredPreviewTheme(null);
                }}
                onFocus={() => setPreviewOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setPreviewOpen(false);
                    setHoveredPreviewTheme(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setPreviewOpen(false);
                    setHoveredPreviewTheme(null);
                  }
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setPreviewOpen(false);
                    setHoveredPreviewTheme(null);
                    onToggleTheme();
                    sounds.playClick();
                  }}
                  className={`p-2 rounded-full border transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                    isDarkHeader
                      ? 'border-slate-800 bg-slate-900/80 text-amber-300 hover:border-slate-700 hover:bg-slate-800'
                      : isComic
                        ? 'border-2 border-slate-950 bg-amber-300 text-slate-950 shadow-[2px_2px_0_#0f172a]'
                        : 'border-slate-300/80 bg-white/70 text-slate-800 hover:bg-white'
                  }`}
                  title={isDarkHeader ? t.nav.switchToLight : t.nav.switchToDark}
                  aria-label={isDarkHeader ? t.nav.switchToLight : t.nav.switchToDark}
                  aria-expanded={previewOpen}
                >
                  {isDarkHeader ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <ThemePreviewer
                  isOpen={previewOpen}
                  currentTheme={theme}
                  previewTheme={hoveredPreviewTheme ?? (isDarkHeader ? 'paper' : 'noir')}
                  locale={locale}
                  onHoverTheme={(hovered) => {
                    setHoveredPreviewTheme(hovered);
                    if (hovered) sounds.playHover();
                  }}
                  onSelectTheme={(nextTheme) => {
                    setPreviewOpen(false);
                    setHoveredPreviewTheme(null);
                    onSelectTheme(nextTheme);
                  }}
                />
              </div>

              <a
                href="#contact"
                onMouseEnter={() => sounds.playHover()}
                onClick={(e) => {
                  e.preventDefault();
                  handleJumpToSection('contact');
                }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap shrink-0 ${
                  isDarkHeader
                    ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-sm'
                    : isBarcelona
                      ? 'border border-slate-950/45 text-slate-950 uppercase tracking-widest hover:bg-slate-950 hover:text-white'
                      : isComic
                        ? 'bg-rose-600 text-white border-2 border-slate-950 shadow-[3px_3px_0_#0f172a] hover:bg-rose-500 font-bold'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                }`}
              >
                {t.nav.workWithMe}
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(true);
                  sounds.playClick();
                }}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
                  isDarkHeader
                    ? 'text-slate-200 hover:bg-white/10'
                    : 'text-slate-900 hover:bg-slate-900/10'
                }`}
                aria-label={t.nav.openMenu}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Smooth Slide-In Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className={`fixed top-0 right-0 bottom-0 w-[82vw] max-w-xs border-l p-6 flex flex-col justify-between shadow-2xl ${
                isDarkHeader
                  ? 'bg-[#0b0f19] border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-950'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/20">
                  <span className="font-display font-bold text-base">{t.nav.navigation}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      sounds.playClick();
                    }}
                    className={`p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                      isDarkHeader ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    aria-label={t.nav.closeMenu}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleJumpToSection(link.id);
                      }}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold transition-colors min-h-[44px] ${
                        isDarkHeader
                          ? 'text-slate-100 hover:bg-slate-900'
                          : 'text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200/20">
                {/* Mobile Language Switcher */}
                <div
                  role="group"
                  aria-label={t.nav.languageLabel}
                  className={`grid grid-cols-2 gap-1.5 p-1 rounded-xl border ${
                    isDarkHeader
                      ? 'border-slate-800 bg-slate-900/90'
                      : 'border-slate-200 bg-slate-100/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectLocale('en')}
                    aria-pressed={locale === 'en'}
                    className={`py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      locale === 'en'
                        ? isDarkHeader
                          ? 'bg-white text-slate-950 shadow-xs'
                          : 'bg-slate-950 text-white shadow-xs'
                        : isDarkHeader
                          ? 'text-slate-300 hover:text-white'
                          : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectLocale('hi')}
                    aria-pressed={locale === 'hi'}
                    className={`py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      locale === 'hi'
                        ? isDarkHeader
                          ? 'bg-white text-slate-950 shadow-xs'
                          : 'bg-slate-950 text-white shadow-xs'
                        : isDarkHeader
                          ? 'text-slate-300 hover:text-white'
                          : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <span>हिन्दी</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleTheme();
                      sounds.playClick();
                    }}
                    className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold border transition-transform active:scale-[0.98] min-h-[44px] cursor-pointer ${
                      isDarkHeader
                        ? 'border-slate-800 bg-slate-900 text-amber-300'
                        : 'border-slate-200 bg-slate-50 text-slate-800'
                    }`}
                  >
                    {isDarkHeader ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
                    <span className="truncate">
                      {isDarkHeader ? t.nav.switchToLightLabel : t.nav.switchToDarkLabel}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={onToggleSound}
                    aria-pressed={soundEnabled}
                    className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold border transition-transform active:scale-[0.98] min-h-[44px] cursor-pointer ${
                      soundEnabled
                        ? isDarkHeader
                          ? 'border-emerald-500/40 bg-slate-900 text-emerald-300'
                          : 'border-indigo-200 bg-indigo-50/80 text-indigo-700'
                        : isDarkHeader
                          ? 'border-slate-800 bg-slate-900 text-slate-400'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 shrink-0" /> : <VolumeX className="w-4 h-4 shrink-0" />}
                    <span className="truncate">
                      {soundEnabled ? t.hero.soundOn : t.hero.soundMuted}
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    sounds.playClick();
                    onOpenResume();
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-transform active:scale-[0.98] min-h-[44px] cursor-pointer ${
                    isDarkHeader
                      ? 'border-slate-800 text-white hover:bg-slate-900'
                      : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.nav.viewResumePdf}</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleJumpToSection('contact');
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98] min-h-[44px] ${
                    isDarkHeader ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                  }`}
                >
                  <span>{t.nav.workWithMe}</span>
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
