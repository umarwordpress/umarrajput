'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUp, scaleIn, stagger, inView } from '@/lib/motion';

export function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <motion.div variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={inView}>
          <motion.span className="eyebrow" variants={fadeUp}>About</motion.span>
          <motion.h2 className="title" variants={fadeUp} style={{ margin: '18px 0 22px' }}>
            Search strategy, built on <span className="grad-text">evidence</span> — not guesswork.
          </motion.h2>
          <motion.p variants={fadeUp}>
            I&apos;m <strong>Umar Rajput</strong>, an SEO strategist and web developer with 4+ years
            spent between Search Console dashboards and code editors. Most of my work sits at the
            intersection of the two: diagnosing why a site isn&apos;t ranking, then actually building
            the fix instead of handing over a PDF and walking away.
          </motion.p>
          <motion.p variants={fadeUp}>
            I work with service businesses, eCommerce brands and agencies across Saudi Arabia,
            Qatar, the UAE and the United States. That usually means technical audits, indexation
            and Core Web Vitals cleanup, on-page and content architecture, and custom WordPress or
            Shopify builds engineered to load fast and stay crawlable.
          </motion.p>
          <motion.p variants={fadeUp}>
            My approach is deliberately unglamorous: measure the baseline, prioritise by impact,
            ship in small increments, and report honestly on what moved. If a tactic isn&apos;t
            earning its place in the data, it gets cut.
          </motion.p>
        </motion.div>

        <Reveal variants={scaleIn} className="about__media">
          <Image
            src="/assets/umar-420.webp"
            alt="Portrait of Umar Rajput, SEO strategist and web developer"
            width={420}
            height={525}
            sizes="(max-width: 1080px) 420px, 40vw"
          />
          <div className="about__badge">
            <b className="grad-text">4+ yrs</b>
            <span>SEO &amp; web development</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
