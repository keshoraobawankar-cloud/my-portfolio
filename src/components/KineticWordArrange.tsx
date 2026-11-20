import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { sounds } from '../utils/audio';

export interface WordSegment {
  text: string;
  className?: string;
}

interface KineticWordArrangeProps {
  segments: WordSegment[];
  trigger?: 'mount' | 'inView';
  intensity?: 'hero' | 'section';
  delay?: number;
}

// Deterministic pseudo-random offsets per word index so SSR/re-renders never flicker
function getWordFightKeyframes(index: number, total: number, intensity: 'hero' | 'section') {
  const isHero = intensity === 'hero';
  const spreadX = isHero ? 88 : 42;
  const spreadY = isHero ? 28 : 16;
  const spreadRot = isHero ? 14 : 8;

  // Alternate directions so neighboring words visibly cross paths & jostle for their slot
  const dir = index % 2 === 0 ? 1 : -1;
  const altDir = index % 3 === 0 ? -1 : 1;
  const centerBias = ((total - 1) / 2 - index) * (isHero ? 10 : 5);

  const startX = dir * (spreadX * (0.65 + ((index * 37) % 35) / 100)) + centerBias;
  const startY = altDir * (spreadY * (0.6 + ((index * 53) % 40) / 100));
  const startRot = dir * altDir * (spreadRot * (0.55 + ((index * 29) % 45) / 100));

  // Mid-fight clash: words lunge past target toward opposite side, collide, bounce back, then lock to 0
  const clashX1 = -dir * (isHero ? 26 : 12) + ((index % 3) - 1) * 8;
  const clashX2 = dir * (isHero ? 9 : 4);

  const clashY1 = -altDir * (isHero ? 14 : 7);
  const clashY2 = altDir * (isHero ? 5 : 2);

  const clashRot1 = -startRot * 0.45;
  const clashRot2 = startRot * 0.16;

  return {
    x: [startX, clashX1, clashX2, 0],
    y: [startY, clashY1, clashY2, 0],
    rotate: [startRot, clashRot1, clashRot2, 0],
    scale: [0.84, 1.1, 0.96, 1],
    opacity: [0, 1, 1, 1],
  };
}

export function KineticWordArrange({
  segments,
  trigger = 'mount',
  intensity = 'hero',
  delay = 0,
}: KineticWordArrangeProps) {
  const prefersReduced = useReducedMotion();
  const [clashSourceIdx, setClashSourceIdx] = useState<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  // Flatten segments into individual word tokens while keeping each segment's className
  const words: Array<{ word: string; className?: string; key: string }> = [];
  segments.forEach((seg, segIdx) => {
    const tokens = seg.text.trim().split(/\s+/).filter(Boolean);
    tokens.forEach((word, wordIdx) => {
      words.push({
        word,
        className: seg.className,
        key: `${segIdx}-${wordIdx}-${word}`,
      });
    });
  });

  if (prefersReduced) {
    return (
      <>
        {words.map((item, idx) => (
          <span key={item.key} className={item.className}>
            {item.word}
            {idx < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </>
    );
  }

  const handleWordNudge = (idx: number) => {
    sounds.playHover();
    setClashSourceIdx(idx);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setClashSourceIdx(null);
      resetTimerRef.current = null;
    }, 280);
  };

  const duration = intensity === 'hero' ? 1.05 : 0.78;
  const stagger = intensity === 'hero' ? 0.045 : 0.035;

  return (
    <>
      {words.map((item, idx) => {
        const keyframes = getWordFightKeyframes(idx, words.length, intensity);
        const wordDelay = delay + (idx % 4) * stagger + Math.floor(idx / 4) * 0.04;
        const isSource = clashSourceIdx === idx;
        const isLeftNeighbor = clashSourceIdx !== null && idx === clashSourceIdx - 1;
        const isRightNeighbor = clashSourceIdx !== null && idx === clashSourceIdx + 1;

        const animationProps =
          trigger === 'inView'
            ? {
                initial: {
                  x: keyframes.x[0],
                  y: keyframes.y[0],
                  rotate: keyframes.rotate[0],
                  scale: keyframes.scale[0],
                  opacity: 0,
                },
                whileInView: keyframes,
                viewport: { once: true, amount: 0.35 as const },
              }
            : {
                initial: {
                  x: keyframes.x[0],
                  y: keyframes.y[0],
                  rotate: keyframes.rotate[0],
                  scale: keyframes.scale[0],
                  opacity: 0,
                },
                animate: keyframes,
              };

        return (
          <span key={item.key} className="inline">
            <motion.span
              {...animationProps}
              onClick={() => handleWordNudge(idx)}
              whileHover={{
                y: -3,
                scale: 1.05,
                rotate: idx % 2 === 0 ? -1.8 : 1.8,
                transition: { type: 'spring', stiffness: 450, damping: 20 },
              }}
              whileTap={{
                scale: 0.94,
                y: 1,
                rotate: idx % 2 === 0 ? 3 : -3,
              }}
              transition={{
                duration,
                delay: wordDelay,
                times: [0, 0.42, 0.74, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block will-change-transform cursor-default ${item.className ?? ''}`}
            >
              <motion.span
                animate={
                  isSource
                    ? { y: -4, scale: 1.08 }
                    : isLeftNeighbor
                      ? { x: -5, rotate: -4 }
                      : isRightNeighbor
                        ? { x: 5, rotate: 4 }
                        : { x: 0, y: 0, scale: 1, rotate: 0 }
                }
                transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                className="inline-block"
              >
                {item.word}
              </motion.span>
            </motion.span>
            {idx < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </>
  );
}
