export type Service = {
  id: string;
  title: string;
  body: string;
  icon: 'search' | 'file' | 'layout' | 'bag' | 'pen' | 'trend';
};

export const services: Service[] = [
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    body: 'Crawl and indexation audits, site architecture, schema, Core Web Vitals and log-file analysis.',
    icon: 'search',
  },
  {
    id: 'on-page-seo',
    title: 'On-Page SEO',
    body: 'Keyword mapping, intent-matched titles and headings, internal linking and content optimisation.',
    icon: 'file',
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    body: 'Custom themes, page-builder rescues, speed optimisation and SEO-ready information architecture.',
    icon: 'layout',
  },
  {
    id: 'shopify',
    title: 'Shopify Development',
    body: 'Liquid theme customisation, collection and faceted-URL strategy, and product-page CRO.',
    icon: 'bag',
  },
  {
    id: 'content-aeo',
    title: 'Content & AEO Strategy',
    body: 'Topical clusters, entity coverage and answer-engine optimisation for AI overviews and featured snippets.',
    icon: 'pen',
  },
  {
    id: 'recovery',
    title: 'GSC & Ranking Recovery',
    body: 'Traffic-drop diagnosis, manual action and core-update recovery, plus honest reporting on what moved.',
    icon: 'trend',
  },
];
