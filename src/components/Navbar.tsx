import { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Menu, X, FileText } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAudition: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navbar({ onOpenResume, isDark, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    sounds.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) {
      sounds.playClick();
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? isDark
            ? 'bg-slate-950/85 backdrop-blur-md border-slate-800/80 shadow-sm'
            : 'bg-white/90 backdrop-blur-md border-slate-200/80 shadow-sm'
          : isDark
            ? 'bg-slate-950 border-transparent'
            : 'bg-slate-50 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onClick={() => sounds.playClick()}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
          >
            Harsh Bawankar
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sounds.playClick()}
                className="hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleSoundToggle}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors"
              title={soundOn ? 'Mute audio feedback' : 'Enable audio feedback'}
              aria-label={soundOn ? 'Mute audio' : 'Enable audio'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                toggleTheme();
                sounds.playClick();
              }}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                sounds.playClick();
              }}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                sounds.playClick();
              }}
              className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
