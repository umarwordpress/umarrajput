import type { Metadata } from 'next';
import { WorkGrid } from './WorkGrid';
import { Clients } from '@/components/sections/Clients';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Portfolio, websites and search campaigns',
  description:
    'Websites, e-commerce builds and SEO projects, with performance data taken straight from the client\u2019s own Google Search Console and Business Profile dashboards.',
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
              Each project below covers what the client needed, what I built, and what it changed.
              Numbers come from the client&apos;s own dashboards. Where there is no measurable result
              to show, the work is simply described as it was.
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
