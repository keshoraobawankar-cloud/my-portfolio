import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play, CheckCircle2, Clock, Radio, FileText, Shield, Gamepad2, Globe } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { sounds } from '../utils/audio';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'client' | 'product' | 'game'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleOpenProject = (p: Project) => {
    sounds.playClick();
    setSelectedProject(p);
  };

  const renderStatusBadge = (status: Project['status']) => {
    if (status === 'Shipped') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 whitespace-nowrap shrink-0">
          <CheckCircle2 className="w-3 h-3 shrink-0" />
          <span>Shipped</span>
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0">
          <Clock className="w-3 h-3 shrink-0" />
          <span>In Progress</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 whitespace-nowrap shrink-0">
        <Radio className="w-3 h-3 shrink-0" />
        <span>Live</span>
      </span>
    );
  };

  const tabs: Array<{ id: 'all' | 'client' | 'product' | 'game'; label: string }> = [
    { id: 'all', label: 'All Builds' },
    { id: 'client', label: 'Client Work' },
    { id: 'product', label: 'In Progress' },
    { id: 'game', label: 'Mini-Games' },
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-28 border-b border-slate-200/80 dark:border-slate-800/90">
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
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">02</span>
              <span aria-hidden="true">/</span>
              <span>Selected Builds &amp; Client Solutions</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Shipped client work &amp; <span className="text-slate-500 dark:text-slate-400 font-normal">active builds.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              One commercial client solution shipped, two applications actively in progress, and live interactive prototypes you can test right in the browser.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project) => {
            const isFeatured =
              project.id === 'client-pdf-app' && (activeFilter === 'all' || activeFilter === 'client');

            return (
              <motion.article
                key={project.id}
                layout
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
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
                          <span className="font-semibold uppercase tracking-wider">Featured Client Build</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Shipped</span>
                        </span>
                      </div>

                      <div className="relative z-10 my-6">
                        <div className="p-4 rounded-xl border border-slate-700/80 bg-slate-950/85 backdrop-blur-md shadow-xl max-w-md">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5 text-xs font-mono">
                            <span className="text-slate-300 truncate">document_pipeline_preview</span>
                            <span className="text-emerald-400 font-semibold shrink-0">Verified</span>
                          </div>
                          <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
                            <div className="flex justify-between gap-2">
                              <span className="text-slate-500">Workflow:</span>
                              <span className="text-right">PDF Stamp, Merge &amp; Export</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-slate-500">Environment:</span>
                              <span className="text-right">Daily Commercial Operations</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-slate-500">Outcome:</span>
                              <span className="text-emerald-300 text-right">Eliminated manual paperwork</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between gap-2 text-xs text-slate-300 font-mono">
                        <span>Interactive prototype included</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-white group-hover:translate-x-0.5 transition-transform shrink-0">
                          Open Case Study <ArrowUpRight className="w-3.5 h-3.5" />
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
                            <span>Launch Live Demo &amp; Case Study</span>
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
                          {project.category === 'game' && <Gamepad2 className="w-4 h-4 text-cyan-500 shrink-0" />}
                          {project.category === 'web' && <Globe className="w-4 h-4 text-emerald-500 shrink-0" />}
                          <span className="uppercase truncate">{project.category}</span>
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
                              <span>Inspect Problem, Stack &amp; Live Demo</span>
                            </>
                          ) : (
                            <>
                              <span>Inspect Architecture &amp; Stack</span>
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
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
