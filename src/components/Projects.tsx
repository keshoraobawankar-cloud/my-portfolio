import { useState } from 'react';
import { ArrowUpRight, Play, CheckCircle2, FileText, Shield, Gamepad2, Sparkles } from 'lucide-react';
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

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">02</span>
              <span aria-hidden="true">/</span>
              <span>SELECTED BUILDS & CLIENT SOLUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Ideas in motion. <span className="text-slate-400 dark:text-slate-500 font-normal">Real problem solving.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              One client project delivered, two software initiatives in progress, and an interactive recruitment engine. Click any build to inspect the architecture and test the live prototype.
            </p>
          </div>

          {/* Interactive Filter Tabs (functional buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium shrink-0">
            {[
              { id: 'all', label: 'All Builds' },
              { id: 'client', label: 'Client Work' },
              { id: 'product', label: 'In Progress' },
              { id: 'game', label: 'Mini-Games' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id as 'all' | 'client' | 'product' | 'game');
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            const isFeatured = project.id === 'client-pdf-app' && (activeFilter === 'all' || activeFilter === 'client');

            return (
              <article
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className={`group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-400/80 dark:hover:border-indigo-500/80 transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                }`}
              >
                {isFeatured ? (
                  /* Featured Client Project: Wide Horizontal Split Card */
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Visual Preview / Artwork container */}
                    <div className="lg:col-span-6 p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white flex flex-col justify-between min-h-[260px] relative overflow-hidden">
                      {/* Background grid design */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                          <FileText className="w-4 h-4 text-indigo-400" />
                          <span className="font-semibold uppercase tracking-wider">Client Solution</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400 font-semibold">Delivered & Shipped</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">2026</span>
                      </div>

                      <div className="relative z-10 my-6 space-y-2">
                        <div className="p-4 rounded-xl border border-indigo-500/30 bg-slate-900/80 backdrop-blur-md shadow-lg max-w-md">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono">
                            <span className="text-slate-400">batch_export_pipeline.ts</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Ready
                            </span>
                          </div>
                          <div className="space-y-1 text-[11px] font-mono text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Operation:</span>
                              <span>PDF Merge & Stamp</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Target Client:</span>
                              <span>Commercial Retailer</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Efficiency Gain:</span>
                              <span className="text-indigo-400">10x faster batching</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-xs text-indigo-200 font-mono">
                        <span>Includes live interactive utility demo</span>
                        <span className="flex items-center gap-1 font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                          Inspect Solution <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Content details */}
                    <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>Custom Client Deliverable</span>
                          <span aria-hidden="true">·</span>
                          <span>Nagpur Commercial Use</span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                        {/* Unboxed Metadata / Highlights */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <span>Client Requirements</span>
                          <span aria-hidden="true">/</span>
                          <span>PDF Engine</span>
                          <span aria-hidden="true">/</span>
                          <span>Workflow Automation</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenProject(project);
                            }}
                            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 uppercase tracking-wider font-mono cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Launch Interactive Prototype</span>
                          </button>

                          <span className="text-xs font-mono text-slate-400">
                            Solo Build
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard 2-Column Cards */
                  <div className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      {/* Topline metadata */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          {project.category === 'product' && <Shield className="w-3.5 h-3.5 text-indigo-500" />}
                          {project.category === 'game' && <Gamepad2 className="w-3.5 h-3.5 text-cyan-500" />}
                          {project.category === 'web' && <Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
                          <span className="uppercase">{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className={project.status === 'Live' ? 'text-emerald-500 font-semibold' : 'text-slate-600 dark:text-slate-300'}>
                            {project.status}
                          </span>
                        </div>
                        <span className="text-slate-400">{project.year}</span>
                      </div>

                      {/* Title & subtitle */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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

                    {/* Bottom Metadata & Launch Action */}
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={tech} className="flex items-center gap-2">
                            <span>{tech}</span>
                            {i < 2 && <span aria-hidden="true">·</span>}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          {project.hasInteractiveDemo ? (
                            <>
                              <Play className="w-3 h-3 fill-current" />
                              <span>Try Demo</span>
                            </>
                          ) : (
                            <>
                              <span>Explore Details</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {project.clientOrContext.includes('Recruitment') ? 'Recruitment 2026' : 'Independent'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
