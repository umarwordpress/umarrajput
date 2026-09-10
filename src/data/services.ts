export type Service = {
  id: string;
  title: string;
  body: string;
  points: string[];
  icon: 'layout' | 'app' | 'automation' | 'search';
};

export const services: Service[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    body: 'Business websites, landing pages and online stores built around what you actually need them to do. Fast, responsive, and structured so visitors can find what they came for and act on it.',
    points: [
      'Business websites and landing pages',
      'WordPress and Shopify builds',
      'E-commerce and custom websites',
      'Redesigns and performance work',
    ],
    icon: 'layout',
  },
  {
    id: 'custom-web-applications',
    title: 'Custom Web Applications',
    body: 'If an off-the-shelf tool does not fit the way your business works, I build software that does. Dashboards, client portals, booking systems and internal tools shaped around your workflow.',
    points: [
      'Dashboards, portals and admin panels',
      'Booking and customer management systems',
      'User accounts, subscriptions and payments',
      'Database-driven and SaaS-style platforms',
    ],
    icon: 'app',
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    body: 'Most businesses lose hours a week moving information between tools by hand. I connect your website, CRM and other software so that work happens on its own.',
    points: [
      'Lead capture straight into your CRM',
      'Email and WhatsApp follow-up workflows',
      'Order and customer notifications',
      'API integrations and data syncing',
    ],
    icon: 'automation',
  },
  {
    id: 'seo',
    title: 'SEO',
    body: 'Getting the right people to find you through search. Technical fixes, content structure and local visibility work, reported against what actually changed rather than vanity metrics.',
    points: [
      'Technical SEO and site audits',
      'On-page, keyword and content strategy',
      'Local SEO and Google Business Profile',
      'E-commerce and site performance',
    ],
    icon: 'search',
  },
];

/** The four-step idea the whole site is built around. */
export const systemSteps = [
  {
    label: 'Build',
    body: 'The website or application your business runs on.',
  },
  {
    label: 'Automate',
    body: 'Connect the tools so repetitive work stops being manual.',
  },
  {
    label: 'Optimize',
    body: 'Improve speed, usability and search visibility.',
  },
  {
    label: 'Grow',
    body: 'Measure what happens and keep improving it.',
  },
] as const;
