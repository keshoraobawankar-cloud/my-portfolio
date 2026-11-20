import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, RotateCcw, CheckCircle2, Sparkles, ShieldAlert, Terminal as TerminalIcon } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { getTranslations } from '../data/translations';
import { getPortfolioData } from '../data/portfolioData';
import { TerminalCard } from './TerminalCard';
import { sounds } from '../utils/audio';

interface SystemWindowProps {
  onNavigateToProjects: () => void;
  onNavigateToSkills: () => void;
  onOpenResume: () => void;
}

export function SystemWindow({
  onNavigateToProjects,
  onNavigateToSkills,
  onOpenResume,
}: SystemWindowProps) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const { personalInfo } = getPortfolioData(locale);
  const sw = t.hero.systemWindow;

  const [tab, setTab] = useState<'status' | 'quests' | 'shell'>('status');
  const [availablePoints, setAvailablePoints] = useState(5);
  const [bonusStats, setBonusStats] = useState<Record<string, number>>({
    logic: 0,
    proto: 0,
    craft: 0,
    ship: 0,
  });
  const [questAccepted, setQuestAccepted] = useState(false);

  const allocatePoint = (statId: string) => {
    if (availablePoints <= 0) return;
    sounds.playMove();
    setAvailablePoints((prev) => prev - 1);
    setBonusStats((prev) => ({ ...prev, [statId]: (prev[statId] || 0) + 3 }));
  };

  const resetPoints = () => {
    sounds.playClick();
    setAvailablePoints(5);
    setBonusStats({ logic: 0, proto: 0, craft: 0, ship: 0 });
  };

  const handleAcceptQuest = () => {
    sounds.playSuccess();
    setQuestAccepted(true);
    setTimeout(() => {
      onNavigateToProjects();
    }, 380);
  };

  return (
    <div className="relative rounded-2xl bg-[#040d1f]/90 backdrop-blur-xl system-window-frame text-cyan-50 overflow-hidden">
      {/* Corner Reticle Brackets */}
      <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-300 rounded-tl-sm" aria-hidden="true" />
      <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-300 rounded-tr-sm" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-300 rounded-bl-sm" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-300 rounded-br-sm" aria-hidden="true" />

      {/* Top System Notification Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-cyan-400/25 bg-cyan-950/35">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-cyan-300">
          <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
          <span>{sw.alertBanner}</span>
        </div>

        {/* Window Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#030916]/80 border border-cyan-400/25 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setTab('status');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              tab === 'status' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-cyan-200/80 hover:text-white'
            }`}
          >
            {sw.tabs.status}
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setTab('quests');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              tab === 'quests' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-cyan-200/80 hover:text-white'
            }`}
          >
            {sw.tabs.quests}
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setTab('shell');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1 ${
              tab === 'shell' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-cyan-200/80 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3 h-3" />
            <span>{sw.tabs.shell}</span>
          </button>
        </div>
      </div>

      {/* Main Holographic Body */}
      <div className="p-4 sm:p-5">
        {tab === 'status' && (
          <div className="space-y-4 font-mono text-xs">
            {/* Player Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-cyan-400/20 bg-cyan-950/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400/80 text-[11px]">{sw.playerLabel}</span>
                  <span className="font-bold text-white">{personalInfo.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400/80 text-[11px]">{sw.classLabel}</span>
                  <span className="text-cyan-200">{sw.classValue}</span>
                </div>
              </div>
              <div className="space-y-1 sm:text-right">
                <div className="text-cyan-300 font-bold tracking-wider">{sw.levelLabel}</div>
                <div className="text-[11px] text-amber-300">
                  {sw.titleLabel} {sw.titleValue}
                </div>
              </div>
            </div>

            {/* Awakening Stat Points Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-cyan-300 font-bold">
                  {sw.availablePts}{' '}
                  <span className="text-base text-amber-300 tabular-nums">{availablePoints}</span>
                </span>
                <span className="text-slate-400 hidden sm:inline">· {sw.allocateHint}</span>
              </div>
              <button
                type="button"
                onClick={resetPoints}
                className="inline-flex items-center gap-1 px-2 py-1 rounded border border-cyan-400/25 hover:border-cyan-400/60 text-cyan-200 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{sw.resetStats}</span>
              </button>
            </div>

            {/* Interactive Stat Bars */}
            <div className="space-y-2.5">
              {sw.stats.map((stat) => {
                const bonus = bonusStats[stat.id] || 0;
                const value = Math.min(99, stat.base + bonus);
                return (
                  <div key={stat.id} className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-200">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums font-bold text-cyan-300">
                          {value}
                          {bonus > 0 && (
                            <span className="text-emerald-400 ml-1">(+{bonus})</span>
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => allocatePoint(stat.id)}
                          disabled={availablePoints <= 0 || value >= 99}
                          aria-label={`Increase ${stat.label}`}
                          className="w-5 h-5 rounded border border-cyan-400/45 bg-cyan-400/15 hover:bg-cyan-400 hover:text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-900 border border-cyan-400/20 overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{ width: `${value}%` }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* System Awakening Quest Button */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleAcceptQuest}
                className={`flex-1 py-2.5 px-4 rounded-xl border font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  questAccepted
                    ? 'border-emerald-400 bg-emerald-500/25 text-emerald-200'
                    : 'border-cyan-300/70 bg-cyan-400/15 hover:bg-cyan-400 hover:text-slate-950 text-cyan-200 shadow-[0_0_20px_-4px_rgba(34,211,238,0.45)]'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{questAccepted ? sw.questAccepted : sw.acceptQuest}</span>
              </button>
            </div>
          </div>
        )}

        {tab === 'quests' && (
          <div className="space-y-2.5 font-mono text-xs">
            {sw.quests.map((q, idx) => (
              <div
                key={idx}
                onClick={() => {
                  sounds.playClick();
                  onNavigateToProjects();
                }}
                className="p-3 rounded-xl border border-cyan-400/20 bg-cyan-950/20 hover:border-cyan-400/60 transition-colors cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white">{q.title}</span>
                  </div>
                  <p className="text-[11px] text-cyan-300/80 pl-5">{q.reward}</p>
                </div>
                <span className="text-[10px] font-bold text-amber-300 shrink-0">{q.tag}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'shell' && (
          <TerminalCard
            onNavigateToProjects={onNavigateToProjects}
            onNavigateToSkills={onNavigateToSkills}
            onOpenResume={onOpenResume}
          />
        )}
      </div>
    </div>
  );
}
