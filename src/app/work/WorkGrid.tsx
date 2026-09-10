'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useMemo, useState } from 'react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/sections/Work';
import { stagger, inView } from '@/lib/motion';

const CATEGORIES = [
  { id: 'all', label: 'All work' },
  { id: 'websites', label: 'Website Development' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'seo', label: 'SEO' },
];

const REGIONS = [
  { id: 'all', label: 'All markets' },
  { id: 'gcc', label: 'Saudi Arabia / GCC' },
  { id: 'norway', label: 'Norway' },
  { id: 'uk', label: 'United Kingdom' },
];

export function WorkGrid() {
  const [cat, setCat] = useState('all');
  const [region, setRegion] = useState('all');

  const shown = useMemo(
    () =>
      projects.filter(
        (p) =>
          (cat === 'all' || p.cats.includes(cat)) &&
          (region === 'all' || p.regions.includes(region)),
      ),
    [cat, region],
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        <span className="filters__label">Category</span>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="filter"
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="filters" role="group" aria-label="Filter by market">
        <span className="filters__label">Market</span>
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            className="filter"
            aria-pressed={region === r.id}
            onClick={() => setRegion(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <p className="filters__count" aria-live="polite">
        Showing <b>{shown.length}</b> of {projects.length} projects
      </p>

      <LayoutGroup>
        <motion.div
          className="work-grid"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          layout
        >
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.32, ease: [0.22, 0.7, 0.2, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {shown.length === 0 && (
        <p className="lede" style={{ textAlign: 'center', padding: '48px 0' }}>
          No projects match that combination. Try a different category or market.
        </p>
      )}
    </>
  );
}
