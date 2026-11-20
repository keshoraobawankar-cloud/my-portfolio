import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentSectionKey } from '../services/ContentService';
import { useSectionReadingTime } from '../services/ReadingTimeService';

interface ReadingTimeTagProps {
  section: ContentSectionKey;
}

/**
 * Inline monospace 'Time to read' indicator displayed beside section headers.
 * Updates dynamically from ContentService + ReadingTimeService when language toggles.
 */
export function ReadingTimeTag({ section }: ReadingTimeTagProps) {
  const estimate = useSectionReadingTime(section);

  return (
    <span
      title={estimate.wordCountTitle}
      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap"
    >
      <span aria-hidden="true">·</span>
      <Clock className="w-3 h-3 shrink-0 opacity-75" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${section}-${estimate.locale}-${estimate.wordCount}`}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 3 }}
          transition={{ duration: 0.18 }}
        >
          {estimate.tagLabel}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
