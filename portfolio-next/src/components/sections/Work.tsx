'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import { Icon } from '@/components/ui/Icon';
import { fadeUp, stagger, inView, easeSoft } from '@/lib/motion';

/** Each project has a case study at /work/<slug>. */
export const caseHref = (p: Project) => `/work/${p.kind === 'site' ? p.id : p.slug}`;

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  if (project.kind === 'site') {
    return (
      <motion.article
        className="card wcard"
        variants={fadeUp}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <Link href={caseHref(project)} className="wcard__link" aria-label={`Read the ${project.title} case study`} />
        <div className="wcard__shot">
          {/* the full-page screenshot scrolls on hover */}
          <motion.div
            className="wcard__scroll"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              variants={{ rest: { y: 0 }, hover: { y: '-72%' } }}
              transition={{ duration: project.scrollDuration, ease: 'linear' }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
          <span className="wcard__hint">Hover to scroll</span>
        </div>
        <div className="wcard__body">
          <span className="wtag">{project.tag}</span>
          <h3>{project.title}</h3>
          <p className="wcard__client">{project.meta}</p>
          <div className="wcard__foot">
            <span>{project.platform}</span>
            <span>{project.region}</span>
          </div>
          <span className="wcard__read">
            Read case study <Icon name="arrow-right" size={15} />
          </span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="card wcard"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      <Link href={caseHref(project)} className="wcard__link" aria-label={`Read the ${project.title} case study`} />
      <div className="wcard__shot">
        <Image
          src={`/assets/work/${project.slug}/1-thumb.jpg`}
          alt={project.thumb.alt}
          width={project.thumb.width}
          height={project.thumb.height}
          sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          loading="lazy"
        />
        <span className="wcard__count">{project.shots} screenshots</span>
      </div>

      <div className="wcard__body">
        <span className="wtag">{project.tag}</span>
        <h3>{project.title}</h3>
        <p className="wcard__client" style={{ marginBottom: compact ? 0 : 14 }}>
          {project.client}
        </p>

        {!compact && (
          <>
            <p style={{ marginBottom: 4 }}>{project.body}</p>
            <div className="metrics">
              {project.metrics.map((m) => (
                <div className="metric" key={m.label}>
                  <b className="grad-text">{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="wcard__foot">
          {compact ? (
            <span className="wcard__stat">
              <b className="grad-text">{project.headline.value}</b>
              {project.headline.label}
            </span>
          ) : (
            <span>{project.source}</span>
          )}
          <span>{project.period}</span>
        </div>
        <span className="wcard__read">
          Read case study <Icon name="arrow-right" size={15} />
        </span>
      </div>
    </motion.article>
  );
}

export function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <motion.div
          className="head"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="eyebrow" variants={fadeUp}>Selected work</motion.span>
          <motion.h2 className="title" variants={fadeUp}>Projects &amp; Results</motion.h2>
          <motion.p className="lede" variants={fadeUp}>
            Websites I designed and built, plus local-search campaigns with results pulled straight
            from Google Business Profile. Hover any site to scroll the full page.
          </motion.p>
        </motion.div>

        <motion.div
          className="work-grid"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} compact />
          ))}
        </motion.div>

        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, ease: easeSoft }}
        >
          <Link href="/work" className="btn btn--glass btn--lg">
            View All Work <Icon name="arrow-right" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
