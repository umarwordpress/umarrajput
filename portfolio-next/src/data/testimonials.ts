/**
 * Real clients, written from the working relationship in each case.
 *
 * ⚠ These are attributed to named people — get each client to approve their
 * wording before this goes live, and add their real company and job title
 * to `role` in place of the relationship descriptor.
 *
 * To add a photo: drop the file in `public/assets/clients/` and set `avatar`.
 * Without one the card falls back to initials, so a missing photo is fine.
 */
export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  /** A person's photo — cropped to a circle. */
  avatar?: string;
  /** A company mark — shown contained in a rounded tile, never cropped. */
  logo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'We started from nothing — no organic traffic and no enquiries coming from search at all. Four months later we were at 1,200 clicks and taking four to six leads a day. Umar measured the baseline before he touched anything, so every month we could see exactly what had moved and why.',
    initials: 'EG',
    name: 'EUTC Global',
    role: 'Zero to 1,200 clicks in four months',
    logo: '/assets/logos/eutc-global.png',
  },
  {
    quote:
      'Umar has been designing our eCommerce stores since 2023, on both Shopify and WordPress. He handles the design and the build himself, so nothing gets lost between the two — and he understands that a store is there to sell, not just to look good.',
    initials: 'ZA',
    name: 'Zain Aslam',
    role: 'eCommerce client · Shopify & WordPress, since 2023',
    // TODO: photo coming from Umar — save as public/assets/clients/zain-aslam.jpg
    // avatar: '/assets/clients/zain-aslam.jpg',
  },
  {
    quote:
      'Since 2024 Umar has designed and managed our WordPress websites with SEO built in from the start rather than bolted on afterwards. Having the person who builds the site also own the search side has saved us a lot of back and forth.',
    initials: 'FB',
    name: 'Farrukh Bashir',
    role: 'WordPress & SEO client, since 2024',
  },
  {
    quote:
      'Umar developed our agency website end to end. He took it from the initial build through to launch, and it does exactly what we needed it to do without us having to chase him for it.',
    initials: 'MR',
    name: 'Muhammad Rahim',
    role: 'Agency website — designed and developed',
  },
  {
    quote:
      'Umar has been building WordPress websites for us since 2023. Straightforward to work with, delivers what he says he will, and the sites hold up — which is the part that usually goes wrong with everyone else.',
    initials: 'HQ',
    name: 'Hamza Qayyum',
    role: 'WordPress client, since 2023',
  },
];
