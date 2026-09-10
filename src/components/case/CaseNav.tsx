'use client';

import { useEffect, useState } from 'react';
import type { Section } from '@/data/caseStudies';

/** Sticky section rail, highlights whichever section is currently on screen. */
export function CaseNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.n ?? '');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('sec-', ''));
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(`sec-${s.n}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="casenav">
      <div className="container casenav__inner">
        <ol>
          {sections.map((s) => (
            <li key={s.n}>
              <a href={`#sec-${s.n}`} aria-current={active === s.n ? 'true' : undefined}>
                <span className="casenav__n">{s.n}</span>
                {s.eyebrow}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
