import { PortfolioTheme } from '../types';

/**
 * Theme-Aware Web Audio API Synthesizer
 * Provides subtle, zero-dependency UI sound effects (clicks, throttled hovers,
 * puzzle moves, and victory chimes) tailored to the active portfolio theme.
 */

interface ThemeSoundProfile {
  clickWave: OscillatorType;
  clickStartHz: number;
  clickEndHz: number;
  clickDuration: number;
  clickGain: number;
  hoverWave: OscillatorType;
  hoverStartHz: number;
  hoverEndHz: number;
  hoverDuration: number;
  hoverGain: number;
  moveWave: OscillatorType;
  moveStartHz: number;
  moveEndHz: number;
  successWave: OscillatorType;
  successNotes: readonly number[];
}

const THEME_SOUND_PROFILES: Record<PortfolioTheme, ThemeSoundProfile> = {
  noir: {
    clickWave: 'sine',
    clickStartHz: 800,
    clickEndHz: 420,
    clickDuration: 0.04,
    clickGain: 0.038,
    hoverWave: 'sine',
    hoverStartHz: 960,
    hoverEndHz: 1080,
    hoverDuration: 0.022,
    hoverGain: 0.012,
    moveWave: 'triangle',
    moveStartHz: 520,
    moveEndHz: 680,
    successWave: 'sine',
    successNotes: [523.25, 659.25, 783.99, 1046.5],
  },
  barcelona: {
    clickWave: 'triangle',
    clickStartHz: 660,
    clickEndHz: 490,
    clickDuration: 0.048,
    clickGain: 0.04,
    hoverWave: 'sine',
    hoverStartHz: 1046.5,
    hoverEndHz: 1174.66,
    hoverDuration: 0.026,
    hoverGain: 0.012,
    moveWave: 'sine',
    moveStartHz: 587.33,
    moveEndHz: 783.99,
    successWave: 'triangle',
    successNotes: [587.33, 739.99, 880, 1174.66],
  },
  paper: {
    clickWave: 'triangle',
    clickStartHz: 460,
    clickEndHz: 240,
    clickDuration: 0.032,
    clickGain: 0.042,
    hoverWave: 'sine',
    hoverStartHz: 680,
    hoverEndHz: 620,
    hoverDuration: 0.02,
    hoverGain: 0.011,
    moveWave: 'triangle',
    moveStartHz: 420,
    moveEndHz: 540,
    successWave: 'triangle',
    successNotes: [440, 554.37, 659.25, 880],
  },
  comic: {
    clickWave: 'triangle',
    clickStartHz: 520,
    clickEndHz: 960,
    clickDuration: 0.045,
    clickGain: 0.045,
    hoverWave: 'triangle',
    hoverStartHz: 760,
    hoverEndHz: 880,
    hoverDuration: 0.022,
    hoverGain: 0.014,
    moveWave: 'square',
    moveStartHz: 480,
    moveEndHz: 720,
    successWave: 'triangle',
    successNotes: [523.25, 659.25, 783.99, 1046.5],
  },
  playground: {
    clickWave: 'sine',
    clickStartHz: 420,
    clickEndHz: 780,
    clickDuration: 0.055,
    clickGain: 0.042,
    hoverWave: 'sine',
    hoverStartHz: 840,
    hoverEndHz: 940,
    hoverDuration: 0.024,
    hoverGain: 0.013,
    moveWave: 'sine',
    moveStartHz: 460,
    moveEndHz: 820,
    successWave: 'sine',
    successNotes: [523.25, 698.46, 880, 1174.66],
  },
  system: {
    // Retro terminal square-wave beeps & holographic telemetry chirps
    clickWave: 'square',
    clickStartHz: 1180,
    clickEndHz: 880,
    clickDuration: 0.036,
    clickGain: 0.024,
    hoverWave: 'square',
    hoverStartHz: 1420,
    hoverEndHz: 1560,
    hoverDuration: 0.018,
    hoverGain: 0.009,
    moveWave: 'square',
    moveStartHz: 660,
    moveEndHz: 990,
    successWave: 'square',
    successNotes: [587.33, 880, 1174.66, 1567.98],
  },
};

class SoundEffects {
  private ctx: AudioContext | null = null;
  private theme: PortfolioTheme = 'noir';
  private lastHoverAt = 0;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setTheme(theme: PortfolioTheme) {
    this.theme = theme;
  }

  getTheme(): PortfolioTheme {
    return this.theme;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const profile = THEME_SOUND_PROFILES[this.theme];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = profile.clickWave;
      osc.frequency.setValueAtTime(profile.clickStartHz, now);
      osc.frequency.exponentialRampToValueAtTime(
        profile.clickEndHz,
        now + profile.clickDuration
      );

      gain.gain.setValueAtTime(profile.clickGain, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + profile.clickDuration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + profile.clickDuration);
    } catch {
      // AudioContext may be restricted in some environments
    }
  }

  playHover() {
    if (!this.enabled) return;
    const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (nowMs - this.lastHoverAt < 65) return;
    this.lastHoverAt = nowMs;

    try {
      this.initCtx();
      if (!this.ctx) return;

      const profile = THEME_SOUND_PROFILES[this.theme];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = profile.hoverWave;
      osc.frequency.setValueAtTime(profile.hoverStartHz, now);
      osc.frequency.exponentialRampToValueAtTime(
        profile.hoverEndHz,
        now + profile.hoverDuration
      );

      gain.gain.setValueAtTime(profile.hoverGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + profile.hoverDuration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + profile.hoverDuration);
    } catch {
      // Silently catch un-unlocked or restricted AudioContext
    }
  }

  playMove() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const profile = THEME_SOUND_PROFILES[this.theme];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = profile.moveWave;
      osc.frequency.setValueAtTime(profile.moveStartHz, now);
      osc.frequency.exponentialRampToValueAtTime(profile.moveEndHz, now + 0.08);
      gain.gain.setValueAtTime(this.theme === 'system' ? 0.025 : 0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Silently catch
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const profile = THEME_SOUND_PROFILES[this.theme];
      const now = this.ctx.currentTime;
      const noteGain = this.theme === 'system' ? 0.024 : 0.045;

      profile.successNotes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = profile.successWave;
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(noteGain, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.15);
      });
    } catch {
      // Silently catch
    }
  }

  playTie() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [440, 392, 349.23];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = this.theme === 'system' ? 'square' : 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(this.theme === 'system' ? 0.02 : 0.04, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.12);
      });
    } catch {
      // Silently catch
    }
  }
}

export const sounds = new SoundEffects();
