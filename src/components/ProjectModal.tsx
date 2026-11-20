import { useState, useEffect, useRef, useCallback, UIEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Play, RotateCcw, FileText, ChevronRight, Layers, Target, ArrowLeftRight, AlertTriangle, Check, Copy } from 'lucide-react';
import { PortfolioTheme, Project } from '../types';
import { getTranslations } from '../data/translations';
import { useLocale } from '../context/LocaleContext';
import { sounds } from '../utils/audio';
import { fireThemeConfetti } from '../utils/confetti';

interface ProjectModalProps {
  project: Project | null;
  theme: PortfolioTheme;
  onClose: () => void;
}

export function ProjectModal({ project, theme, onClose }: ProjectModalProps) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const celebratedProjectRef = useRef<string | null>(null);

  useEffect(() => {
    celebratedProjectRef.current = null;
  }, [project?.id]);

  const celebrateProjectCompletion = useCallback((): boolean => {
    if (!project || celebratedProjectRef.current === project.id) return false;
    celebratedProjectRef.current = project.id;
    fireThemeConfetti(theme, 'project-complete');
    sounds.playSuccess();
    return true;
  }, [project, theme]);

  const handleFinishAndClose = useCallback(() => {
    const fired = celebrateProjectCompletion();
    if (!fired) {
      sounds.playClick();
    }
    onClose();
  }, [celebrateProjectCompletion, onClose]);

  const handleBodyScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (
      el.scrollHeight > el.clientHeight + 36 &&
      el.scrollTop + el.clientHeight >= el.scrollHeight - 28
    ) {
      celebrateProjectCompletion();
    }
  };

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleFinishAndClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, handleFinishAndClose]);

  const badgeStyles =
    project?.status === 'Shipped'
      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
      : project?.status === 'In Progress'
        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30'
        : project?.status === 'Case Study'
          ? 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30'
          : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={handleFinishAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0f1524] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Modal Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 shrink-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 min-w-0">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                  {t.projects.categories[project.category]}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
                <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${badgeStyles}`}>
                  {t.projects.statuses[project.status]}
                </span>
              </div>

              <button
                onClick={handleFinishAndClose}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label={t.projects.modal.closeAria}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body Clearly Separated Into 3 Distinct Sections */}
            <div
              onScroll={handleBodyScroll}
              className="overflow-y-auto p-4 sm:p-8 space-y-8 flex-1"
            >
              {/* Title Block */}
              <div className="space-y-2">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {project.subtitle}
                </p>
              </div>

              {/* SECTION 1: THE PROBLEM & SOLUTION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Target className="w-4 h-4 shrink-0" />
                  <span>{t.projects.modal.section1Title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 block">
                      {t.projects.modal.problemAddressed}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-2">
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 block">
                      {t.projects.modal.whatWasBuilt}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {project.solutionSummary}
                    </p>
                  </div>
                </div>

                {project.processSteps && project.processSteps.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-3">
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 block">
                      {t.projects.modal.processStepsLabel}
                    </span>
                    <ol className="space-y-2">
                      {project.processSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0">
                            0{i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    {project.resultSummary && (
                      <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-baseline gap-2 text-xs sm:text-sm">
                        <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {t.projects.modal.resultLabel}:
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {project.resultSummary}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 block mb-2.5">
                    {t.projects.modal.keyDeliverables}
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-3 rounded-lg border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900/50"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION 2: TECH STACK & CONTEXT */}
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>{t.projects.modal.section2Title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">{t.projects.modal.context}</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
                      {project.clientOrContext}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">{t.projects.modal.role}</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
                      {project.role}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">{t.projects.modal.toolsAndConcepts}</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-mono mt-1 leading-relaxed">
                      {project.technologies.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: LIVE INTERACTIVE DEMO */}
              {project.hasInteractiveDemo && (
                <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      <Play className="w-4 h-4 shrink-0 fill-current" />
                      <span>{t.projects.modal.section3Title}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {t.projects.modal.interactiveSandbox}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/40 dark:bg-slate-900/90">
                    {project.demoType === 'pdf-app' && <PdfAppDemo />}
                    {project.demoType === 'food-safety' && <FoodSafetyDemo />}
                    {project.demoType === 'game-logic' && <GameProjectsDemo />}
                    {project.demoType === 'ux-redesign' && <UxRedesignDemo />}
                    {project.demoType === 'brand-system' && <BrandSystemDemo />}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Modal Footer */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 shrink-0">
              <span className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                {t.projects.modal.footerLabel}
              </span>
              <button
                onClick={handleFinishAndClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
              >
                {t.projects.modal.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PdfAppDemo() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [selectedDoc, setSelectedDoc] = useState<'invoice' | 'contract' | 'receipt'>('invoice');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL · VERIFIED');
  const [hasWatermark, setHasWatermark] = useState(true);
  const [processedStatus, setProcessedStatus] = useState<string | null>(null);

  const sampleDocs = {
    invoice: { title: 'Invoice_INV-2026-081.pdf', pages: 3, size: '242 KB', client: t.projects.pdfDemo.clients.invoice },
    contract: { title: 'Service_Agreement_v2.pdf', pages: 8, size: '610 KB', client: t.projects.pdfDemo.clients.contract },
    receipt: { title: 'Payment_Voucher_March.pdf', pages: 1, size: '94 KB', client: t.projects.pdfDemo.clients.receipt },
  };

  const handleProcess = () => {
    sounds.playMove();
    setProcessedStatus(t.projects.pdfDemo.runningStatus);
    setTimeout(() => {
      sounds.playSuccess();
      setProcessedStatus(
        `${t.projects.pdfDemo.readyPrefix} "${sampleDocs[selectedDoc].title}" ${t.projects.pdfDemo.readyMiddle} "${hasWatermark ? watermarkText : t.projects.pdfDemo.noneStamp}".`
      );
    }, 400);
  };

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {(Object.keys(sampleDocs) as Array<keyof typeof sampleDocs>).map((key) => (
          <button
            key={key}
            onClick={() => {
              setSelectedDoc(key);
              sounds.playClick();
              setProcessedStatus(null);
            }}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              selectedDoc === key
                ? 'border-indigo-500 bg-white dark:bg-slate-950 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/50 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-slate-900 dark:text-white">{t.projects.pdfDemo.docTypes[key]}</span>
              <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-1">{sampleDocs[key].title}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {sampleDocs[key].pages} {t.projects.pdfDemo.pgs} · {sampleDocs[key].size}
            </p>
          </button>
        ))}
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-200 font-medium">
            <input
              type="checkbox"
              checked={hasWatermark}
              onChange={(e) => {
                setHasWatermark(e.target.checked);
                sounds.playClick();
              }}
              className="rounded text-indigo-600 cursor-pointer"
            />
            <span>{t.projects.pdfDemo.applyWatermark}</span>
          </label>

          {hasWatermark && (
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full sm:w-56 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500"
              placeholder={t.projects.pdfDemo.watermarkPlaceholder}
            />
          )}
        </div>

        <div className="relative p-5 sm:p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center min-h-[116px] text-center overflow-hidden">
          {hasWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-2">
              <span className="text-base sm:text-2xl font-bold uppercase tracking-widest text-slate-300/50 dark:text-slate-700/60 -rotate-12 truncate max-w-full">
                {watermarkText}
              </span>
            </div>
          )}
          <FileText className="w-7 h-7 text-indigo-500 mb-2 relative z-10" />
          <span className="font-bold text-slate-900 dark:text-white relative z-10 break-all">
            {sampleDocs[selectedDoc].title}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 relative z-10">
            {t.projects.pdfDemo.clientPrefix} {sampleDocs[selectedDoc].client}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={handleProcess}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{t.projects.pdfDemo.executePipeline}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-slate-500">
            {t.projects.pdfDemo.previewNote}
          </span>
        </div>

        {processedStatus && (
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
            {processedStatus}
          </div>
        )}
      </div>
    </div>
  );
}

function FoodSafetyDemo() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: false,
    c4: true,
    c5: true,
  });

  const weights = [
    { id: 'c1', weight: 25 },
    { id: 'c2', weight: 25 },
    { id: 'c3', weight: 20 },
    { id: 'c4', weight: 15 },
    { id: 'c5', weight: 15 },
  ];

  const toggleCheck = (id: string) => {
    sounds.playClick();
    setCheckedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = weights.reduce((sum, item) => (checkedMap[item.id] ? sum + item.weight : sum), 0);
  const grade =
    totalScore >= 90 ? t.projects.foodDemo.gradeA : totalScore >= 70 ? t.projects.foodDemo.gradeB : t.projects.foodDemo.gradeC;

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-slate-500 text-[11px]">{t.projects.foodDemo.auditLabel}</span>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.projects.foodDemo.scoreTitle}</h4>
        </div>
        <div className="sm:text-right">
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {totalScore} / 100
          </span>
          <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{grade}</div>
        </div>
      </div>

      <div className="space-y-2">
        {weights.map((item, idx) => {
          const isChecked = !!checkedMap[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                isChecked
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/25 text-slate-900 dark:text-slate-100'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded text-indigo-600 pointer-events-none shrink-0"
                />
                <span className="font-sans font-medium text-xs leading-snug">{t.projects.foodDemo.items[idx]}</span>
              </div>
              <span className="text-[11px] text-slate-400 tabular-nums shrink-0">+{item.weight}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GameProjectsDemo() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [vsAi, setVsAi] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    if (squares.every((sq) => sq !== null)) {
      return { winner: 'Tie', line: [] };
    }
    return null;
  };

  const result = calculateWinner(board);

  const makeAiMove = (currentBoard: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
      if (vals.filter((v) => v === 'O').length === 2 && vals.includes(null)) {
        return [a, b, c][vals.indexOf(null)];
      }
    }
    for (const [a, b, c] of lines) {
      const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
      if (vals.filter((v) => v === 'X').length === 2 && vals.includes(null)) {
        return [a, b, c][vals.indexOf(null)];
      }
    }
    if (!currentBoard[4]) return 4;
    const corners = [0, 2, 6, 8].filter((i) => !currentBoard[i]);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    const empties = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];
    return empties[Math.floor(Math.random() * empties.length)];
  };

  const handleClick = (index: number) => {
    if (board[index] || result || (!isXNext && vsAi)) return;

    sounds.playMove();
    const newBoard = [...board];
    const currentMark = vsAi ? 'X' : isXNext ? 'X' : 'O';
    newBoard[index] = currentMark;
    setBoard(newBoard);

    const afterMove = calculateWinner(newBoard);
    if (afterMove) {
      if (afterMove.winner === 'X') {
        sounds.playSuccess();
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (afterMove.winner === 'O') {
        sounds.playSuccess();
        setScores((prev) => ({ ...prev, o: prev.o + 1 }));
      } else {
        sounds.playTie();
        setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      }
      return;
    }

    if (vsAi) {
      setIsXNext(false);
      setTimeout(() => {
        const aiIdx = makeAiMove(newBoard);
        if (aiIdx !== undefined) {
          newBoard[aiIdx] = 'O';
          setBoard([...newBoard]);
          sounds.playMove();

          const afterAi = calculateWinner(newBoard);
          if (afterAi) {
            if (afterAi.winner === 'O') {
              sounds.playSuccess();
              setScores((prev) => ({ ...prev, o: prev.o + 1 }));
            } else if (afterAi.winner === 'Tie') {
              sounds.playTie();
              setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
            }
          }
        }
        setIsXNext(true);
      }, 250);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    sounds.playClick();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <button
          onClick={() => {
            setVsAi(!vsAi);
            resetGame();
          }}
          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
        >
          {vsAi ? t.projects.gameDemo.modeBot : t.projects.gameDemo.mode2P}
        </button>

        <div className="flex items-center gap-3 tabular-nums">
          <span>X: <strong className="text-indigo-600 dark:text-indigo-400">{scores.x}</strong></span>
          <span>O: <strong className="text-cyan-600 dark:text-cyan-400">{scores.o}</strong></span>
          <span>{t.projects.gameDemo.ties} {scores.ties}</span>
        </div>

        <button
          onClick={resetGame}
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
          title={t.projects.gameDemo.restartAria}
          aria-label={t.projects.gameDemo.restartAria}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
          {board.map((cell, idx) => {
            const isWinningCell = result && result.line.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleClick(idx)}
                disabled={cell !== null || !!result || (!isXNext && vsAi)}
                className={`h-16 sm:h-18 rounded-xl text-2xl font-bold font-mono transition-all flex items-center justify-center border cursor-pointer ${
                  isWinningCell
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-400'
                }`}
              >
                {cell === 'X' && <span className="text-indigo-600 dark:text-indigo-400">X</span>}
                {cell === 'O' && <span className="text-cyan-600 dark:text-cyan-400">O</span>}
              </button>
            );
          })}
        </div>

        <div className="mt-3 text-xs font-mono text-slate-500">
          {result ? (
            result.winner === 'Tie' ? (
              <span className="font-semibold text-amber-500">{t.projects.gameDemo.drawMatch}</span>
            ) : (
              <span className="font-semibold text-emerald-500">
                {t.projects.gameDemo.playerWinsPrefix} {result.winner} {t.projects.gameDemo.playerWinsSuffix}
              </span>
            )
          ) : (
            <span>
              {vsAi
                ? isXNext
                  ? t.projects.gameDemo.yourMove
                  : t.projects.gameDemo.botThinking
                : `${t.projects.gameDemo.playerTurnPrefix} ${isXNext ? 'X' : 'O'}${t.projects.gameDemo.playerTurnSuffix}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function UxRedesignDemo() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const ux = t.projects.uxRedesignDemo;

  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
  const [swapped, setSwapped] = useState(false);

  const origin = swapped
    ? locale === 'hi' ? 'सीताबर्डी हब' : 'Sitabuldi Hub'
    : locale === 'hi' ? 'कैंपस गेट (RBU)' : 'Campus Gate (RBU)';
  const destination = swapped
    ? locale === 'hi' ? 'कैंपस गेट (RBU)' : 'Campus Gate (RBU)'
    : locale === 'hi' ? 'सीताबर्डी हब' : 'Sitabuldi Hub';

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setViewMode('before');
            }}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'before'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {ux.beforeTab}
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setViewMode('after');
            }}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'after'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {ux.afterTab}
          </button>
        </div>

        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
          {ux.wireframeNote}
        </span>
      </div>

      {viewMode === 'before' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-white dark:bg-slate-950 space-y-3">
            <div className="flex items-center gap-2 font-mono font-semibold text-amber-700 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{ux.flawsHeading}</span>
            </div>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {ux.flaws.map((flaw, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">0{i + 1}</span>
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-950/60 space-y-3 opacity-85">
            <div className="text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-800 truncate">
              {ux.legacyBanner}
            </div>
            <div className="space-y-2">
              <div className="h-7 rounded bg-slate-200 dark:bg-slate-800 flex items-center px-2.5 text-[10px] text-slate-400">
                Dropdown 1: Region...
              </div>
              <div className="h-7 rounded bg-slate-200 dark:bg-slate-800 flex items-center px-2.5 text-[10px] text-slate-400">
                Dropdown 2: Corridor...
              </div>
              <div className="h-7 rounded bg-slate-200 dark:bg-slate-800 flex items-center px-2.5 text-[10px] text-slate-400">
                Dropdown 3: Fare Slab...
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-400">{ux.legacyStatus}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
              {ux.routeLabel}
            </span>
            <button
              type="button"
              onClick={() => {
                sounds.playMove();
                setSwapped((prev) => !prev);
              }}
              aria-label={ux.swapAria}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-500" />
              <span>{ux.swapLabel}</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">FROM</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{origin}</span>
            </div>
            <ArrowLeftRight className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">TO</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{destination}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 font-mono">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
              <span className="text-[10px] text-slate-400 block">{ux.nextDeparture}</span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {swapped ? '4 min' : '2 min'}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
              <span className="text-[10px] text-slate-400 block">{ux.fareLabel}</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">₹20</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
              <span className="text-[10px] text-slate-400 block">{ux.durationLabel}</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">18 min</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
            <span>{ux.interchangeLabel}: <strong className="text-slate-800 dark:text-slate-200">{ux.interchangeValue}</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">WCAG AA ✓</span>
          </div>
        </div>
      )}
    </div>
  );
}

function BrandSystemDemo() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const bs = t.projects.brandSystemDemo;

  const [surfaceTab, setSurfaceTab] = useState<'packaging' | 'social'>('packaging');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const palette = [
    { name: 'Nagpur Peel', hex: '#EA580C' },
    { name: 'Espresso Ink', hex: '#1C1410' },
    { name: 'Cream Crema', hex: '#FAF4EB' },
    { name: 'Marigold Accent', hex: '#F59E0B' },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    sounds.playSuccess();
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left: Emblem + Swatches + Type */}
        <div className="md:col-span-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4">
          <div className="flex items-center gap-3">
            {/* Custom Geometric SVG Logo Mark */}
            <div className="w-12 h-12 rounded-xl bg-[#1C1410] flex items-center justify-center shrink-0 border border-orange-500/40">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="14" stroke="#EA580C" strokeWidth="2.5" />
                <path d="M12 22C14 14 24 12 28 19C23 23 17 25 12 22Z" fill="#F59E0B" />
                <path d="M20 7V33" stroke="#FAF4EB" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                {bs.emblemTitle}
              </h4>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {bs.emblemTagline}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 block">
              {bs.paletteTitle}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {palette.map((swatch) => {
                const isCopied = copiedHex === swatch.hex;
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => handleCopyHex(swatch.hex)}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-400/70 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-5 h-5 rounded-md border border-slate-300/60 shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="min-w-0">
                        <span className="block text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {swatch.name}
                        </span>
                        <span className="block text-[10px] font-mono text-slate-500">
                          {isCopied ? bs.copiedHex : swatch.hex}
                        </span>
                      </div>
                    </div>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 block">
              {bs.typeTitle}
            </span>
            <p className="font-display font-bold text-sm text-slate-900 dark:text-white">
              {bs.displaySample}
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {bs.bodySample}
            </p>
          </div>
        </div>

        {/* Right: Packaging Sleeve / Social Card Mockup Switcher */}
        <div className="md:col-span-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between space-y-3">
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono self-start">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setSurfaceTab('packaging');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                surfaceTab === 'packaging'
                  ? 'bg-orange-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {bs.packagingTab}
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setSurfaceTab('social');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                surfaceTab === 'social'
                  ? 'bg-orange-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {bs.socialTab}
            </button>
          </div>

          {surfaceTab === 'packaging' ? (
            <div className="flex-1 rounded-xl p-5 bg-[#FAF4EB] text-[#1C1410] border-2 border-[#1C1410] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                <span className="text-[#EA580C]">{bs.packagingBadge}</span>
                <span>EST. 2026</span>
              </div>
              <div className="my-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1C1410] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" aria-hidden="true">
                    <circle cx="20" cy="20" r="13" stroke="#EA580C" strokeWidth="2.5" />
                    <path d="M12 22C14 14 24 12 28 19C23 23 17 25 12 22Z" fill="#F59E0B" />
                  </svg>
                </div>
                <div>
                  <div className="font-display font-extrabold text-base leading-tight">
                    {bs.emblemTitle}
                  </div>
                  <div className="text-[11px] opacity-80">{bs.packagingOrigin}</div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#1C1410]" />
            </div>
          ) : (
            <div className="flex-1 rounded-xl p-5 bg-gradient-to-br from-[#1C1410] via-[#2b1810] to-[#9a3412] text-[#FAF4EB] flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[10px] text-orange-300">
                <span>@ORANGECITYROASTERS</span>
                <span>NAGPUR</span>
              </div>
              <div className="space-y-1.5 my-3">
                <h5 className="font-display font-extrabold text-lg leading-snug text-white">
                  {bs.socialHeadline}
                </h5>
                <p className="text-[11px] text-orange-100/85 leading-relaxed">
                  {bs.socialCaption}
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-amber-300">
                <span>#ZeroMileBrew</span>
                <span>·</span>
                <span>#NagpurCraft</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

