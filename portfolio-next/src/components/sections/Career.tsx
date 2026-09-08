'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { career } from '@/data/career';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

export function Career() {
  const ref = useRef<HTMLOListElement>(null);

  /* The rail fills as the timeline scrolls through the viewport. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'center 55%'],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section className="section" id="career">
      <div className="container">
        <motion.div
          className="head"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Career</motion.span>
          <motion.h2 className="title" variants={fadeUp}>Where I&apos;ve Worked</motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Five roles since 2023 — the through-line is always organic growth.
          </motion.p>
        </motion.div>

        <ol className="htl" ref={ref}>
          <div className="htl__rail" aria-hidden>
            <motion.span className="htl__fill" style={{ scaleX, opacity }} />
          </div>

          {career.map((role, i) => {
            const up = i % 2 === 0;
            return (
              <li
                key={role.id}
                className={[
                  'htl-item',
                  up ? 'htl-item--up' : 'htl-item--down',
                  role.current ? 'htl-item--now' : '',
                ].join(' ')}
              >
                <motion.span
                  className="htl-node"
                  initial={{ scale: 0.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.45, ease: easeSoft }}
                >
                  {role.current && (
                    <motion.span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '2px solid var(--accent)',
                      }}
                      animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </motion.span>

                <motion.article
                  className="htl-card"
                  initial={{ opacity: 0, y: up ? -16 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: easeSoft }}
                  whileHover={{ y: up ? -4 : -4 }}
                >
                  <div className="htl-logos">
                    <Image
                      src={role.logo.src}
                      alt={role.logo.alt}
                      width={role.logo.width}
                      height={role.logo.height}
                      data-raw={role.logo.raw ? 'true' : undefined}
                      data-square={role.logo.width <= 130 ? 'true' : undefined}
                    />
                  </div>
                  <span className="htl-period">{role.period}</span>
                  <h3>{role.company}</h3>
                  {role.title && <p className="wcard__client">{role.title}</p>}
                  {role.note && <p className="htl-note">{role.note}</p>}
                  {role.current && (
                    <p className="htl-note">
                      <span className="htl-dot" aria-hidden /> Current role
                    </p>
                  )}
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
