import { motion, AnimatePresence } from 'motion/react';
import { PortfolioTheme } from '../types';

interface ThematicDividerProps {
  theme: PortfolioTheme;
  sectionIndex?: number;
}

export function ThematicDivider({ theme, sectionIndex = 0 }: ThematicDividerProps) {
  const isAlternate = sectionIndex % 2 === 1;

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden select-none py-2 sm:py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 0, scaleX: 0.96 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {theme === 'comic' && <ComicDividerShape alternate={isAlternate} />}
            {theme === 'system' && <SystemDividerShape alternate={isAlternate} />}
            {theme === 'playground' && <PlaygroundDividerShape alternate={isAlternate} />}
            {theme === 'barcelona' && <BarcelonaDividerShape />}
            {theme === 'paper' && <PaperDividerShape />}
            {theme === 'noir' && <NoirDividerShape alternate={isAlternate} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Comic Book / Anime Action Panel Divider:
 * Bold ink sawtooth / jagged action chevron gutter with a multi-point comic burst center.
 */
function ComicDividerShape({ alternate }: { alternate: boolean }) {
  return (
    <div className="relative flex items-center justify-center gap-3 py-1">
      {/* Left jagged ink sawtooth strip */}
      <svg
        viewBox="0 0 360 20"
        preserveAspectRatio="none"
        className="flex-1 h-4 sm:h-5 text-slate-950"
        fill="none"
      >
        <path
          d="M0 10 L18 3 L36 17 L54 3 L72 17 L90 3 L108 17 L126 3 L144 17 L162 3 L180 17 L198 3 L216 17 L234 3 L252 17 L270 3 L288 17 L306 3 L324 17 L342 3 L360 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M0 14 L18 7 L36 20 L54 7 L72 20 L90 7 L108 20"
          stroke="#e11d48"
          strokeWidth="1.4"
          strokeOpacity="0.65"
        />
      </svg>

      {/* Center Comic Action Starburst / Impact Diamond */}
      <div className="relative shrink-0 flex items-center justify-center w-11 h-11">
        <svg viewBox="0 0 48 48" className="w-10 h-10 drop-shadow-[2px_2px_0_#0f172a]">
          {alternate ? (
            <polygon
              points="24,2 30,15 44,10 35,23 46,32 31,34 33,46 22,37 11,45 15,32 2,29 14,20 7,8 20,14"
              fill="#facc15"
              stroke="#0f172a"
              strokeWidth="2.4"
              strokeLinejoin="miter"
            />
          ) : (
            <polygon
              points="24,3 31,17 45,24 31,31 24,45 17,31 3,24 17,17"
              fill="#e11d48"
              stroke="#0f172a"
              strokeWidth="2.4"
              strokeLinejoin="miter"
            />
          )}
          <circle cx="24" cy="24" r="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
        </svg>
      </div>

      {/* Right jagged ink sawtooth strip */}
      <svg
        viewBox="0 0 360 20"
        preserveAspectRatio="none"
        className="flex-1 h-4 sm:h-5 text-slate-950"
        fill="none"
      >
        <path
          d="M0 10 L18 17 L36 3 L54 17 L72 3 L90 17 L108 3 L126 17 L144 3 L162 17 L180 3 L198 17 L216 3 L234 17 L252 3 L270 17 L288 3 L306 17 L324 3 L342 17 L360 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M252 20 L270 7 L288 20 L306 7 L324 20 L342 7 L360 14"
          stroke="#facc15"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}

/**
 * System Window / Isekai Awakening HUD Divider:
 * Chamfered holographic circuit traces converging on a glowing octagonal/hex reticle.
 */
function SystemDividerShape({ alternate }: { alternate: boolean }) {
  return (
    <div className="relative flex items-center justify-center gap-2 sm:gap-3 py-1">
      {/* Left chamfered HUD trace */}
      <svg
        viewBox="0 0 360 24"
        preserveAspectRatio="none"
        className="flex-1 h-6 text-cyan-400"
        fill="none"
      >
        <polyline
          points="0,12 190,12 204,5 296,5 310,12 360,12"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.25"
        />
        <polyline
          points="220,18 286,18 298,12"
          stroke="#38bdf8"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <rect x="306" y="10" width="4" height="4" fill="#22d3ee" />
        <rect x="200" y="3" width="3" height="3" fill="#22d3ee" fillOpacity="0.7" />
      </svg>

      {/* Center Holographic Octagon / Diamond Telemetry Core */}
      <div className="relative shrink-0 flex items-center justify-center w-11 h-10">
        <svg viewBox="0 0 48 40" className="w-11 h-9 drop-shadow-[0_0_8px_rgba(34,211,238,0.45)]" fill="none">
          {alternate ? (
            <>
              {/* Bracketed Hex Core */}
              <polygon
                points="24,3 37,11 37,29 24,37 11,29 11,11"
                stroke="#22d3ee"
                strokeWidth="1.5"
                fill="rgba(8, 51, 68, 0.45)"
              />
              <polygon
                points="24,10 31,15 31,25 24,30 17,25 17,15"
                stroke="#67e8f9"
                strokeWidth="1"
                strokeOpacity="0.75"
              />
              <rect x="22" y="18" width="4" height="4" transform="rotate(45 24 20)" fill="#22d3ee" />
            </>
          ) : (
            <>
              {/* Chamfered System HUD Reticle */}
              <polygon
                points="14,5 34,5 43,20 34,35 14,35 5,20"
                stroke="#22d3ee"
                strokeWidth="1.5"
                fill="rgba(8, 51, 68, 0.45)"
              />
              <polyline points="1,12 1,20 1,28" stroke="#67e8f9" strokeWidth="1.5" />
              <polyline points="47,12 47,20 47,28" stroke="#67e8f9" strokeWidth="1.5" />
              <polygon points="24,13 31,20 24,27 17,20" fill="#22d3ee" fillOpacity="0.85" />
            </>
          )}
        </svg>
      </div>

      {/* Right chamfered HUD trace */}
      <svg
        viewBox="0 0 360 24"
        preserveAspectRatio="none"
        className="flex-1 h-6 text-cyan-400"
        fill="none"
      >
        <polyline
          points="0,12 50,12 64,5 156,5 170,12 360,12"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.25"
        />
        <polyline
          points="62,12 74,18 140,18"
          stroke="#38bdf8"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <rect x="50" y="10" width="4" height="4" fill="#22d3ee" />
        <rect x="155" y="3" width="3" height="3" fill="#22d3ee" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/**
 * Interactive Physics Lab Divider:
 * CAD blueprint ruler calibration ticks with a central vector compass node.
 */
function PlaygroundDividerShape({ alternate }: { alternate: boolean }) {
  return (
    <div className="relative flex items-center justify-center gap-3 py-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/45 to-sky-400/70 relative">
        <div className="hidden sm:flex justify-end gap-4 -top-1 relative pr-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`w-px bg-sky-400/50 ${i % 2 === 0 ? 'h-2' : 'h-1'}`}
            />
          ))}
        </div>
      </div>

      <svg viewBox="0 0 36 28" className="w-8 h-6 shrink-0 text-sky-400" fill="none">
        <circle cx="18" cy="14" r="9" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.25" strokeDasharray="3 2" />
        <circle cx="18" cy="14" r="3" fill={alternate ? '#34d399' : '#38bdf8'} />
        <line x1="2" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.25" />
        <line x1="29" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.25" />
      </svg>

      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-emerald-400/45 to-sky-400/70 relative">
        <div className="hidden sm:flex justify-start gap-4 -top-1 relative pl-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`w-px bg-sky-400/50 ${i % 2 === 0 ? 'h-2' : 'h-1'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Barcelona Mesh Divider:
 * Flowing architectural sine-wave curve with an organic orb center.
 */
function BarcelonaDividerShape() {
  return (
    <div className="relative flex items-center justify-center py-1">
      <svg
        viewBox="0 0 800 24"
        preserveAspectRatio="none"
        className="w-full h-5 text-slate-900/25"
        fill="none"
      >
        <path
          d="M0 12 Q 100 2, 200 12 T 400 12 T 600 12 T 800 12"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="400" cy="12" r="4.5" fill="#9a7ec7" fillOpacity="0.65" stroke="#0f172a" strokeOpacity="0.35" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

/**
 * Clean Light / Editorial Paper Divider:
 * Double editorial rule with a crisp rotated diamond fleuron.
 */
function PaperDividerShape() {
  return (
    <div className="flex items-center justify-center gap-3 py-1.5">
      <div className="flex-1 space-y-1">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-400/70" />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-300/60" />
      </div>
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-slate-700/70" fill="none">
        <polygon points="12,3 21,12 12,21 3,12" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="4" height="4" fill="currentColor" />
      </svg>
      <div className="flex-1 space-y-1">
        <div className="h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-400/70" />
        <div className="h-px bg-gradient-to-l from-transparent via-slate-200 to-slate-300/60" />
      </div>
    </div>
  );
}

/**
 * Developer Dark (Noir) Divider:
 * Subtle indigo-emerald hairline with a minimal geometric prism node.
 */
function NoirDividerShape({ alternate }: { alternate: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 py-1.5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700/80 to-indigo-500/45" />
      <svg viewBox="0 0 28 20" className="w-6 h-4 shrink-0" fill="none">
        <polygon
          points="14,2 25,10 14,18 3,10"
          stroke={alternate ? '#34d399' : '#818cf8'}
          strokeOpacity="0.65"
          strokeWidth="1.4"
        />
        <circle cx="14" cy="10" r="2" fill={alternate ? '#34d399' : '#818cf8'} />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-700/80 to-emerald-500/45" />
    </div>
  );
}
