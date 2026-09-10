'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { scenarios } from '@/data/scenarios';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

export function Scenarios() {
  const [active, setActive] = useState(scenarios[0].id);
  const panel = scenarios.find((m) => m.id === active)!;

  function onKeyDown(e: React.KeyboardEvent) {
    const i = scenarios.findIndex((m) => m.id === active);
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % scenarios.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + scenarios.length) % scenarios.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = scenarios.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(scenarios[next].id);
    document.getElementById(`rtab-${scenarios[next].id}`)?.focus();
  }

  return (
    <section className="section" id="what-we-build">
      <div className="container">
        <motion.div
          className="head head--center"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Common problems</motion.span>
          <motion.h2 className="title" variants={fadeUp}>What Can We Build for Your Business?</motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Pick whichever one sounds like your situation.
          </motion.p>
        </motion.div>

        <motion.div
          className="card reach"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: easeSoft }}
        >
          <div className="rtabs" role="tablist" aria-label="Common business problems" onKeyDown={onKeyDown}>
            {scenarios.map((m) => {
              const on = m.id === active;
              return (
                <button
                  key={m.id}
                  id={`rtab-${m.id}`}
                  type="button"
                  role="tab"
                  className="rtab"
                  aria-selected={on}
                  aria-controls={`rpanel-${m.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(m.id)}
                >
                  {/* layoutId makes the active pill physically slide between tabs */}
                  {on && (
                    <motion.span
                      layoutId="rtab-bg"
                      className="rtab__bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="rtab__idx">{m.index}</span>
                  <span>
                    <span className="rtab__name">{m.name}</span>
                    <span className="rtab__meta">{m.meta}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rstage">
            <AnimatePresence mode="wait">
              <motion.div
                key={panel.id}
                id={`rpanel-${panel.id}`}
                role="tabpanel"
                aria-labelledby={`rtab-${panel.id}`}
                className="rpanel"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: easeSoft }}
              >
                <div>
                  <h3>{panel.heading}</h3>
                  <p>{panel.body}</p>
                  <div className="chips">
                    {panel.tags.map((c, i) => (
                      <motion.span
                        key={c}
                        className="chip"
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: easeSoft }}
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <aside className="raside">
                  <span className="rbadge">{panel.service.label}</span>
                  <p className="raside__caption">{panel.service.caption}</p>
                  <dl className="rfacts">
                    <dt>Typically</dt>
                    <dd>{panel.typical}</dd>
                    <dt>Starts with</dt>
                    <dd>{panel.starts}</dd>
                  </dl>
                </aside>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
