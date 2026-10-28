import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownRight, FileText, Gamepad2, MapPin, Volume2, VolumeX, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PortfolioTheme } from '../types';
import { TerminalCard } from './TerminalCard';
import { sounds } from '../utils/audio';

interface HeroProps {
  theme: PortfolioTheme;
  onChangeTheme: (theme: PortfolioTheme) => void;
  onOpenResume: () => void;
}

export function Hero({ theme, onChangeTheme, onOpenResume }: HeroProps) {
  const [soundOn, setSoundOn] = useState(sounds.enabled);

  const toggleSound = () => {
    const next = !soundOn;
    sounds.enabled = next;
    setSoundOn(next);
    if (next) sounds.playClick();
  };

  const scrollToProjects = () => {
    sounds.playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSkills = () => {
    sounds.playClick();
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArcade = () => {
    sounds.playClick();
    document.getElementById('arcade')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isNoir = theme === 'noir';
  const isBarcelona = theme === 'barcelona';

  const heroSurfaceClass = isNoir
    ? 'noir-hero-surface text-white'
    : isBarcelona
      ? 'barcelona-hero-surface text-slate-950'
      : 'paper-hero-surface text-slate-950';

  const themes: Array<{ id: PortfolioTheme; label: string }> = [
    { id: 'noir', label: 'Developer Dark' },
    { id: 'barcelona', label: 'Barcelona Mesh' },
    { id: 'paper', label: 'Clean Light' },
  ];

  return (
    <section
      id="hero"
      className={`relative min-h-[92vh] flex flex-col justify-between pt-20 sm:pt-24 pb-10 overflow-hidden transition-colors duration-500 ${heroSurfaceClass}`}
    >
      {/* Floating Organic Motion Shapes in Developer Dark */}
      {isNoir && <FloatingOrganicShapes />}

      {/* Main Hero Stage */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isBarcelona ? (
            /* BARCELONA TEMPLATE VIEW (Giant Edge-to-Edge Marquee + Centered Bio + Interactive Terminal) */
            <motion.div
              key="barcelona-hero"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 py-4 sm:py-6"
            >
              {/* Giant Full-Bleed Kinetic Name Banner */}
              <div className="w-full overflow-hidden py-2 select-none">
                <div className="animate-marquee-glide">
                  {[0, 1].map((group) => (
                    <div key={group} className="flex items-center shrink-0">
                      <span className="font-display font-extrabold uppercase tracking-[0.06em] text-white/95 text-[clamp(2.8rem,10vw,8.25rem)] leading-[0.95] px-4 sm:px-6">
                        HARSH BAWANKAR
                      </span>
                      <span
                        className="font-display font-light text-white/60 text-[clamp(2rem,6vw,4.5rem)] leading-none shrink-0 mx-3 sm:mx-4"
                        aria-hidden="true"
                      >
                        —
                      </span>
                      <span className="font-display font-extrabold uppercase tracking-[0.06em] text-white/95 text-[clamp(2.8rem,10vw,8.25rem)] leading-[0.95] px-4 sm:px-6">
                        HARSH BAWANKAR
                      </span>
                      <span
                        className="font-display font-light text-white/60 text-[clamp(2rem,6vw,4.5rem)] leading-none shrink-0 mx-3 sm:mx-4"
                        aria-hidden="true"
                      >
                        —
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Centered Identity, Bio & Interactive Terminal */}
              <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
                <div className="max-w-2xl mx-auto text-center space-y-5">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-slate-950/75">
                    <span>B.Tech CSE Student</span>
                    <span aria-hidden="true">·</span>
                    <span>App &amp; Tool Builder</span>
                    <span aria-hidden="true">·</span>
                    <span>Aspiring Entrepreneur</span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                    1st Year CSE at Ramdeobaba University — Building Real Products
                  </h1>

                  <p className="text-sm sm:text-base text-slate-900/90 leading-relaxed font-medium">
                    {PERSONAL_INFO.heroBio}
                  </p>

                  {/* Location & Social Strip */}
                  <div className="pt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-medium text-slate-950/80">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {PERSONAL_INFO.shortLocation}
                    </span>
                    <span aria-hidden="true">·</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="hover:underline font-semibold text-slate-950 break-all"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={PERSONAL_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                  </div>

                  {/* Primary Action Controls */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={scrollToProjects}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold tracking-wide hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 cursor-pointer whitespace-nowrap"
                    >
                      <span>Explore Selected Builds</span>
                      <ArrowDownRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        onOpenResume();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-950/35 bg-white/40 backdrop-blur-sm text-slate-950 text-xs font-semibold hover:bg-white/65 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 cursor-pointer whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </button>

                    <button
                      onClick={scrollToArcade}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-950/25 text-slate-950 text-xs font-semibold hover:bg-white/45 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 cursor-pointer whitespace-nowrap"
                    >
                      <Gamepad2 className="w-3.5 h-3.5" />
                      <span>Play Logic Arcade</span>
                    </button>
                  </div>
                </div>

                {/* Centered Interactive Terminal Card */}
                <div className="max-w-xl mx-auto">
                  <TerminalCard
                    onNavigateToProjects={scrollToProjects}
                    onNavigateToSkills={scrollToSkills}
                    onOpenResume={onOpenResume}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            /* DEVELOPER DARK & CLEAN LIGHT VIEW (Studio Badge + Statement + Floating Organic Blobs + Terminal) */
            <motion.div
              key={`${theme}-hero`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                {/* Left Column: Studio Emblem + Statement Headline + CTAs */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                  {/* Circular Vibrant Crimson-Coral Studio Emblem */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    onClick={() => {
                      sounds.playClick();
                      onOpenResume();
                    }}
                    title="Click to open Harsh Bawankar's Resume"
                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#e62e42] via-[#d92338] to-[#9f1239] shadow-xl flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.28),transparent_55%)]" />
                    <span className="relative z-10 font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                      HB
                    </span>
                    <span className="relative z-10 text-[10px] font-mono tracking-widest uppercase text-white/85 mt-0.5 group-hover:underline">
                      RBU · CSE
                    </span>
                  </motion.div>

                  {/* Oversized Statement Headline */}
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className={`text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.1] [text-wrap:balance] ${
                        isNoir ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      Harsh Bawankar is a{' '}
                      <span className={isNoir ? 'text-white/90' : 'text-slate-800'}>
                        B.Tech CSE Student, App Builder and Aspiring Entrepreneur.
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className={`text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed ${
                        isNoir ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {PERSONAL_INFO.heroBio}
                    </motion.p>
                  </div>

                  {/* Action Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center gap-3 pt-1"
                  >
                    <button
                      onClick={scrollToProjects}
                      className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                        isNoir
                          ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-sm'
                          : 'bg-slate-950 text-white hover:bg-slate-800 shadow-sm'
                      }`}
                    >
                      <span>Explore Selected Builds</span>
                      <ArrowDownRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        onOpenResume();
                      }}
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                        isNoir
                          ? 'border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800'
                          : 'border-slate-300 text-slate-900 hover:bg-slate-900/5'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Resume</span>
                    </button>

                    <button
                      onClick={scrollToArcade}
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                        isNoir
                          ? 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900/70'
                          : 'border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-900/5'
                      }`}
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>Logic Arcade</span>
                    </button>
                  </motion.div>

                  {/* Quiet Contact & Location Line */}
                  <div
                    className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono pt-1 ${
                      isNoir ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <span>{PERSONAL_INFO.shortLocation}</span>
                    <span aria-hidden="true">·</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className={`hover:underline font-medium break-all ${
                        isNoir ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {PERSONAL_INFO.email}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
                      className="hover:underline break-all"
                    >
                      {PERSONAL_INFO.secondaryEmail}
                    </a>
                  </div>
                </div>

                {/* Right Column: Authentic Interactive Terminal Card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 w-full"
                >
                  <TerminalCard
                    onNavigateToProjects={scrollToProjects}
                    onNavigateToSkills={scrollToSkills}
                    onOpenResume={onOpenResume}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Interactive Website Style Switcher Bar */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t ${
            isNoir ? 'border-slate-800/90' : 'border-slate-950/12'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-mono ${
                isNoir ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Website Style:</span>
            </span>

            <div
              className={`inline-flex items-center gap-1 p-1 rounded-full border max-w-full overflow-x-auto no-scrollbar ${
                isNoir
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-slate-950/8 border-slate-950/12'
              }`}
            >
              {themes.map((t) => {
                const active = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      sounds.playClick();
                      onChangeTheme(t.id);
                    }}
                    className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? isNoir
                          ? 'text-slate-950'
                          : 'text-white'
                        : isNoir
                          ? 'text-slate-300 hover:text-white'
                          : 'text-slate-800 hover:text-slate-950'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-theme-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className={`absolute inset-0 rounded-full ${
                          isNoir ? 'bg-white' : 'bg-slate-950'
                        }`}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono">
            <span className={`truncate ${isNoir ? 'text-slate-400' : 'text-slate-700'}`}>
              "{PERSONAL_INFO.coreTenet}"
            </span>
            <button
              onClick={toggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer whitespace-nowrap shrink-0 ${
                isNoir
                  ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'border-slate-950/15 text-slate-800 hover:bg-slate-950/5'
              }`}
              aria-label={soundOn ? 'Mute UI sounds' : 'Enable UI sounds'}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundOn ? 'Sound On' : 'Muted'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingOrganicShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      <motion.div
        animate={{
          y: [0, -22, 10, 0],
          x: [0, -12, 8, 0],
          rotate: [0, 5, -4, 0],
          scale: [1, 1.03, 0.98, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-24 sm:-right-12 lg:right-4 top-20 sm:top-20 w-[260px] sm:w-[370px] lg:w-[440px] opacity-80 lg:opacity-85"
      >
        <svg viewBox="0 0 420 400" fill="none" className="w-full h-auto">
          <defs>
            <linearGradient id="metaball-grad" x1="12%" y1="78%" x2="88%" y2="18%">
              <stop offset="0%" stopColor="#ef5f67" />
              <stop offset="48%" stopColor="#f2a7b5" />
              <stop offset="78%" stopColor="#f3e5bc" />
              <stop offset="100%" stopColor="#e597c6" />
            </linearGradient>
          </defs>
          <path
            d="M236 36C272 36 298 63 298 98C298 128 282 150 288 175C294 201 325 212 355 224C390 238 408 273 398 310C388 347 350 370 312 359C279 349 266 318 242 296C218 274 196 254 166 259C136 264 114 292 79 286C42 280 16 247 21 209C26 172 60 147 97 151C128 154 152 173 178 159C204 145 191 112 194 81C197 53 213 36 236 36Z"
            fill="url(#metaball-grad)"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 18, -14, 0],
          x: [0, 14, -8, 0],
          rotate: [0, -10, 8, 0],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden sm:block absolute right-24 lg:right-[36%] bottom-20 lg:bottom-24 w-20 h-20 lg:w-24 lg:h-24 opacity-80"
      >
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="orb-lavender-cream" x1="15%" y1="20%" x2="88%" y2="85%">
              <stop offset="0%" stopColor="#8b7ae8" />
              <stop offset="55%" stopColor="#c4a7e7" />
              <stop offset="100%" stopColor="#f5e2c4" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#orb-lavender-cream)" />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -16, 12, 0],
          x: [0, 8, -4, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden md:block absolute -left-8 top-44 w-20 h-20 opacity-80"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="orb-rose-cream" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#e598b2" />
              <stop offset="100%" stopColor="#f6e7cf" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#orb-rose-cream)" />
        </svg>
      </motion.div>
    </div>
  );
}
