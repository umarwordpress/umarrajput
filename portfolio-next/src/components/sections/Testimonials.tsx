'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '@/data/testimonials';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => {
    setState(([i]) => [(i + delta + testimonials.length) % testimonials.length, delta]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section
      className="section"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <motion.div
          className="head head--center"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Testimonials</motion.span>
          <motion.h2 className="title" variants={fadeUp}>Client Reviews</motion.h2>
        </motion.div>

        <div className="quote" aria-roledescription="carousel" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: easeSoft }}
              style={{ margin: 0 }}
            >
              <div className="quote__stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote style={{ margin: 0 }}>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="quote__who">
                {t.logo ? (
                  <span className="quote__ava quote__ava--logo">
                    <Image src={t.logo} alt={`${t.name} logo`} width={220} height={60} />
                  </span>
                ) : t.avatar ? (
                  <Image
                    className="quote__ava quote__ava--img"
                    src={t.avatar}
                    alt={t.name}
                    width={88}
                    height={88}
                  />
                ) : (
                  <span className="quote__ava" aria-hidden>{t.initials}</span>
                )}
                <span>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="quote__nav">
            <button type="button" className="quote__btn" onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
            <div className="quote__dots" role="tablist">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  className="quote__dot"
                  aria-current={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                />
              ))}
            </div>
            <button type="button" className="quote__btn" onClick={() => go(1)} aria-label="Next testimonial">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
