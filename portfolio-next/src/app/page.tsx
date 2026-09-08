import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Markets } from '@/components/sections/Markets';
import { Career } from '@/components/sections/Career';
import { Work } from '@/components/sections/Work';
import { Clients } from '@/components/sections/Clients';
import { Testimonials } from '@/components/sections/Testimonials';
import { Process } from '@/components/sections/Process';
import { Cta } from '@/components/sections/Cta';
import { Contact } from '@/components/sections/Contact';
import { site } from '@/lib/site';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  sameAs: [site.socials.linkedin, site.socials.instagram, site.socials.x],
  knowsAbout: [
    'Technical SEO',
    'Local SEO',
    'Google Business Profile',
    'WordPress development',
    'Shopify development',
    'Core Web Vitals',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Markets />
      <Career />
      <Work />
      <Clients />
      <Testimonials />
      <Process />
      <Cta />
      <Contact />
    </>
  );
}
