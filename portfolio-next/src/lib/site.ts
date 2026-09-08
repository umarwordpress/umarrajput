/**
 * Canonical origin, resolved at build time.
 *
 *  1. NEXT_PUBLIC_SITE_URL      — set this once the real domain is attached
 *  2. Vercel production domain  — so prod is right before a custom domain exists
 *  3. Vercel deployment URL     — so previews self-canonicalise instead of
 *                                 claiming the production domain
 *  4. the hardcoded fallback    — local dev
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // PLACEHOLDER: replace with the real domain, or set NEXT_PUBLIC_SITE_URL
  return 'https://www.umarrajput.com';
}

/** True on Vercel preview/branch deploys — those must never be indexed. */
export const isPreview =
  process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development';

export const site = {
  name: 'Umar Rajput',
  role: 'SEO Strategist & Web Developer',
  url: resolveSiteUrl(),
  email: 'hello@umarrajput.com',
  phone: '+971 50 000 0000',
  location: 'GCC · Remote',
  socials: {
    linkedin: 'https://www.linkedin.com/in/umarrajput',
    instagram: 'https://www.instagram.com/umarrajput',
    x: 'https://x.com/umarrajput',
    whatsapp: 'https://wa.me/971500000000',
  },
};

export const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#career', label: 'Career' },
  { href: '/work', label: 'Portfolio' },
] as const;
