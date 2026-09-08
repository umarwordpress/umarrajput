import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { site, isPreview } from '@/lib/site';
import './globals.css';
import './ui.css';

const body = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'wdth'],
});
const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Umar Rajput — SEO Strategist & Web Developer',
    template: '%s · Umar Rajput',
  },
  description:
    'SEO strategist and WordPress & Shopify developer working across the GCC, Nordics, US and UK. Technical audits, local SEO and fast, search-ready builds.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
    title: 'Umar Rajput — SEO Strategist & Web Developer',
    description:
      'Technical SEO, local search and WordPress/Shopify builds with results pulled straight from Search Console and Google Business Profile.',
  },
  twitter: { card: 'summary_large_image' },
  // preview deploys must not compete with production in the index
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#070B12',
  colorScheme: 'dark light',
};

/** Applies the stored theme before paint so there is no light/dark flash. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Motion sets initial styles during SSR, so without JS the page would
            render blank. This puts every animated element back on screen. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <div className="aurora" aria-hidden />
        <div className="grain" aria-hidden />
        <ScrollProgress />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
