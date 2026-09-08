# Roofing Cork — lead-generation landing page

Production-ready static page for a Cork roofing contractor. No build step, no
dependencies, no webfonts.

```
roofing-cork/
├── index.html    page + structured data + tracking placeholders
├── styles.css    all styling
├── main.js       form validation, submission, tracking, nav
└── README.md
```

Serve the folder at **`/roofing-cork/`** so the canonical URL resolves.

---

## 1. Before launch — replace every placeholder

Each is marked in the source with `PLACEHOLDER`. Grep for it:

```bash
grep -rn "PLACEHOLDER\|YOURDOMAIN" roofing-cork/
```

| What | Current value | Where |
|---|---|---|
| Domain | `https://www.YOURDOMAIN.ie` | canonical, OG tags, all JSON-LD `@id`/`url` |
| Business name | `Cork Roofing Co.` | header, footer, OG, JSON-LD |
| Phone | `021 000 0000` / `tel:+35321000000` | header, hero, form note, success panel, final CTA, footer, mobile bar, JSON-LD |
| Email | `hello@example.com` | footer, JSON-LD |
| Opening hours | Mon–Fri 8–6, Sat 9–2 | footer + `openingHoursSpecification` |
| OG image | `/roofing-cork/og-image.jpg` | add a real 1200×630 image |
| Legal pages | `/privacy-policy/`, `/terms/`, `/cookie-policy/` | footer |

**NAP consistency matters.** The name, phone and locality must be byte-identical
in the header, the footer, the JSON-LD and the Google Business Profile. Changing
one and not the others actively hurts local ranking.

No street address is included — `PostalAddress` carries only `addressLocality`,
`addressRegion` and `addressCountry`. Add `streetAddress` and `postalCode` once
you have the real ones.

### What is deliberately NOT in the page

No review counts, no star ratings, no `aggregateRating`, no years-in-business,
no certifications or guarantees. All of that is fabricated trust signalling and
`aggregateRating` without real reviews is a Google structured-data violation. Add
it only when it is true, and only with real data behind it.

---

## 2. Connecting the lead form to a backend

The form does a **real POST**. Until an endpoint exists it will show its error
state — that is correct behaviour, not a bug.

Everything network-related lives in one place at the top of `main.js`:

```js
var LEADS_ENDPOINT = '/api/leads';
function submitLead(formData) { ... }
```

Swap the endpoint, or replace the function body to post to HubSpot, Zapier,
Formspree, a mail service, whatever. Nothing else in the file needs to change.

### Request contract

```
POST /api/leads
Content-Type: multipart/form-data
```

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `phone` | string | required, Irish format validated client-side |
| `email` | string | required |
| `area` | string | required — Eircode or area name |
| `service` | string | one of the 7 dropdown values |
| `propertyType` | string | one of the 5 dropdown values |
| `contactPreference` | string | `Phone` or `Email` |
| `message` | string | may be empty |
| `photo` | File | **only present when the user attached one** |
| `pageUrl` | string | `window.location.href` |
| `timestamp` | string | ISO 8601, client clock |

`multipart/form-data` is used rather than JSON so the optional photo travels with
the lead instead of being base64-inflated into a JSON body.

**Response:** any `2xx` → success state. Any other status, a network failure, or
a timeout over 15 s → error state.

### Minimal handler (Vercel / Next.js style)

```js
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const lead = await parseMultipart(req);          // formidable / busboy

  if (!lead.name || !lead.phone || !lead.email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // re-validate server-side — client validation is UX, not security
  await saveLead(lead);
  await notifyTeam(lead);
  return res.status(201).json({ ok: true });
}
```

### Server-side essentials the client cannot do

- Re-validate every field. Client validation is bypassable.
- Rate-limit by IP and add a spam check (honeypot, Turnstile or reCAPTCHA).
- Restrict uploads by MIME **and** magic bytes; cap size; never serve them from
  the app origin.
- Store the lead before sending the notification email, so a mail failure never
  loses an enquiry.
- GDPR: the consent checkbox is the lawful basis. Store its value with a
  timestamp, and keep leads only as long as you need them.

---

## 3. Conversion tracking

`main.js` pushes to `window.dataLayer` and mirrors to `gtag`/`fbq` when present:

| Event | Fires when |
|---|---|
| `lead_form_view` | form scrolls into view (once) |
| `lead_form_start` | first interaction with any field (once) |
| `lead_form_submit` | server accepted the lead — **this is the conversion** |
| `lead_form_error` | submission failed |
| `phone_click` | any `tel:` link |
| `email_click` | any `mailto:` link |
| `quote_cta_click` | any `[data-cta]` element, with `cta_location` |

`quote_cta_click` carries which CTA fired: `header`, `hero_primary`,
`service_roof_repairs`, `problem_storm_damage`, `mobile_bar`, `final`, etc. —
so you can see which section actually drives enquiries.

The GTM, GA4, Google Ads and Meta Pixel snippets sit commented out in `<head>`.
Uncomment the ones you use and replace `GTM-XXXXXXX`, `G-XXXXXXXXXX`,
`AW-XXXXXXXXX` and the Pixel ID.

**Set up `lead_form_submit` as the Google Ads conversion, not a page view or a
button click.** It only fires when the server actually accepted the lead.

---

## 4. Structured data

Four blocks in one `@graph`: `RoofingContractor`, `Service` (with an
`OfferCatalog` of the 8 services), `BreadcrumbList`, and `FAQPage`.

The FAQ schema mirrors the eight visible Q&As word for word — required, since
Google penalises FAQ markup that is not visible on the page. **If you edit an
answer in the HTML, edit it in the JSON-LD too.**

Validate at <https://validator.schema.org/> and in Search Console after launch.

---

## 5. robots.txt and sitemap.xml

Not created here — both live at the domain root and would affect the whole site.
Add:

```
# robots.txt
Sitemap: https://www.YOURDOMAIN.ie/sitemap.xml
```

```xml
<url>
  <loc>https://www.YOURDOMAIN.ie/roofing-cork/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

---

## 6. Adding photos

The page ships with an inline SVG roof illustration and zero raster images, so it
loads with no image requests at all. Real photos of completed work are the single
best addition — genuine job photos outperform stock every time.

When adding them:

```html
<img src="roof-repair-douglas.webp"
     alt="Replaced slate courses and new lead flashing on a chimney in Douglas, Cork"
     width="800" height="600" loading="lazy" decoding="async">
```

- WebP or AVIF, sized to display size, ~1600 px wide maximum.
- Always set `width`/`height` — omitting them causes layout shift and costs CLS.
- `loading="lazy"` on everything below the fold; never on an above-fold image.
- Describe what is in the photo and where. `alt="roof"` is worthless for both
  accessibility and image search.

---

## 7. Performance notes

- System font stack — no webfont request, no FOUT, no render-blocking.
- One CSS file, one deferred JS file, ~20 KB combined uncompressed.
- No frameworks, no polyfills, no icon library — icons are inline SVG.
- Animations are transform/opacity only, and fully disabled under
  `prefers-reduced-motion`.

Remaining wins are server-side: gzip/brotli, a long `Cache-Control` on the CSS
and JS, and HTTP/2.

---

## 8. Accessibility

Real `<label>` for every control, `aria-describedby` wiring errors to their
fields, `aria-invalid` on failure, `role="alert"` on the error summary,
`role="status"` on the success panel, a skip link, visible focus rings, and
`<details>` for the FAQ so it works with JavaScript disabled.

Keyboard: every control is reachable and operable, including the file input,
which is a real `<input type="file">` behind a styled label.
