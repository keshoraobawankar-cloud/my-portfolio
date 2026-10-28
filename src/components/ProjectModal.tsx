import { useState } from 'react';
import { X, CheckCircle, ExternalLink, Play, RotateCcw, FileText, ShieldAlert, Award, ChevronRight, Layers, FileCode, Check } from 'lucide-react';
import { Project } from '../types';
import { sounds } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title and Summary */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Live Demo Area */}
          {project.hasInteractiveDemo && (
            <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-900 dark:text-indigo-300">
                    Live Interactive Demonstration
                  </span>
                </div>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                  Fully Functioning Prototype
                </span>
              </div>

              {project.demoType === 'pdf-app' && <PdfAppDemo />}
              {project.demoType === 'food-safety' && <FoodSafetyDemo />}
              {project.demoType === 'game-logic' && <GameProjectsDemo />}
            </div>
          )}

          {/* Deep-dive details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500 mb-2">
                  Project Overview & Problem Statement
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500 mb-3">
                  Key Engineering Milestones
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar metadata */}
            <div className="md:col-span-4 space-y-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 dark:text-slate-500">Client / Context</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  {project.clientOrContext}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-slate-400 dark:text-slate-500">My Role</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  {project.role}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-slate-400 dark:text-slate-500">Technologies & Concepts</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Documented for Harsh Bawankar Portfolio
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Demo 1: Client Business & PDF Utility Simulation
 */
function PdfAppDemo() {
  const [selectedDoc, setSelectedDoc] = useState<'invoice' | 'contract' | 'receipt'>('invoice');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL · AUDIT COPY');
  const [hasWatermark, setHasWatermark] = useState(true);
  const [processedStatus, setProcessedStatus] = useState<string | null>(null);

  const sampleDocs = {
    invoice: { title: 'Invoice_INV-2026-081.pdf', pages: 3, size: '242 KB', client: 'Apex Traders Nagpur' },
    contract: { title: 'Service_Agreement_v2.pdf', pages: 8, size: '610 KB', client: 'Ketan & Associates' },
    receipt: { title: 'Payment_Voucher_March.pdf', pages: 1, size: '94 KB', client: 'Direct Commercial' },
  };

  const handleProcess = () => {
    sounds.playMove();
    setProcessedStatus('Processing batch operations and stamp overlays...');
    setTimeout(() => {
      sounds.playSuccess();
      setProcessedStatus(`Success! "${sampleDocs[selectedDoc].title}" stamped with watermark: "${hasWatermark ? watermarkText : 'None'}" and prepared for client export.`);
    }, 450);
  };

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {(Object.keys(sampleDocs) as Array<keyof typeof sampleDocs>).map((key) => (
          <button
            key={key}
            onClick={() => {
              setSelectedDoc(key);
              sounds.playClick();
              setProcessedStatus(null);
            }}
            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
              selectedDoc === key
                ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-white capitalize">{key}</span>
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-1">{sampleDocs[key].title}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{sampleDocs[key].pages} pgs · {sampleDocs[key].size}</p>
          </button>
        ))}
      </div>

      {/* Simulator Controls */}
      <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="watermark-chk"
              checked={hasWatermark}
              onChange={(e) => {
                setHasWatermark(e.target.checked);
                sounds.playClick();
              }}
              className="rounded text-indigo-600 cursor-pointer"
            />
            <label htmlFor="watermark-chk" className="cursor-pointer text-slate-700 dark:text-slate-200 font-medium">
              Apply Client Watermark Stamp
            </label>
          </div>

          {hasWatermark && (
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
              placeholder="Watermark text..."
            />
          )}
        </div>

        {/* Live Document Preview Box */}
        <div className="relative p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950/60 flex flex-col items-center justify-center min-h-[120px] text-center overflow-hidden">
          {hasWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-slate-300/40 dark:text-slate-700/50 -rotate-12">
                {watermarkText}
              </span>
            </div>
          )}
          <FileText className="w-8 h-8 text-indigo-500 mb-2 relative z-10" />
          <span className="font-bold text-slate-900 dark:text-white relative z-10">
            {sampleDocs[selectedDoc].title}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 relative z-10">
            Client: {sampleDocs[selectedDoc].client} · Status: Verified Layout
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={handleProcess}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Execute PDF Pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-slate-500">
            Simulates the custom client-side processing pipeline
          </span>
        </div>

        {processedStatus && (
          <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
            {processedStatus}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Interactive Demo 2: Food Safety & Hygiene Audit Simulator
 */
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
  const grade = totalScore >= 90 ? 'Grade A (Exemplary)' : totalScore >= 70 ? 'Grade B (Compliant)' : 'Grade C (Action Required)';

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-slate-500 text-[11px]">Campus Cafe / Food Vendor Hygiene Audit</span>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Real-Time Compliance Score</h4>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {totalScore} / 100
            </span>
            <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              {grade}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
              item.checked
                ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {}}
                className="rounded text-indigo-600 cursor-pointer pointer-events-none"
              />
              <span className="font-sans font-medium text-xs">{item.label}</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">+{item.weight} pts</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
        <span>Structure designed for instant daily inspection logs by campus health monitors.</span>
        <button
          onClick={() => {
            sounds.playClick();
            setChecklist((prev) => prev.map((item) => ({ ...item, checked: true })));
          }}
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer shrink-0 ml-2"
        >
          Check All
        </button>
      </div>
    </div>
  );
}

/**
 * Interactive Demo 3: Game Projects & Logic Engine (Playable Tic-Tac-Toe with heuristic bot + score tracking)
 */
function GameProjectsDemo() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [vsAi, setVsAi] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
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
    // Basic AI strategy: win if possible, block opponent if possible, or take center/corners
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    // 1. Can AI win?
    for (const [a, b, c] of lines) {
      const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
      if (vals.filter((v) => v === 'O').length === 2 && vals.includes(null)) {
        const emptyIdx = [a, b, c][vals.indexOf(null)];
        return emptyIdx;
      }
    }
    // 2. Can AI block player?
    for (const [a, b, c] of lines) {
      const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
      if (vals.filter((v) => v === 'X').length === 2 && vals.includes(null)) {
        const emptyIdx = [a, b, c][vals.indexOf(null)];
        return emptyIdx;
      }
    }
    // 3. Take center if available
    if (!currentBoard[4]) return 4;
    // 4. Take available corner
    const corners = [0, 2, 6, 8].filter((i) => !currentBoard[i]);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    // 5. Random empty
    const empties = currentBoard.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    return empties[Math.floor(Math.random() * empties.length)];
  };

  const handleClick = (index: number) => {
    if (board[index] || result) return;

    sounds.playMove();
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const afterPlayer = calculateWinner(newBoard);
    if (afterPlayer) {
      if (afterPlayer.winner === 'X') {
        sounds.playSuccess();
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (afterPlayer.winner === 'Tie') {
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
      setIsXNext(false);
    }
  };

  const resetGame = () => {
    sounds.playClick();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="space-y-4">
      {/* Game Bar */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setVsAi(!vsAi);
              resetGame();
            }}
            className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
          >
            Mode: {vsAi ? 'vs Algorithmic Bot' : '2-Player Pass'}
          </button>
        </div>

        <div className="flex items-center gap-3 tabular-nums">
          <span>You (X): <strong className="text-indigo-600 dark:text-indigo-400">{scores.x}</strong></span>
          <span>Bot (O): <strong className="text-cyan-600 dark:text-cyan-400">{scores.o}</strong></span>
          <span>Ties: {scores.ties}</span>
        </div>

        <button
          onClick={resetGame}
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
          title="Restart round"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-full max-w-[240px]">
          {board.map((cell, idx) => {
            const isWinningCell = result && result.line.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleClick(idx)}
                disabled={cell !== null || !!result || (!isXNext && vsAi)}
                className={`h-18 rounded-xl text-2xl font-bold font-mono transition-all flex items-center justify-center border cursor-pointer ${
                  isWinningCell
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-900 dark:text-white'
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
              <span className="font-semibold text-amber-500">It's a draw! Well played.</span>
            ) : (
              <span className="font-semibold text-emerald-500">Player {result.winner} wins!</span>
            )
          ) : (
            <span>Turn: {isXNext ? 'Your Move (X)' : 'Bot Thinking (O)...'}</span>
          )}
        </div>
      </div>
    </div>
  );
}
