import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
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
    default: 'Umar Rajput | Web Development, Automation & SEO',
    template: '%s · Umar Rajput',
  },
  description:
    'Umar Rajput builds websites, custom web applications and business automations, with SEO strategies that help businesses improve their online presence and search visibility.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
    title: 'Umar Rajput | Web Development, Automation & SEO',
    description:
      'Websites, custom web applications, business automation and SEO, built to work together as one system.',
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
