import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { Locale } from '../types';
import { calculateReadingTime } from '../utils/readingTime';
import { ContentSectionKey, ContentService } from './ContentService';

export interface SectionReadingEstimate {
  section: ContentSectionKey;
  locale: Locale;
  wordCount: number;
  minutes: number;
  seconds: number;
  tagLabel: string;
  wordCountTitle: string;
}

const DEFAULT_WPM = 180;

export const ReadingTimeService = {
  /**
   * Dynamically computes reading time for a portfolio section by pulling
   * its current localized content blocks from ContentService.
   */
  estimateSection(
    section: ContentSectionKey,
    locale: Locale,
    wordsPerMinute = DEFAULT_WPM
  ): SectionReadingEstimate {
    const textBlocks = ContentService.getSectionTextBlocks(section, locale);
    const { minutes, seconds, wordCount } = calculateReadingTime(
      textBlocks,
      wordsPerMinute
    );

    const safeMinutes = Math.max(1, minutes);
    const tagLabel =
      locale === 'hi'
        ? `पठन समय: ${safeMinutes} मिनट`
        : `Time to read: ${safeMinutes} min`;

    const wordCountTitle =
      locale === 'hi'
        ? `${wordCount} शब्द (~${seconds} सेकंड)`
        : `${wordCount} words (~${seconds}s)`;

    return {
      section,
      locale,
      wordCount,
      minutes: safeMinutes,
      seconds,
      tagLabel,
      wordCountTitle,
    };
  },

  /**
   * Computes reading time estimates across every portfolio section.
   */
  estimateAllSections(
    locale: Locale,
    wordsPerMinute = DEFAULT_WPM
  ): Record<ContentSectionKey, SectionReadingEstimate> {
    const keys: ContentSectionKey[] = [
      'about',
      'projects',
      'skills',
      'arcade',
      'journey',
      'contact',
    ];

    return keys.reduce(
      (acc, key) => {
        acc[key] = this.estimateSection(key, locale, wordsPerMinute);
        return acc;
      },
      {} as Record<ContentSectionKey, SectionReadingEstimate>
    );
  },
};

/**
 * React hook subscribing to LocaleContext + ContentService so a section's
 * 'Time to read' tag recalculates automatically whenever the locale changes.
 */
export function useSectionReadingTime(
  section: ContentSectionKey,
  wordsPerMinute = DEFAULT_WPM
): SectionReadingEstimate {
  const { locale } = useLocale();

  return useMemo(
    () => ReadingTimeService.estimateSection(section, locale, wordsPerMinute),
    [section, locale, wordsPerMinute]
  );
}
