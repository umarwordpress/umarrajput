'use client';

import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Props = {
  to: number;
  /** Digits after the decimal point. */
  decimals?: number;
  duration?: number;
  /** Renders 11430 as "11,430". */
  separator?: boolean;
};

/** Counts up from zero the first time it enters the viewport. */
export function Counter({ to, decimals = 0, duration = 1.6, separator = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);

  const text = useTransform(count, (latest) => {
    const fixed = latest.toFixed(decimals);
    if (!separator) return fixed;
    const [int, dec] = fixed.split('.');
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return dec ? `${grouped}.${dec}` : grouped;
  });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration, ease: [0, 0, 0.2, 1] });
    return () => controls.stop();
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref}>
      <motion.span>{text}</motion.span>
    </span>
  );
}
