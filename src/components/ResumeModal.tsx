import { useState } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2, GraduationCap, Briefcase, Code } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Harsh Bawankar — Official Curriculum Vitae
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Ramdeobaba University · Updated Academic & Project Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Harsh_Bawankar_Resume.pdf"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
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
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/30 text-xs font-mono">
          <div className="flex items-center gap-1">
            <button
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
              Structured Resume View
            </button>
            <button
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
              Raw PDF Embed
            </button>
          </div>

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Open PDF file</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {viewMode === 'interactive' ? (
            <div className="max-w-3xl mx-auto space-y-8 text-slate-800 dark:text-slate-200">
              {/* Resume Header */}
              <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  HARSH BAWANKAR
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                  B.Tech CSE Student · Aspiring Web Developer
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                  <span>Nagpur, Maharashtra</span>
                  <span aria-hidden="true">·</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-slate-700 dark:text-slate-300">
                    {PERSONAL_INFO.email}
                  </a>
                  <span aria-hidden="true">·</span>
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 pt-1">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub: {PERSONAL_INFO.githubHandle}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Instagram: {PERSONAL_INFO.instagramHandle}
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
                  Education
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      B.Tech, Computer Science & Engineering (1st Year)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Ramdeobaba University (RBU), Nagpur
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">2026 – Present</span>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
                  Projects
                </h3>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Client Business & PDF App <span className="text-xs font-normal text-slate-500">(Custom client project)</span>
                    </h4>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Delivered</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                    Customized an app for a client to support PDF handling and day-to-day business use, working from the client's specifications.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Food Safety App <span className="text-xs font-normal text-slate-500">(In progress)</span>
                    </h4>
                    <span className="text-xs font-mono text-indigo-500 font-semibold">Building</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                    Designing and building an app around food safety, practicing app structure, UI flow, and feature planning.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Game Projects <span className="text-xs font-normal text-slate-500">(2 games, in progress)</span>
                    </h4>
                    <span className="text-xs font-mono text-cyan-500 font-semibold">In Progress</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                    Started two games to learn logic, user interaction, state machines, and iterating on ideas.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
                  Skills & Tools
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">Web Technologies:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">HTML, CSS, Responsive Layouts, DOM</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">Programming:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">C, Python (learning)</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">Tools:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">GitHub, AI tools for coding, debugging, research & content</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">Soft Skills:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">Consistency, quick learning, communication, teamwork</p>
                  </div>
                </div>
              </div>

              {/* Interests & Goals */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1">
                  Interests & Goals
                </h3>
                <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• Web development, 3D modelling and graphics; building ideas into real products.</li>
                  <li>• Entrepreneurship and learning across domains by collaborating with peers.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-[600px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
              <iframe
                src={`${PERSONAL_INFO.resumeUrl}#toolbar=0`}
                className="w-full h-full"
                title="Harsh Bawankar Resume PDF Preview"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-xs font-mono">
          <span className="text-slate-500">Official resume document (PDF)</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
