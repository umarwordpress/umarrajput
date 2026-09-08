export type Market = {
  id: string;
  index: string;
  name: string;
  meta: string;
  primary?: boolean;
  heading: string;
  body: string;
  countries: string[];
  stat: { value: string; unit?: string; caption: string };
  languages: string;
  focus: string;
};

export const markets: Market[] = [
  {
    id: 'gcc',
    index: '01',
    name: 'GCC & Middle East',
    meta: '5 countries · Arabic, English',
    primary: true,
    heading: 'Maps decides who gets the call',
    body: 'In the Gulf most enquiries start in Maps, not on page one. I run bilingual Arabic/English keyword frameworks, Business Profile optimisation and review generation alongside the technical build — so the listing and the site pull in the same direction.',
    countries: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Oman'],
    stat: {
      value: '450',
      caption: 'Business Profile interactions in a single month — safety training institute, Al Khobar',
    },
    languages: 'Arabic · English',
    focus: 'Local SEO, Business Profiles, review generation, WordPress builds',
  },
  {
    id: 'nordics',
    index: '02',
    name: 'Nordics',
    meta: 'Norway · Norwegian, English',
    primary: true,
    heading: 'One Norwegian term can carry a whole location',
    body: 'Norwegian-language local search rewards precision over volume. I target the handful of queries that actually convert in each city, and stand up separate Business Profiles for studios running more than one branch.',
    countries: ['Norway', 'Scandinavia'],
    stat: {
      value: '11,430',
      caption: 'Profile views over six months — hair salon, Fredrikstad',
    },
    languages: 'Norwegian · English',
    focus: 'Multi-location profiles, local ranking, booking-led websites',
  },
  {
    id: 'usuk',
    index: '03',
    name: 'US & UK',
    meta: '2 countries · English',
    heading: 'eCommerce and service brands at scale',
    body: 'Bigger catalogues and harder competition. The work here is technical audits, faceted-URL strategy, content architecture and Core Web Vitals cleanup on WordPress and Shopify — plus the builds themselves.',
    countries: ['United States', 'United Kingdom'],
    stat: {
      value: '15.8',
      unit: '%',
      caption: 'Average click-through rate from a 2.64K impression base — local service client',
    },
    languages: 'English',
    focus: 'Technical SEO, Shopify & WooCommerce, content architecture',
  },
  {
    id: 'sasia',
    index: '04',
    name: 'South Asia',
    meta: 'Pakistan · English',
    heading: 'Where the habit started',
    body: 'Local SEO and small-business websites in Pakistan — the work that taught me to measure a baseline before touching anything. I still take on builds here when a business needs something fast and clean rather than expensive.',
    countries: ['Pakistan'],
    stat: {
      value: '4',
      unit: '+ yrs',
      caption: 'Local SEO and front-end work, from early career to today',
    },
    languages: 'English',
    focus: 'Google Business Profile, small-business WordPress, local ranking',
  },
];
