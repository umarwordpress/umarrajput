import type { Variants, Easing } from 'framer-motion';

/** Shared easing, matches the CSS `--ease-out` token. */
export const easeOut: Easing = [0, 0, 0.2, 1];
export const easeSoft: Easing = [0.22, 0.7, 0.2, 1];

/** Standard "enter on scroll" viewport config. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -80px 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSoft },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSoft },
  },
};

/** Parent that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Headline that animates in word by word. */
export const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};
export const wordChild: Variants = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -45 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: easeSoft },
  },
};
