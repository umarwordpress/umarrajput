'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lightbox, type Gallery } from '@/components/ui/Lightbox';
import { easeSoft } from '@/lib/motion';

/**
 * Scroll-driven card stack: each screenshot sticks in place and the next one
 * scrolls up over it, so they physically pile on top of each other. The ones
 * underneath scale down slightly so the depth reads.
 */
export function CaseGallery({
  slug,
  shots,
  title,
  caption,
}: {
  slug: string;
  shots: number;
  title: string;
  caption: string;
}) {
  const [gallery, setGallery] = useState<Gallery | null>(null);

  return (
    <div className="casegal">
      <div className="casegal__stack">
        {Array.from({ length: shots }, (_, i) => (
          <div
            className="casegal__slot"
            key={i}
            /* each card sticks a little lower than the last, so the edge of
               the one beneath stays visible */
            style={{ top: `calc(var(--nav-h) + 78px + ${i * 20}px)`, zIndex: i + 1 }}
          >
            <motion.button
              type="button"
              className="casegal__card"
              onClick={() => setGallery({ slug, shots, title, sub: caption })}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: easeSoft }}
              whileHover={{ scale: 1.006 }}
              aria-label={`Open screenshot ${i + 1} of ${shots} full size`}
            >
              <Image
                src={`/assets/work/${slug}/${i + 1}.jpg`}
                alt={`${title}, performance screenshot ${i + 1}`}
                width={1600}
                height={1000}
                sizes="(max-width: 900px) 100vw, 760px"
                loading="lazy"
              />
              <span className="casegal__idx">
                {String(i + 1).padStart(2, '0')} / {String(shots).padStart(2, '0')}
              </span>
            </motion.button>
          </div>
        ))}
      </div>

      <p className="casegal__cap">{caption}</p>
      <Lightbox gallery={gallery} onClose={() => setGallery(null)} />
    </div>
  );
}
