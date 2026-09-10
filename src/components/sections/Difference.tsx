'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, inView } from '@/lib/motion';

const stages = ['Plan', 'Build', 'Automate', 'Optimize', 'Grow'];

export function Difference() {
  return (
    <section className="section" id="approach">
      <div className="container">
        <motion.div
          className="diff"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <div>
            <motion.span className="eyebrow" variants={fadeUp}>The approach</motion.span>
            <motion.h2 className="title" variants={fadeUp} style={{ margin: '18px 0 20px' }}>
              More Than a Website. <span className="grad-text">A Digital System.</span>
            </motion.h2>
            <motion.p className="lede" variants={fadeUp} style={{ marginBottom: 16 }}>
              Most developers stop at the build. Most SEO specialists only look at search. Both are
              doing half the job, and the business is left to join the pieces together.
            </motion.p>
            <motion.p className="lede" variants={fadeUp}>
              I work across all of it. The site, the software behind it, the automations that remove
              the manual steps, and the search work that brings people in. Because it is one person
              thinking about the whole thing, the parts are built to fit each other.
            </motion.p>
          </div>

          <motion.ol className="flow" variants={fadeUp} aria-label="How a project moves">
            {stages.map((stage, i) => (
              <motion.li key={stage} variants={fadeUp}>
                <span className="flow__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="flow__label">{stage}</span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
