'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedWords } from '@/components/ui/AnimatedWords';
import { Starfield } from '@/components/ui/Starfield';
import { Icon } from '@/components/ui/Icon';
import { proofPoints } from '@/data/proof';
import { site } from '@/lib/site';
import { fadeUp, stagger } from '@/lib/motion';

export function Hero() {
  return (
    <section className="hero">
      <Starfield count={52} />

      <div className="container hero__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Available for new projects
        </motion.span>

        <AnimatedWords
          text="I Build Digital Systems That Help Businesses Grow."
          highlight="digital systems"
        />

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Websites, custom web applications, business automations, and SEO, built to turn your
          online presence into a system that works for your business.
        </motion.p>

        <motion.p
          className="hero__services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.62 }}
        >
          Web Development <i>·</i> Custom Applications <i>·</i> Automation <i>·</i> SEO
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68 }}
        >
          <Link href="#contact" className="btn btn--primary btn--lg">
            Start a Project <Icon name="arrow-right" size={18} />
          </Link>
          <Link href="#work" className="btn btn--glass btn--lg">
            View My Work
          </Link>
        </motion.div>

        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" size={17} />
          </a>
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Icon name="instagram" size={17} />
          </a>
          <a href={site.socials.x} target="_blank" rel="noopener noreferrer" aria-label="X">
            <Icon name="x" size={17} />
          </a>
          <a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Icon name="whatsapp" size={17} />
          </a>
        </motion.div>

        <motion.ul
          className="proofs"
          variants={stagger(0.1, 0.9)}
          initial="hidden"
          animate="show"
          aria-label="Recent client results"
        >
          {proofPoints.map((p) => (
            <motion.li key={p.label} className="card proof" variants={fadeUp}>
              <b className="grad-text">
                {p.value}
                {p.unit && <i>{p.unit}</i>}
              </b>
              <span>
                {p.label}
                <em>{p.meta}</em>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
