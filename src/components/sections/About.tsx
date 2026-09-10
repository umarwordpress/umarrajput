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
            I Build Websites, Applications and Systems That Solve Real{' '}
            <span className="grad-text">Business Problems.</span>
          </motion.h2>
          <motion.p variants={fadeUp}>
            I&apos;m <strong>Umar Rajput</strong>, a developer working across web development,
            business automation and SEO. I started with websites and search, then moved into
            building the software and workflows that sit behind them, because that is where most of
            the actual problems turned out to be.
          </motion.p>
          <motion.p variants={fadeUp}>
            Today I work with service businesses, e-commerce brands and agencies across the GCC,
            the Nordics, the UK and the US. That might mean a WordPress or Shopify build, a custom
            web application shaped around a specific workflow, connecting the tools a business
            already pays for, or the technical and local SEO work that gets it found.
          </motion.p>
          <motion.p variants={fadeUp}>
            It is just me, not an agency, so you talk to the person writing the code. My approach is
            deliberately unglamorous: understand the problem first, build the smallest thing that
            solves it, and be honest about what worked.
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
            <span>Web, apps, automation &amp; SEO</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
