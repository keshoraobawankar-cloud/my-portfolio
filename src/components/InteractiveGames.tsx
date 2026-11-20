import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getTranslations } from '../data/translations';
import { useLocale } from '../context/LocaleContext';
import { KineticWordArrange } from './KineticWordArrange';
import { ThemeHeaderEmoji } from './ThemeHeaderEmoji';
import { ReadingTimeTag } from './ReadingTimeTag';
import { PortfolioTheme } from '../types';
import { sounds } from '../utils/audio';
import { WordFightArena } from './WordFightArena';

export function InteractiveGames({ theme }: { theme: PortfolioTheme }) {
  const [activeGame, setActiveGame] = useState<'wordfight' | 'matrix' | 'tictactoe'>('wordfight');
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <section
      id="arcade"
      data-snap-role="secondary"
      className="portfolio-snap-section py-16 sm:py-24 md:py-28"
    >
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
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <ThemeHeaderEmoji section="arcade" theme={theme} />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">04</span>
              <span aria-hidden="true">/</span>
              <span>{t.arcade.sectionLabel}</span>
              <ReadingTimeTag section="arcade" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              <KineticWordArrange
                key={`arcade-${locale}`}
                trigger="inView"
                intensity="section"
                segments={[
                  { text: t.arcade.headingLead },
                  { text: t.arcade.headingMuted, className: 'text-slate-500 dark:text-slate-400 font-normal' },
                ]}
              />
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t.arcade.subtitle}
            </p>
          </div>

          {/* Mobile-safe Game Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium max-w-full overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => {
                setActiveGame('wordfight');
                sounds.playClick();
              }}
              className={`relative px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeGame === 'wordfight'
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {activeGame === 'wordfight' && (
                <motion.span
                  layoutId="arcade-game-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80"
                />
              )}
              <span className="relative z-10">{t.arcade.tabs.wordfight}</span>
            </button>
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
              <span className="relative z-10">{t.arcade.tabs.matrix}</span>
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
              <span className="relative z-10">{t.arcade.tabs.tictactoe}</span>
            </button>
          </div>
        </motion.div>

        {/* Game Stage Container */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-slate-200/90 dark:border-slate-800/95 bg-white/90 dark:bg-slate-900/80 shadow-sm p-5 sm:p-8 card-glow"
        >
          <AnimatePresence mode="wait">
            {activeGame === 'wordfight' ? (
              <motion.div
                key="wordfight-game"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <WordFightArena theme={theme} />
              </motion.div>
            ) : activeGame === 'matrix' ? (
              <motion.div
                key="matrix-game"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <NumberGuessGame />
              </motion.div>
            ) : (
              <motion.div
                key="tictactoe-game"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ArcadeTicTacToe />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Builder Milestones Strip */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.arcade.achievements.map((ach, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumberGuessGame() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guessInput, setGuessInput] = useState('');
  const [attempts, setAttempts] = useState<Array<{ guess: number; diff: 'high' | 'low' | 'exact' }>>([]);
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
      setAttempts((prev) => [{ guess: val, diff: 'exact' }, ...prev]);
      setGameWon(true);
    } else if (val > targetNumber) {
      setAttempts((prev) => [{ guess: val, diff: 'high' }, ...prev]);
    } else {
      setAttempts((prev) => [{ guess: val, diff: 'low' }, ...prev]);
    }

    setGuessInput('');
  };

  const isGameOver = !gameWon && attempts.length >= maxTries;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4 shrink-0" />
          <span>{t.arcade.numberGame.badge}</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t.arcade.numberGame.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {t.arcade.numberGame.subtitlePrefix} {maxTries} {t.arcade.numberGame.subtitleSuffix}
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
          placeholder={t.arcade.numberGame.placeholder}
          className="w-full sm:flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-center text-base focus:border-indigo-500 outline-none"
        />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            disabled={gameWon || isGameOver || !guessInput}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold text-xs font-mono transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[42px]"
          >
            {t.arcade.numberGame.verify}
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              initGame();
            }}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center"
            title={t.arcade.numberGame.resetAria}
            aria-label={t.arcade.numberGame.resetAria}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </form>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            {t.arcade.numberGame.solvedPrefix} {attempts.length} {t.arcade.numberGame.solvedSuffix}
          </span>
        </motion.div>
      )}

      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>
            {t.arcade.numberGame.gameOverPrefix} {targetNumber}
            {t.arcade.numberGame.gameOverSuffix}
          </span>
        </motion.div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 tabular-nums">
          <span>
            {t.arcade.numberGame.attemptsLabel} {attempts.length} / {maxTries}
          </span>
          <span>{t.arcade.numberGame.rangeLabel}</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {attempts.map((att, index) => {
            const hint =
              att.diff === 'exact'
                ? t.arcade.numberGame.bullseye
                : att.diff === 'high'
                  ? t.arcade.numberGame.lower
                  : t.arcade.numberGame.higher;
            return (
              <motion.div
                key={`${attempts.length - index}-${att.guess}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
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
                  {hint}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ArcadeTicTacToe() {
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
          {t.arcade.ticTacToe.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {t.arcade.ticTacToe.subtitle}
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
          {vsAi ? t.arcade.ticTacToe.aiMode : t.arcade.ticTacToe.twoPlayerMode}
        </button>

        <div className="flex items-center gap-3 tabular-nums">
          <span>X: <strong className="text-indigo-600 dark:text-indigo-400">{scores.x}</strong></span>
          <span>
            {vsAi ? t.arcade.ticTacToe.botLabel : 'O'}:{' '}
            <strong className="text-cyan-600 dark:text-cyan-400">{scores.o}</strong>
          </span>
          <span>
            {t.arcade.ticTacToe.drawsLabel} {scores.ties}
          </span>
        </div>

        <button
          onClick={resetGame}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
          title={t.arcade.ticTacToe.restartAria}
          aria-label={t.arcade.ticTacToe.restartAria}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5 max-w-[252px] mx-auto">
        {board.map((cell, idx) => {
          const isWin = result && result.line.includes(idx);
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleClick(idx)}
              disabled={cell !== null || !!result || (!isXNext && vsAi)}
              className={`h-18 sm:h-20 rounded-xl text-2xl sm:text-3xl font-bold font-mono transition-all flex items-center justify-center border cursor-pointer ${
                isWin
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {cell === 'X' && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  X
                </motion.span>
              )}
              {cell === 'O' && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-cyan-600 dark:text-cyan-400"
                >
                  O
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-xs font-mono text-slate-500 dark:text-slate-400">
        {result ? (
          result.winner === 'Tie' ? (
            <span className="font-semibold text-amber-500">{t.arcade.ticTacToe.drawMatch}</span>
          ) : (
            <span className="font-semibold text-emerald-500">
              {t.arcade.ticTacToe.winnerPrefix} {result.winner}!
            </span>
          )
        ) : (
          <span>
            {vsAi
              ? isXNext
                ? t.arcade.ticTacToe.yourMove
                : t.arcade.ticTacToe.botCalculating
              : `${t.arcade.ticTacToe.playerTurnPrefix} ${isXNext ? 'X' : 'O'}${t.arcade.ticTacToe.playerTurnSuffix}`}
          </span>
        )}
      </div>
    </div>
  );
}
