import { useState } from 'react';
import { X, Award, CheckCircle, FileCode, ExternalLink, HelpCircle, Laptop, Download } from 'lucide-react';
import { AUDITION_PREPARATION, PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface AuditionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditionDrawer({ isOpen, onClose }: AuditionDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'rubric'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Technical Club Recruitment 2026 — Audition Deck
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Domain 02: Web Development · First-Year Candidate Mode
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close audition guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/30 text-xs font-mono">
          <button
            onClick={() => {
              setActiveTab('overview');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Task & Solution Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('qa');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'qa'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Audition Q&A Prep
          </button>
          <button
            onClick={() => {
              setActiveTab('rubric');
              sounds.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rubric'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Recruitment Criteria Check
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 font-mono text-xs uppercase">
                  Audition Strategy & Task Synthesis
                </span>
                <p className="leading-relaxed">
                  Instead of merely choosing a single minimal option, this submission harmonizes:
                </p>
                <ul className="space-y-1.5 list-disc list-inside text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <li><strong>Task 1 (Personal Portfolio):</strong> Introducing background, education at RBU, shipped client projects, and contact avenues.</li>
                  <li><strong>Task 2 (Mini Games Website):</strong> Integrated playable browser games (Tic-Tac-Toe & Number Deduction Logic) with win state detection and restarts.</li>
                  <li><strong>Task 3 (Gamified Experience):</strong> Level achievements, milestone badges, and interactive terminal interface.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm font-mono uppercase">
                  Demonstration Checklist on Laptop
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs block">1. Live Interactive Demo</span>
                    <p className="text-xs text-slate-500">Run through the project modal simulations and play one round of Tic-Tac-Toe / Number Guess.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs block">2. Explain Client Solution</span>
                    <p className="text-xs text-slate-500">Walk through client requirements, how the PDF app was scoped, and why user empathy mattered.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs block">3. Code Walkthrough</span>
                    <p className="text-xs text-slate-500">Show DOM event listeners, state updates, responsive Grid/Flex, and clean modular files.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white text-xs block">4. Debug Readiness</span>
                    <p className="text-xs text-slate-500">Be prepared to modify small CSS rules or logic handlers live if requested by interviewers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4">
              {AUDITION_PREPARATION.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400">
                    <span className="font-bold">{item.topic}</span>
                    <span>Q#{idx + 1}</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    "{item.question}"
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {item.keyAnswer}
                  </p>
                  <ul className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1">
                    {item.technicalDetails.map((td, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{td}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs">
                Evaluator Guideline: "A simple, well-executed project is better than an incomplete, complicated one. Don't just demonstrate what you know. Demonstrate what you can engineer."
              </div>

              <div className="space-y-2 font-mono text-xs">
                {[
                  { check: 'Semantic Structure (HTML5)', status: 'Verified', notes: 'Proper header, main, nav, section, article semantics' },
                  { check: 'Responsive Layouts (CSS3)', status: 'Verified', notes: 'Mobile-first fluid Grid and Flexbox across all viewports' },
                  { check: 'Interactive Game Functionality', status: 'Verified', notes: 'Playable games with restart, score state, and audio feedback' },
                  { check: 'Real Project Substance', status: 'Verified', notes: 'Actual client app delivered + food safety app in progress' },
                  { check: 'Dark / Light Theme Memory', status: 'Verified', notes: 'LocalStorage persistence with smooth transitions' },
                  { check: 'WCAG AA Accessibility', status: 'Verified', notes: 'High contrast text, focus rings, reduced motion support' },
                ].map((crit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white font-sans text-xs">{crit.check}</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5">{crit.notes}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ {crit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-xs font-mono">
          <span className="text-slate-500">Harsh Bawankar · RBU Nagpur</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer"
          >
            Close Deck
          </button>
        </div>
      </div>
    </div>
  );
}
