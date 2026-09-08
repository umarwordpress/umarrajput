'use client';

import { motion } from 'framer-motion';
import { process } from '@/data/process';
import { fadeUp, stagger, inView } from '@/lib/motion';

export function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <motion.div
          className="head head--center"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Process</motion.span>
          <motion.h2 className="title" variants={fadeUp}>How I Work</motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Five steps, repeated. Nothing ships without a measured reason.
          </motion.p>
        </motion.div>

        <motion.ol
          className="steps"
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {process.map((s) => (
            <motion.li key={s.n} className="step" variants={fadeUp}>
              <motion.span
                className="step__n"
                whileHover={{ scale: 1.08, borderColor: 'var(--accent)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                {s.n}
              </motion.span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
