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
            Websites, Apps and Systems That Solve{' '}
            <span className="grad-text">Real Problems.</span>
          </motion.h2>
          <motion.p variants={fadeUp}>
            I&apos;m <strong>Umar Rajput</strong>, a developer working across web development,
            business automation and SEO. I started with websites and search, then moved into
            building the software and workflows behind them, because that is where most of the
            real problems turned out to be.
          </motion.p>
          <motion.p variants={fadeUp}>
            I work with service businesses, e-commerce brands and agencies across the GCC, the
            Nordics, the UK and the US. It is just me, not an agency, so you talk to the person
            writing the code.
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
