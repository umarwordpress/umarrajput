'use client';

import { motion } from 'framer-motion';
import type { CaseStudy } from '@/data/caseStudies';
import { CaseGallery } from './CaseGallery';
import { fadeUp, stagger, inView } from '@/lib/motion';

export function CaseSections({ study }: { study: CaseStudy }) {
  return (
    <>
      {study.sections.map((s) => (
        <section className="casesec" id={`sec-${s.n}`} key={s.n}>
          <motion.div
            className="container casesec__inner"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <motion.div className="casesec__side" variants={fadeUp}>
              <span className="casesec__n">{s.n}</span>
              <span className="casesec__eyebrow">{s.eyebrow}</span>
            </motion.div>

            <div className="casesec__body">
              <motion.h2 variants={fadeUp}>{s.title}</motion.h2>

              {s.kind === 'prose' &&
                s.body.map((p, i) => (
                  <motion.p key={i} variants={fadeUp}>
                    {p}
                  </motion.p>
                ))}

              {s.kind === 'list' && (
                <ol className="caselist">
                  {s.items.map((item, i) => (
                    <motion.li key={i} variants={fadeUp}>
                      <span className="caselist__n">{String(i + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ol>
              )}

              {s.kind === 'results' && (
                <>
                  {study.metrics && (
                    <motion.div className="caseresults" variants={stagger(0.07)}>
                      {study.metrics.map((m) => (
                        <motion.div className="caseresult" key={m.label} variants={fadeUp}>
                          <b className="grad-text">{m.value}</b>
                          <span>{m.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  {study.gallery && (
                    <CaseGallery
                      slug={study.gallery.slug}
                      shots={study.gallery.shots}
                      title={study.title}
                      caption={study.gallery.caption}
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        </section>
      ))}
    </>
  );
}
