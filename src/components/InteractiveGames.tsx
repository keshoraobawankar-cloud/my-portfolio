import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, RotateCcw, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export function InteractiveGames() {
  const [activeGame, setActiveGame] = useState<'matrix' | 'tictactoe'>('matrix');

  const achievements = [
    { title: 'First Client Shipped', desc: 'Custom Business & PDF utility delivered' },
    { title: 'Algorithmic Practice', desc: 'C & Python problem-solving foundations' },
    { title: 'Interactive Prototypes', desc: 'Playable state logic & real-time feedback' },
    { title: 'Consistency Habit', desc: 'Steady daily progress over passive theory' },
  ];

  return (
    <section id="arcade" className="py-16 sm:py-24 md:py-28 border-b border-slate-200/80 dark:border-slate-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smooth Fade-In Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">04</span>
              <span aria-hidden="true">/</span>
              <span>Game Logic &amp; Interaction Lab</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Learn by playing. <span className="text-slate-500 dark:text-slate-400 font-normal">Iterate by doing.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Hands-on browser mini-games built to practice turn-based state logic, binary-search deduction, and real-time user feedback.
            </p>
          </div>

          {/* Mobile-safe Game Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium max-w-full overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => {
                setActiveGame('matrix');
                sounds.playClick();
              }}
              className={`relative px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeGame === 'matrix'
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {activeGame === 'matrix' && (
                <motion.span
                  layoutId="arcade-game-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80"
                />
              )}
              <span className="relative z-10">Number Guess &amp; Logic</span>
            </button>
            <button
              onClick={() => {
                setActiveGame('tictactoe');
                sounds.playClick();
              }}
              className={`relative px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeGame === 'tictactoe'
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {activeGame === 'tictactoe' && (
                <motion.span
                  layoutId="arcade-game-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80"
                />
              )}
              <span className="relative z-10">Tactical Tic-Tac-Toe</span>
            </button>
          </div>
        </motion.div>

        {/* Game Stage Container */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 shadow-sm p-5 sm:p-8 card-glow">
          {activeGame === 'matrix' ? <NumberGuessGame /> : <ArcadeTicTacToe />}
        </div>

        {/* Builder Milestones Strip */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/65 flex items-start gap-3 card-glow hover:border-indigo-400/50"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {ach.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {ach.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumberGuessGame() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guessInput, setGuessInput] = useState('');
  const [attempts, setAttempts] = useState<Array<{ guess: number; hint: string; diff: 'high' | 'low' | 'exact' }>>([]);
  const [gameWon, setGameWon] = useState(false);
  const [maxTries] = useState(7);

  const initGame = () => {
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
      setAttempts((prev) => [{ guess: val, hint: 'Bullseye! Exact match.', diff: 'exact' }, ...prev]);
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
          <Gamepad2 className="w-4 h-4 shrink-0" />
          <span>Number Logic Deduction</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Crack the Secret Value (1 — 100)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Use binary-search narrowing to find the secret number in {maxTries} tries or fewer.
        </p>
      </div>

      {/* Responsive Form Controls */}
      <form onSubmit={handleGuess} className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 max-w-sm mx-auto">
        <input
          type="number"
          min="1"
          max="100"
          value={guessInput}
          onChange={(e) => setGuessInput(e.target.value)}
          disabled={gameWon || isGameOver}
          placeholder="1–100"
          className="w-full sm:flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-center text-base focus:border-indigo-500 outline-none"
        />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            disabled={gameWon || isGameOver || !guessInput}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold text-xs font-mono transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[42px]"
          >
            Verify
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              initGame();
            }}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center"
            title="Reset game"
            aria-label="Reset game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </form>

      {gameWon && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Solved in {attempts.length} tries! Binary logic verified.</span>
        </div>
      )}

      {isGameOver && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Out of tries! Secret number was {targetNumber}. Tap reset to play again.</span>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 tabular-nums">
          <span>Attempts: {attempts.length} / {maxTries}</span>
          <span>Range: 1 – 100</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {attempts.map((att, index) => (
            <div
              key={index}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center justify-between gap-2 text-xs font-mono tabular-nums"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400">#{attempts.length - index}:</span>
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

function ArcadeTicTacToe() {
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

    const afterPlayer = calculateWinner(newBoard);
    if (afterPlayer) {
      if (afterPlayer.winner === 'X') {
        sounds.playSuccess();
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
      } else if (afterPlayer.winner === 'O') {
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
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Tactical Tic-Tac-Toe
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Play against the tactical bot or switch to 2-player local mode
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        <button
          onClick={() => {
            setVsAi(!vsAi);
            resetGame();
          }}
          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold transition-transform hover:scale-[1.02] cursor-pointer"
        >
          {vsAi ? 'AI Bot Mode' : '2-Player Mode'}
        </button>

        <div className="flex items-center gap-3 tabular-nums">
          <span>X: <strong className="text-indigo-600 dark:text-indigo-400">{scores.x}</strong></span>
          <span>{vsAi ? 'Bot' : 'O'}: <strong className="text-cyan-600 dark:text-cyan-400">{scores.o}</strong></span>
          <span>Draws: {scores.ties}</span>
        </div>

        <button
          onClick={resetGame}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
          title="Restart round"
          aria-label="Restart round"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5 max-w-[252px] mx-auto">
        {board.map((cell, idx) => {
          const isWin = result && result.line.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={cell !== null || !!result || (!isXNext && vsAi)}
              className={`h-18 sm:h-20 rounded-xl text-2xl sm:text-3xl font-bold font-mono transition-all flex items-center justify-center border cursor-pointer ${
                isWin
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {cell === 'X' && <span className="text-indigo-600 dark:text-indigo-400">X</span>}
              {cell === 'O' && <span className="text-cyan-600 dark:text-cyan-400">O</span>}
            </button>
          );
        })}
      </div>

      <div className="text-center text-xs font-mono text-slate-500 dark:text-slate-400">
        {result ? (
          result.winner === 'Tie' ? (
            <span className="font-semibold text-amber-500">Draw match! Good defense.</span>
          ) : (
            <span className="font-semibold text-emerald-500">Winner: {result.winner}!</span>
          )
        ) : (
          <span>
            {vsAi
              ? isXNext
                ? 'Your Move (X)'
                : 'Bot Calculating (O)...'
              : `Player ${isXNext ? 'X' : 'O'}'s Turn`}
          </span>
        )}
      </div>
    </div>
  );
}
