import { motion, AnimatePresence } from 'motion/react';
import {
  FallbackCrossFadePayload,
  THEME_CANVAS_CLASS,
  THEME_CROSSFADE_DURATION_MS,
} from '../utils/themeTransition';

interface ThemeCrossFadeOverlayProps {
  transition: FallbackCrossFadePayload | null;
  onFinish: (id: number) => void;
}

export function ThemeCrossFadeOverlay({
  transition,
  onFinish,
}: ThemeCrossFadeOverlayProps) {
  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key={transition.id}
          aria-hidden="true"
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: THEME_CROSSFADE_DURATION_MS / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => onFinish(transition.id)}
          className={`fixed inset-0 z-[85] pointer-events-none select-none ${THEME_CANVAS_CLASS[transition.fromTheme]}`}
        />
      )}
    </AnimatePresence>
  );
}
