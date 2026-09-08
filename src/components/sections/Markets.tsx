'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { markets } from '@/data/markets';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

export function Markets() {
  const [active, setActive] = useState(markets[0].id);
  const panel = markets.find((m) => m.id === active)!;

  function onKeyDown(e: React.KeyboardEvent) {
    const i = markets.findIndex((m) => m.id === active);
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % markets.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + markets.length) % markets.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = markets.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(markets[next].id);
    document.getElementById(`rtab-${markets[next].id}`)?.focus();
  }

  return (
    <section className="section" id="markets">
      <div className="container">
        <motion.div
          className="head head--center"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Global reach</motion.span>
          <motion.h2 className="title" variants={fadeUp}>Markets I Work In</motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Search behaves differently in every market. These are the ones I know well.
          </motion.p>
        </motion.div>

        <motion.div
          className="card reach"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: easeSoft }}
        >
          <div className="rtabs" role="tablist" aria-label="Markets" onKeyDown={onKeyDown}>
            {markets.map((m) => {
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
                  {panel.primary && <span className="rbadge">Primary market</span>}
                  <h3>{panel.heading}</h3>
                  <p>{panel.body}</p>
                  <div className="chips">
                    {panel.countries.map((c, i) => (
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
                  <b className="grad-text">
                    {panel.stat.value}
                    {panel.stat.unit && <i>{panel.stat.unit}</i>}
                  </b>
                  <span>{panel.stat.caption}</span>
                  <dl className="rfacts">
                    <dt>Search languages</dt>
                    <dd>{panel.languages}</dd>
                    <dt>Focus</dt>
                    <dd>{panel.focus}</dd>
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
