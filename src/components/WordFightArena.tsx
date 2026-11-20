import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Swords, Shield, RotateCcw, Zap, Trophy, AlertTriangle, Play } from 'lucide-react';
import { PortfolioTheme } from '../types';
import { useLocale } from '../context/LocaleContext';
import { getTranslations } from '../data/translations';
import { sounds } from '../utils/audio';
import { fireThemeConfetti } from '../utils/confetti';

type GameState = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface WordEncounter {
  enemyWord: string;
  counterWord: string;
  decoys: [string, string];
}

const WORD_ENCOUNTERS: WordEncounter[] = [
  { enemyWord: 'SYNTAX', counterWord: 'PARSE', decoys: ['DRIFT', 'STALL'] },
  { enemyWord: 'GLITCH', counterWord: 'PATCH', decoys: ['CRASH', 'BLUR'] },
  { enemyWord: 'LOOP', counterWord: 'BREAK', decoys: ['SPIN', 'WAIT'] },
  { enemyWord: 'LAG', counterWord: 'CACHE', decoys: ['DROP', 'HOLD'] },
  { enemyWord: 'NULL', counterWord: 'GUARD', decoys: ['VOID', 'SKIP'] },
  { enemyWord: 'ERROR', counterWord: 'DEBUG', decoys: ['PANIC', 'IGNORE'] },
  { enemyWord: 'CLUTTER', counterWord: 'REFINE', decoys: ['PILE', 'HIDE'] },
  { enemyWord: 'LEAK', counterWord: 'FLUSH', decoys: ['SPILL', 'IDLE'] },
  { enemyWord: 'BLOCK', counterWord: 'ASYNC', decoys: ['FREEZE', 'QUEUE'] },
  { enemyWord: 'CHAOS', counterWord: 'LOGIC', decoys: ['GUESS', 'NOISE'] },
];

const MAX_HP = 100;
const ROUND_SECONDS = 8;
const TOTAL_ROUNDS = 5;

function buildChoices(encounter: WordEncounter): string[] {
  const list = [encounter.counterWord, encounter.decoys[0], encounter.decoys[1]];
  // Deterministic rotation based on word length + char code so order varies cleanly
  const shift = (encounter.counterWord.charCodeAt(0) + encounter.enemyWord.length) % 3;
  return [...list.slice(shift), ...list.slice(0, shift)];
}

export function WordFightArena({ theme }: { theme: PortfolioTheme }) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const wf = t.arcade.wordFight;
  const prefersReduced = useReducedMotion();

  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [roundIndex, setRoundIndex] = useState(0);
  const [playerHp, setPlayerHp] = useState(MAX_HP);
  const [bossHp, setBossHp] = useState(MAX_HP);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [wordsDefeated, setWordsDefeated] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [typedInput, setTypedInput] = useState('');
  const [deck, setDeck] = useState<WordEncounter[]>(() => WORD_ENCOUNTERS.slice(0, TOTAL_ROUNDS));
  const [clashEvent, setClashEvent] = useState<{
    id: number;
    kind: 'hit' | 'crit' | 'miss' | 'timeout';
    damageText: string;
    label: string;
  } | null>(null);

  const roundTimerRef = useRef<number | null>(null);
  const clashClearRef = useRef<number | null>(null);
  const nextRoundRef = useRef<number | null>(null);
  const isResolvingRef = useRef(false);
  const timeoutHandledRoundRef = useRef<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearAllTimers = useCallback(() => {
    if (roundTimerRef.current !== null) {
      window.clearInterval(roundTimerRef.current);
      roundTimerRef.current = null;
    }
    if (clashClearRef.current !== null) {
      window.clearTimeout(clashClearRef.current);
      clashClearRef.current = null;
    }
    if (nextRoundRef.current !== null) {
      window.clearTimeout(nextRoundRef.current);
      nextRoundRef.current = null;
    }
  }, []);

  useEffect(() => clearAllTimers, [clearAllTimers]);

  const currentEncounter = deck[roundIndex] ?? WORD_ENCOUNTERS[0];
  const choiceWords = buildChoices(currentEncounter);

  const showClash = useCallback(
    (kind: 'hit' | 'crit' | 'miss' | 'timeout', damageText: string, label: string) => {
      setClashEvent({ id: Date.now(), kind, damageText, label });
      if (clashClearRef.current !== null) {
        window.clearTimeout(clashClearRef.current);
      }
      clashClearRef.current = window.setTimeout(() => {
        setClashEvent(null);
        clashClearRef.current = null;
      }, 650);
    },
    []
  );

  const startFight = () => {
    clearAllTimers();
    isResolvingRef.current = false;
    timeoutHandledRoundRef.current = -1;
    sounds.playClick();
    const shuffled = [...WORD_ENCOUNTERS].sort(() => Math.random() - 0.5).slice(0, TOTAL_ROUNDS);
    setDeck(shuffled);
    setRoundIndex(0);
    setPlayerHp(MAX_HP);
    setBossHp(MAX_HP);
    setCombo(0);
    setBestCombo(0);
    setScore(0);
    setWordsDefeated(0);
    setTimeLeft(ROUND_SECONDS);
    setTypedInput('');
    setClashEvent(null);
    setGameState('PLAYING');
    window.setTimeout(() => inputRef.current?.focus(), 60);
  };

  const resetToMenu = () => {
    clearAllTimers();
    isResolvingRef.current = false;
    timeoutHandledRoundRef.current = -1;
    sounds.playClick();
    setClashEvent(null);
    setTypedInput('');
    setGameState('TITLE_MENU');
  };

  const advanceOrEnd = useCallback(
    (nextPlayerHp: number, nextBossHp: number, currentRound: number) => {
      isResolvingRef.current = false;
      if (nextBossHp <= 0) {
        clearAllTimers();
        setGameState('GAME_OVER');
        sounds.playSuccess();
        fireThemeConfetti(theme, 'project-complete');
        return;
      }
      if (nextPlayerHp <= 0) {
        clearAllTimers();
        setGameState('GAME_OVER');
        sounds.playTie();
        return;
      }

      const nextRound = currentRound + 1;
      if (nextRound >= deck.length) {
        // Sudden-death wrap if player hasn't finished boss yet
        setDeck((prev) => [
          ...prev,
          WORD_ENCOUNTERS[Math.floor(Math.random() * WORD_ENCOUNTERS.length)],
        ]);
      }
      setRoundIndex(nextRound);
      setTimeLeft(ROUND_SECONDS);
      setTypedInput('');
    },
    [clearAllTimers, deck.length, theme]
  );

  const resolveCounterStrike = useCallback(
    (isTypedCrit: boolean) => {
      if (gameState !== 'PLAYING' || isResolvingRef.current) return;
      isResolvingRef.current = true;
      if (roundTimerRef.current !== null) {
        window.clearInterval(roundTimerRef.current);
        roundTimerRef.current = null;
      }

      const nextCombo = combo + 1;
      const baseDmg = isTypedCrit ? 30 : 20;
      const comboBonus = Math.min(10, (nextCombo - 1) * 5);
      const totalDamage = baseDmg + comboBonus;
      const nextBossHp = Math.max(0, bossHp - totalDamage);

      sounds.playMove();
      setBossHp(nextBossHp);
      setCombo(nextCombo);
      setBestCombo((prev) => Math.max(prev, nextCombo));
      setWordsDefeated((prev) => prev + 1);
      setScore((prev) => prev + totalDamage * 10 + timeLeft * 15);

      showClash(
        isTypedCrit ? 'crit' : 'hit',
        `-${totalDamage} HP`,
        isTypedCrit ? wf.clashCrit : wf.clashHit
      );

      nextRoundRef.current = window.setTimeout(() => {
        nextRoundRef.current = null;
        advanceOrEnd(playerHp, nextBossHp, roundIndex);
      }, 420);
    },
    [
      advanceOrEnd,
      bossHp,
      combo,
      gameState,
      playerHp,
      roundIndex,
      showClash,
      timeLeft,
      wf.clashCrit,
      wf.clashHit,
    ]
  );

  const handleWrongPick = () => {
    if (gameState !== 'PLAYING' || isResolvingRef.current) return;
    sounds.playTie();
    const dmg = 10;
    const nextHp = Math.max(0, playerHp - dmg);
    setPlayerHp(nextHp);
    setCombo(0);
    showClash('miss', `-${dmg} HP`, wf.clashMiss);

    if (nextHp <= 0) {
      isResolvingRef.current = true;
      clearAllTimers();
      nextRoundRef.current = window.setTimeout(() => {
        nextRoundRef.current = null;
        isResolvingRef.current = false;
        setGameState('GAME_OVER');
      }, 360);
    }
  };

  // Round countdown timer
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    roundTimerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (roundTimerRef.current !== null) {
            window.clearInterval(roundTimerRef.current);
            roundTimerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (roundTimerRef.current !== null) {
        window.clearInterval(roundTimerRef.current);
        roundTimerRef.current = null;
      }
    };
  }, [gameState, roundIndex]);

  // Handle round timeout strike cleanly at most once per round when timeLeft reaches 0
  useEffect(() => {
    if (
      gameState !== 'PLAYING' ||
      timeLeft !== 0 ||
      isResolvingRef.current ||
      timeoutHandledRoundRef.current === roundIndex
    ) {
      return;
    }

    timeoutHandledRoundRef.current = roundIndex;
    isResolvingRef.current = true;

    const dmg = 25;
    const nextHp = Math.max(0, playerHp - dmg);
    sounds.playTie();
    setPlayerHp(nextHp);
    setCombo(0);
    showClash('timeout', `-${dmg} HP`, wf.clashTimeout);

    nextRoundRef.current = window.setTimeout(() => {
      nextRoundRef.current = null;
      advanceOrEnd(nextHp, bossHp, roundIndex);
    }, 450);
  }, [
    timeLeft,
    gameState,
    playerHp,
    bossHp,
    roundIndex,
    advanceOrEnd,
    showClash,
    wf.clashTimeout,
  ]);

  const handleTypingChange = (value: string) => {
    const normalized = value.toUpperCase().replace(/[^A-Z]/g, '');
    setTypedInput(normalized);

    if (normalized === currentEncounter.counterWord) {
      resolveCounterStrike(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedInput.trim().toUpperCase() === currentEncounter.counterWord) {
      resolveCounterStrike(true);
    } else if (typedInput.trim().length > 0) {
      handleWrongPick();
      setTypedInput('');
    }
  };

  const isComic = theme === 'comic';
  const isSystem = theme === 'system';

  const clashBadgeClasses =
    clashEvent?.kind === 'crit'
      ? isComic
        ? 'bg-amber-300 text-slate-950 border-2 border-slate-950 shadow-[3px_3px_0_#0f172a]'
        : isSystem
          ? 'bg-cyan-400 text-slate-950 border border-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.65)]'
          : 'bg-amber-400 text-slate-950 border border-amber-300'
      : clashEvent?.kind === 'hit'
        ? isComic
          ? 'bg-rose-600 text-white border-2 border-slate-950 shadow-[3px_3px_0_#0f172a]'
          : 'bg-emerald-500 text-white border border-emerald-400'
        : 'bg-rose-600 text-white border border-rose-400';

  const didWin = bossHp <= 0;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header Row */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <Swords className="w-4 h-4 shrink-0" />
          <span>{wf.badge}</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {wf.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {wf.subtitle}
        </p>
      </div>

      {/* Top HUD Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/75 font-mono text-xs tabular-nums">
        {/* Player HP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{wf.playerLabel}</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {wf.hpLabel}: {playerHp}/{MAX_HP}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div
              animate={{ width: `${playerHp}%` }}
              transition={{ duration: 0.2 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>

        {/* Center Match Telemetry */}
        <div className="flex items-center justify-between sm:justify-center gap-3 sm:border-x border-slate-200 dark:border-slate-800 sm:px-3">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block">{wf.roundLabel}</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {gameState === 'PLAYING' ? `${roundIndex + 1}` : '—'}
            </span>
          </div>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block">{wf.comboLabel}</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              x{Math.max(1, combo)}
            </span>
          </div>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block">{wf.scoreLabel}</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{score}</span>
          </div>
        </div>

        {/* Boss HP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Swords className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{wf.bossLabel}</span>
            </span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">
              {wf.hpLabel}: {bossHp}/{MAX_HP}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div
              animate={{ width: `${bossHp}%` }}
              transition={{ duration: 0.2 }}
              className="h-full bg-rose-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Main Animated Word Duel Arena */}
      <div
        className={`relative rounded-2xl border p-5 sm:p-7 overflow-hidden min-h-[250px] flex flex-col justify-between ${
          isComic
            ? 'bg-[#fbf7ec] border-2 border-slate-950 shadow-[5px_5px_0_#0f172a] text-slate-950'
            : isSystem
              ? 'bg-[#030916]/95 border-cyan-400/45 text-cyan-50 shadow-[0_0_24px_-8px_rgba(34,211,238,0.3)]'
              : 'bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800'
        }`}
      >
        {gameState === 'TITLE_MENU' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-4">
            {/* Live Sparring Preview Animation */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 select-none">
              <motion.div
                animate={
                  prefersReduced
                    ? undefined
                    : { x: [0, 18, -4, 0], rotate: [0, 4, -2, 0] }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                className={`px-4 py-2.5 rounded-xl font-mono font-extrabold text-sm sm:text-base border ${
                  isComic
                    ? 'bg-amber-300 border-2 border-slate-950 text-slate-950 shadow-[3px_3px_0_#0f172a]'
                    : isSystem
                      ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-200'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                }`}
              >
                LOGIC
              </motion.div>

              <motion.div
                animate={prefersReduced ? undefined : { scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-amber-500"
                aria-hidden="true"
              >
                <Zap className="w-6 h-6 fill-current" />
              </motion.div>

              <motion.div
                animate={
                  prefersReduced
                    ? undefined
                    : { x: [0, -18, 4, 0], rotate: [0, -4, 2, 0] }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                className={`px-4 py-2.5 rounded-xl font-mono font-extrabold text-sm sm:text-base border ${
                  isComic
                    ? 'bg-rose-600 border-2 border-slate-950 text-white shadow-[3px_3px_0_#0f172a]'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-300'
                }`}
              >
                BUG
              </motion.div>
            </div>

            <button
              type="button"
              onClick={startFight}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer whitespace-nowrap min-h-[44px] ${
                isComic
                  ? 'bg-rose-600 text-white border-2 border-slate-950 shadow-[4px_4px_0_#0f172a] font-bold'
                  : isSystem
                    ? 'bg-cyan-400 text-slate-950 font-mono font-bold hover:bg-cyan-300'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
              }`}
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span>{wf.startBtn}</span>
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className="flex-1 flex flex-col justify-between gap-6">
            {/* Round Timer Progress Bar */}
            <div className="flex items-center justify-between gap-3 text-xs font-mono tabular-nums">
              <span className="text-slate-500 dark:text-slate-400">
                {wf.typingHint}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`font-bold ${
                    timeLeft <= 2
                      ? 'text-rose-500'
                      : isSystem
                        ? 'text-cyan-300'
                        : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {timeLeft}s
                </span>
                <button
                  type="button"
                  onClick={resetToMenu}
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                  title={wf.resetAria}
                  aria-label={wf.resetAria}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Duel Face-Off Stage */}
            <div className="relative grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-2">
              {/* Challenger Counter Word Card */}
              <motion.div
                key={`player-${roundIndex}-${clashEvent?.id ?? 'idle'}`}
                animate={
                  prefersReduced
                    ? undefined
                    : clashEvent?.kind === 'hit' || clashEvent?.kind === 'crit'
                      ? { x: [0, 72, -8, 0], rotate: [0, 6, -2, 0], scale: [1, 1.12, 1] }
                      : clashEvent?.kind === 'miss' || clashEvent?.kind === 'timeout'
                        ? { x: [0, -10, 10, -6, 0] }
                        : { y: [0, -3, 0] }
                }
                transition={{
                  duration: clashEvent ? 0.36 : 2.2,
                  repeat: clashEvent ? 0 : Infinity,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`p-4 rounded-xl border text-center space-y-1.5 ${
                  isComic
                    ? 'bg-white border-2 border-slate-950 shadow-[4px_4px_0_#0f172a]'
                    : isSystem
                      ? 'bg-cyan-950/60 border-cyan-400/50'
                      : 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/40 shadow-xs'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  {wf.playerLabel} · {wf.readyState}
                </span>
                <div className="font-mono text-lg sm:text-xl font-extrabold tracking-widest min-h-[28px] flex items-center justify-center gap-0.5">
                  {currentEncounter.counterWord.split('').map((char, idx) => {
                    const matched = typedInput[idx] === char;
                    return (
                      <span
                        key={idx}
                        className={
                          matched
                            ? 'text-emerald-500 scale-110 transition-transform'
                            : isComic
                              ? 'text-slate-950'
                              : isSystem
                                ? 'text-cyan-100'
                                : 'text-slate-900 dark:text-white'
                        }
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              </motion.div>

              {/* Center Collision Impact Zone */}
              <div className="flex flex-col items-center justify-center min-h-[54px]">
                <AnimatePresence mode="wait">
                  {clashEvent ? (
                    <motion.div
                      key={clashEvent.id}
                      initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                      animate={{ scale: 1.08, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.85, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-extrabold tracking-wider text-center ${clashBadgeClasses}`}
                    >
                      <div>{clashEvent.label}</div>
                      <div className="text-[10px] opacity-90">{clashEvent.damageText}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="vs-idle"
                      animate={prefersReduced ? undefined : { scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>VS</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Incoming Rival Bug Word */}
              <motion.div
                key={`boss-${roundIndex}-${clashEvent?.id ?? 'idle'}`}
                initial={{ opacity: 0, x: 24 }}
                animate={
                  prefersReduced
                    ? { opacity: 1, x: 0 }
                    : clashEvent?.kind === 'hit' || clashEvent?.kind === 'crit'
                      ? { x: [0, 32, 10], opacity: [1, 0.45, 0.3], rotate: [0, 8, 4] }
                      : clashEvent?.kind === 'timeout'
                        ? { x: [0, -72, 0], rotate: [0, -6, 0], scale: [1, 1.15, 1] }
                        : { opacity: 1, x: 0, y: [0, 3, 0] }
                }
                transition={{
                  duration: clashEvent ? 0.36 : 2.2,
                  repeat: clashEvent ? 0 : Infinity,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`p-4 rounded-xl border text-center space-y-1.5 ${
                  isComic
                    ? 'bg-amber-300 border-2 border-slate-950 shadow-[4px_4px_0_#0f172a]'
                    : isSystem
                      ? 'bg-rose-950/45 border-rose-400/50'
                      : 'bg-rose-50/90 dark:bg-rose-950/35 border-rose-200 dark:border-rose-500/40'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  {wf.bossLabel}
                </span>
                <div className="font-mono text-lg sm:text-xl font-extrabold tracking-widest text-rose-700 dark:text-rose-300">
                  {currentEncounter.enemyWord}
                </div>
              </motion.div>
            </div>

            {/* Dual Input: Keyboard Typing + One-Tap Strike Cards */}
            <div className="space-y-3">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2 max-w-md mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={typedInput}
                  onChange={(e) => handleTypingChange(e.target.value)}
                  placeholder={wf.inputPlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  className={`flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border font-mono text-sm uppercase tracking-wider outline-none ${
                    isComic
                      ? 'bg-white border-2 border-slate-950 text-slate-950'
                      : isSystem
                        ? 'bg-slate-950 border-cyan-400/50 text-cyan-100 focus:border-cyan-300'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500'
                  }`}
                />
                <button
                  type="submit"
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-transform hover:scale-[1.03] active:scale-[0.97] cursor-pointer whitespace-nowrap min-h-[42px] ${
                    isComic
                      ? 'bg-rose-600 text-white border-2 border-slate-950 shadow-[2px_2px_0_#0f172a]'
                      : isSystem
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {wf.submitStrike}
                </button>
              </form>

              <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                {choiceWords.map((word) => (
                  <motion.button
                    key={`${roundIndex}-${word}`}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      if (word === currentEncounter.counterWord) {
                        resolveCounterStrike(false);
                      } else {
                        handleWrongPick();
                      }
                    }}
                    className={`px-3 py-2.5 rounded-xl border font-mono text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap min-h-[44px] ${
                      isComic
                        ? 'bg-white border-2 border-slate-950 text-slate-950 hover:bg-amber-200 shadow-[2px_2px_0_#0f172a]'
                        : isSystem
                          ? 'bg-slate-900/90 border-cyan-400/40 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-950/60'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-indigo-400'
                    }`}
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-4"
          >
            <div
              className={`p-3 rounded-2xl border ${
                didWin
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-500'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-500'
              }`}
            >
              {didWin ? <Trophy className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
            </div>

            <div className="space-y-1">
              <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {didWin ? wf.victoryTitle : wf.defeatTitle}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                <span>
                  {wf.summaryFinalScore}: <strong className="text-indigo-500">{score}</strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {wf.summaryWordsDefeated}: <strong className="text-emerald-500">{wordsDefeated}</strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {wf.summaryBestCombo}: <strong className="text-amber-500">x{Math.max(1, bestCombo)}</strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={startFight}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer whitespace-nowrap min-h-[44px] ${
                isComic
                  ? 'bg-amber-300 text-slate-950 border-2 border-slate-950 shadow-[3px_3px_0_#0f172a]'
                  : isSystem
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>{wf.playAgainBtn}</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
