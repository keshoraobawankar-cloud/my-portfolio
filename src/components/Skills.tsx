import { useState } from 'react';
import { Code, Layout, Zap, Terminal, FileCode, GitBranch, Sparkles, Box, CheckCircle, Cpu, Users, Info } from 'lucide-react';
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
    <section id="skills" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">03</span>
            <span aria-hidden="true">/</span>
            <span>TECHNICAL TOOLKIT & FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Learning the craft. <span className="text-slate-400 dark:text-slate-500 font-normal">Deepening foundations.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            A snapshot of what I build with daily. Click any skill row to inspect how I apply it in code and real applications.
          </p>
        </div>

        {/* 4-Column Skill Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.number}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Panel Topline */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {category.number} — {category.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Rows */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <div
                        key={skill.name}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedSkill(skill);
                        }}
                        className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 hover:border-indigo-300 dark:hover:border-indigo-700/80 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {skill.level.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug truncate">
                          {skill.experience}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom hint */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>Practicing weekly</span>
                <span className="text-indigo-500">Details ↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interests & Emerging Curiosity Strip */}
        <div className="mt-8 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Active Horizons & Domain Exploration:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600 dark:text-slate-300">
            <span>3D Modelling & Computer Graphics</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Browser-Based Game Logic</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Tech Entrepreneurship</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Collaborative Maker Communities</span>
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedSkill.name}
              </h3>
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60">
                {selectedSkill.level}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px] block text-slate-400">
                  Focus Area:
                </span>
                <p className="mt-0.5">{selectedSkill.experience}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px] block text-slate-400">
                  Application & Implementation:
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
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 rounded-lg cursor-pointer"
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
