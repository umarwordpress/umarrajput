export type SiteProject = {
  kind: 'site';
  id: string;
  tag: string;
  title: string;
  meta: string;
  platform: string;
  region: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Seconds for the hover scroll, longer pages scroll slower. */
  scrollDuration: number;
  cats: string[];
  regions: string[];
};

export type CaseProject = {
  kind: 'case';
  id: string;
  slug: string;
  shots: number;
  tag: string;
  title: string;
  client: string;
  body: string;
  metrics: { value: string; label: string }[];
  source: string;
  period: string;
  headline: { value: string; label: string };
  thumb: { alt: string; width: number; height: number };
  cats: string[];
  regions: string[];
};

export type Project = SiteProject | CaseProject;

export const projects: Project[] = [
  {
    kind: 'site',
    id: 'hair-beauty-studio',
    tag: 'Website Development',
    title: 'Hair & Beauty Studio',
    meta: 'Bilingual booking site with a hair-extension catalogue',
    platform: 'WordPress',
    region: 'Oslo & Fredrikstad, Norway',
    image: {
      src: '/assets/sites/hair-beauty-studio-norway.jpg',
      alt: 'Full-page design of a bilingual hair and beauty studio website in Norway',
      width: 760,
      height: 2400,
    },
    scrollDuration: 9,
    cats: ['websites', 'wordpress'],
    regions: ['norway', 'europe'],
  },
  {
    kind: 'site',
    id: 'safety-training-institute',
    tag: 'Website Development',
    title: 'Safety Training Institute',
    meta: 'Course catalogue and certification enrolment funnel',
    platform: 'WordPress',
    region: 'Al Khobar, Saudi Arabia',
    image: {
      src: '/assets/sites/safety-training-institute-ksa.jpg',
      alt: 'Full-page design of a safety training institute website in Saudi Arabia',
      width: 760,
      height: 2600,
    },
    scrollDuration: 10,
    cats: ['websites', 'wordpress'],
    regions: ['gcc', 'saudi-arabia'],
  },
  {
    kind: 'site',
    id: 'beds-mattress-store',
    tag: 'Website Development',
    title: 'Beds & Mattress Store',
    meta: 'Promotional storefront with faceted category navigation',
    platform: 'eCommerce',
    region: 'United Kingdom',
    image: {
      src: '/assets/sites/beds-mattress-store-uk.jpg',
      alt: 'Full-page design of a United Kingdom beds and mattress eCommerce store',
      width: 760,
      height: 2755,
    },
    scrollDuration: 11,
    cats: ['websites', 'ecommerce'],
    regions: ['uk', 'europe'],
  },
  {
    kind: 'case',
    id: 'training-institute-search',
    slug: 'training-institute-search',
    shots: 2,
    tag: 'SEO',
    title: 'Organic and AI search visibility for a training institute',
    client: 'Safety Training Institute · Al Khobar, Saudi Arabia',
    body: "Search Console performance for the same client's website, organic impressions at an average position of 8.4, plus early visibility inside Google's generative AI answers.",
    metrics: [
      { value: '51.4K', label: 'Search impressions' },
      { value: '856', label: 'Clicks from search' },
      { value: '8.4', label: 'Average position' },
      { value: '9.76K', label: 'AI-answer impressions' },
    ],
    source: 'Google Search Console',
    period: '28 days to 27 Aug 2026',
    headline: { value: '51.4K', label: 'search impressions' },
    thumb: {
      alt: 'Google Search Console performance report showing 856 clicks and 51.4K impressions over 28 days for a training institute website',
      width: 820,
      height: 526,
    },
    cats: ['seo'],
    regions: ['gcc', 'saudi-arabia'],
  },
  {
    kind: 'case',
    id: 'training-institute-august',
    slug: 'training-institute-august',
    shots: 4,
    tag: 'SEO',
    title: '450 profile interactions in a single month',
    client: 'Safety Training Institute · Al Khobar, Saudi Arabia',
    body: 'One month of the same Business Profile, pulled out on its own. Across 31 days in August the profile drove 450 interactions, calls, direction requests and website visits from people already looking for training nearby, more than double what the same month produced a year earlier.',
    metrics: [
      { value: '450', label: 'Profile interactions · +129.6%' },
      { value: '318', label: 'Direction requests · +176.5%' },
      { value: '80', label: 'Website clicks · +40.4%' },
      { value: '52', label: 'Calls from the profile · +116.7%' },
    ],
    source: 'Google Business Profile',
    period: 'August 2026',
    headline: { value: '+129.6%', label: 'vs Aug 2025' },
    thumb: {
      alt: 'Google Business Profile performance for a safety training institute in Al Khobar showing 450 profile interactions in August 2026, up 129.6 percent year on year',
      width: 820,
      height: 512,
    },
    cats: ['seo'],
    regions: ['gcc', 'saudi-arabia'],
  },
  {
    kind: 'case',
    id: 'hair-salon-fredrikstad',
    slug: 'hair-salon-fredrikstad',
    shots: 3,
    tag: 'SEO',
    title: "Ranking a hair salon for its city's core search terms",
    client: 'Hair Salon · Fredrikstad, Norway',
    body: 'Local SEO and Business Profile work targeting high-intent Norwegian-language queries, the top term alone surfaced the profile 1,852 times.',
    metrics: [
      { value: '11,430', label: 'People viewed the profile' },
      { value: '1,405', label: 'Profile interactions' },
      { value: '823', label: 'Clicks through to the website' },
      { value: '5,023', label: 'Searches surfaced the profile' },
    ],
    source: '4.5 · 115 Google reviews',
    period: 'Mar to Aug 2026',
    headline: { value: '11,430', label: 'profile views' },
    thumb: {
      alt: 'Google Business Profile performance showing 11,430 profile views for a hair salon in Fredrikstad, Norway',
      width: 820,
      height: 464,
    },
    cats: ['seo'],
    regions: ['norway', 'europe'],
  },
];

/** The homepage shows a curated subset. */
export const featuredProjects = projects;
