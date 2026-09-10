/**
 * The "what can we build for your business" switcher. Written as problems a
 * visitor recognises in themselves, not as service names.
 */
export type Scenario = {
  id: string;
  index: string;
  name: string;
  meta: string;
  heading: string;
  body: string;
  tags: string[];
  service: { label: string; caption: string };
  typical: string;
  starts: string;
};

export const scenarios: Scenario[] = [
  {
    id: 'leads',
    index: '01',
    name: 'Need more leads',
    meta: 'Website, forms, CRM',
    heading: 'Your website gets visitors but not enquiries',
    body: 'Traffic on its own is not the goal. I build the site so the path to an enquiry is obvious, put a form on it that people actually finish, and wire that form into your CRM so nothing sits in an inbox waiting to be noticed. Follow-up can go out automatically while the lead is still warm.',
    tags: ['Landing pages', 'Lead capture', 'CRM integration', 'Automated follow-up'],
    service: { label: 'Website Development', caption: 'with automation on top' },
    typical: 'Service businesses, agencies, local trades',
    starts: 'A look at where people currently drop off',
  },
  {
    id: 'manual',
    index: '02',
    name: 'Too much manual work',
    meta: 'Automation, integrations',
    heading: 'Your team is copying data between tools',
    body: 'Someone exports a spreadsheet, pastes it somewhere else, then emails a person to tell them it is done. That work is invisible until you add it up. I connect the systems you already pay for so the handoffs happen on their own, and the people doing them can go and do something that matters.',
    tags: ['Workflow automation', 'API integrations', 'Data syncing', 'Notifications'],
    service: { label: 'Business Automation', caption: 'across your existing tools' },
    typical: 'Any business running three or more disconnected tools',
    starts: 'Mapping what currently happens by hand',
  },
  {
    id: 'software',
    index: '03',
    name: 'Need custom software',
    meta: 'Web applications',
    heading: 'The off-the-shelf tool does not fit how you work',
    body: 'Most businesses end up bending their process to fit their software, or paying per seat for ninety percent of features they never open. When the workflow is specific enough, building it is the cheaper answer. Dashboards, client portals, booking systems, internal tools, and platforms with accounts, subscriptions and payments.',
    tags: ['Dashboards', 'Client portals', 'Booking systems', 'SaaS-style platforms'],
    service: { label: 'Custom Web Applications', caption: 'built around your workflow' },
    typical: 'Businesses outgrowing spreadsheets or generic SaaS',
    starts: 'A conversation about the workflow itself',
  },
  {
    id: 'traffic',
    index: '04',
    name: 'Not enough organic traffic',
    meta: 'SEO, content, local search',
    heading: 'The right people are not finding you in search',
    body: 'Usually this is not one problem. It is a technical issue stopping pages being indexed properly, content that does not match how people actually search, and a local presence that has never been set up. I work through all three, measure the baseline first, and report on what moved.',
    tags: ['Technical SEO', 'Content strategy', 'Local SEO', 'Search Console'],
    service: { label: 'SEO', caption: 'technical, content and local' },
    typical: 'Local services, e-commerce, training and education',
    starts: 'An audit against your current baseline',
  },
  {
    id: 'messy',
    index: '05',
    name: 'Existing system is a mess',
    meta: 'Rebuilds, performance',
    heading: 'What you have is hard to manage or slow',
    body: 'Sites and systems accumulate. A plugin here, a workaround there, and eventually nobody wants to touch it. I go through what is there, work out what is worth keeping, and fix or rebuild the parts that are costing you time, speed or search visibility.',
    tags: ['Site audits', 'Performance', 'Rebuilds', 'Integration cleanup'],
    service: { label: 'Whichever of the four it needs', caption: 'usually more than one' },
    typical: 'Anyone who has inherited a site they did not build',
    starts: 'An honest assessment of what you have',
  },
];
