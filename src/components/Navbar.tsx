import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { PortfolioTheme } from '../types';
import { sounds } from '../utils/audio';

interface NavbarProps {
  theme: PortfolioTheme;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export function Navbar({ theme, onToggleTheme, onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Toolkit', href: '#skills' },
    { label: 'Arcade', href: '#arcade' },
    { label: 'Journey', href: '#journey' },
  ];

  const isNoir = theme === 'noir';
  const isBarcelona = theme === 'barcelona';

  const headerSurface = scrolled
    ? isNoir
      ? 'bg-[#0b0f19]/88 backdrop-blur-md border-slate-800/90 shadow-sm'
      : isBarcelona
        ? 'bg-[#efe6f7]/85 backdrop-blur-md border-slate-900/10 shadow-sm'
        : 'bg-[#faf7f2]/88 backdrop-blur-md border-slate-200/90 shadow-sm'
    : 'bg-transparent border-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${headerSurface}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 lg:gap-8 h-16 sm:h-20">
            {/* Zone 1: Single brand wordmark */}
            <a
              href="#hero"
              onClick={() => sounds.playClick()}
              className={`font-display inline-flex items-center text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 ${
                isNoir ? 'text-white' : 'text-slate-950'
              }`}
            >
              Harsh Bawankar
            </a>

            {/* Zone 2: 5 concise single-line text navigation links */}
            <nav
              className={`hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium ${
                isNoir
                  ? 'text-slate-300'
                  : isBarcelona
                    ? 'text-slate-900/80 uppercase tracking-widest text-xs'
                    : 'text-slate-700'
              }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => sounds.playClick()}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                    isNoir ? 'hover:text-white' : 'hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Sun/Moon Theme Toggle + Primary Action + Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                onClick={() => {
                  onToggleTheme();
                  sounds.playClick();
                }}
                className={`p-2 rounded-full border transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                  isNoir
                    ? 'border-slate-800 bg-slate-900/80 text-amber-300 hover:border-slate-700 hover:bg-slate-800'
                    : 'border-slate-300/80 bg-white/70 text-slate-800 hover:bg-white'
                }`}
                title={isNoir ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={isNoir ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isNoir ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <a
                href="#contact"
                onClick={() => sounds.playClick()}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap shrink-0 ${
                  isNoir
                    ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-sm'
                    : isBarcelona
                      ? 'border border-slate-950/45 text-slate-950 uppercase tracking-widest hover:bg-slate-950 hover:text-white'
                      : 'bg-slate-950 text-white hover:bg-slate-800'
                }`}
              >
                Work With Me
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(true);
                  sounds.playClick();
                }}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
                  isNoir
                    ? 'text-slate-200 hover:bg-white/10'
                    : 'text-slate-900 hover:bg-slate-900/10'
                }`}
                aria-label="Open navigation menu"
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
                isNoir
                  ? 'bg-[#0b0f19] border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-950'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/20">
                  <span className="font-display font-bold text-base">Navigation</span>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      sounds.playClick();
                    }}
                    className={`p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                      isNoir ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        sounds.playClick();
                      }}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold transition-colors min-h-[44px] ${
                        isNoir
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
                <button
                  onClick={() => {
                    onToggleTheme();
                    sounds.playClick();
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-transform active:scale-[0.98] min-h-[44px] cursor-pointer ${
                    isNoir
                      ? 'border-slate-800 bg-slate-900 text-amber-300'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  {isNoir ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isNoir ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    sounds.playClick();
                    onOpenResume();
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-transform active:scale-[0.98] min-h-[44px] cursor-pointer ${
                    isNoir
                      ? 'border-slate-800 text-white hover:bg-slate-900'
                      : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume (PDF)</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    sounds.playClick();
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98] min-h-[44px] ${
                    isNoir ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                  }`}
                >
                  <span>Work With Me</span>
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
