'use client';

import { motion } from 'framer-motion';
import { wordParent, wordChild, inView } from '@/lib/motion';

type Props = {
  text: string;
  className?: string;
  /** Words to wrap in the gradient treatment, matched case-insensitively. */
  highlight?: string;
  as?: 'h1' | 'h2' | 'p';
  delay?: number;
};

/**
 * Splits a headline into words and animates each one up with a slight
 * rotateX, the way twocore.ai reveals its hero copy.
 */
export function AnimatedWords({
  text,
  className,
  highlight,
  as = 'h1',
  delay = 0,
}: Props) {
  const words = text.split(' ');
  const hi = highlight?.toLowerCase().split(' ') ?? [];
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={wordParent}
      transition={{ delayChildren: 0.1 + delay }}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[.,]/g, '').toLowerCase();
        const isHi = hi.includes(clean);
        return (
          <span
            key={`${word}-${i}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          >
            <motion.span
              variants={wordChild}
              style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              className={isHi ? 'grad-text' : undefined}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}
