# Umar Rajput ,  portfolio (Next.js)

Next.js 15 App Router · TypeScript · Framer Motion · zero UI libraries.

Layout and motion language reference [twocore.ai](https://twocore.ai) ,  glass-pill
nav, aurora ground, case-study structure ,  but the palette and type are its own:
a cyan → sky → blue system on a blue-black ground, not their purple.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run typecheck
```

---

## Structure

```
src/
├── app/
│   ├── layout.tsx        fonts, metadata, theme bootstrap, aurora layers
│   ├── page.tsx          home ,  composes every section
│   ├── globals.css       design tokens + primitives
│   ├── ui.css            component styles
│   ├── work/             portfolio index + client-side filter grid
│   │   └── [slug]/       SSG case-study page, one per project
│   └── api/contact/      POST route for the contact form
├── components/
│   ├── site/             Header, Footer
│   ├── sections/         Hero, Stats, About, Services, Markets, Career,
│   │                     Work, Clients, Testimonials, Process, Cta, Contact
│   ├── case/             CaseNav, CaseSections, CaseGallery
│   └── ui/               Reveal, AnimatedWords, Counter, Starfield, Magnetic,
│                         Marquee, ScrollProgress, ThemeToggle, Lightbox, Icon
├── data/                 all copy and figures live here, not in components
└── lib/                  site config + shared motion variants
```

**Content is data, not markup.** To add a project, a client logo, a service or a
career entry, edit the matching file in `src/data/` ,  no component changes.

---

## Design tokens

`globals.css` holds one token set for dark (default) and one for light, switched
by `data-theme` on `<html>`. Values taken from twocore.ai:

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#070B12` | `#F7F9FC` |
| `--bg-2` | `#0B1220` | `#EDF2F8` |
| `--surface` | `#ffffff0a` | `#ffffffeb` |
| `--border` | `#ffffff1a` | `#0000001a` |
| `--text` | `#fff` | `#1a1a1e` |
| `--muted` | `#ffffffa8` | `#3a3a44` |

Accents shift between themes, because cyan-400 is too pale on a light ground:

| Token | Dark | Light |
|---|---|---|
| `--accent` | `#22D3EE` | `#0891B2` |
| `--accent-mid` | `#38BDF8` | `#0284C7` |
| `--accent-deep` | `#2563EB` | `#2563EB` |
| `--accent-teal` | `#14B8A6` | `#0D9488` |

`--grad` and `--aurora` are built from those, so **changing the whole site's hue
is a four-line edit in `globals.css`** ,  nothing downstream hardcodes a colour.

Primary buttons fill with `--accent` (cyan) and use dark ink `#04222B` rather
than white ,  far higher contrast than any blue-on-white pairing, and it lifts
off the blue-black ground. Buttons have **no motion**: colour transitions only,
no hover lift, no press scale, no magnetic pull.

Fonts load through `next/font/google` (self-hosted at build time, no runtime
request to Google): **Geist** body, **Bricolage Grotesque** display (variable,
`opsz` + `wdth` axes), **Geist Mono** for eyebrows and numerals.

Dark is the default and needs no stored preference ,  `:root` is dark, and light
only applies when `data-theme="light"` is present. If the site opens light for
you, that is a saved choice in `localStorage`; toggle it back or clear site data.

Theme choice is written to `localStorage` and applied by a tiny inline script in
`<head>` **before first paint**, so there is no light/dark flash on reload.

---

## Motion

Shared variants live in `src/lib/motion.ts` so timing is consistent everywhere.

| Component | Technique |
|---|---|
| `AnimatedWords` | headline split per word, each with `y` + `rotateX` inside an `overflow:hidden` mask |
| `Reveal` / sections | `whileInView` with `once: true`, parents stagger children |
| `Counter` | `useMotionValue` + `animate()`, driven by `useInView` |
| `Markets` | `layoutId` on the active tab so the pill physically slides; `AnimatePresence mode="wait"` swaps panels |
| `Career` | `useScroll` on the timeline + `useSpring` to fill the rail as it scrolls |
| `Work` cards | full-page screenshots scroll on hover via `whileHover` variants |
| `WorkGrid` | `LayoutGroup` + `AnimatePresence mode="popLayout"` so filtering re-flows smoothly |
| `Services` | per-card cursor tilt (`useSpring` on rotateX/rotateY), gradient edge sweep, icon rotate-and-scale, arrow reveal ,  each card is its own variant controller so `hover` reaches every child |
| `CaseNav` | sticky rail, `IntersectionObserver` marks the active section, `useScroll` drives the progress bar |
| `Marquee` | `x: ['0%','-50%']` over duplicated children ,  a seamless loop |
| `Lightbox` | `AnimatePresence` modal, arrow-key and Escape support |
| `ScrollProgress` | `useScroll` + `useSpring` gradient bar |

Everything honours `prefers-reduced-motion` ,  Framer disables transforms
automatically, and `globals.css` zeroes durations and delays.

### No-JS safety

Framer emits `opacity: 0` inline during SSR, which would leave the page blank if
the bundle fails. `layout.tsx` ships a `<noscript>` block that puts every
animated element back on screen. Worth keeping if you touch the head.

---

## Case studies

Each project has a full case-study page at `/work/<slug>`, prerendered at build
time via `generateStaticParams`. The layout follows the reference: breadcrumb →
category + year → title → summary → dual CTA → meta grid → tech chips →
highlight tiles → sticky section rail → numbered sections → results with the
screenshot gallery → next-case-study link.

Content lives in `src/data/caseStudies.ts`. Adding a project means adding one
object ,  the route, metadata, breadcrumb JSON-LD and static params all follow.

**The narrative sections need your review.** Every metric, period and market is
taken from the dashboards already published on this site, and the prose is
written from that same evidence ,  but only you know the project detail
(constraints, timelines, who you worked with). Read them before launch.

## Contact form

`src/app/api/contact/route.ts` validates server-side (client validation is UX
only) and forwards to whatever `CONTACT_WEBHOOK_URL` points at ,  Zapier, Make, a
Slack incoming webhook, your own CRM.

```bash
# .env.local
CONTACT_WEBHOOK_URL="https://hooks.zapier.com/…"
```

With nothing configured the route answers **503**, and the form falls back to
opening the visitor's mail client with the message pre-filled. It never shows a
success state for a message that was not delivered.

There is also a honeypot field; submissions that fill it are accepted silently
so bots learn nothing.

---

## Before launch

| Item | Where |
|---|---|
| Domain (`https://www.umarrajput.com`) | `src/lib/site.ts` → feeds `metadataBase`, canonicals, OG, JSON-LD |
| Email / phone / socials | `src/lib/site.ts` |
| OG image | add `src/app/opengraph-image.png` (1200×630) |
| `CONTACT_WEBHOOK_URL` | `.env.local` / hosting env |

### Placeholder content still in the build

Both were already flagged in the static site and carried over unchanged:

- `src/data/stats.ts` has been removed. Its figures (150 audits, 4 years,
  50 clients, 180% growth) were invented, so the strip now carries the
  Build / Automate / Optimize / Grow steps instead.
- **`src/data/testimonials.ts`** ,  five real clients (EUTC Global, Zain Aslam,
  Farrukh Bashir, Muhammad Rahim, Hamza Qayyum). The wording was drafted from the
  working relationship in each case ,  **get each client to approve their quote
  before launch**, since it is attributed to them by name, and replace `role`
  with their real company and job title.
  Photos: drop files in `public/assets/clients/` and set `avatar` on the entry.
  For a company, set `logo` instead ,  it renders contained in a tile rather than
  cropped to a circle (EUTC Global uses this). With neither, the card falls back
  to initials, so a missing image never breaks the layout.
- **`src/data/career.ts`** ,  real companies and dates; `title` and `body` are
  optional and currently empty, pending job titles and one-line descriptions.
- **`src/data/caseStudies.ts`** ,  metrics are real; the narrative prose is
  inferred from them and should be reviewed.

---

## Notes

- `public/assets/` was copied from the static site. `next/image` handles sizing
  and AVIF/WebP conversion; long-lived cache headers are set in `next.config.ts`.
- Client-side JS is ~174 kB first load on the home page, mostly Framer Motion.
  Sections are client components because they animate; the pages themselves are
  statically prerendered.
- The original static site still lives at the repository root and is untouched , 
  this project is additive, so nothing breaks while you migrate.
