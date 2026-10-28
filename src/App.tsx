import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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
import { AuditionDrawer } from './components/AuditionDrawer';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harsh-portfolio-theme');
      if (saved) return saved === 'dark';
      return true; // Default dark-first theme as requested in Harsh's initial build
    }
    return true;
  });

  const [resumeOpen, setResumeOpen] = useState(false);
  const [auditionOpen, setAuditionOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('harsh-portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('harsh-portfolio-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Primary Top Bar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenAudition={() => setAuditionOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main>
        <Hero
          onOpenAudition={() => setAuditionOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <StatsStrip />
        <About onOpenAudition={() => setAuditionOpen(true)} />
        <Projects />
        <Skills />
        <InteractiveGames />
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setResumeOpen(true)}
        onOpenAudition={() => setAuditionOpen(true)}
      />

      {/* Modals & Overlays */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <AuditionDrawer
        isOpen={auditionOpen}
        onClose={() => setAuditionOpen(false)}
      />
    </div>
  );
}
