import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { getTranslations } from '../data/translations';
import { useLocale } from '../context/LocaleContext';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const { personalInfo } = getPortfolioData(locale);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0f1524] border border-slate-200/90 dark:border-slate-800/95 rounded-2xl shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200/90 dark:border-slate-800/90 bg-slate-50/90 dark:bg-[#0b0f19]/90">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <h3
                    id="resume-modal-title"
                    className="font-display text-sm font-bold text-slate-900 dark:text-white truncate"
                  >
                    {t.resumeModal.headerTitle}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {t.resumeModal.headerSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={personalInfo.resumeUrl}
                  download="Harsh_Bawankar_Resume.pdf"
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.resumeModal.downloadPdf}</span>
                  <span className="sm:hidden">{t.resumeModal.pdfShort}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onClose();
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label={t.resumeModal.closeAria}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-2.5 border-b border-slate-200/90 dark:border-slate-800/90 bg-slate-100/60 dark:bg-[#0b0f19]/60 text-xs font-mono">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('interactive');
                    sounds.playClick();
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'interactive'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.resumeModal.structuredView}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('pdf');
                    sounds.playClick();
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.resumeModal.pdfPreview}
                </button>
              </div>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>{t.resumeModal.openPdf}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1">
              {viewMode === 'interactive' ? (
                <div className="max-w-3xl mx-auto space-y-7 text-slate-800 dark:text-slate-200">
                  {/* Resume Header */}
                  <div className="text-center pb-6 border-b border-slate-200/90 dark:border-slate-800 space-y-2">
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {t.resumeModal.displayName}
                    </h1>
                    <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                      {t.resumeModal.roleSubtitle}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                      <span>{t.resumeModal.location}</span>
                      <span aria-hidden="true">·</span>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="hover:underline text-slate-900 dark:text-slate-100 font-semibold break-all"
                      >
                        {personalInfo.email}
                      </a>
                      <span aria-hidden="true">·</span>
                      <a
                        href={`mailto:${personalInfo.secondaryEmail}`}
                        className="hover:underline text-slate-500 dark:text-slate-400 break-all"
                      >
                        {personalInfo.secondaryEmail}
                      </a>
                      <span aria-hidden="true">·</span>
                      <span>{personalInfo.phone}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        GitHub: {personalInfo.githubHandle}
                      </a>
                      <span aria-hidden="true">·</span>
                      <a
                        href={personalInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Instagram: {personalInfo.instagramHandle}
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                      {t.resumeModal.summaryHeading}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {personalInfo.summary}
                    </p>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                      {t.resumeModal.educationHeading}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                          {t.resumeModal.degreeTitle}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {t.resumeModal.universityLine}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-500">{t.resumeModal.period}</span>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                      {t.resumeModal.projectsHeading}
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-[#0b0f19]/70 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                            {t.resumeModal.pdfProjectTitle}{' '}
                            <span className="text-xs font-normal text-slate-500">
                              {t.resumeModal.pdfProjectTag}
                            </span>
                          </h5>
                          <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                            {t.resumeModal.pdfProjectStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {t.resumeModal.pdfProjectDesc}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-[#0b0f19]/70 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                            {t.resumeModal.foodProjectTitle}
                          </h5>
                          <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                            {t.resumeModal.inProgressStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {t.resumeModal.foodProjectDesc}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-[#0b0f19]/70 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                            {t.resumeModal.gameProjectTitle}{' '}
                            <span className="text-xs font-normal text-slate-500">
                              {t.resumeModal.gameProjectTag}
                            </span>
                          </h5>
                          <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                            {t.resumeModal.inProgressStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {t.resumeModal.gameProjectDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Honest Skills & Tools */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                      {t.resumeModal.skillsHeading}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {t.resumeModal.skillBlocks.map((block) => (
                        <div
                          key={block.title}
                          className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-slate-50/50 dark:bg-[#0b0f19]/50"
                        >
                          <span className="font-bold text-slate-900 dark:text-white font-mono">
                            {block.title}
                          </span>
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                            {block.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interests & Goals */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                      {t.resumeModal.interestsHeading}
                    </h4>
                    <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                      {t.resumeModal.interests.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-[55dvh] sm:h-[560px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0b0f19]">
                  <iframe
                    src={`${personalInfo.resumeUrl}#toolbar=0`}
                    className="w-full h-full"
                    title={t.resumeModal.iframeTitle}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-slate-200/90 dark:border-slate-800/90 bg-slate-50/90 dark:bg-[#0b0f19]/90 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400 truncate">
                {t.resumeModal.primaryPrefix} {personalInfo.email}
              </span>
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                {t.resumeModal.done}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
