import { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
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
                Harsh Bawankar — Official Curriculum Vitae
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                Ramdeobaba University · Academic & Project Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Harsh_Bawankar_Resume.pdf"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close resume modal"
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
              Structured View
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
              PDF Preview
            </button>
          </div>

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Open PDF</span>
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
                  HARSH BAWANKAR
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                  B.Tech CSE Student · App & Product Builder
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                  <span>Nagpur, Maharashtra</span>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="hover:underline text-slate-900 dark:text-slate-100 font-semibold break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
                    className="hover:underline text-slate-500 dark:text-slate-400 break-all"
                  >
                    {PERSONAL_INFO.secondaryEmail}
                  </a>
                  <span aria-hidden="true">·</span>
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub: {PERSONAL_INFO.githubHandle}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={PERSONAL_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Instagram: {PERSONAL_INFO.instagramHandle}
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  Summary
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  Education
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      B.Tech, Computer Science & Engineering (1st Year)
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Ramdeobaba University (RBU), Nagpur
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">2026 – Present</span>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  Projects & Client Work
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-[#0b0f19]/70 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        Client Business & PDF App{' '}
                        <span className="text-xs font-normal text-slate-500">
                          (Custom client project)
                        </span>
                      </h5>
                      <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        Shipped
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Customized and delivered an app for a commercial client to streamline PDF stamping, voucher formatting, and day-to-day business paperwork.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-[#0b0f19]/70 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        Food Safety & Quality Inspection App
                      </h5>
                      <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                        In Progress
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Designing and building a digital hygiene checklist and weighted compliance grading workflow, practicing app architecture and feature planning.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-[#0b0f19]/70 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        Logic Game Projects{' '}
                        <span className="text-xs font-normal text-slate-500">
                          (2 playable browser games)
                        </span>
                      </h5>
                      <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                        In Progress
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Built Tactical Tic-Tac-Toe and Binary Number Deduction to sharpen control flow, state transitions, and interactive game loops.
                    </p>
                  </div>
                </div>
              </div>

              {/* Honest Skills & Tools */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  Skills & Tools
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-slate-50/50 dark:bg-[#0b0f19]/50">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      Programming:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      C, Python (learning), Algorithmic Problem Solving
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-slate-50/50 dark:bg-[#0b0f19]/50">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      App Prototyping:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      AI-assisted coding, debugging, research & workflow iteration
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-slate-50/50 dark:bg-[#0b0f19]/50">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      Tools & Exploration:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Git, GitHub, Product UI flows, 3D graphics curiosity
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-slate-50/50 dark:bg-[#0b0f19]/50">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      Mindset & Soft Skills:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Consistency, quick learning, client communication, teamwork
                    </p>
                  </div>
                </div>
              </div>

              {/* Interests & Goals */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  Interests & Goals
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li>
                    • Building practical software products, exploring 3D modelling & graphics, and shipping real tools as I learn.
                  </li>
                  <li>
                    • Entrepreneurship and collaborating with fellow builders across disciplines.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-[55dvh] sm:h-[560px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0b0f19]">
              <iframe
                src={`${PERSONAL_INFO.resumeUrl}#toolbar=0`}
                className="w-full h-full"
                title="Harsh Bawankar Resume PDF Preview"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-slate-200/90 dark:border-slate-800/90 bg-slate-50/90 dark:bg-[#0b0f19]/90 text-xs font-mono">
          <span className="text-slate-500 dark:text-slate-400 truncate">
            Primary: {PERSONAL_INFO.email}
          </span>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
