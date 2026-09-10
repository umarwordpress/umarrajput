'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { easeSoft } from '@/lib/motion';
import './mock.css';

const check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
);
const dot = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="7" />
  </svg>
);

/** Shared wrapper so all four previews share one entrance and one loop clock. */
function Frame({
  label,
  children,
  play,
}: {
  label: string;
  children: React.ReactNode;
  play: boolean;
}) {
  return (
    <div className="mock" aria-hidden>
      <div className="mock__bar">
        <span className="mock__dots"><i /><i /><i /></span>
        {label}
        <span className="mock__pill">{play ? 'live' : 'idle'}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------- 1. Website Development ---------- */
function WebsiteMock({ play }: { play: boolean }) {
  const blocks = [0, 1, 2];
  return (
    <Frame label="yourbusiness.com" play={play}>
      <div className="mweb">
        <motion.div
          className="mweb__hero"
          initial={{ opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeSoft }}
        />
        <div className="mweb__cols">
          {blocks.map((i) => (
            <motion.div
              key={i}
              className="mweb__col"
              initial={{ opacity: 0, y: 10 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: easeSoft }}
            />
          ))}
        </div>
        {[70, 45].map((w, i) => (
          <motion.div
            key={i}
            className="mweb__line"
            style={{ width: `${w}%` }}
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={play ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: easeSoft, originX: 0 }}
          />
        ))}
      </div>
      <motion.div
        className="mweb__score"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.85, ease: easeSoft }}
      >
        <b>98</b>
        <span>PERFORMANCE</span>
      </motion.div>
    </Frame>
  );
}

/* ---------- 2. Custom Web Applications ---------- */
function AppMock({ play }: { play: boolean }) {
  const tiles = [
    { v: '1,284', l: 'USERS' },
    { v: '96', l: 'ACTIVE' },
    { v: '12', l: 'PENDING' },
  ];
  const bars = [0.4, 0.62, 0.5, 0.78, 0.66, 0.9, 0.72];
  return (
    <Frame label="Client portal" play={play}>
      <div className="mapp">
        <div className="mapp__side"><i /><i /><i /><i /></div>
        <div className="mapp__main">
          <div className="mapp__tiles">
            {tiles.map((t, i) => (
              <motion.div
                key={t.l}
                className="mapp__tile"
                initial={{ opacity: 0, y: 8 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.09, ease: easeSoft }}
              >
                <b>{t.v}</b>
                <span>{t.l}</span>
              </motion.div>
            ))}
          </div>
          <div className="mapp__chart">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 0 }}
                animate={play ? { scaleY: h } : {}}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.06, ease: easeSoft }}
                style={{ height: '100%' }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- 3. Business Automation ---------- */
function AutomationMock({ play }: { play: boolean }) {
  const steps = ['Form submitted', 'Lead added to CRM', 'Welcome email sent', 'Team notified'];
  const stepDelay = 0.45;
  return (
    <Frame label="When a form is submitted" play={play}>
      <div className="mock__body">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            className="mrow"
            initial={{ opacity: 0, x: -8 }}
            animate={play ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: i * stepDelay, ease: easeSoft }}
          >
            <motion.span
              className="mrow__ico"
              animate={
                play
                  ? { backgroundColor: 'rgba(34,211,238,0.14)', color: '#22D3EE' }
                  : {}
              }
              transition={{ delay: 0.25 + i * stepDelay, duration: 0.3 }}
            >
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={play ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.25 + i * stepDelay, duration: 0.3, ease: easeSoft }}
                style={{ display: 'grid', placeItems: 'center', width: 11, height: 11 }}
              >
                {check}
              </motion.span>
            </motion.span>
            <span className="mrow__label">{s}</span>
            <motion.span
              className="mrow__meta"
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * stepDelay, duration: 0.3 }}
            >
              done
            </motion.span>
          </motion.div>
        ))}

        <div className="mprog">
          <div className="mprog__top">
            <span>Automated</span>
            <span>4 / 4</span>
          </div>
          <div className="mprog__track">
            <motion.div
              className="mprog__fill"
              initial={{ scaleX: 0 }}
              animate={play ? { scaleX: 1 } : {}}
              transition={{ duration: steps.length * stepDelay, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- 4. SEO ---------- */
function SeoMock({ play }: { play: boolean }) {
  const rows = [
    { kw: 'roofing contractor cork', from: 18, to: 4 },
    { kw: 'safety training al khobar', from: 12, to: 3 },
    { kw: 'frisør fredrikstad', from: 9, to: 1 },
  ];
  return (
    <Frame label="Search positions" play={play}>
      <div className="mseo">
        {rows.map((row, i) => (
          <motion.div
            key={row.kw}
            className="mseo__row"
            initial={{ opacity: 0, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.12, ease: easeSoft }}
          >
            <span className="mrow__ico">{dot}</span>
            <span className="mseo__kw">{row.kw}</span>
            <span className="mseo__pos">
              <s>{row.from}</s>
              <motion.b
                initial={{ opacity: 0, y: 6 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.14, ease: easeSoft }}
              >
                {row.to}
              </motion.b>
            </span>
          </motion.div>
        ))}
        <div className="mprog">
          <div className="mprog__top">
            <span>Impressions, 28 days</span>
            <span>51.4K</span>
          </div>
          <div className="mprog__track">
            <motion.div
              className="mprog__fill"
              initial={{ scaleX: 0 }}
              animate={play ? { scaleX: 0.82 } : {}}
              transition={{ duration: 1.1, delay: 0.7, ease: easeSoft }}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
}

const mocks = {
  'website-development': WebsiteMock,
  'custom-web-applications': AppMock,
  'business-automation': AutomationMock,
  seo: SeoMock,
} as const;

/** How long a full sequence plus its hold lasts before it replays. */
const CYCLE_MS = 4200;

export function ServiceMock({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // `once: false` so the preview re-arms every time it comes back on screen.
  const inView = useInView(ref, { amount: 0.35 });
  const [cycle, setCycle] = useState(0);

  /* Playing once meant the sequence had usually finished before anyone looked
     at it. Replaying on a timer keeps the card alive while it is visible, and
     stops entirely when it is not, so nothing animates off screen. */
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(t);
  }, [inView, reduce]);

  const Mock = mocks[id as keyof typeof mocks];
  if (!Mock) return null;

  return (
    <div ref={ref}>
      {/* remounting on `cycle` restarts every child animation from its initial */}
      <Mock key={cycle} play={reduce ? true : inView} />
    </div>
  );
}
