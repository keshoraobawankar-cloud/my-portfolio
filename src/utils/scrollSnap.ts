import { PortfolioTheme } from '../types';

export type ScrollSnapAlignment = 'start' | 'center' | 'end' | 'none';
export type ScrollSnapRole = 'hero' | 'primary' | 'secondary';

export interface ThemeScrollSnapProfile {
  snapType: 'y proximity' | 'y mandatory';
  heroAlign: ScrollSnapAlignment;
  primaryAlign: ScrollSnapAlignment;
  secondaryAlign: ScrollSnapAlignment;
  snapStop: 'normal' | 'always';
  description: string;
}

/**
 * Per-theme CSS scroll-snap alignment behaviors applied via `:root[data-theme]`
 * custom properties so scroll rhythm reflects each portfolio aesthetic:
 * - noir: uniform top-edge ('start') editorial anchoring
 * - barcelona: centered ('center') gallery canvas framing
 * - paper: calm top-of-chapter ('start') monograph rhythm with extra breathing clearance
 * - comic: dynamic alternating ('center' / 'start') manga panel flipping with snap-stop
 * - playground: centered ('center') interactive workbench framing
 * - system: HUD lock alternating ('start' / 'center') telemetry framing with snap-stop
 */
export const THEME_SCROLL_SNAP_PROFILES: Record<PortfolioTheme, ThemeScrollSnapProfile> = {
  noir: {
    snapType: 'y proximity',
    heroAlign: 'start',
    primaryAlign: 'start',
    secondaryAlign: 'start',
    snapStop: 'normal',
    description: 'Uniform top-edge anchoring for structured reading',
  },
  barcelona: {
    snapType: 'y proximity',
    heroAlign: 'center',
    primaryAlign: 'center',
    secondaryAlign: 'center',
    snapStop: 'normal',
    description: 'Centered gallery canvas framing across every section',
  },
  paper: {
    snapType: 'y proximity',
    heroAlign: 'start',
    primaryAlign: 'start',
    secondaryAlign: 'start',
    snapStop: 'normal',
    description: 'Top-of-page editorial alignment with generous header clearance',
  },
  comic: {
    snapType: 'y proximity',
    heroAlign: 'start',
    primaryAlign: 'center',
    secondaryAlign: 'start',
    snapStop: 'always',
    description: 'Alternating center/start manga panel rhythm with snap-stop pauses',
  },
  playground: {
    snapType: 'y proximity',
    heroAlign: 'start',
    primaryAlign: 'center',
    secondaryAlign: 'center',
    snapStop: 'normal',
    description: 'Centered workbench alignment for interactive modules',
  },
  system: {
    snapType: 'y proximity',
    heroAlign: 'start',
    primaryAlign: 'start',
    secondaryAlign: 'center',
    snapStop: 'always',
    description: 'Alternating start/center HUD telemetry frame lock',
  },
};

export function getThemeSnapProfile(theme: PortfolioTheme): ThemeScrollSnapProfile {
  return THEME_SCROLL_SNAP_PROFILES[theme];
}
