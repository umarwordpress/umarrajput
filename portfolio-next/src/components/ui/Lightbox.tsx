'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export type Gallery = { slug: string; shots: number; title: string; sub: string };

export function Lightbox({
  gallery,
  onClose,
}: {
  gallery: Gallery | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const open = gallery !== null;

  useEffect(() => setIndex(0), [gallery?.slug]);

  const step = useCallback(
    (delta: number) => {
      if (!gallery) return;
      setIndex((i) => (i + delta + gallery.shots) % gallery.shots);
    },
    [gallery],
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {gallery && (
        <motion.div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={`${gallery.title} — screenshots`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="lb__bar">
            <div>
              <b>{gallery.title}</b>
              <span>{gallery.sub}</span>
            </div>
            <button type="button" className="lb__close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>

          <div className="lb__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.28, ease: [0.22, 0.7, 0.2, 1] }}
                className="lb__imgwrap"
              >
                <Image
                  src={`/assets/work/${gallery.slug}/${index + 1}.jpg`}
                  alt={`${gallery.title} — screenshot ${index + 1} of ${gallery.shots}`}
                  width={1600}
                  height={1000}
                  className="lb__img"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {gallery.shots > 1 && (
              <>
                <button
                  type="button"
                  className="lb__arrow lb__arrow--prev"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lb__arrow lb__arrow--next"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {gallery.shots > 1 && (
            <div className="lb__thumbs">
              {Array.from({ length: gallery.shots }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  aria-label={`View screenshot ${i + 1}`}
                >
                  <Image
                    src={`/assets/work/${gallery.slug}/${i + 1}-thumb.jpg`}
                    alt=""
                    width={160}
                    height={100}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
