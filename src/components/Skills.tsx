import { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Layout, Zap, Terminal, FileCode, GitBranch, Sparkles, Box, CheckCircle, Cpu, Users, X } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: string;
    experience: string;
    details: string;
  } | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return Code;
      case 'layout':
        return Layout;
      case 'zap':
        return Zap;
      case 'terminal':
        return Terminal;
      case 'file-code':
        return FileCode;
      case 'git-branch':
        return GitBranch;
      case 'sparkles':
        return Sparkles;
      case 'box':
        return Box;
      case 'check-circle':
        return CheckCircle;
      case 'cpu':
        return Cpu;
      case 'users':
        return Users;
      default:
        return Code;
    }
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 md:py-28 border-b border-slate-200/80 dark:border-slate-800/90 bg-white/40 dark:bg-slate-900/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smooth Fade-In Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 max-w-3xl mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">03</span>
            <span aria-hidden="true">/</span>
            <span>Capabilities &amp; Foundations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Learning the craft. <span className="text-slate-500 dark:text-slate-400 font-normal">Deepening foundations.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            What I practice and build with today. Tap any capability row to see how I apply it across real projects.
          </p>
        </motion.div>

        {/* 4-Column Skill Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.number}
              className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 card-glow hover:border-indigo-400/60 dark:hover:border-indigo-400/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {category.number} — {category.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2.5">
                  {category.skills.map((skill) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setSelectedSkill(skill);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:border-indigo-400/70 dark:hover:border-indigo-500/60 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug line-clamp-2">
                          {skill.experience}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Hands-on practice</span>
                <span className="text-indigo-500 dark:text-indigo-400">Inspect ↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Curiosity Strip */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/85 dark:bg-slate-900/75 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Active Horizons:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-300">
            <span>3D Modelling &amp; Graphics</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Interactive Game Logic</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Product Entrepreneurship</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Maker Collaboration</span>
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#0f1524] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {selectedSkill.name}
                </h3>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  {selectedSkill.level}
                </span>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedSkill(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Close skill detail"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400 font-mono text-[11px] block">
                  Focus Area
                </span>
                <p className="mt-1 leading-relaxed">{selectedSkill.experience}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-500 dark:text-slate-400 font-mono text-[11px] block">
                  How I Apply It
                </span>
                <p className="mt-1 leading-relaxed">{selectedSkill.details}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedSkill(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
