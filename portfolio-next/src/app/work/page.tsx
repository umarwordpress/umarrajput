import type { Metadata } from 'next';
import { WorkGrid } from './WorkGrid';
import { Clients } from '@/components/sections/Clients';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Portfolio — websites and search campaigns',
  description:
    'Web design, eCommerce and local SEO projects with performance data taken straight from Google Search Console and Google Business Profile.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 56px)' }}>
        <div className="container">
          <div className="head">
            <span className="eyebrow">Portfolio</span>
            <h1 className="title" style={{ margin: '18px 0 16px' }}>
              Work that shows its <span className="grad-text">receipts</span>.
            </h1>
            <p className="lede">
              Websites I designed and built, and local-search campaigns with numbers taken straight
              from the client&apos;s own dashboards. Hover any website to scroll the full page; click
              any campaign to open its performance screenshots.
            </p>
          </div>

          <WorkGrid />
        </div>
      </section>

      <Clients />
      <Cta />
    </>
  );
}
