'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { services, type Service } from '@/data/services';
import { Icon } from '@/components/ui/Icon';
import { ServiceMock } from '@/components/mocks/ServiceMock';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

function ServiceCard({ service, n, i }: { service: Service; n: number; i: number }) {
  const reduce = useReducedMotion();

  /* cursor position drives both the glow and a subtle 3D tilt */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-3, 3]), { stiffness: 220, damping: 22 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.article
      className="card svc"
      /* `hidden`/`show` come from the parent stagger; `hover` is layered on top.
         Every child declares all three so nothing snaps back to an undefined state. */
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      whileHover="hover"
      transition={{ delay: i * 0.07 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }
      }
    >
      <span className="svc__glow" aria-hidden />

      <ServiceMock id={service.id} />

      {/* gradient edge that sweeps in from the left */}
      <motion.span
        className="svc__edge"
        aria-hidden
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.5, ease: easeSoft }}
      />

      <div className="svc__head">
      <motion.span
        className="svc__icon"
        variants={{
          hidden: { rotate: 0, scale: 1, borderColor: 'rgba(255,255,255,0.16)' },
          show: { rotate: 0, scale: 1, borderColor: 'rgba(255,255,255,0.16)' },
          hover: { rotate: -8, scale: 1.08, borderColor: 'rgba(34,211,238,0.85)' },
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 16 }}
        style={{ translateZ: 26 }}
      >
        <Icon name={service.icon} size={19} />
      </motion.span>

      <motion.h3
        variants={{ hidden: { x: 0 }, show: { x: 0 }, hover: { x: 3 } }}
        style={{ translateZ: 18 }}
      >
        {service.title}
      </motion.h3>
      </div>
      <motion.p style={{ translateZ: 10 }}>{service.body}</motion.p>

      <ul className="svc__points">
        {service.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <motion.span
        className="svc__more"
        aria-hidden
        variants={{
          hidden: { opacity: 0, y: 6 },
          show: { opacity: 0, y: 6 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3, ease: easeSoft }}
      >
        <Icon name="arrow-right" size={16} />
      </motion.span>
    </motion.article>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <motion.div
          className="head head--center"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Services</motion.span>
          <motion.h2 className="title" variants={fadeUp}>What I Build</motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Four services that work as one system. Most projects use two or three of them together.
          </motion.p>
        </motion.div>

        <div className="svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} n={i + 1} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
