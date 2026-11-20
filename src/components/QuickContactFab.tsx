import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Send, Check, Copy, Sparkles } from 'lucide-react';
import { PortfolioTheme } from '../types';
import { useLocale } from '../context/LocaleContext';
import { getTranslations } from '../data/translations';
import { getPortfolioData } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface QuickContactFabProps {
  theme: PortfolioTheme;
}

export function QuickContactFab({ theme }: QuickContactFabProps) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const qc = t.quickContact;
  const { personalInfo } = getPortfolioData(locale);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 140);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const handleToggle = () => {
    sounds.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    sounds.playSuccess();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    sounds.playSuccess();
    setSubmitted(true);

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `${qc.defaultSubjectPrefix} ${name.trim()}`
    )}&body=${encodeURIComponent(
      `From: ${name.trim()} (${email.trim()})\n\n${message.trim()}`
    )}`;

    window.setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 350);
  };

  const isComic = theme === 'comic';
  const isSystem = theme === 'system';
  const isPlayground = theme === 'playground';
  const isBarcelona = theme === 'barcelona';
  const isNoir = theme === 'noir';

  const headerTitle = isComic
    ? qc.comicTitle
    : isSystem
      ? qc.systemTitle
      : isPlayground
        ? qc.playgroundTitle
        : qc.title;

  // Theme-aware FAB styling
  const fabClass = isComic
    ? 'rounded-xl bg-rose-600 hover:bg-rose-500 text-white border-[2.5px] border-slate-950 shadow-[4px_4px_0_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none'
    : isSystem
      ? 'rounded-xl bg-[#040d1f]/95 hover:bg-cyan-950 text-cyan-300 border border-cyan-400/70 shadow-[0_0_24px_-4px_rgba(34,211,238,0.65)] backdrop-blur-md'
      : isPlayground
        ? 'rounded-2xl bg-sky-400 hover:bg-sky-300 text-slate-950 border-2 border-sky-200/80 shadow-[0_12px_28px_-6px_rgba(56,189,248,0.6)]'
        : isBarcelona
          ? 'rounded-full bg-slate-950 hover:bg-slate-800 text-white border border-white/30 shadow-xl'
          : isNoir
            ? 'rounded-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/40 shadow-[0_12px_28px_-6px_rgba(99,102,241,0.55)]'
            : 'rounded-full bg-slate-950 hover:bg-slate-800 text-white border border-slate-800 shadow-xl';

  // Theme-aware Popup Window styling
  const popupSurfaceClass = isComic
    ? 'rounded-2xl bg-white text-slate-950 border-[2.5px] border-slate-950 shadow-[6px_6px_0_#0f172a]'
    : isSystem
      ? 'rounded-2xl bg-[#040d1f]/95 text-cyan-50 system-window-frame backdrop-blur-xl'
      : isPlayground
        ? 'rounded-2xl bg-[#0b1528]/95 text-slate-100 border border-sky-400/35 shadow-2xl backdrop-blur-xl'
        : isBarcelona
          ? 'rounded-2xl bg-gradient-to-br from-[#faf5fc]/95 via-[#f4eef8]/95 to-[#f9ede6]/95 text-slate-950 border border-slate-900/15 shadow-2xl backdrop-blur-xl'
          : isNoir
            ? 'rounded-2xl bg-[#0d1322]/95 text-slate-100 border border-slate-700/80 shadow-2xl backdrop-blur-xl'
            : 'rounded-2xl bg-[#faf7f2]/98 text-slate-900 border border-slate-200 shadow-2xl backdrop-blur-xl';

  const popupHeaderClass = isComic
    ? 'bg-amber-300 border-b-2 border-slate-950 text-slate-950'
    : isSystem
      ? 'bg-cyan-950/40 border-b border-cyan-400/25 text-cyan-300'
      : isPlayground
        ? 'bg-[#070f1e]/95 border-b border-sky-400/20 text-sky-200'
        : isBarcelona
          ? 'bg-white/50 border-b border-slate-900/10 text-slate-950'
          : isNoir
            ? 'bg-slate-900/90 border-b border-slate-800 text-white'
            : 'bg-slate-100/80 border-b border-slate-200 text-slate-900';

  const inputClass = isComic
    ? 'w-full px-3 py-2 rounded-lg border-2 border-slate-950 bg-[#fbf7ec] text-slate-950 placeholder:text-slate-500 text-xs outline-none focus:bg-white'
    : isSystem
      ? 'w-full px-3 py-2 rounded-lg border border-cyan-400/30 bg-[#030916]/90 text-cyan-50 placeholder:text-cyan-400/45 text-xs outline-none focus:border-cyan-300'
      : isPlayground
        ? 'w-full px-3 py-2 rounded-lg border border-sky-400/25 bg-[#09111f] text-slate-100 placeholder:text-slate-500 text-xs outline-none focus:border-sky-400'
        : isBarcelona
          ? 'w-full px-3 py-2 rounded-lg border border-slate-900/15 bg-white/80 text-slate-950 placeholder:text-slate-400 text-xs outline-none focus:border-slate-900'
          : isNoir
            ? 'w-full px-3 py-2 rounded-lg border border-slate-700/90 bg-[#0b0f19] text-white placeholder:text-slate-500 text-xs outline-none focus:border-indigo-500'
            : 'w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs outline-none focus:border-slate-900';

  const submitBtnClass = isComic
    ? 'w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold border-2 border-slate-950 shadow-[3px_3px_0_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none'
    : isSystem
      ? 'w-full py-2.5 px-4 rounded-xl border border-cyan-300/70 bg-cyan-400/15 hover:bg-cyan-400 hover:text-slate-950 text-cyan-100 font-bold tracking-wider shadow-[0_0_16px_-4px_rgba(34,211,238,0.45)]'
      : isPlayground
        ? 'w-full py-2.5 px-4 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold'
        : isBarcelona || !isNoir
          ? 'w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold'
          : 'w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold';

  const closeBtnClass = isComic
    ? 'p-1 rounded-lg hover:bg-amber-400/70 text-slate-950 cursor-pointer'
    : isSystem
      ? 'p-1 rounded-lg hover:bg-cyan-400/15 text-cyan-300 cursor-pointer'
      : isPlayground || isNoir
        ? 'p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer'
        : 'p-1 rounded-lg hover:bg-slate-900/10 text-slate-600 hover:text-slate-950 cursor-pointer';

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Theme-Aware Quick Email Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="false"
            aria-labelledby="quick-contact-title"
            className={`relative mb-3 w-[calc(100vw-2.5rem)] max-w-[356px] overflow-hidden origin-bottom-right ${popupSurfaceClass}`}
          >
            {/* System Window Corner Reticles */}
            {isSystem && (
              <>
                <span className="pointer-events-none absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-300 rounded-tl-sm z-10" aria-hidden="true" />
                <span className="pointer-events-none absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-300 rounded-tr-sm z-10" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-300 rounded-bl-sm z-10" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-300 rounded-br-sm z-10" aria-hidden="true" />
              </>
            )}

            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between gap-2 ${popupHeaderClass}`}>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  {isSystem ? (
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-cyan-300" />
                  ) : (
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <h3
                    id="quick-contact-title"
                    className={`text-xs truncate ${
                      isComic || isSystem || isPlayground ? 'font-mono font-extrabold tracking-wider' : 'font-display font-bold text-sm'
                    }`}
                  >
                    {headerTitle}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsOpen(false);
                }}
                className={closeBtnClass}
                aria-label={qc.fabAriaClose}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 text-xs">
              {/* Direct Target Line + Quick Copy */}
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="truncate opacity-80">
                  {qc.subtitle} <strong className="opacity-100">{personalInfo.email}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={qc.copyEmailAria}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold shrink-0 cursor-pointer transition-colors ${
                    isComic
                      ? 'border-slate-950 bg-amber-100 hover:bg-amber-200 text-slate-950'
                      : isSystem
                        ? 'border-cyan-400/35 bg-cyan-950/50 hover:border-cyan-300 text-cyan-200'
                        : isPlayground
                          ? 'border-sky-400/30 bg-slate-900 hover:border-sky-400 text-sky-200'
                          : isNoir
                            ? 'border-slate-700 bg-slate-800 hover:border-slate-600 text-slate-200'
                            : 'border-slate-300 bg-white/80 hover:bg-white text-slate-800'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>{qc.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t.contact.copy}</span>
                    </>
                  )}
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl text-center space-y-2.5 border ${
                    isComic
                      ? 'bg-emerald-100 border-2 border-slate-950 text-slate-950'
                      : isSystem
                        ? 'bg-cyan-950/35 border-cyan-400/40 text-cyan-100'
                        : isPlayground || isNoir
                          ? 'bg-emerald-950/40 border-emerald-500/35 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-xs">{qc.sentTitle}</p>
                  <p className="text-[11px] opacity-85 leading-relaxed">{qc.sentSubtitle}</p>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg cursor-pointer transition-transform active:scale-95 ${
                      isComic
                        ? 'bg-slate-950 text-white'
                        : isSystem
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {qc.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <input
                    ref={nameInputRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={qc.namePlaceholder}
                    aria-label={qc.namePlaceholder}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={qc.emailPlaceholder}
                    aria-label={qc.emailPlaceholder}
                    className={inputClass}
                  />
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={qc.messagePlaceholder}
                    aria-label={qc.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                  <button
                    type="submit"
                    className={`text-xs font-mono flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${submitBtnClass}`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{qc.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme-Aware Floating Action Button */}
      <motion.button
        type="button"
        onClick={handleToggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-expanded={isOpen}
        aria-label={isOpen ? qc.fabAriaClose : qc.fabAriaOpen}
        title={isOpen ? qc.fabAriaClose : qc.title}
        className={`relative w-13 h-13 flex items-center justify-center transition-all cursor-pointer ${fabClass}`}
      >
        {isComic && !isOpen && (
          <span
            aria-hidden="true"
            className="absolute -top-2 -left-2 px-1.5 py-0.5 text-[9px] font-mono font-extrabold bg-amber-300 text-slate-950 border-2 border-slate-950 rounded-md -rotate-6 select-none"
          >
            MSG!
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="mail-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Mail className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
