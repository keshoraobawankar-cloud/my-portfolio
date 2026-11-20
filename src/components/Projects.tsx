import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play, CheckCircle2, Clock, Radio, FileText, Shield, Gamepad2, Globe, Palette, BookOpen } from 'lucide-react';
import { useSectionContent } from '../services/ContentService';
import { PortfolioTheme, Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { KineticWordArrange } from './KineticWordArrange';
import { ThemeHeaderEmoji } from './ThemeHeaderEmoji';
import { ReadingTimeTag } from './ReadingTimeTag';
import { sounds } from '../utils/audio';

export function Projects({ theme }: { theme: PortfolioTheme }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'client' | 'design' | 'product' | 'game'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const { locale, content } = useSectionContent('projects');
  const { copy, items: projects, findById } = content;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const selectedProject = findById(selectedProjectId);

  const handleOpenProject = (p: Project) => {
    sounds.playClick();
    setSelectedProjectId(p.id);
  };

  const renderStatusBadge = (status: Project['status']) => {
    const label = copy.statuses[status];
    if (status === 'Shipped') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 whitespace-nowrap shrink-0">
          <CheckCircle2 className="w-3 h-3 shrink-0" />
          <span>{label}</span>
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{label}</span>
        </span>
      );
    }
    if (status === 'Case Study') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30 whitespace-nowrap shrink-0">
          <BookOpen className="w-3 h-3 shrink-0" />
          <span>{label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 whitespace-nowrap shrink-0">
        <Radio className="w-3 h-3 shrink-0" />
        <span>{label}</span>
      </span>
    );
  };

  const tabs: Array<{ id: 'all' | 'client' | 'design' | 'product' | 'game'; label: string }> = [
    { id: 'all', label: copy.tabs.all },
    { id: 'client', label: copy.tabs.client },
    { id: 'design', label: copy.tabs.design },
    { id: 'product', label: copy.tabs.product },
    { id: 'game', label: copy.tabs.game },
  ];

  return (
    <section
      id="projects"
      data-snap-role="secondary"
      className="portfolio-snap-section py-16 sm:py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smooth Fade-In Section Header + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <ThemeHeaderEmoji section="projects" theme={theme} />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">02</span>
              <span aria-hidden="true">/</span>
              <span>{copy.sectionLabel}</span>
              <ReadingTimeTag section="projects" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              <KineticWordArrange
                key={`projects-${locale}`}
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
          </div>

          {/* Mobile-safe Interactive Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium max-w-full overflow-x-auto no-scrollbar shrink-0">
            {tabs.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    sounds.playClick();
                  }}
                  className={`relative px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projects-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Showcase Bento Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFeatured =
                project.id === 'client-pdf-app' && (activeFilter === 'all' || activeFilter === 'client');

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleOpenProject(project)}
                  className={`group cursor-pointer rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 card-glow hover:border-indigo-400/70 dark:hover:border-indigo-400/60 overflow-hidden flex flex-col justify-between ${
                    isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                  }`}
                >
                  {isFeatured ? (
                    /* Flagship Client Work Card */
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      {/* Left Visual Workflow Preview */}
                      <div className="lg:col-span-6 p-6 sm:p-8 bg-gradient-to-br from-[#12192d] via-[#0e1526] to-[#0b0f19] text-white flex flex-col justify-between min-h-[260px] relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(16,185,129,0.16),transparent_50%)] pointer-events-none" />

                        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                            <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span className="font-semibold uppercase tracking-wider">{copy.featuredBadge}</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{copy.statuses.Shipped}</span>
                          </span>
                        </div>

                        <div className="relative z-10 my-6">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                            className="p-4 rounded-xl border border-slate-700/80 bg-slate-950/85 backdrop-blur-md shadow-xl max-w-md"
                          >
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5 text-xs font-mono">
                              <span className="text-slate-300 truncate">{copy.previewHeader}</span>
                              <span className="text-emerald-400 font-semibold shrink-0">{copy.previewVerified}</span>
                            </div>
                            <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
                              <div className="flex justify-between gap-2">
                                <span className="text-slate-500">{copy.previewWorkflowLabel}</span>
                                <span className="text-right">{copy.previewWorkflowValue}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="text-slate-500">{copy.previewEnvLabel}</span>
                                <span className="text-right">{copy.previewEnvValue}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="text-slate-500">{copy.previewOutcomeLabel}</span>
                                <span className="text-emerald-300 text-right">{copy.previewOutcomeValue}</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between gap-2 text-xs text-slate-300 font-mono">
                          <span>{copy.interactiveIncluded}</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-white group-hover:translate-x-0.5 transition-transform shrink-0">
                            {copy.openCaseStudy} <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Right Narrative & Action */}
                      <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-3.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                              {project.clientOrContext} · {project.year}
                            </span>
                            {renderStatusBadge(project.status)}
                          </div>

                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                            {project.subtitle}
                          </p>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                            {project.technologies.slice(0, 4).map((tech, i, arr) => (
                              <span key={tech} className="inline-flex items-center gap-2.5">
                                <span>{tech}</span>
                                {i < arr.length - 1 && <span aria-hidden="true">·</span>}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenProject(project);
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{copy.launchDemo}</span>
                            </button>

                            <span className="text-xs font-mono text-slate-400">
                              {project.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Elevated Secondary Showcase Cards */
                    <div className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 min-w-0">
                            {project.category === 'product' && <Shield className="w-4 h-4 text-indigo-500 shrink-0" />}
                            {project.category === 'design' && <Palette className="w-4 h-4 text-rose-500 shrink-0" />}
                            {project.category === 'game' && <Gamepad2 className="w-4 h-4 text-cyan-500 shrink-0" />}
                            {project.category === 'web' && <Globe className="w-4 h-4 text-emerald-500 shrink-0" />}
                            <span className="uppercase truncate">{copy.categories[project.category]}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.year}</span>
                          </div>

                          {renderStatusBadge(project.status)}
                        </div>

                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {project.technologies.slice(0, 3).map((tech, i, arr) => (
                            <span key={tech} className="inline-flex items-center gap-2.5">
                              <span>{tech}</span>
                              {i < arr.length - 1 && <span aria-hidden="true">·</span>}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1 gap-2">
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1.5">
                            {project.hasInteractiveDemo ? (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>{copy.inspectDemo}</span>
                              </>
                            ) : (
                              <>
                                <span>{copy.inspectArchitecture}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        theme={theme}
        onClose={() => setSelectedProjectId(null)}
      />
    </section>
  );
}
