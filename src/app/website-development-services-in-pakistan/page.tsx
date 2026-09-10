import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { projects } from '@/data/projects';
import { site } from '@/lib/site';
import {
  heroPoints, audiences, serviceBlocks, designPoints, whyPoints, siteTypes,
  buildSteps, businessNeeds, costFactors, customVsTemplate, faqs,
} from '@/data/pakistanPage';

const PATH = '/website-development-services-in-pakistan';

export const metadata: Metadata = {
  title: { absolute: 'Website Development Services in Pakistan | Umar Rajput' },
  description:
    'Professional website development services in Pakistan for business, WordPress, e-commerce and custom websites. Request a website quote today.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Website Development Services in Pakistan | Umar Rajput',
    description:
      'Business websites, WordPress, e-commerce and custom web applications built for businesses across Pakistan.',
    url: `${site.url}${PATH}`,
  },
};

/* Only the website builds belong on a website development page. The search
   campaigns live on /work and are not dressed up as build projects here. */
const builds = projects.filter((p) => p.kind === 'site');

export default function PakistanPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Website Development Services in Pakistan',
        serviceType: 'Website development',
        description: metadata.description,
        url: `${site.url}${PATH}`,
        provider: { '@type': 'Person', name: site.name, url: site.url },
        areaServed: { '@type': 'Country', name: 'Pakistan' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Website development services',
          itemListElement: serviceBlocks.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Website Development Services in Pakistan',
            item: `${site.url}${PATH}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ---------------- hero + quote form ---------------- */}
      <section className="lp-hero">
        <div className="container lp-hero__inner">
          <div>
            <Reveal>
              <span className="eyebrow">Website Development</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="lp-hero__title">
                Website Development Services in{' '}
                <span className="grad-text">Pakistan</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede lp-hero__lede">
                Build a website that earns its place in your business rather than sitting there
                looking tidy. I design and develop business websites, WordPress sites, online
                stores and custom web applications for companies across Pakistan, built to load
                fast, read properly on a phone and turn visitors into enquiries.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="lp-hero__actions">
                <a href="#quote" className="btn btn--primary btn--lg">
                  Get a Free Website Consultation <Icon name="arrow-right" size={18} />
                </a>
                <Link href="#portfolio" className="btn btn--glass btn--lg">View My Work</Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="lp-checks">
                {heroPoints.map((p) => (
                  <li key={p}><Icon name="check" size={14} />{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      {/* ---------------- who it is for ---------------- */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="head head--center">
            <h2 className="title">Website development services for businesses in Pakistan</h2>
            <p className="lede">
              Most businesses do not need a bigger website. They need one that does a specific job:
              explain what they do clearly, be findable in search, and make it easy to get in touch.
            </p>
          </Reveal>

          <div className="lp-grid lp-grid--4">
            {audiences.map(([who, what]) => (
              <Reveal key={who} className="card lp-mini">
                <h3>{who}</h3>
                <p>{what}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- the four services ---------------- */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="head head--center">
            <span className="eyebrow">What I build</span>
            <h2 className="title">Website development services</h2>
          </Reveal>

          <div className="lp-grid lp-grid--2">
            {serviceBlocks.map((s) => (
              <Reveal key={s.id} className="card lp-service">
                <span className="svc__icon"><Icon name={s.icon} size={19} /></span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="svc__points">
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <a href="#quote" className="lp-link">Discuss your project <Icon name="arrow-right" size={15} /></a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- design and development ---------------- */}
      <section className="section">
        <div className="container lp-split">
          <Reveal>
            <span className="eyebrow">Design and development</span>
            <h2 className="title" style={{ margin: '18px 0 18px' }}>
              Website design and development that supports your business goals
            </h2>
            <p className="lede" style={{ marginBottom: 14 }}>
              A website is not a brochure that happens to be online. Every decision in the build
              either helps someone understand what you do and get in touch, or it gets in the way.
            </p>
            <p className="lede">
              I treat design and development as one job rather than two handovers.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="lp-grid lp-grid--2 lp-grid--tight">
              {designPoints.map(([h, t]) => (
                <div className="card lp-mini" key={h}>
                  <h3>{h}</h3>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- portfolio ---------------- */}
      <section className="section" id="portfolio">
        <div className="container">
          <Reveal className="head head--center">
            <span className="eyebrow">Portfolio</span>
            <h2 className="title">Website development projects</h2>
            <p className="lede">
              Websites I designed and built. Each one links to the full write-up.
            </p>
          </Reveal>

          <div className="lp-grid lp-grid--3">
            {builds.map((p) => (
              <Reveal key={p.id} className="card lp-case">
                <Link href={`/work/${p.id}`} className="lp-case__shot">
                  <Image
                    src={p.kind === 'site' ? p.image.src : ''}
                    alt={`${p.title} website development project, built on ${p.kind === 'site' ? p.platform : ''}`}
                    width={760}
                    height={520}
                    sizes="(max-width: 680px) 100vw, 33vw"
                    loading="lazy"
                  />
                </Link>
                <div className="lp-case__body">
                  <span className="wtag">{p.kind === 'site' ? p.platform : ''}</span>
                  <h3><Link href={`/work/${p.id}`}>{p.title}</Link></h3>
                  <p className="wcard__client">{p.kind === 'site' ? p.region : ''}</p>
                  <p>{p.kind === 'site' ? p.meta : ''}</p>
                  <Link href={`/work/${p.id}`} className="lp-link">
                    View case study <Icon name="arrow-right" size={15} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="lp-center">
            <Link href="/work" className="btn btn--glass btn--lg">See all my work</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- why choose ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal className="head head--center">
            <span className="eyebrow">Why work with me</span>
            <h2 className="title">Professional website development services</h2>
          </Reveal>
          <div className="lp-grid lp-grid--3">
            {whyPoints.map(([h, t]) => (
              <Reveal key={h} className="card lp-mini">
                <h3>{h}</h3>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- website types ---------------- */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="head head--center">
            <h2 className="title">What types of websites can I build?</h2>
          </Reveal>
          <Reveal className="lp-tags">
            {siteTypes.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal className="head head--center">
            <span className="eyebrow">How it runs</span>
            <h2 className="title">The website development process</h2>
          </Reveal>
          <div className="lp-grid lp-grid--3">
            {buildSteps.map(([n, h, t]) => (
              <Reveal key={n} className="card lp-mini">
                <span className="lp-step">{n}</span>
                <h3>{h}</h3>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- why a professional site ---------------- */}
      <section className="section">
        <div className="container lp-split">
          <Reveal>
            <h2 className="title" style={{ marginBottom: 18 }}>
              Why does your business need a professional website?
            </h2>
            <p className="lede" style={{ marginBottom: 14 }}>
              Most people check you online before they call. What they find decides whether they
              bother. A site that loads slowly, reads badly on a phone or does not explain what you
              actually do costs you enquiries you never hear about.
            </p>
            <p className="lede">
              It is also the one place online you own. Ads, search and social all point somewhere,
              and that somewhere is either working for you or quietly wasting the spend.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="lp-checks lp-checks--stack">
              {businessNeeds.map((b) => (
                <li key={b}><Icon name="check" size={14} />{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- cost ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal className="head head--center">
            <span className="eyebrow">Cost</span>
            <h2 className="title">How much do website development services cost in Pakistan?</h2>
            <p className="lede">
              There is no honest single number, and anyone giving you one before seeing the
              requirements is guessing. These are the things that actually move the figure.
            </p>
          </Reveal>
          <div className="lp-grid lp-grid--4">
            {costFactors.map(([h, t]) => (
              <Reveal key={h} className="card lp-mini">
                <h3>{h}</h3>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lp-center">
            <a href="#final" className="btn btn--primary btn--lg">
              Get a Custom Website Quote <Icon name="arrow-right" size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- custom vs template ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal className="head head--center">
            <h2 className="title">Custom website vs template website</h2>
            <p className="lede">
              Templates are not wrong. They fit when requirements are simple and budget is tight.
              Custom website development services earn their cost when the business works in a way
              a template cannot express.
            </p>
          </Reveal>

          <Reveal className="lp-table">
            <div className="lp-table__head">
              <span className="grad-text">Custom website</span>
              <span>Template website</span>
            </div>
            {customVsTemplate.map(([a, b]) => (
              <div className="lp-table__row" key={a}>
                <span>{a}</span>
                <span>{b}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="section" id="faq">
        <div className="container">
          <Reveal className="head head--center">
            <h2 className="title">Frequently asked questions</h2>
          </Reveal>
          <Reveal className="lp-faq">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}<i aria-hidden /></summary>
                <p>{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- final cta ---------------- */}
      <section className="section" id="final">
        <div className="container lp-final">
          <Reveal>
            <h2 className="title" style={{ marginBottom: 18 }}>
              Ready to <span className="grad-text">build your website?</span>
            </h2>
            <p className="lede" style={{ marginBottom: 24 }}>
              Tell me about your business and what the site needs to do. I will come back with the
              right approach, a scope and a price, whether that is WordPress, an online store or
              something custom.
            </p>
            <p className="lp-related">
              Or read more about{' '}
              <Link href="/#services">what else I build</Link>,{' '}
              <Link href="/work">the projects behind it</Link> and{' '}
              <Link href="/#about">how I work</Link>.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <QuoteForm compact />
          </Reveal>
        </div>
      </section>
    </>
  );
}
