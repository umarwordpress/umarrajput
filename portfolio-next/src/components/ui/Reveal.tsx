'use client';

import { motion, type Variants } from 'framer-motion';
import { useMemo, type ReactNode, type ElementType } from 'react';
import { fadeUp, inView } from '@/lib/motion';

type Props = {
  children: ReactNode;
  /** Extra delay in seconds, on top of any parent stagger. */
  delay?: number;
  variants?: Variants;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Animates its children in the first time they scroll into view.
 * Uses `whileInView` rather than an IntersectionObserver of its own so the
 * animation stays cancellable and respects reduced-motion via Framer.
 */
export function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className,
  as = 'div',
  id,
}: Props) {
  // motion.create() must not run on every render — it would remount the tree.
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
