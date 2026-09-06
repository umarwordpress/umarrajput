# Umar Rajput — Portfolio

Personal portfolio site for Umar Rajput, SEO strategist and WordPress / Shopify developer.

Vanilla HTML, CSS and JavaScript. No frameworks, no build step — open `index.html`
in a browser, or serve the folder with any static host.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Single-page site: hero, stats, about, services, markets, career, selected work, logos, testimonials, process, contact |
| `work.html` | Full portfolio — 14 projects, filterable by category and market |
| `style.css` | Shared stylesheet (design tokens at the top) |
| `script.js` | Nav, scroll reveal, count-up, testimonial slider, filters, screenshot lightbox |

## Assets

`assets/` holds web-optimised images only:

- `assets/sites/` — full-page website captures (scroll-on-hover cards)
- `assets/work/` — Google Business Profile and Search Console screenshots
- `assets/logos/` — client logos, normalised to a consistent size
- `assets/umar-*.webp` — profile photo

The original captures (~135 MB) are excluded via `.gitignore`; `assets/` is
generated from them and is all the site needs at runtime.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Fully responsive, mobile-first
- Scroll animations use IntersectionObserver and respect `prefers-reduced-motion`
- The contact form opens the visitor's email client via `mailto:` — there is no backend
# portfolio
