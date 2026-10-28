import { useState, useEffect } from 'react';
import { X, CheckCircle, Play, RotateCcw, FileText, ChevronRight, Layers, Target } from 'lucide-react';
import { Project } from '../types';
import { sounds } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const badgeStyles =
    project.status === 'Shipped'
      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
      : project.status === 'In Progress'
        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30'
        : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0f1524] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 min-w-0">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${badgeStyles}`}>
              {project.status}
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body Clearly Separated Into 3 Distinct Sections */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 flex-1">
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
              <span>01 · The Problem &amp; Solution</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-2">
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 block">
                  Problem Addressed
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-2">
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 block">
                  What Was Built
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.solutionSummary}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 block mb-2.5">
                Key Deliverables &amp; Highlights
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
              <span>02 · Tech Stack &amp; Role</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Context</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  {project.clientOrContext}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Role</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  {project.role}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Tools &amp; Concepts</span>
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
                  <span>03 · Live Interactive Demo</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Interactive Sandbox
                </span>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/40 dark:bg-slate-900/90">
                {project.demoType === 'pdf-app' && <PdfAppDemo />}
                {project.demoType === 'food-safety' && <FoodSafetyDemo />}
                {project.demoType === 'game-logic' && <GameProjectsDemo />}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Modal Footer */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 shrink-0">
          <span className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
            Harsh Bawankar · Selected Work
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function PdfAppDemo() {
  const [selectedDoc, setSelectedDoc] = useState<'invoice' | 'contract' | 'receipt'>('invoice');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL · VERIFIED');
  const [hasWatermark, setHasWatermark] = useState(true);
  const [processedStatus, setProcessedStatus] = useState<string | null>(null);

  const sampleDocs = {
    invoice: { title: 'Invoice_INV-2026-081.pdf', pages: 3, size: '242 KB', client: 'Apex Traders Nagpur' },
    contract: { title: 'Service_Agreement_v2.pdf', pages: 8, size: '610 KB', client: 'Sterling & Associates' },
    receipt: { title: 'Payment_Voucher_March.pdf', pages: 1, size: '94 KB', client: 'Direct Commercial' },
  };

  const handleProcess = () => {
    sounds.playMove();
    setProcessedStatus('Running batch stamp and PDF export pipeline...');
    setTimeout(() => {
      sounds.playSuccess();
      setProcessedStatus(
        `Export ready: "${sampleDocs[selectedDoc].title}" processed with stamp "${hasWatermark ? watermarkText : 'None'}".`
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
              <span className="font-semibold text-slate-900 dark:text-white capitalize">{key}</span>
              <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-1">{sampleDocs[key].title}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {sampleDocs[key].pages} pgs · {sampleDocs[key].size}
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
            <span>Apply Client Watermark Stamp</span>
          </label>

          {hasWatermark && (
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full sm:w-56 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-indigo-500"
              placeholder="Watermark text..."
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
            Client: {sampleDocs[selectedDoc].client}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={handleProcess}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Execute PDF Pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-slate-500">
            Interactive workflow preview
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
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Cold Storage Temperature ≤ 4°C (Safe Zone)', checked: true, weight: 25 },
    { id: 'c2', label: 'Separation of Raw vs Cooked Preparation Surfaces', checked: true, weight: 25 },
    { id: 'c3', label: 'Active Allergen Warning Labels Present on Menu', checked: false, weight: 20 },
    { id: 'c4', label: 'Staff Hygiene & Sanitize Protocols Logged Today', checked: true, weight: 15 },
    { id: 'c5', label: 'Food Handlers Health & Temperature Screening', checked: true, weight: 15 },
  ]);

  const toggleCheck = (id: string) => {
    sounds.playClick();
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const totalScore = checklist.reduce((sum, item) => (item.checked ? sum + item.weight : sum), 0);
  const grade =
    totalScore >= 90 ? 'Grade A (Exemplary)' : totalScore >= 70 ? 'Grade B (Compliant)' : 'Grade C (Action Needed)';

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-slate-500 text-[11px]">Food Vendor Hygiene Audit</span>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Real-Time Compliance Score</h4>
        </div>
        <div className="sm:text-right">
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {totalScore} / 100
          </span>
          <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{grade}</div>
        </div>
      </div>

      <div className="space-y-2">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
              item.checked
                ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/25 text-slate-900 dark:text-slate-100'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {}}
                className="rounded text-indigo-600 pointer-events-none shrink-0"
              />
              <span className="font-sans font-medium text-xs leading-snug">{item.label}</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums shrink-0">+{item.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GameProjectsDemo() {
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
          {vsAi ? 'Mode: vs Bot' : 'Mode: 2-Player'}
        </button>

        <div className="flex items-center gap-3 tabular-nums">
          <span>X: <strong className="text-indigo-600 dark:text-indigo-400">{scores.x}</strong></span>
          <span>O: <strong className="text-cyan-600 dark:text-cyan-400">{scores.o}</strong></span>
          <span>Ties: {scores.ties}</span>
        </div>

        <button
          onClick={resetGame}
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
          title="Restart round"
          aria-label="Restart round"
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
              <span className="font-semibold text-amber-500">Draw match!</span>
            ) : (
              <span className="font-semibold text-emerald-500">Player {result.winner} wins!</span>
            )
          ) : (
            <span>
              {vsAi
                ? isXNext
                  ? 'Your Move (X)'
                  : 'Bot Thinking (O)...'
                : `Player ${isXNext ? 'X' : 'O'}'s Turn`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
