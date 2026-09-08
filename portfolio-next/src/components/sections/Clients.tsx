'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/ui/Marquee';
import { clients } from '@/data/clients';
import { fadeUp, stagger, inView } from '@/lib/motion';

export function Clients() {
  return (
    <section className="section section--tight" id="clients">
      <div className="container">
        <motion.div
          className="head head--center"
          style={{ marginBottom: 36 }}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Trusted by</motion.span>
          <motion.h2
            className="title"
            variants={fadeUp}
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
          >
            Brands I&apos;ve Worked With
          </motion.h2>
        </motion.div>
      </div>

      <Marquee duration={46}>
        {clients.map((c) => (
          <span className="logo-cell" key={c.src}>
            <Image src={c.src} alt={c.alt} width={c.width} height={c.height} loading="lazy" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
