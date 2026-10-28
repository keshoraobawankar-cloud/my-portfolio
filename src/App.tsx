import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
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
import { PortfolioTheme } from './types';

export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harsh-portfolio-vibe');
      if (saved === 'noir' || saved === 'barcelona' || saved === 'paper') {
        return saved;
      }
    }
    return 'noir';
  });

  const [resumeOpen, setResumeOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (theme === 'noir') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('harsh-portfolio-vibe', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'noir' ? 'paper' : 'noir'));
  };

  const canvasClass =
    theme === 'noir'
      ? 'noir-canvas text-slate-100'
      : theme === 'barcelona'
        ? 'barcelona-canvas text-slate-900'
        : 'paper-canvas text-slate-900';

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-clip ${canvasClass}`}>
      {/* Viewport Scroll Progress Indicator */}
      <ScrollProgress mainRef={mainRef} theme={theme} />

      {/* Primary Top Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content */}
      <main ref={mainRef}>
        <Hero
          theme={theme}
          onChangeTheme={setTheme}
          onOpenResume={() => setResumeOpen(true)}
        />
        <StatsStrip />
        <About />
        <Projects />
        <Skills />
        <InteractiveGames />
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        onChangeTheme={setTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
