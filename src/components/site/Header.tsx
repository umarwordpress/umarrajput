'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { nav } from '@/lib/site';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  return (
    <motion.header
      className="hdr"
      data-scrolled={scrolled}
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.7, 0.2, 1], delay: 0.1 }}
    >
      <div className="hdr__inner">
        <Link href="/" className="brand" aria-label="Umar Rajput, home">
          <span className="brand__mark" aria-hidden>
            UR
          </span>
          <span className="brand__name">
            Umar Rajput<span className="grad-text">.</span>
          </span>
        </Link>

        {/* floating pill nav, twocore-style */}
        <nav className="hdr__nav" aria-label="Primary">
          <ul>
            {nav.map((item) =>
              item.children ? (
                <li
                  key={item.href}
                  className="hdr__has-menu"
                  onMouseEnter={() => setMenu(item.href)}
                  onMouseLeave={() => setMenu(null)}
                  onFocus={() => setMenu(item.href)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setMenu(null);
                  }}
                >
                  <Link href={item.href} aria-expanded={menu === item.href} aria-haspopup="true">
                    {item.label}
                    <svg className="hdr__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>

                  <AnimatePresence>
                    {menu === item.href && (
                      <motion.ul
                        className="hdr__menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: [0.22, 0.7, 0.2, 1] }}
                      >
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={() => setMenu(null)}>
                              <b>{c.label}</b>
                              {c.note && <span>{c.note}</span>}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hdr__actions">
          <ThemeToggle />
            <Link href="/#contact" className="btn btn--primary btn--sm">
              Start a Project
            </Link>
          <button
            type="button"
            className="hdr__burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open} />
            <span data-open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="hdr__mobile"
            aria-label="Primary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
          >
            <ul>
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="hdr__mobile-sub">
                      {item.children
                        .filter((c) => c.href !== item.href)
                        .map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={() => setOpen(false)}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
