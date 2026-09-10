'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { career } from '@/data/career';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

export function Career() {
  const ref = useRef<HTMLOListElement>(null);

  /* the rail fills as the row scrolls through the viewport */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 88%', 'center 62%'],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

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
            Five roles since 2023, across web development, training and technology teams.
          </motion.p>
        </motion.div>

        <ol className="rail" ref={ref}>
          <div className="rail__line" aria-hidden>
            <motion.span className="rail__fill" style={{ scaleX, opacity }} />
          </div>

          {career.map((role, i) => (
            <li key={role.id} className={`rail-item${role.current ? ' rail-item--now' : ''}`}>
              <motion.span
                className="rail-node"
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease: easeSoft }}
              >
                {role.current && (
                  <motion.span
                    aria-hidden
                    className="rail-node__ping"
                    animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </motion.span>

              <motion.article
                className="rail-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: easeSoft }}
              >
                <span className="rail-card__logo">
                  <Image
                    src={role.logo.src}
                    alt={role.logo.alt}
                    width={role.logo.width}
                    height={role.logo.height}
                    data-raw={role.logo.raw ? 'true' : undefined}
                  />
                </span>

                <span className="rail-card__period">{role.period}</span>
                <h3>{role.company}</h3>
                {role.title && <p className="rail-card__title">{role.title}</p>}
                {role.note && <p className="rail-card__note">{role.note}</p>}
                {role.current && (
                  <p className="rail-card__note rail-card__note--now">
                    <span className="rail-dot" aria-hidden /> Current role
                  </p>
                )}
              </motion.article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
