import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Plus, RotateCcw, Zap } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { getTranslations } from '../data/translations';
import { sounds } from '../utils/audio';

type GravityMode = 'earth' | 'moon' | 'zero';

interface PhysicsBody {
  id: number;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
  vAngle: number;
  color: string;
  textColor: string;
  shape: 'circle' | 'rounded';
}

interface CharacterState {
  x: number;
  y: number;
  vy: number;
  scaleX: number;
  scaleY: number;
  antennaAngle: number;
  antennaVel: number;
  happyTimer: number;
  blinkTimer: number;
}

const TOKEN_PRESETS = [
  { label: 'C', color: '#38bdf8', textColor: '#082f49', shape: 'rounded' as const },
  { label: 'PY', color: '#34d399', textColor: '#064e3b', shape: 'rounded' as const },
  { label: 'UX', color: '#f472b6', textColor: '#500724', shape: 'circle' as const },
  { label: '3D', color: '#a78bfa', textColor: '#2e1065', shape: 'rounded' as const },
  { label: 'AI', color: '#fbbf24', textColor: '#451a03', shape: 'circle' as const },
  { label: 'UI', color: '#fb7185', textColor: '#4c0519', shape: 'rounded' as const },
  { label: 'GIT', color: '#60a5fa', textColor: '#172554', shape: 'circle' as const },
  { label: 'WEB', color: '#2dd4bf', textColor: '#042f2e', shape: 'rounded' as const },
];

export function PhysicsPlayground() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const pg = t.hero.playground;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gravityMode, setGravityMode] = useState<GravityMode>('earth');
  const [tokenCount, setTokenCount] = useState(6);
  const [speechText, setSpeechText] = useState<string>(pg.botGreetingIdle);

  const gravityRef = useRef<GravityMode>('earth');
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const nextIdRef = useRef(1);
  const pointerRef = useRef<{
    x: number;
    y: number;
    active: boolean;
    dragId: number | null;
    lastX: number;
    lastY: number;
    vx: number;
    vy: number;
  }>({
    x: 240,
    y: 160,
    active: false,
    dragId: null,
    lastX: 240,
    lastY: 160,
    vx: 0,
    vy: 0,
  });

  const charRef = useRef<CharacterState>({
    x: 240,
    y: 260,
    vy: 0,
    scaleX: 1,
    scaleY: 1,
    antennaAngle: 0,
    antennaVel: 0,
    happyTimer: 0,
    blinkTimer: 120,
  });

  useEffect(() => {
    gravityRef.current = gravityMode;
    if (gravityMode === 'zero') {
      setSpeechText(pg.botGreetingZeroG);
      // Give bodies a gentle upward drift when entering Zero-G
      bodiesRef.current.forEach((b) => {
        b.vy -= 1.6 + Math.random() * 1.4;
        b.vx += (Math.random() - 0.5) * 2.2;
      });
    } else {
      setSpeechText(pg.botGreetingIdle);
    }
  }, [gravityMode, pg.botGreetingIdle, pg.botGreetingZeroG]);

  const createInitialBodies = useCallback((width: number, height: number): PhysicsBody[] => {
    const safeW = Math.max(260, width);
    const safeH = Math.max(240, height);
    return TOKEN_PRESETS.slice(0, 6).map((preset, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      return {
        id: nextIdRef.current++,
        label: preset.label,
        x: safeW * (0.2 + col * 0.3) + (Math.random() - 0.5) * 24,
        y: Math.min(safeH * 0.45, 70 + row * 68),
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 1.2,
        radius: 23,
        angle: (Math.random() - 0.5) * 0.4,
        vAngle: (Math.random() - 0.5) * 0.04,
        color: preset.color,
        textColor: preset.textColor,
        shape: preset.shape,
      };
    });
  }, []);

  const handleSpawnToken = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 480;
    const preset = TOKEN_PRESETS[Math.floor(Math.random() * TOKEN_PRESETS.length)];

    if (bodiesRef.current.length >= 16) {
      bodiesRef.current = bodiesRef.current.slice(1);
    }

    bodiesRef.current.push({
      id: nextIdRef.current++,
      label: preset.label,
      x: 48 + Math.random() * Math.max(80, width - 96),
      y: 34,
      vx: (Math.random() - 0.5) * 5,
      vy: 1.5,
      radius: 21 + Math.floor(Math.random() * 4),
      angle: (Math.random() - 0.5) * 0.5,
      vAngle: (Math.random() - 0.5) * 0.08,
      color: preset.color,
      textColor: preset.textColor,
      shape: preset.shape,
    });

    setTokenCount(bodiesRef.current.length);
    sounds.playMove();
  };

  const triggerCharacterJump = useCallback(
    (playAudio = true) => {
      const ch = charRef.current;
      ch.vy = -8.5;
      ch.scaleX = 0.86;
      ch.scaleY = 1.18;
      ch.antennaVel = (Math.random() > 0.5 ? 1 : -1) * 0.38;
      ch.happyTimer = 95;
      setSpeechText(pg.botGreetingHappy);

      // Radial impulse on nearby tokens
      bodiesRef.current.forEach((b) => {
        const dx = b.x - ch.x;
        const dy = b.y - (ch.y - 22);
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(3.5, Math.min(11, 460 / (dist + 35)));
        b.vx += (dx / dist) * force * 0.85 + (Math.random() - 0.5) * 2;
        b.vy -= force * 0.95;
        b.vAngle += (Math.random() - 0.5) * 0.14;
      });

      if (playAudio) sounds.playSuccess();
    },
    [pg.botGreetingHappy]
  );

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    bodiesRef.current = createInitialBodies(rect.width, rect.height);
    setTokenCount(bodiesRef.current.length);
    setSpeechText(gravityMode === 'zero' ? pg.botGreetingZeroG : pg.botGreetingIdle);
    sounds.playClick();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 500;
    let height = 340;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(280, rect.width);
      height = 340;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (bodiesRef.current.length === 0) {
        bodiesRef.current = createInitialBodies(width, height);
        setTokenCount(bodiesRef.current.length);
      }
      charRef.current.x = Math.min(Math.max(charRef.current.x, 64), width - 64);
      if (charRef.current.y > height - 46) {
        charRef.current.y = height - 46;
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    charRef.current.x = width * 0.5;
    charRef.current.y = height - 46;

    let rafId = 0;

    const step = () => {
      const bodies = bodiesRef.current;
      const ch = charRef.current;
      const ptr = pointerRef.current;

      const grav =
        gravityRef.current === 'earth'
          ? 0.34
          : gravityRef.current === 'moon'
            ? 0.09
            : 0;
      const airDrag = gravityRef.current === 'zero' ? 0.996 : 0.992;
      const bounce = 0.78;
      const floorY = height - 12;

      if (!prefersReduced) {
        // Update character physics
        ch.x += (width * 0.5 - ch.x) * 0.03;
        ch.vy += gravityRef.current === 'zero' ? 0.06 : 0.42;
        ch.y += ch.vy;
        const restY = height - 46;
        if (ch.y >= restY) {
          if (ch.vy > 2.2) {
            ch.scaleX = 1.16;
            ch.scaleY = 0.85;
          }
          ch.y = restY;
          ch.vy = 0;
        }
        ch.scaleX += (1 - ch.scaleX) * 0.16;
        ch.scaleY += (1 - ch.scaleY) * 0.16;

        // Antenna spring
        const antennaForce = -0.14 * ch.antennaAngle;
        ch.antennaVel = (ch.antennaVel + antennaForce) * 0.91;
        ch.antennaAngle += ch.antennaVel;

        if (ch.happyTimer > 0) ch.happyTimer -= 1;
        ch.blinkTimer -= 1;
        if (ch.blinkTimer < -7) {
          ch.blinkTimer = 140 + Math.floor(Math.random() * 140);
        }

        // Update physics bodies
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i];
          if (ptr.dragId === b.id) {
            b.x = ptr.x;
            b.y = ptr.y;
            b.vx = ptr.vx * 0.8;
            b.vy = ptr.vy * 0.8;
            b.vAngle = ptr.vx * 0.015;
            continue;
          }

          b.vy += grav;
          if (gravityRef.current === 'zero') {
            b.vx += Math.sin(Date.now() * 0.0015 + b.id) * 0.008;
            b.vy += Math.cos(Date.now() * 0.0012 + b.id) * 0.008;
          }

          b.vx *= airDrag;
          b.vy *= airDrag;
          b.x += b.vx;
          b.y += b.vy;
          b.angle += b.vAngle;
          b.vAngle *= 0.985;

          // Wall bounds
          if (b.x - b.radius < 8) {
            b.x = 8 + b.radius;
            b.vx = Math.abs(b.vx) * bounce;
            b.vAngle = -b.vAngle;
          } else if (b.x + b.radius > width - 8) {
            b.x = width - 8 - b.radius;
            b.vx = -Math.abs(b.vx) * bounce;
            b.vAngle = -b.vAngle;
          }

          if (b.y - b.radius < 8) {
            b.y = 8 + b.radius;
            b.vy = Math.abs(b.vy) * bounce;
          } else if (b.y + b.radius > floorY) {
            b.y = floorY - b.radius;
            b.vy = -Math.abs(b.vy) * bounce;
            b.vx *= 0.94;
            b.vAngle = b.vx * 0.03;
            if (Math.abs(b.vy) < 0.35 && grav > 0) b.vy = 0;
          }
        }

        // Body-body collisions
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy);
            const minDist = a.radius + b.radius;

            if (dist > 0 && dist < minDist) {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = (minDist - dist) * 0.5;
              if (ptr.dragId !== a.id) {
                a.x -= nx * overlap;
                a.y -= ny * overlap;
              }
              if (ptr.dragId !== b.id) {
                b.x += nx * overlap;
                b.y += ny * overlap;
              }

              const dvx = a.vx - b.vx;
              const dvy = a.vy - b.vy;
              const relVel = dvx * nx + dvy * ny;
              if (relVel > 0) {
                const impulse = relVel * 0.85;
                if (ptr.dragId !== a.id) {
                  a.vx -= impulse * nx;
                  a.vy -= impulse * ny;
                }
                if (ptr.dragId !== b.id) {
                  b.vx += impulse * nx;
                  b.vy += impulse * ny;
                }
              }
            }
          }

          // Collide with character head dome
          const b = bodies[i];
          if (ptr.dragId !== b.id) {
            const charCenterY = ch.y - 6;
            const charRadius = 32;
            const dx = b.x - ch.x;
            const dy = b.y - charCenterY;
            const dist = Math.hypot(dx, dy);
            const minDist = b.radius + charRadius;
            if (dist > 0 && dist < minDist) {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = minDist - dist;
              b.x += nx * overlap;
              b.y += ny * overlap;
              b.vx += nx * 2.2;
              b.vy += ny * 2.2 - 0.6;
              ch.antennaVel += nx * 0.16;
            }
          }
        }
      }

      // Render Arena
      ctx.clearRect(0, 0, width, height);

      // Floor neon baseline
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(12, floorY + 0.5);
      ctx.lineTo(width - 12, floorY + 0.5);
      ctx.stroke();
      ctx.restore();

      // Character Shadow
      const heightRatio = Math.max(0.35, 1 - (height - 46 - ch.y) / 140);
      ctx.save();
      ctx.fillStyle = 'rgba(2, 6, 23, 0.48)';
      ctx.beginPath();
      ctx.ellipse(ch.x, floorY + 2, 34 * heightRatio, 6 * heightRatio, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render Interactive Builder Mascot Character (HB-01)
      ctx.save();
      ctx.translate(ch.x, ch.y);
      ctx.scale(ch.scaleX, ch.scaleY);

      // Antenna stalk + glowing orb
      ctx.save();
      ctx.translate(0, -34);
      ctx.rotate(ch.antennaAngle);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -18);
      ctx.stroke();

      ctx.fillStyle = ch.happyTimer > 0 ? '#34d399' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, -21, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Side ear pods
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.roundRect(-37, -14, 9, 22, 4);
      ctx.roundRect(28, -14, 9, 22, 4);
      ctx.fill();

      // Head / chassis body
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(-31, -34, 62, 54, 16);
      ctx.fill();
      ctx.stroke();

      // Visor screen
      ctx.fillStyle = '#09111f';
      ctx.beginPath();
      ctx.roundRect(-23, -24, 46, 30, 10);
      ctx.fill();

      // Eyes tracking pointer
      const lookDx = ptr.x - ch.x;
      const lookDy = ptr.y - (ch.y - 10);
      const lookDist = Math.hypot(lookDx, lookDy) || 1;
      const pupilX = Math.max(-3.5, Math.min(3.5, (lookDx / lookDist) * 3.5));
      const pupilY = Math.max(-3, Math.min(3, (lookDy / lookDist) * 3));

      const isBlinking = ch.blinkTimer < 0;
      const isHappy = ch.happyTimer > 0;

      ctx.strokeStyle = isHappy ? '#34d399' : '#38bdf8';
      ctx.fillStyle = isHappy ? '#34d399' : '#38bdf8';
      ctx.lineWidth = 2.6;
      ctx.lineCap = 'round';

      if (isHappy) {
        // Happy ^ ^ eyes
        ctx.beginPath();
        ctx.moveTo(-14, -7);
        ctx.lineTo(-10, -13);
        ctx.lineTo(-6, -7);
        ctx.moveTo(6, -7);
        ctx.lineTo(10, -13);
        ctx.lineTo(14, -7);
        ctx.stroke();
      } else if (isBlinking) {
        ctx.beginPath();
        ctx.moveTo(-14, -10);
        ctx.lineTo(-6, -10);
        ctx.moveTo(6, -10);
        ctx.lineTo(14, -10);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(-10 + pupilX, -10 + pupilY, 4.2, 0, Math.PI * 2);
        ctx.arc(10 + pupilX, -10 + pupilY, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Little mouth LED bar
      ctx.fillStyle = isHappy ? '#fbbf24' : '#64748b';
      ctx.beginPath();
      ctx.roundRect(isHappy ? -8 : -5, 11, isHappy ? 16 : 10, 3, 2);
      ctx.fill();

      // Tiny feet
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(-20, 20, 14, 12, 5);
      ctx.roundRect(6, 20, 14, 12, 5);
      ctx.fill();
      ctx.restore();

      // Render Physics Skill Tokens
      bodies.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);

        ctx.shadowColor = 'rgba(2, 6, 23, 0.45)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = b.color;
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        if (b.shape === 'circle') {
          ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        } else {
          ctx.roundRect(-b.radius, -b.radius, b.radius * 2, b.radius * 2, 10);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.stroke();

        ctx.fillStyle = b.textColor;
        ctx.font = '700 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, 0, 1);
        ctx.restore();
      });

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [createInitialBodies]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = getPointerPos(e);
    const ptr = pointerRef.current;
    ptr.x = pos.x;
    ptr.y = pos.y;
    ptr.lastX = pos.x;
    ptr.lastY = pos.y;
    ptr.vx = 0;
    ptr.vy = 0;
    ptr.active = true;

    // Check if user grabbed a token
    for (let i = bodiesRef.current.length - 1; i >= 0; i--) {
      const b = bodiesRef.current[i];
      if (Math.hypot(pos.x - b.x, pos.y - b.y) <= b.radius + 6) {
        ptr.dragId = b.id;
        e.currentTarget.setPointerCapture(e.pointerId);
        sounds.playClick();
        return;
      }
    }

    // Check if user clicked the character
    const ch = charRef.current;
    if (Math.hypot(pos.x - ch.x, pos.y - (ch.y - 8)) <= 48) {
      triggerCharacterJump(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = getPointerPos(e);
    const ptr = pointerRef.current;
    ptr.vx = pos.x - ptr.lastX;
    ptr.vy = pos.y - ptr.lastY;
    ptr.lastX = pos.x;
    ptr.lastY = pos.y;
    ptr.x = pos.x;
    ptr.y = pos.y;
  };

  const handlePointerUp = () => {
    pointerRef.current.active = false;
    pointerRef.current.dragId = null;
  };

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-sky-400/30 bg-[#0b1528]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Playground Top Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-sky-400/20 bg-[#070f1e]/95">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-mono text-xs font-semibold text-white truncate">
            {pg.title}
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-sky-300/80">
            · {tokenCount}
          </span>
        </div>

        {/* Gravity Mode Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
          {(
            [
              { id: 'earth', label: pg.gravityEarth },
              { id: 'moon', label: pg.gravityMoon },
              { id: 'zero', label: pg.gravityZero },
            ] as const
          ).map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                sounds.playClick();
                setGravityMode(mode.id);
              }}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                gravityMode === mode.id
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Physics & Character Canvas Arena */}
      <div className="relative">
        {/* Floating Character Speech Caption */}
        <div className="pointer-events-none absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/75 border border-sky-400/25 text-[11px] font-mono text-sky-200 backdrop-blur-xs truncate">
            HB-01: "{speechText}"
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-slate-400 shrink-0">
            {pg.badge}
          </span>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="block w-full h-[340px] touch-none cursor-grab active:cursor-grabbing"
          aria-label={pg.title}
        />
      </div>

      {/* Bottom Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-sky-400/20 bg-[#070f1e]/95 text-xs font-mono">
        <span className="text-[11px] text-slate-400 truncate">
          {pg.hint}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSpawnToken}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 font-semibold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{pg.spawnBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => triggerCharacterJump(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-semibold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{pg.pulseBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={pg.resetBtn}
            aria-label={pg.resetBtn}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
