import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { ShortcutFeedback } from '../hooks/useKeyboardShortcuts';
import { sounds } from '../utils/audio';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  onToggleLocale: () => void;
}

export function ShortcutsModal({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onToggleTheme,
  onToggleLocale,
}: ShortcutsModalProps) {
  const { locale } = useLocale();

  const navShortcuts = [
    { key: 'H', id: 'hero', en: 'Top / Hero', hi: 'शीर्ष / परिचय' },
    { key: 'A', id: 'about', en: 'About & Philosophy', hi: 'परिचय और दर्शन' },
    { key: 'P', id: 'projects', en: 'Projects & Case Studies', hi: 'प्रोजेक्ट्स और केस स्टडी' },
    { key: 'T', id: 'skills', en: 'Toolkit & Foundations', hi: 'टूलकिट और कौशल' },
    { key: 'G', id: 'arcade', en: 'Logic Game Arcade', hi: 'लॉजिक गेम आर्केड' },
    { key: 'J', id: 'journey', en: 'Academic Journey', hi: 'शैक्षणिक सफ़र' },
    { key: 'C', id: 'contact', en: 'Contact & Inquiry', hi: 'संपर्क और संदेश' },
  ];

  const utilityShortcuts = [
    { key: 'R', action: onOpenResume, en: 'Open Resume PDF', hi: 'रिज़्यूमे PDF खोलें' },
    { key: 'M', action: onToggleTheme, en: 'Toggle Dark / Light Mode', hi: 'डार्क / लाइट मोड बदलें' },
    { key: 'L', action: onToggleLocale, en: 'Switch Language (EN / हिं)', hi: 'भाषा बदलें (EN / हिं)' },
    { key: '?', action: onClose, en: 'Toggle Shortcuts Guide', hi: 'शॉर्टकट गाइड खोलें/बंद करें' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white dark:bg-[#0f1524] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3
                  id="shortcuts-modal-title"
                  className="font-display text-sm font-bold text-slate-900 dark:text-white"
                >
                  {locale === 'hi' ? 'कीबोर्ड शॉर्टकट्स' : 'Keyboard Shortcuts'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                aria-label={locale === 'hi' ? 'शॉर्टकट्स बंद करें' : 'Close keyboard shortcuts'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5 text-xs">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  {locale === 'hi' ? 'अनुभाग नेविगेशन' : 'Section Navigation'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {navShortcuts.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        onClose();
                        onNavigate(item.id);
                      }}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-indigo-400/60 text-left transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {locale === 'hi' ? item.hi : item.en}
                      </span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                        {item.key}
                      </kbd>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  {locale === 'hi' ? 'त्वरित क्रियाएँ' : 'Quick Actions'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {utilityShortcuts.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        if (item.key !== '?') onClose();
                        item.action();
                      }}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-indigo-400/60 text-left transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {locale === 'hi' ? item.hi : item.en}
                      </span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                        {item.key}
                      </kbd>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>
                {locale === 'hi'
                  ? 'इनपुट फ़ील्ड में टाइप करते समय शॉर्टकट निष्क्रिय रहते हैं'
                  : 'Shortcuts pause automatically while typing in inputs'}
              </span>
              <span>ESC</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ShortcutToast({ feedback }: { feedback: ShortcutFeedback | null }) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-5 z-40 pointer-events-none flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-lg backdrop-blur-md text-xs font-mono text-slate-800 dark:text-slate-100"
        >
          <kbd className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-300 font-bold text-[11px]">
            {feedback.key}
          </kbd>
          <span className="font-medium">{feedback.label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
