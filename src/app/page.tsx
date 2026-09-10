import { Hero } from '@/components/sections/Hero';
import { System } from '@/components/sections/System';
import { Services } from '@/components/sections/Services';
import { Difference } from '@/components/sections/Difference';
import { Scenarios } from '@/components/sections/Scenarios';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Career } from '@/components/sections/Career';
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
    'Web development',
    'Custom web applications',
    'Business automation',
    'Workflow automation',
    'WordPress development',
    'Shopify development',
    'Technical SEO',
    'Local SEO',
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
      <System />
      <Services />
      <Difference />
      <Scenarios />
      <Work />
      <About />
      <Career />
      <Clients />
      <Testimonials />
      <Process />
      <Cta />
      <Contact />
    </>
  );
}
