import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudyBySlug } from '@/data/caseStudies';
import { CaseNav } from '@/components/case/CaseNav';
import { CaseSections } from '@/components/case/CaseSections';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: 'article',
      title: `${study.title}, case study`,
      description: study.summary,
      url: `${site.url}/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${site.url}/work` },
      { '@type': 'ListItem', position: 3, name: study.title, item: `${site.url}/work/${study.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <article>
        <header className="casehero">
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/work">Work</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{study.title}</span>
            </nav>

            <Reveal>
              <div className="casehero__tags">
                <span className="wtag">{study.category}</span>
                <span className="casehero__year">{study.year}</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="casehero__title">{study.title}</h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="casehero__sub">{study.subtitle}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="casehero__summary">{study.summary}</p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="casehero__actions">
                <Link href="/#contact" className="btn btn--primary btn--lg">
                  Start a project like this <Icon name="arrow-right" size={18} />
                </Link>
                {study.metrics && (
                  <a href="#sec-04" className="btn btn--glass btn--lg">
                    Skip to the results
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="casemeta">
                {study.meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.36}>
              <ul className="casestack">
                {study.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.42}>
              <ul className="casehighs">
                {study.highlights.map((h) => (
                  <li key={h.label} className="card">
                    <b className="grad-text">
                      {h.value}
                      {h.unit && <i>{h.unit}</i>}
                    </b>
                    <span>{h.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </header>

        <CaseNav sections={study.sections} />

        {study.cover && (
          <div className="container">
            <Reveal className="casecover">
              <Image
                src={study.cover.src}
                alt={study.cover.alt}
                width={study.cover.width}
                height={study.cover.height}
                sizes="(max-width: 900px) 100vw, 900px"
                priority
              />
            </Reveal>
          </div>
        )}

        <CaseSections study={study} />

        <section className="section">
          <div className="container">
            <div className="cta">
              <h2>
                Want something like <span className="grad-text">this?</span>
              </h2>
              <p>Straight answer on whether I can move the numbers, and roughly what it takes.</p>
              <div className="cta__actions">
                <Link href="/#contact" className="btn btn--primary btn--lg">
                  Start a project <Icon name="arrow-right" size={18} />
                </Link>
                <Link href="/work" className="btn btn--glass btn--lg">
                  All work
                </Link>
              </div>
            </div>

            <Link href={`/work/${next.slug}`} className="casenext card">
              <span>Next case study</span>
              <b>{next.title}</b>
              <Icon name="arrow-right" size={20} />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
