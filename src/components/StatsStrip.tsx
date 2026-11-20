import { motion } from 'motion/react';
import { CheckCircle2, Layers, GraduationCap, Flame } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { getTranslations } from '../data/translations';

export function StatsStrip() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const icons = [CheckCircle2, Layers, GraduationCap, Flame];

  const ribbonItems =
    locale === 'hi'
      ? 'चयनित प्रोजेक्ट्स · क्लाइंट डिलीवरी · C और Python · लॉजिक गेम्स · रामदेवबाबा विश्वविद्यालय · निरंतरता ही शक्ति है'
      : 'selected builds · client delivery · c & python · logic games · ramdeobaba university · build to learn';

  return (
    <div className="border-y border-slate-200/80 dark:border-slate-800/90 bg-white/55 dark:bg-slate-900/45 backdrop-blur-xs">
      <div className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {t.stats.map((stat, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
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

      {/* Subtle kinetic marquee section divider ribbon */}
      <div className="border-t border-slate-200/70 dark:border-slate-800/80 py-2.5 overflow-hidden select-none">
        <div className="animate-marquee-glide">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-slate-500/80 dark:text-slate-400/75 px-6 whitespace-nowrap">
                {ribbonItems}
              </span>
              <span className="text-slate-400/60 dark:text-slate-600" aria-hidden="true">·</span>
              <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-slate-500/80 dark:text-slate-400/75 px-6 whitespace-nowrap">
                {ribbonItems}
              </span>
              <span className="text-slate-400/60 dark:text-slate-600" aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
