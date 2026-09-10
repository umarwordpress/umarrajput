'use client';

import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion';
import { useRef } from 'react';
import './mock.css';

/**
 * Every preview animates on an infinite ambient loop rather than playing a
 * sequence once. Nothing remounts, so there is no reset flash; the motion just
 * keeps running while the card is on screen and stops when it is not.
 */

const loop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  repeat: Infinity,
  ease: 'easeInOut',
});

/* Swapping the target alone is not enough to stop a running loop: the
   transition still carries `repeat: Infinity`, so it would keep cycling
   towards the resting value forever. Off screen we hand back a plain one. */
const rest: Transition = { duration: 0.35, ease: 'easeOut' };
const when = (playing: boolean, t: Transition): Transition => (playing ? t : rest);

const check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
);

function Frame({ label, children, play }: { label: string; children: React.ReactNode; play: boolean }) {
  return (
    <div className="mock" aria-hidden>
      <div className="mock__bar">
        <span className="mock__dots"><i /><i /><i /></span>
        {label}
        <span className="mock__pill">
          <motion.i
            className="mock__live"
            animate={play ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={when(play, loop(1.8))}
          />
          live
        </span>
      </div>
      {children}
    </div>
  );
}

/* ---------- 1. Website Development ---------- */
function WebsiteMock({ play }: { play: boolean }) {
  return (
    <Frame label="yourbusiness.com" play={play}>
      <div className="mweb">
        <div className="mweb__hero">
          {/* light sweeping across the hero, the way a page feels when it paints */}
          <motion.span
            className="mweb__sheen"
            animate={play ? { x: ['-120%', '220%'] } : { x: '-120%' }}
            transition={when(play, { duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 })}
          />
        </div>

        <div className="mweb__cols">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="mweb__col"
              animate={play ? { opacity: [0.45, 1, 0.45], y: [0, -2, 0] } : { opacity: 0.8, y: 0 }}
              transition={when(play, loop(2.4, i * 0.28))}
            />
          ))}
        </div>

        {[70, 45].map((w, i) => (
          <motion.div
            key={i}
            className="mweb__line"
            style={{ width: `${w}%` }}
            animate={play ? { opacity: [0.4, 0.9, 0.4] } : { opacity: 0.7 }}
            transition={when(play, loop(2.4, 0.5 + i * 0.25))}
          />
        ))}
      </div>

      <div className="mweb__score">
        <motion.b animate={play ? { opacity: [0.75, 1, 0.75] } : { opacity: 1 }} transition={when(play, loop(2.2))}>
          98
        </motion.b>
        <span>PERFORMANCE</span>
      </div>
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
  /* each bar breathes between two heights on its own clock, so the chart
     never lands on a repeating pattern */
  const bars = [
    [0.38, 0.72], [0.6, 0.42], [0.5, 0.86], [0.78, 0.55],
    [0.44, 0.8], [0.9, 0.6], [0.55, 0.92],
  ];

  return (
    <Frame label="Client portal" play={play}>
      <div className="mapp">
        <div className="mapp__side">
          <motion.span
            className="mapp__active"
            animate={play ? { y: [0, 12, 24, 12, 0] } : { y: 0 }}
            transition={when(play, { duration: 6, repeat: Infinity, ease: 'easeInOut' })}
          />
          <i /><i /><i /><i />
        </div>

        <div className="mapp__main">
          <div className="mapp__tiles">
            {tiles.map((t, i) => (
              <motion.div
                key={t.l}
                className="mapp__tile"
                animate={play ? { borderColor: ['rgba(255,255,255,0.10)', 'rgba(34,211,238,0.32)', 'rgba(255,255,255,0.10)'] } : { borderColor: 'rgba(255,255,255,0.10)' }}
                transition={when(play, loop(3.6, i * 1.2))}
              >
                <b>{t.v}</b>
                <span>{t.l}</span>
              </motion.div>
            ))}
          </div>

          <div className="mapp__chart">
            {bars.map(([a, bH], i) => (
              <motion.span
                key={i}
                animate={play ? { scaleY: [a, bH, a] } : { scaleY: a }}
                transition={when(play, loop(2.2 + (i % 3) * 0.45, i * 0.12))}
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
  const CYCLE = 3.2;

  return (
    <Frame label="When a form is submitted" play={play}>
      <div className="mock__body mock__body--flow">
        {/* a pulse travelling down the connector, twocore's dot-slide idea */}
        <span className="mflow__track" aria-hidden>
          <motion.span
            className="mflow__pulse"
            animate={play ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : { top: '0%', opacity: 0 }}
            transition={when(play, { duration: CYCLE, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.9, 1] })}
          />
        </span>

        {steps.map((s, i) => (
          <div className="mrow" key={s}>
            <motion.span
              className="mrow__ico"
              animate={
                play
                  ? {
                      backgroundColor: ['rgba(255,255,255,0.03)', 'rgba(34,211,238,0.18)', 'rgba(255,255,255,0.03)'],
                      borderColor: ['rgba(255,255,255,0.10)', 'rgba(34,211,238,0.45)', 'rgba(255,255,255,0.10)'],
                    }
                  : { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.10)' }
              }
              transition={when(play, loop(CYCLE, (i * CYCLE) / steps.length))}
            >
              <motion.span
                className="mrow__check"
                animate={play ? { opacity: [0.25, 1, 0.25], scale: [0.7, 1, 0.7] } : { opacity: 1, scale: 1 }}
                transition={when(play, loop(CYCLE, (i * CYCLE) / steps.length))}
              >
                {check}
              </motion.span>
            </motion.span>

            <span className="mrow__label">{s}</span>

            <motion.span
              className="mrow__meta"
              animate={play ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.7 }}
              transition={when(play, loop(CYCLE, (i * CYCLE) / steps.length))}
            >
              done
            </motion.span>
          </div>
        ))}

        <div className="mprog">
          <div className="mprog__top">
            <span>Running</span>
            <span>4 steps</span>
          </div>
          <div className="mprog__track">
            <motion.div
              className="mprog__fill"
              animate={play ? { scaleX: [0, 1] } : { scaleX: 1 }}
              transition={when(play, { duration: CYCLE, repeat: Infinity, ease: 'linear' })}
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
            animate={play ? { borderColor: ['rgba(255,255,255,0.10)', 'rgba(34,211,238,0.38)', 'rgba(255,255,255,0.10)'] } : { borderColor: 'rgba(255,255,255,0.10)' }}
            transition={when(play, loop(3.6, i * 1.1))}
          >
            <motion.span
              className="mseo__up"
              animate={play ? { y: [2, -2, 2], opacity: [0.5, 1, 0.5] } : { y: 0, opacity: 1 }}
              transition={when(play, loop(3.6, i * 1.1))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 15 6-6 6 6" />
              </svg>
            </motion.span>
            <span className="mseo__kw">{row.kw}</span>
            <span className="mseo__pos">
              <s>{row.from}</s>
              <motion.b
                animate={play ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
                transition={when(play, loop(3.6, i * 1.1))}
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
              animate={play ? { scaleX: [0.55, 0.88, 0.55] } : { scaleX: 0.82 }}
              transition={when(play, loop(4))}
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

export function ServiceMock({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // `once: false` so the loop stops when the card scrolls away and picks back up on return
  const inView = useInView(ref, { amount: 0.3 });

  const Mock = mocks[id as keyof typeof mocks];
  if (!Mock) return null;

  return (
    <div ref={ref}>
      <Mock play={!reduce && inView} />
    </div>
  );
}
