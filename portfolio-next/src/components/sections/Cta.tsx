'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { inView, easeSoft } from '@/lib/motion';

export function Cta() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: easeSoft }}
        >
          <h2>
            Have a Project <span className="grad-text">in Mind?</span>
          </h2>
          <p>
            Tell me what&apos;s not working. I&apos;ll tell you straight whether I can fix it — and
            roughly what it takes.
          </p>
          <div className="cta__actions">
              <Link href="#contact" className="btn btn--primary btn--lg">
                Hire Me <Icon name="arrow-right" size={18} />
              </Link>
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--glass btn--lg"
              >
                <Icon name="whatsapp" size={18} /> WhatsApp Me
              </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
