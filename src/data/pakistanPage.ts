/**
 * Copy for the "website development services in Pakistan" landing page.
 *
 * Kept out of the component so the wording can be edited without touching
 * markup. Nothing here claims a result, a price or a timeline that is not
 * already evidenced elsewhere on the site.
 */

export const heroPoints = [
  'Custom development, not a stock template',
  'Responsive on phones, tablets and desktop',
  'SEO-friendly structure from the first page',
  'Built around enquiries, not just looks',
] as const;

export const audiences = [
  ['Small businesses and startups', 'A first proper website, or a replacement for something built years ago.'],
  ['SMEs and corporate teams', 'Multi-page sites with structure, content management and internal sign-off.'],
  ['Service companies', 'Sites built around enquiries: clear services, obvious contact paths.'],
  ['E-commerce businesses', 'Product catalogues, checkout, payments and the mobile buying experience.'],
] as const;

export const serviceBlocks = [
  {
    id: 'custom',
    title: 'Custom Website Development',
    body: 'When a template cannot express how your business actually works, I build custom. The design is yours, the functionality is specified around your process, and the structure has room to grow rather than needing a rebuild in two years.',
    points: [
      'Design built for your brand, not adapted from a theme',
      'Functionality specified around your business',
      'Structure that scales as you add services or locations',
      'Pages laid out around the path to an enquiry',
    ],
    icon: 'layout' as const,
  },
  {
    id: 'wordpress',
    title: 'WordPress Website Development',
    body: 'Business, corporate and service websites on WordPress, set up so your team can edit pages and publish content without calling a developer. Clean templates, no bloated page builder fighting your load time.',
    points: [
      'Business, corporate and service websites',
      'Content your team can manage themselves',
      'SEO-friendly setup: headings, metadata, clean markup',
      'Responsive across phones, tablets and desktop',
    ],
    icon: 'file' as const,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Website Development',
    body: 'Online stores built around the buying journey: product pages that answer questions, categories people can navigate, a checkout that does not lose them, and payment integration that works.',
    points: [
      'Product and category pages built to convert',
      'Cart, checkout and payment integration',
      'Mobile shopping as the primary experience',
      'Structure that stays crawlable as the catalogue grows',
    ],
    icon: 'bag' as const,
  },
  {
    id: 'webapp',
    title: 'Web Application Development',
    body: 'Website application development services for the work a brochure site cannot do: customer portals, dashboards, internal tools and business systems with accounts, permissions and the integrations your workflow depends on.',
    points: [
      'Customer portals and client logins',
      'Dashboards and internal business tools',
      'API integrations with software you already use',
      'Custom workflows instead of off-the-shelf compromises',
    ],
    icon: 'app' as const,
  },
] as const;

export const designPoints = [
  ['User experience', 'Layouts built around what visitors came to find.'],
  ['Site structure', 'Pages organised so both people and search engines follow it.'],
  ['Responsive build', 'Tested on real screen sizes, not just resized in a browser.'],
  ['Conversion paths', 'A clear route from landing to enquiry on every page.'],
  ['SEO foundations', 'Headings, metadata and clean markup from the start.'],
  ['Performance', 'Optimised assets and markup so pages load quickly.'],
] as const;

export const whyPoints = [
  ['Business-focused development', 'I start from what the business needs the site to do, then design around that. Goals, audience and customer journey come before the visual direction.'],
  ['Custom solutions', 'Requirements decide the build. I do not push every business through the same template and then explain why it cannot do what they asked for.'],
  ['Mobile responsive', 'Most of your visitors arrive on a phone. Layouts are built for that first and checked on real screen sizes.'],
  ['SEO-friendly foundation', 'Clean structure, one clear H1 per page, sensible headings, crawlable pages and metadata support.'],
  ['Performance focus', 'Images, scripts and markup optimised so pages load quickly. Speed affects both what visitors do and how the site ranks.'],
  ['Lead generation', 'Clear calls to action, forms people finish, and a visible path to contact you. A site that produces no enquiries is a brochure.'],
] as const;

export const siteTypes = [
  'Business websites', 'Corporate websites', 'Service websites',
  'E-commerce websites', 'WordPress websites', 'Landing pages',
  'Portfolio websites', 'Lead generation websites', 'Custom web applications',
] as const;

export const buildSteps = [
  ['01', 'Discovery', 'Your goals, your audience, what the site has to do, and what competitors are already doing well.'],
  ['02', 'Planning', 'Pages, structure, functionality and the route a visitor takes from landing to enquiry.'],
  ['03', 'UI/UX design', 'Responsive layouts designed around usability and conversion, agreed before anything is built.'],
  ['04', 'Development', 'The build itself, against the approved scope, with previews as it comes together.'],
  ['05', 'Testing', 'Responsiveness, forms, functionality and performance, checked on real devices.'],
  ['06', 'Launch', 'Deployment, handover, and support so you are not left holding something you cannot manage.'],
] as const;

export const businessNeeds = [
  'Build credibility before the first conversation',
  'Generate enquiries around the clock',
  'Show your services properly, in your words',
  'Reach customers who are searching right now',
  'Give existing customers somewhere to self-serve',
  'Give your ads and SEO a destination that converts',
] as const;

export const costFactors = [
  ['Number of pages', 'How much has to be designed, built and written.'],
  ['Website type', 'A brochure site, an online store and a web application are different builds.'],
  ['Design requirements', 'Custom design from scratch, or working within an existing brand.'],
  ['CMS', 'Whether your team needs to edit content themselves.'],
  ['E-commerce and features', 'Catalogue size, checkout, payments and anything custom.'],
  ['Integrations', 'Connecting to a CRM, accounting, booking or other systems.'],
  ['Content', 'Whether copy and images exist or need producing.'],
  ['Maintenance', 'One-off build, or ongoing updates and support after launch.'],
] as const;

export const customVsTemplate = [
  ['Designed around your brand and content', 'Design decided by the theme you picked'],
  ['Functionality built to your requirements', 'Whatever the template already does'],
  ['Layout changes as the business changes', 'Changes limited by the template structure'],
  ['Scales as you add services or locations', 'May need replacing once you outgrow it'],
  ['Structured for search from the start', 'Depends entirely on how the theme was built'],
  ['Higher upfront cost, longer useful life', 'Lower upfront cost, shorter useful life'],
] as const;

export const faqs = [
  ['What are website development services?',
   'Website development services cover everything involved in getting a working website live: planning the structure, designing the pages, building them, connecting the forms and integrations a business needs, and testing across devices before launch. Design alone is not development, and a template alone is not a website that fits how your business works.'],
  ['How much does website development cost in Pakistan?',
   'It depends on scope rather than a fixed rate card. The number of pages, whether it runs on WordPress or is custom built, whether it needs e-commerce, and how much custom functionality and integration work is involved all change the figure. Send me your requirements and I will quote against them rather than guess.'],
  ['How long does it take to build a website?',
   'That follows the scope too. A small business site with a handful of pages moves quickly; an online store or a custom web application takes longer because of the functionality behind it. You get a timeline with the quote, once we both know what is actually being built.'],
  ['Do you provide WordPress website development services?',
   'Yes. Most of the business and service websites I build run on WordPress, set up so pages, menus and content can be edited without touching code. The training institute and salon sites in the portfolio below are both WordPress builds.'],
  ['Can you build an e-commerce website?',
   'Yes. Product pages, categories, cart and checkout, payment integration and the mobile shopping experience. I also work on existing stores that are converting poorly or running slowly.'],
  ['Do you provide custom website development?',
   'Yes. When a template cannot express how a business works, custom is the cheaper answer over time. That covers custom website development services as well as full web applications with accounts, dashboards and integrations.'],
  ['Can you redesign my existing website?',
   'Yes. Redesigns usually start with what is wrong with the current site: the structure, the speed, how it reads on a phone, or the fact that visitors arrive and never enquire. I keep what works and rebuild what does not.'],
  ['Do you provide website development services across Pakistan?',
   'Yes. I am from Rahim Yar Khan and have worked with Pakistani teams and businesses since 2023, alongside clients in the Gulf, the Nordics and the UK. Projects run remotely over calls, shared documents and regular previews of the build.'],
] as const;
