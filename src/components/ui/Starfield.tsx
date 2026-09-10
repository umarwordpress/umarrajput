'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/** Deterministic PRNG so server and client render identical stars. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; size: number; delay: number; duration: number };

/**
 * The drifting particle field behind the hero. Pure DOM, a handful of
 * absolutely positioned dots is cheaper than a canvas loop at this density.
 */
export function Starfield({ count = 44, seed = 7 }: { count?: number; seed?: number }) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.8 + 0.7,
      delay: rand() * 6,
      duration: rand() * 4 + 4,
    }));
  }, [count, seed]);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)',
      }}
    >
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.75, 0.15] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'var(--text)',
          }}
        />
      ))}
    </div>
  );
}
