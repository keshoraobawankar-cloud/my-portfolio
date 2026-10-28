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
      detail: 'Food safety auditor, logic game engine & portfolio system',
      icon: Layers,
    },
    {
      value: '1st',
      label: 'Year B.Tech CSE',
      detail: 'Ramdeobaba University (RBU) · Active technical community member',
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
    <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col justify-between p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/40 backdrop-blur-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {stat.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
