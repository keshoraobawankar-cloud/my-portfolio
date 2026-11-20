import { Locale } from '../types';

export interface ReadingTimeResult {
  minutes: number;
  seconds: number;
  wordCount: number;
}

/**
 * Calculates estimated reading time from one or more text blocks.
 */
export function calculateReadingTime(
  content: string | string[],
  wordsPerMinute = 200
): ReadingTimeResult {
  const combined = Array.isArray(content) ? content.join(' ') : content;
  const words = combined
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0);

  const wordCount = words.length;
  const safeWpm = wordsPerMinute > 0 ? wordsPerMinute : 200;
  const rawMinutes = wordCount / safeWpm;

  return {
    minutes: wordCount === 0 ? 0 : Math.max(1, Math.ceil(rawMinutes)),
    seconds: Math.round(rawMinutes * 60),
    wordCount,
  };
}

export function formatReadingTime(minutes: number, locale: Locale): string {
  const safeMinutes = Math.max(1, minutes);
  if (locale === 'hi') {
    return `${safeMinutes} मिनट पठन`;
  }
  return `${safeMinutes} min read`;
}
