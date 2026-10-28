import { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw, Trophy, Sparkles, HelpCircle, Flame, Check, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

export function InteractiveGames() {
  const [activeGame, setActiveGame] = useState<'matrix' | 'tictactoe'>('matrix');

  // Gamified achievements list
  const achievements = [
    { title: 'First Client Delivered', desc: 'Custom Business & PDF tool shipped', unlocked: true, icon: '🚀' },
    { title: 'DOM Mastery', desc: 'Interactive state logic without UI bloat', unlocked: true, icon: '⚡' },
    { title: 'Low-Level Roots', desc: 'C pointer & memory fundamentals', unlocked: true, icon: '🧠' },
    { title: 'Consistency Creed', desc: 'Daily code exploration habit', unlocked: true, icon: '🔥' },
  ];

  return (
    <section id="arcade" className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">04</span>
              <span aria-hidden="true">/</span>
              <span>GAME LOGIC & INTERACTION LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Learn by playing. <span className="text-slate-400 dark:text-slate-500 font-normal">Iterate by doing.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Directly aligned with Technical Club Domain 02 recruitment tasks. Demonstrating browser-based game loops, state machines, and real-time user feedback.
            </p>
          </div>

          {/* Game Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium shrink-0">
            <button
              onClick={() => {
                setActiveGame('matrix');
                sounds.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeGame === 'matrix'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Number Guess & Logic
            </button>
            <button
              onClick={() => {
                setActiveGame('tictactoe');
                sounds.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeGame === 'tictactoe'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tactical Tic-Tac-Toe
            </button>
          </div>
        </div>

        {/* Game Stage Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 sm:p-8">
          {activeGame === 'matrix' ? <NumberGuessGame /> : <ArcadeTicTacToe />}
        </div>

        {/* Gamified Achievements Strip */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-start gap-3"
            >
              <span className="text-xl">{ach.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {ach.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {ach.desc}
                </p>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold inline-block mt-1">
                  ✓ Unlocked
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Game 1: Number Logic & Binary Deduction Game
 */
function NumberGuessGame() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guessInput, setGuessInput] = useState('');
  const [attempts, setAttempts] = useState<Array<{ guess: number; hint: string; diff: 'high' | 'low' | 'exact' }>>([]);
  const [gameWon, setGameWon] = useState(false);
  const [maxTries] = useState(7);

  const initGame = () => {
    // Random secret number between 1 and 100
    const secret = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(secret);
    setAttempts([]);
    setGameWon(false);
    setGuessInput('');
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(guessInput, 10);
    if (isNaN(val) || val < 1 || val > 100) return;

    sounds.playMove();

    if (val === targetNumber) {
      sounds.playSuccess();
      setAttempts((prev) => [{ guess: val, hint: 'Bullseye! Perfect deduction.', diff: 'exact' }, ...prev]);
      setGameWon(true);
    } else if (val > targetNumber) {
      setAttempts((prev) => [{ guess: val, hint: 'Target is Lower ↓', diff: 'high' }, ...prev]);
    } else {
      setAttempts((prev) => [{ guess: val, hint: 'Target is Higher ↑', diff: 'low' }, ...prev]);
    }

    setGuessInput('');
  };

  const isGameOver = !gameWon && attempts.length >= maxTries;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>Number Logic Deduction Game</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Crack the Secret Value (1 — 100)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Use binary-search logic to deduce the number in {maxTries} attempts or fewer.
        </p>
      </div>

      {/* Input / Control Form */}
      <form onSubmit={handleGuess} className="flex items-center gap-3 max-w-sm mx-auto">
        <input
          type="number"
          min="1"
          max="100"
          value={guessInput}
          onChange={(e) => setGuessInput(e.target.value)}
          disabled={gameWon || isGameOver}
          placeholder="Enter 1–100"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-center text-base focus:border-indigo-500 outline-none"
        />
        <button
          type="submit"
          disabled={gameWon || isGameOver || !guessInput}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-semibold text-xs font-mono cursor-pointer transition-colors shadow-xs"
        >
          Verify
        </button>
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            initGame();
          }}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          title="Reset game"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </form>

      {/* Game State Message */}
      {gameWon && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Solved in {attempts.length} tries! Algorithmic logic verified.</span>
        </div>
      )}

      {isGameOver && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>Maximum attempts reached! Secret number was: {targetNumber}. Try again!</span>
        </div>
      )}

      {/* Attempts log */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Attempts: {attempts.length} / {maxTries}</span>
          <span>Target Range: 1 – 100</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {attempts.map((att, index) => (
            <div
              key={index}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Attempt #{attempts.length - index}:</span>
                <span className="font-bold text-slate-900 dark:text-white">{att.guess}</span>
              </div>
              <span
                className={`font-semibold ${
                  att.diff === 'exact'
                    ? 'text-emerald-500'
                    : att.diff === 'high'
                    ? 'text-cyan-500'
                    : 'text-amber-500'
                }`}
              >
                {att.hint}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Game 2: Tactical Tic-Tac-Toe Arcade with bot AI
 */
function ArcadeTicTacToe() {
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
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    // Can AI win?
    for (const [a, b, c] of lines) {
      const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
      if (vals.filter((v) => v === 'O').length === 2 && vals.includes(null)) {
        return [a, b, c][vals.indexOf(null)];
      }
    }
    // Can AI block player?
    for (const [a, b, c] of lines) {
      const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
      if (vals.filter((v) => v === 'X').length === 2 && vals.includes(null)) {
        return [a, b, c][vals.indexOf(null)];
      }
    }
    // Center
    if (!currentBoard[4]) return 4;
    // Corners
    const corners = [0, 2, 6, 8].filter((i) => !currentBoard[i]);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    // Any empty
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
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Tactical Tic-Tac-Toe
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          State machine with turn cycles and automatic win heuristics
        </p>
      </div>

      {/* Mode & Scoreboard */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <button
          onClick={() => {
            setVsAi(!vsAi);
            resetGame();
          }}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold cursor-pointer"
        >
          {vsAi ? 'AI Bot Mode' : '2-Player Mode'}
        </button>

        <div className="flex items-center gap-3 tabular-nums">
          <span>You: <strong className="text-indigo-600 dark:text-indigo-400">{scores.x}</strong></span>
          <span>Bot: <strong className="text-cyan-600 dark:text-cyan-400">{scores.o}</strong></span>
          <span>Draws: {scores.ties}</span>
        </div>

        <button
          onClick={resetGame}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
          title="Restart round"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3x3 Board */}
      <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
        {board.map((cell, idx) => {
          const isWin = result && result.line.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={cell !== null || !!result || (!isXNext && vsAi)}
              className={`h-20 rounded-xl text-3xl font-bold font-mono transition-all flex items-center justify-center border cursor-pointer ${
                isWin
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {cell === 'X' && <span className="text-indigo-600 dark:text-indigo-400">X</span>}
              {cell === 'O' && <span className="text-cyan-600 dark:text-cyan-400">O</span>}
            </button>
          );
        })}
      </div>

      <div className="text-center text-xs font-mono text-slate-500">
        {result ? (
          result.winner === 'Tie' ? (
            <span className="font-semibold text-amber-500">Draw match! Good tactical defense.</span>
          ) : (
            <span className="font-semibold text-emerald-500">Winner: {result.winner}!</span>
          )
        ) : (
          <span>{isXNext ? 'Your Move (X)' : 'Opponent Calculating (O)...'}</span>
        )}
      </div>
    </div>
  );
}
