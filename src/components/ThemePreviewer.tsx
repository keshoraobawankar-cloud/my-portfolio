import { motion, AnimatePresence } from 'motion/react';
import { Eye } from 'lucide-react';
import { Locale, PortfolioTheme } from '../types';
import { getTranslations } from '../data/translations';
import { sounds } from '../utils/audio';

interface ThemePreviewerProps {
  isOpen: boolean;
  currentTheme: PortfolioTheme;
  previewTheme: PortfolioTheme;
  locale: Locale;
  onHoverTheme: (theme: PortfolioTheme | null) => void;
  onSelectTheme: (theme: PortfolioTheme) => void;
}

const THEME_SWATCHES: Array<{
  id: PortfolioTheme;
  dotClass: string;
}> = [
  { id: 'noir', dotClass: 'bg-[#0b0f19] border-indigo-400/70' },
  { id: 'barcelona', dotClass: 'bg-gradient-to-br from-[#eca67c] to-[#9a7ec7] border-slate-900/40' },
  { id: 'paper', dotClass: 'bg-[#faf7f2] border-slate-400' },
  { id: 'comic', dotClass: 'bg-[#facc15] border-slate-950' },
  { id: 'playground', dotClass: 'bg-[#09111f] border-sky-400' },
  { id: 'system', dotClass: 'bg-[#030916] border-cyan-400' },
];

export function ThemePreviewer({
  isOpen,
  currentTheme,
  previewTheme,
  locale,
  onHoverTheme,
  onSelectTheme,
}: ThemePreviewerProps) {
  const t = getTranslations(locale);
  const isDarkSurface =
    currentTheme === 'noir' || currentTheme === 'playground' || currentTheme === 'system';
  const isComicSurface = currentTheme === 'comic';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label={`${t.nav.themePreviewer.title}: ${t.hero.themes[previewTheme]}`}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block absolute right-0 top-full pt-2 z-50 w-[264px] origin-top-right"
        >
          <div
            className={`rounded-2xl p-2.5 shadow-2xl backdrop-blur-md transition-colors ${
              isDarkSurface
                ? 'bg-[#0f1628]/95 border border-slate-700/90 text-slate-100'
                : isComicSurface
                  ? 'bg-[#fbf7ec] border-2 border-slate-950 shadow-[5px_5px_0_#0f172a] text-slate-950'
                  : 'bg-white/95 border border-slate-200/95 text-slate-900'
            }`}
          >
            {/* Top Meta Row */}
            <div className="flex items-center justify-between gap-2 px-1 pb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Eye
                  className={`w-3 h-3 shrink-0 ${
                    isDarkSurface ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider truncate">
                  {t.nav.themePreviewer.title}
                </span>
              </div>

              <span
                className={`font-mono text-[9px] px-1.5 py-0.5 rounded border shrink-0 ${
                  isDarkSurface
                    ? 'border-slate-700 bg-slate-800/80 text-slate-300'
                    : isComicSurface
                      ? 'border-slate-950 bg-amber-300 text-slate-950 font-bold'
                      : 'border-slate-200 bg-slate-100 text-slate-600'
                }`}
              >
                {t.nav.themePreviewer.shortcutHint}
              </span>
            </div>

            {/* Miniature Live Snapshot Frame */}
            <div className="relative rounded-xl overflow-hidden border border-slate-900/15 dark:border-white/10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={previewTheme}
                  initial={{ opacity: 0.45 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.45 }}
                  transition={{ duration: 0.2 }}
                >
                  <MiniPortfolioSnapshot theme={previewTheme} locale={locale} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Target Label & 6-Theme Quick Swatches */}
            <div className="pt-2 px-1 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-bold leading-tight truncate">
                  {t.hero.themes[previewTheme]}
                </div>
                <div
                  className={`text-[9px] font-mono leading-tight truncate ${
                    isDarkSurface ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {previewTheme === currentTheme
                    ? t.nav.themePreviewer.activeTag
                    : t.nav.themePreviewer.nextHint}
                </div>
              </div>

              <div
                className="flex items-center gap-1 shrink-0"
                onMouseLeave={() => onHoverTheme(null)}
              >
                {THEME_SWATCHES.map((swatch) => {
                  const isPreviewed = previewTheme === swatch.id;
                  const isActive = currentTheme === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onMouseEnter={() => onHoverTheme(swatch.id)}
                      onFocus={() => onHoverTheme(swatch.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        onSelectTheme(swatch.id);
                      }}
                      title={t.hero.themes[swatch.id]}
                      aria-label={t.hero.themes[swatch.id]}
                      className={`w-3.5 h-3.5 rounded-sm border transition-transform cursor-pointer ${swatch.dotClass} ${
                        isPreviewed
                          ? 'scale-125 ring-2 ring-indigo-500/80 ring-offset-1 ring-offset-transparent'
                          : isActive
                            ? 'ring-1 ring-emerald-400'
                            : 'opacity-80 hover:opacity-100 hover:scale-110'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MiniPortfolioSnapshot({
  theme,
  locale,
}: {
  theme: PortfolioTheme;
  locale: Locale;
}) {
  const isNoir = theme === 'noir';
  const isBarcelona = theme === 'barcelona';
  const isPaper = theme === 'paper';
  const isComic = theme === 'comic';
  const isPlayground = theme === 'playground';
  const isSystem = theme === 'system';
  const isDark = isNoir || isPlayground || isSystem;

  const surfaceClass = isNoir
    ? 'noir-hero-surface text-white'
    : isBarcelona
      ? 'barcelona-hero-surface text-slate-950'
      : isComic
        ? 'comic-hero-surface text-slate-950'
        : isPlayground
          ? 'playground-hero-surface text-white'
          : isSystem
            ? 'system-hero-surface text-cyan-50'
            : 'paper-hero-surface text-slate-950';

  return (
    <div
      className={`relative h-[132px] w-full p-2.5 flex flex-col justify-between overflow-hidden select-none ${surfaceClass}`}
    >
      {/* Subtle Theme Background Accents */}
      {isNoir && (
        <div
          className="absolute -right-4 top-3 w-14 h-14 rounded-full bg-gradient-to-br from-[#ef5f67] via-[#f2a7b5] to-[#f3e5bc] opacity-60 blur-[1px]"
          aria-hidden="true"
        />
      )}
      {isComic && (
        <div
          className="absolute inset-0 comic-speedlines opacity-75 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Mini Navbar Strip */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-1.5 border-b border-current/10">
        <span
          className={`text-[8px] font-extrabold tracking-tight ${
            isPlayground || isSystem ? 'font-mono' : 'font-display'
          }`}
        >
          {locale === 'hi' ? 'ह.बा.' : 'HB.'}
        </span>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-1 rounded-full bg-current/25" />
          <span className="w-2.5 h-1 rounded-full bg-current/25" />
          <span
            className={`w-4 h-1.5 rounded-full ${
              isComic
                ? 'bg-rose-600'
                : isSystem
                  ? 'bg-cyan-400'
                  : isPlayground
                    ? 'bg-sky-400'
                    : isDark
                      ? 'bg-white'
                      : 'bg-slate-950'
            }`}
          />
        </div>
      </div>

      {/* Mini Hero Layout Preview */}
      {isBarcelona ? (
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center gap-1.5 py-1">
          <div className="font-display font-extrabold text-[15px] leading-none tracking-[0.06em] text-white/95 truncate max-w-full">
            {locale === 'hi' ? 'हर्ष बावनकर' : 'HARSH BAWANKAR'}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-10 h-1 rounded-full bg-slate-950/60" />
            <span className="w-6 h-1 rounded-full bg-slate-950/40" />
          </div>
          <div className="w-28 h-9 rounded-md bg-slate-950/90 border border-slate-800 p-1.5 flex flex-col justify-between shadow-sm">
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              <span className="w-1 h-1 rounded-full bg-amber-300" />
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <div className="w-14 h-0.5 bg-indigo-300/80 rounded" />
              <div className="w-20 h-0.5 bg-slate-400/60 rounded" />
            </div>
          </div>
        </div>
      ) : isComic ? (
        <div className="relative z-10 flex-1 grid grid-cols-12 gap-1.5 items-center py-1">
          <div className="col-span-7 bg-white border-[1.5px] border-slate-950 shadow-[2px_2px_0_#0f172a] rounded-md p-1.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-1 py-0.2 bg-rose-600 text-white text-[6px] font-mono font-bold border border-slate-950">
                #01
              </span>
              <span className="px-1 bg-amber-300 text-slate-950 text-[6px] font-extrabold border border-slate-950 -rotate-3">
                BUILD!
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-xs" />
            <div className="w-3/4 h-1.5 bg-rose-600 rounded-xs" />
            <div className="w-8 h-2 bg-rose-600 border border-slate-950 rounded-xs" />
          </div>
          <div className="col-span-5 space-y-1">
            <div className="h-4 bg-amber-300 border-[1.5px] border-slate-950 shadow-[2px_2px_0_#0f172a] rounded-md flex items-center px-1 gap-1">
              <span className="w-2 h-2 rounded-xs bg-rose-600 border border-slate-950" />
              <span className="w-7 h-1 bg-slate-950 rounded-xs" />
            </div>
            <div className="h-9 bg-slate-950 border-[1.5px] border-slate-950 shadow-[2px_2px_0_#0f172a] rounded-md p-1 space-y-1">
              <span className="block w-8 h-0.5 bg-amber-300" />
              <span className="block w-11 h-0.5 bg-slate-400" />
            </div>
          </div>
        </div>
      ) : isPlayground ? (
        <div className="relative z-10 flex-1 grid grid-cols-12 gap-1.5 items-center py-1">
          <div className="col-span-5 space-y-1">
            <div className="w-full h-1.5 bg-white rounded-xs" />
            <div className="w-4/5 h-1.5 bg-sky-300 rounded-xs" />
            <div className="w-9 h-2 bg-sky-400 rounded-full" />
          </div>
          <div className="col-span-7 h-14 rounded-lg border border-sky-400/35 bg-slate-900/80 p-1.5 relative overflow-hidden">
            <div className="w-4 h-4 rounded-full bg-sky-400/25 border border-sky-300 flex items-center justify-center text-[6px] font-mono text-sky-200 mx-auto">
              HB
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-1">
              <span className="px-1 py-0.5 rounded bg-sky-500/20 border border-sky-400/40 text-[6px] font-mono text-sky-200">
                C
              </span>
              <span className="px-1 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[6px] font-mono text-emerald-200">
                PY
              </span>
              <span className="px-1 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[6px] font-mono text-amber-200">
                UI
              </span>
            </div>
          </div>
        </div>
      ) : isSystem ? (
        <div className="relative z-10 flex-1 grid grid-cols-12 gap-1.5 items-center py-1">
          <div className="col-span-5 space-y-1">
            <span className="block text-[6px] font-mono text-cyan-300">LV.01</span>
            <div className="w-full h-1.5 bg-white rounded-xs" />
            <div className="w-4/5 h-1.5 bg-cyan-300 rounded-xs" />
            <div className="w-9 h-2 bg-cyan-400 rounded-xs shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          </div>
          <div className="col-span-7 h-14 rounded-md system-window-frame bg-slate-950/90 p-1.5 space-y-1">
            <div className="flex justify-between text-[6px] font-mono text-cyan-300">
              <span>STATUS</span>
              <span>SYS</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-cyan-950 rounded overflow-hidden">
                <div className="h-full w-4/5 bg-cyan-400" />
              </div>
              <div className="h-1 w-full bg-cyan-950 rounded overflow-hidden">
                <div className="h-full w-3/4 bg-sky-400" />
              </div>
              <div className="h-1 w-full bg-cyan-950 rounded overflow-hidden">
                <div className="h-full w-5/6 bg-cyan-300" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Noir & Clean Paper Hero Preview */
        <div className="relative z-10 flex-1 grid grid-cols-12 gap-2 items-center py-1">
          <div className="col-span-7 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e62e42] to-[#9f1239] flex items-center justify-center text-[7px] font-bold text-white shadow-sm">
              HB
            </div>
            <div className="space-y-1">
              <div
                className={`w-full h-1.5 rounded-xs ${
                  isPaper ? 'bg-slate-900' : 'bg-white'
                }`}
              />
              <div
                className={`w-4/5 h-1.5 rounded-xs ${
                  isPaper ? 'bg-slate-600' : 'bg-indigo-200'
                }`}
              />
            </div>
            <div className="flex gap-1">
              <span
                className={`w-8 h-2 rounded-full ${
                  isPaper ? 'bg-slate-950' : 'bg-white'
                }`}
              />
              <span
                className={`w-6 h-2 rounded-full border ${
                  isPaper ? 'border-slate-300' : 'border-slate-700'
                }`}
              />
            </div>
          </div>

          <div
            className={`col-span-5 h-14 rounded-lg border p-1.5 flex flex-col justify-between ${
              isPaper
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-slate-950/90 border-slate-800 shadow-md'
            }`}
          >
            <div className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              <span className="w-1 h-1 rounded-full bg-amber-300" />
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-1">
              <div
                className={`w-10 h-0.5 rounded ${
                  isPaper ? 'bg-indigo-500/70' : 'bg-indigo-400'
                }`}
              />
              <div
                className={`w-full h-0.5 rounded ${
                  isPaper ? 'bg-slate-300' : 'bg-slate-700'
                }`}
              />
              <div
                className={`w-4/5 h-0.5 rounded ${
                  isPaper ? 'bg-slate-200' : 'bg-slate-800'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mini Thematic Divider + Bento Row Preview */}
      <div className="relative z-10 pt-1 flex items-center gap-1.5">
        <div
          className={`flex-1 h-3 rounded-xs border ${
            isComic
              ? 'bg-white border-slate-950 shadow-[1.5px_1.5px_0_#0f172a]'
              : isSystem
                ? 'bg-cyan-950/50 border-cyan-400/40'
                : isDark
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white/90 border-slate-200/90'
          }`}
        />
        <div
          className={`flex-1 h-3 rounded-xs border ${
            isComic
              ? 'bg-amber-300 border-slate-950 shadow-[1.5px_1.5px_0_#0f172a]'
              : isSystem
                ? 'bg-cyan-950/50 border-cyan-400/40'
                : isDark
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white/90 border-slate-200/90'
          }`}
        />
      </div>
    </div>
  );
}
