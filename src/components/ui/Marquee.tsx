'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Seamless infinite marquee. The children are rendered twice and the track is
 * translated by exactly -50%, so the loop point is invisible.
 */
export function Marquee({
  children,
  duration = 40,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        <div style={{ display: 'flex' }}>{children}</div>
        <div style={{ display: 'flex' }} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
