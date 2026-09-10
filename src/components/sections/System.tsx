'use client';

import { motion } from 'framer-motion';
import { systemSteps } from '@/data/services';
import { fadeUp, stagger, inView } from '@/lib/motion';

/**
 * The four-step idea the rest of the page hangs off. Replaces the old stats
 * strip, whose figures were never verifiable.
 */
export function System() {
  return (
    <section className="section section--tight">
      <div className="container">
        <motion.ul
          className="stats"
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {systemSteps.map((s, i) => (
            <motion.li key={s.label} className="card stat stat--step" variants={fadeUp}>
              <span className="stat__n" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <b className="grad-text">{s.label}</b>
              <span>{s.body}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
