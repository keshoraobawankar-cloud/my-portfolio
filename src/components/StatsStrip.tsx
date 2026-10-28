import { motion } from 'motion/react';
import { CheckCircle2, Layers, GraduationCap, Flame } from 'lucide-react';

export function StatsStrip() {
  const stats = [
    {
      value: '01',
      label: 'Delivered Client Project',
      detail: 'Custom PDF & business app shipped for real-world operations',
      icon: CheckCircle2,
    },
    {
      value: '03',
      label: 'Active System Builds',
      detail: 'Food safety auditor, logic game engine & portfolio showcase',
      icon: Layers,
    },
    {
      value: '1st',
      label: 'Year B.Tech CSE',
      detail: 'Ramdeobaba University (RBU) · Aspiring builder & maker',
      icon: GraduationCap,
    },
    {
      value: '100%',
      label: 'Build-To-Learn Ethos',
      detail: 'Believing daily consistency always outpaces passive talent',
      icon: Flame,
    },
  ];

  return (
    <div className="border-y border-slate-200/80 dark:border-slate-800/90 bg-white/55 dark:bg-slate-900/45 backdrop-blur-xs py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white/85 dark:bg-slate-900/75 card-glow hover:border-indigo-400/60 dark:hover:border-indigo-400/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                </div>
                <div className="mt-2.5">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {stat.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
