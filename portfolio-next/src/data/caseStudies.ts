/**
 * Case-study content.
 *
 * Every metric, period and market here is taken from the client dashboards
 * already published on this site. The narrative sections are written from
 * that same evidence — REVIEW THEM before launch and add any project detail
 * only you know (budgets, constraints, timelines, who you worked with).
 */

export type Section =
  | { n: string; eyebrow: string; title: string; kind: 'prose'; body: string[] }
  | { n: string; eyebrow: string; title: string; kind: 'list'; items: string[] }
  | { n: string; eyebrow: string; title: string; kind: 'results' };

export type CaseStudy = {
  slug: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  meta: { label: string; value: string }[];
  stack: string[];
  highlights: { value: string; unit?: string; label: string }[];
  sections: Section[];
  metrics?: { value: string; label: string }[];
  gallery?: { slug: string; shots: number; caption: string };
  cover?: { src: string; alt: string; width: number; height: number };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'training-institute-august',
    category: 'Local SEO',
    year: '2026',
    title: '450 profile interactions in a single month',
    subtitle: 'Turning a training institute’s Google Business Profile into its main enquiry channel',
    summary:
      'In August 2026 alone the profile drove 450 interactions — calls, direction requests and website visits from people already searching for training nearby. More than double the same month a year earlier.',
    meta: [
      { label: 'Client', value: 'Safety training institute' },
      { label: 'Market', value: 'Al Khobar, Saudi Arabia' },
      { label: 'Services', value: 'Local SEO · Business Profile' },
      { label: 'Period', value: 'August 2026 (one month)' },
    ],
    stack: ['Google Business Profile', 'Arabic / English SERPs', 'Review generation', 'WordPress'],
    highlights: [
      { value: '+129.6', unit: '%', label: 'Profile interactions vs Aug 2025' },
      { value: '+176.5', unit: '%', label: 'Direction requests' },
      { value: '+116.7', unit: '%', label: 'Calls from the profile' },
    ],
    metrics: [
      { value: '450', label: 'Profile interactions · +129.6%' },
      { value: '318', label: 'Direction requests · +176.5%' },
      { value: '80', label: 'Website clicks · +40.4%' },
      { value: '52', label: 'Calls from the profile · +116.7%' },
    ],
    gallery: {
      slug: 'training-institute-august',
      shots: 4,
      caption:
        'Google Business Profile performance for August 2026, each tab compared against the same month a year earlier.',
    },
    sections: [
      {
        n: '01',
        eyebrow: 'Overview',
        title: 'The context',
        kind: 'prose',
        body: [
          'Vocational and safety training in the Eastern Province is a proximity business. People search for a certification they need, look at what is close to them, and call. Very little of that journey happens on a traditional results page — it happens in Maps, in the local pack, and inside the Business Profile itself.',
          'That makes the profile the storefront. If the services are not structured, the categories are wrong, or the reviews are thin, the listing loses to a competitor two streets away regardless of how good the website is.',
        ],
      },
      {
        n: '02',
        eyebrow: 'The problem',
        title: 'What I was solving',
        kind: 'list',
        items: [
          'Discovery was happening in Maps, but the profile was not structured to convert that attention into calls or visits.',
          'Course and certification offerings were not expressed as distinct services, so the listing surfaced for the brand but not for what people actually search.',
          'Review volume and freshness were not keeping pace with competitors in the same catchment.',
          'The profile and the website were not reinforcing each other — each was optimised, if at all, in isolation.',
        ],
      },
      {
        n: '03',
        eyebrow: 'The approach',
        title: 'How I did it',
        kind: 'list',
        items: [
          'Restructured the profile around the services people search for, in both Arabic and English, rather than around internal course names.',
          'Built a review-generation routine into the enrolment process so new reviews arrive steadily instead of in bursts.',
          'Aligned the website’s service pages with the profile so a searcher who clicks through lands on the thing they were looking for.',
          'Tracked interactions — calls, directions, website clicks — as the outcome, not impressions.',
        ],
      },
      {
        n: '04',
        eyebrow: 'Results',
        title: 'What the data shows',
        kind: 'results',
      },
      {
        n: '05',
        eyebrow: 'Takeaway',
        title: 'Why this month matters',
        kind: 'prose',
        body: [
          'A six-month total can hide a slow start. Pulling a single month out and comparing it like-for-like against the same month a year earlier removes seasonality from the picture — August against August, same enrolment cycle, same weather, same competitors.',
          'Direction requests grew fastest at +176.5%. That is the metric worth watching for a physical training centre: someone asking for directions has already decided to turn up.',
        ],
      },
    ],
  },

  {
    slug: 'training-institute-search',
    category: 'SEO',
    year: '2026',
    title: 'Organic and AI search visibility for a training institute',
    subtitle: 'Search Console performance for the same client’s website, including early visibility inside Google’s AI answers',
    summary:
      '51.4K impressions and 856 clicks in 28 days at an average position of 8.4 — plus 9.76K impressions inside Google’s generative AI answers, a surface most local sites are not appearing in yet.',
    meta: [
      { label: 'Client', value: 'Safety training institute' },
      { label: 'Market', value: 'Al Khobar, Saudi Arabia' },
      { label: 'Services', value: 'Technical SEO · Content · AEO' },
      { label: 'Period', value: '28 days to 27 Aug 2026' },
    ],
    stack: ['Google Search Console', 'WordPress', 'Schema markup', 'Content architecture'],
    highlights: [
      { value: '51.4', unit: 'K', label: 'Search impressions' },
      { value: '8.4', label: 'Average position' },
      { value: '9.76', unit: 'K', label: 'AI-answer impressions' },
    ],
    metrics: [
      { value: '51.4K', label: 'Search impressions' },
      { value: '856', label: 'Clicks from search' },
      { value: '8.4', label: 'Average position' },
      { value: '9.76K', label: 'AI-answer impressions' },
    ],
    gallery: {
      slug: 'training-institute-search',
      shots: 2,
      caption:
        'Search Console performance over 28 days, and the generative-AI breakdown showing impressions inside AI answers.',
    },
    sections: [
      {
        n: '01',
        eyebrow: 'Overview',
        title: 'The context',
        kind: 'prose',
        body: [
          'The Business Profile work covered the Maps side of this client. The website had to carry the rest: the long-tail queries about specific certifications, course durations and accreditation that people research before they pick up the phone.',
          'This is also a bilingual market. The same person may search in Arabic on a phone and in English on a laptop, and the site has to be legible to both.',
        ],
      },
      {
        n: '02',
        eyebrow: 'The problem',
        title: 'What I was solving',
        kind: 'list',
        items: [
          'Course pages existed but were not mapped to the way people actually phrase certification searches.',
          'Site structure made it hard for crawlers — and for readers — to see the relationship between a course, its accreditation and its outcomes.',
          'Nothing was in place to earn visibility in AI-generated answers, which increasingly sit above the organic results for exactly this kind of informational query.',
        ],
      },
      {
        n: '03',
        eyebrow: 'The approach',
        title: 'How I did it',
        kind: 'list',
        items: [
          'Mapped keywords to intent rather than volume, so each page answers one question properly instead of several badly.',
          'Rebuilt the content architecture around topical clusters — course, accreditation, outcome — with internal linking that reflects it.',
          'Added structured data so the entities on the page are unambiguous to a machine.',
          'Wrote for answer-engine extraction: direct answers near the top, clear headings, no burying the point.',
        ],
      },
      {
        n: '04',
        eyebrow: 'Results',
        title: 'What the data shows',
        kind: 'results',
      },
      {
        n: '05',
        eyebrow: 'Takeaway',
        title: 'On the AI numbers',
        kind: 'prose',
        body: [
          'The 9.76K AI-answer impressions are the part I would watch. That surface barely existed a year ago, and most local service sites are still invisible in it.',
          'An average position of 8.4 across 51.4K impressions also says something useful: there is real headroom. Moving a page from position eight to position four is usually a content and internal-linking problem, not a link-building one.',
        ],
      },
    ],
  },

  {
    slug: 'hair-salon-fredrikstad',
    category: 'Local SEO',
    year: '2026',
    title: 'Ranking a hair salon for its city’s core search terms',
    subtitle: 'Norwegian-language local SEO where one high-intent term carries a whole location',
    summary:
      '11,430 profile views and 823 clicks through to the website over six months, driven by a small set of Norwegian-language queries — the top term alone surfaced the profile 1,852 times.',
    meta: [
      { label: 'Client', value: 'Hair salon' },
      { label: 'Market', value: 'Fredrikstad, Norway' },
      { label: 'Services', value: 'Local SEO · Business Profile' },
      { label: 'Period', value: 'Mar – Aug 2026' },
    ],
    stack: ['Google Business Profile', 'Norwegian SERPs', 'Booking-led website', 'Review generation'],
    highlights: [
      { value: '11,430', label: 'People viewed the profile' },
      { value: '5,023', label: 'Searches surfaced the profile' },
      { value: '823', label: 'Clicks through to the website' },
    ],
    metrics: [
      { value: '11,430', label: 'People viewed the profile' },
      { value: '1,405', label: 'Profile interactions' },
      { value: '823', label: 'Clicks through to the website' },
      { value: '5,023', label: 'Searches surfaced the profile' },
    ],
    gallery: {
      slug: 'hair-salon-fredrikstad',
      shots: 3,
      caption: 'Six months of Business Profile performance, including the search terms that surfaced the listing.',
    },
    sections: [
      {
        n: '01',
        eyebrow: 'Overview',
        title: 'The context',
        kind: 'prose',
        body: [
          'Norwegian local search is a smaller pool than English, and that changes the maths. Volume is low enough that chasing broad terms is wasted effort, but intent is high enough that a handful of the right queries can fill a booking calendar.',
          'Fredrikstad is also a city where a salon competes with a specific, knowable set of rivals — not an endless national market. That makes the target concrete.',
        ],
      },
      {
        n: '02',
        eyebrow: 'The problem',
        title: 'What I was solving',
        kind: 'list',
        items: [
          'The profile was not ranking for the Norwegian-language terms that actually precede a booking.',
          'Services were described in a way that made sense internally but did not match how customers search.',
          'Traffic that did arrive had no clear path from the listing to an actual booking.',
        ],
      },
      {
        n: '03',
        eyebrow: 'The approach',
        title: 'How I did it',
        kind: 'list',
        items: [
          'Identified the small set of Norwegian queries with genuine booking intent, and optimised the profile around those rather than translated English terms.',
          'Restructured the service list so each treatment is discoverable on its own.',
          'Tightened the route from profile to booking, so a click through to the site lands somewhere that converts.',
          'Kept reviews arriving steadily — in a small market, recency is visible.',
        ],
      },
      {
        n: '04',
        eyebrow: 'Results',
        title: 'What the data shows',
        kind: 'results',
      },
      {
        n: '05',
        eyebrow: 'Takeaway',
        title: 'Precision over volume',
        kind: 'prose',
        body: [
          '5,023 searches surfaced the profile, and the single strongest term accounted for 1,852 of them. That concentration is the point: in a market this size, winning a few terms outright beats ranking mid-table for many.',
          '823 website clicks from 11,430 views is a healthy ratio for a salon, where a large share of people call or tap directions instead of visiting the site at all.',
        ],
      },
    ],
  },

  {
    slug: 'hair-beauty-studio',
    category: 'Web Design',
    year: '2026',
    title: 'Bilingual booking site for a hair & beauty studio',
    subtitle: 'A Norwegian/English WordPress build with a hair-extension catalogue and booking as the primary action',
    summary:
      'A studio site designed around one job: get the visitor to book. Bilingual throughout, with a treatment catalogue that stays legible on a phone.',
    meta: [
      { label: 'Client', value: 'Hair & beauty studio' },
      { label: 'Market', value: 'Oslo & Fredrikstad, Norway' },
      { label: 'Services', value: 'Web design · WordPress' },
      { label: 'Platform', value: 'WordPress' },
    ],
    stack: ['WordPress', 'Bilingual NO / EN', 'Booking flow', 'Core Web Vitals'],
    highlights: [
      { value: '2', label: 'Locations served by one site' },
      { value: 'NO / EN', label: 'Bilingual throughout' },
      { value: 'Mobile', label: 'Booking-first layout' },
    ],
    cover: {
      src: '/assets/sites/hair-beauty-studio-norway.jpg',
      alt: 'Full-page design of a bilingual hair and beauty studio website in Norway',
      width: 760,
      height: 2400,
    },
    sections: [
      {
        n: '01',
        eyebrow: 'Overview',
        title: 'The context',
        kind: 'prose',
        body: [
          'A studio running two locations needed one site that could speak to both, in two languages, without turning into a maze. Most visitors arrive on a phone, already close to deciding, and want the treatment list and a way to book.',
          'The same client’s local SEO is covered in a separate case study — the site and the Business Profiles were built to reinforce each other.',
        ],
      },
      {
        n: '02',
        eyebrow: 'The problem',
        title: 'What I was solving',
        kind: 'list',
        items: [
          'Two locations and two languages, without four separate versions of every page to maintain.',
          'A hair-extension catalogue detailed enough to be useful but not so dense that a phone visitor gives up.',
          'Booking buried behind navigation instead of being the obvious next step on every screen.',
        ],
      },
      {
        n: '03',
        eyebrow: 'The approach',
        title: 'How I built it',
        kind: 'list',
        items: [
          'Built the treatment catalogue as structured content so each service is a first-class page, discoverable on its own.',
          'Kept the booking action persistent rather than parked on a single contact page.',
          'Optimised images and deferred what could be deferred, so the first screen paints quickly on mobile data.',
          'Structured the bilingual setup so a page is translated, not duplicated.',
        ],
      },
    ],
  },

  {
    slug: 'safety-training-institute',
    category: 'Web Design',
    year: '2026',
    title: 'Course catalogue and enrolment funnel for a training institute',
    subtitle: 'A WordPress build where every course page has to survive both a searcher and a procurement officer',
    summary:
      'A certification catalogue structured so each course is findable on its own, with an enrolment path that works for individuals and for companies booking teams.',
    meta: [
      { label: 'Client', value: 'Safety training institute' },
      { label: 'Market', value: 'Al Khobar, Saudi Arabia' },
      { label: 'Services', value: 'Web design · WordPress · SEO' },
      { label: 'Platform', value: 'WordPress' },
    ],
    stack: ['WordPress', 'Schema markup', 'Arabic / English', 'Enrolment funnel'],
    highlights: [
      { value: '51.4K', label: 'Search impressions the build now earns' },
      { value: 'AR / EN', label: 'Bilingual catalogue' },
      { value: '8.4', label: 'Average search position' },
    ],
    cover: {
      src: '/assets/sites/safety-training-institute-ksa.jpg',
      alt: 'Full-page design of a safety training institute website in Saudi Arabia',
      width: 760,
      height: 2600,
    },
    sections: [
      {
        n: '01',
        eyebrow: 'Overview',
        title: 'The context',
        kind: 'prose',
        body: [
          'Safety certification has two very different buyers. An individual wants to know what the course covers, how long it takes and whether the certificate is recognised. A company booking fifteen people wants dates, capacity and an invoice.',
          'The site had to serve both without becoming two sites, and it had to be structured well enough to earn the organic visibility documented in the SEO case study for the same client.',
        ],
      },
      {
        n: '02',
        eyebrow: 'The problem',
        title: 'What I was solving',
        kind: 'list',
        items: [
          'A course catalogue that needed to be crawlable, comparable and readable in two languages.',
          'Accreditation details buried in prose where both searchers and crawlers would miss them.',
          'One enrolment path trying to serve individuals and corporate bookings at the same time.',
        ],
      },
      {
        n: '03',
        eyebrow: 'The approach',
        title: 'How I built it',
        kind: 'list',
        items: [
          'Made every course its own structured page — duration, accreditation, outcomes — rather than rows in a table.',
          'Added schema so the certification entities are explicit to search engines.',
          'Split the enrolment path early, so an individual and a company each get a route that fits.',
          'Built the information architecture around topical clusters, which is what the search results later reflected.',
        ],
      },
    ],
  },

  {
    slug: 'beds-mattress-store',
    category: 'eCommerce',
    year: '2026',
    title: 'Promotional storefront for a beds & mattress retailer',
    subtitle: 'Faceted category navigation for a catalogue where every product has six variants',
    summary:
      'A UK bed and mattress store built around faceted browsing — size, firmness, type — with promotional merchandising that does not break the crawlable URL structure.',
    meta: [
      { label: 'Client', value: 'Beds & mattress retailer' },
      { label: 'Market', value: 'United Kingdom' },
      { label: 'Services', value: 'eCommerce · Web design · SEO' },
      { label: 'Platform', value: 'eCommerce' },
    ],
    stack: ['eCommerce', 'Faceted URLs', 'Merchandising', 'Product schema'],
    highlights: [
      { value: '6+', label: 'Variants per product line' },
      { value: 'Faceted', label: 'Crawl-safe category navigation' },
      { value: 'CRO', label: 'Promotional merchandising' },
    ],
    cover: {
      src: '/assets/sites/beds-mattress-store-uk.jpg',
      alt: 'Full-page design of a United Kingdom beds and mattress eCommerce store',
      width: 760,
      height: 2755,
    },
    sections: [
      {
        n: '01',
        eyebrow: 'Overview',
        title: 'The context',
        kind: 'prose',
        body: [
          'Bed retail is a filtering problem. A customer knows their size, roughly knows their firmness, and wants to narrow a large catalogue quickly. Every one of those filters is also a potential URL, and left unmanaged they multiply into thousands of near-duplicate pages that dilute the whole site.',
          'On top of that sits promotional merchandising — sales, bundles, finance offers — which tends to be bolted on in ways that break the structure underneath.',
        ],
      },
      {
        n: '02',
        eyebrow: 'The problem',
        title: 'What I was solving',
        kind: 'list',
        items: [
          'Faceted navigation generating crawlable combinations far beyond what should ever be indexed.',
          'Promotional overlays competing with the product information customers actually need to decide.',
          'Category pages that ranked for nothing in particular because they targeted everything.',
        ],
      },
      {
        n: '03',
        eyebrow: 'The approach',
        title: 'How I built it',
        kind: 'list',
        items: [
          'Decided deliberately which facet combinations deserve to be indexable pages and which should stay filters, then enforced it.',
          'Gave the commercially meaningful combinations real content, so they can rank rather than merely exist.',
          'Kept promotional merchandising in a layer that can change weekly without touching URLs or structure.',
          'Optimised the product imagery pipeline — the heaviest thing on any furniture store.',
        ],
      },
    ],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseStudySlugs = caseStudies.map((c) => c.slug);
