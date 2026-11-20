import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Layout, Zap, Terminal, FileCode, GitBranch, Layers, Compass, Box, CheckCircle, Cpu, Users, X } from 'lucide-react';
import { useSectionContent } from '../services/ContentService';
import { KineticWordArrange } from './KineticWordArrange';
import { ThemeHeaderEmoji } from './ThemeHeaderEmoji';
import { ReadingTimeTag } from './ReadingTimeTag';
import { PortfolioTheme } from '../types';
import { sounds } from '../utils/audio';

export function Skills({ theme }: { theme: PortfolioTheme }) {
  const [selectedSkillRef, setSelectedSkillRef] = useState<{
    categoryNumber: string;
    skillIndex: number;
  } | null>(null);

  const { locale, content } = useSectionContent('skills');
  const { copy, categories: skillCategories, findSkill } = content;
  const selectedSkill = selectedSkillRef
    ? findSkill(selectedSkillRef.categoryNumber, selectedSkillRef.skillIndex)
    : null;

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
      case 'layers':
        return Layers;
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
      data-snap-role="primary"
      className="portfolio-snap-section py-16 sm:py-24 md:py-28 bg-white/40 dark:bg-slate-900/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smooth Fade-In Section Header + Kinetic Word Arrange */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 max-w-3xl mb-10 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <ThemeHeaderEmoji section="skills" theme={theme} />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">03</span>
            <span aria-hidden="true">/</span>
            <span>{copy.sectionLabel}</span>
            <ReadingTimeTag section="skills" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            <KineticWordArrange
              key={`skills-${locale}`}
              trigger="inView"
              intensity="section"
              segments={[
                { text: copy.headingLead },
                { text: copy.headingMuted, className: 'text-slate-500 dark:text-slate-400 font-normal' },
              ]}
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {copy.subtitle}
          </p>
        </motion.div>

        {/* 4-Column Skill Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
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
                  {category.skills.map((skill, skillIdx) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <motion.button
                        key={`${category.number}-${skillIdx}`}
                        type="button"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedSkillRef({
                            categoryNumber: category.number,
                            skillIndex: skillIdx,
                          });
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
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>{copy.handsOn}</span>
                <span className="text-indigo-500 dark:text-indigo-400">{copy.inspect}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Curiosity Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/85 dark:bg-slate-900/75 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
        >
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider shrink-0">
            <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>{copy.activeHorizonsLabel}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-300">
            {copy.horizons.map((horizon, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span>{horizon}</span>
                {i < copy.horizons.length - 1 && (
                  <span aria-hidden="true" className="text-slate-400">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedSkillRef(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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
                    setSelectedSkillRef(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label={copy.modal.closeAria}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-500 dark:text-slate-400 font-mono text-[11px] block">
                    {copy.modal.focusArea}
                  </span>
                  <p className="mt-1 leading-relaxed">{selectedSkill.experience}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 font-mono text-[11px] block">
                    {copy.modal.howIApply}
                  </span>
                  <p className="mt-1 leading-relaxed">{selectedSkill.details}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSkillRef(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {copy.modal.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
