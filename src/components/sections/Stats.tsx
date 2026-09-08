'use client';

import { motion } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import { stats } from '@/data/stats';
import { fadeUp, stagger, inView } from '@/lib/motion';

export function Stats() {
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
          {stats.map((s) => (
            <motion.li key={s.label} className="card stat" variants={fadeUp}>
              <b>
                <Counter to={s.value} />
                <i className="grad-text">{s.suffix}</i>
              </b>
              <span>{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
