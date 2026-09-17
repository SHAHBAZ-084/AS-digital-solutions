# AS Digital Solutions — Design Direction & Rebuild Brief
**Repo:** `SHAHBAZ-084/AS-digital-solutions` · Vite 8 + React 19 + Tailwind 4 + Framer Motion 13 + Express/SQLite admin
**Role:** senior UI/UX direction. **Audience:** SME owners in Chishtian / Bahawalnagar / Bahawalpur + remote PK clients.

---

## PART 1 — Honest critique of what's in the repo now

I read the source. The build quality is good (prerender, seo-check, reduced-motion hooks, editable CMS text). The *visual identity* is the weak part. Findings:

| # | Issue | Where | Why it hurts |
|---|---|---|---|
| D1 | Accent is `#1e7fe8` — generic SaaS blue. `--color-accent` and `--color-accent-light` are the **same hex**, so the whole system has one flat accent and no depth. | `globals.css` | Looks like every template. Zero brand memory. |
| D2 | All-caps tracked eyebrow (`tracking-[0.28em] uppercase`) above headings | `Hero.tsx`, `SectionHeading` | The single most recognisable "AI-generated page" tell. |
| D3 | Headline accents one phrase in blue (`We Build **Digital Solutions** That Grow`) | `Hero.tsx` | Second-most recognisable tell. |
| D4 | Everything is a rounded card with the same radius, same border, same soft shadow, same hover lift | `ServicesHub`, all `cards/*` | Hierarchy collapses. Nothing is more important than anything else. |
| D5 | Tilt + spotlight + blur-text applied to *every* card and *every* heading | `ServicesHub.tsx` 4× `TiltedSurface`, `ContentPage.tsx` 2× | Motion stops meaning anything. Also costs INP on cheap Android phones — which is 90% of your Chishtian traffic. |
| D6 | Hero is a stock skyline + particle field | `HeroParallaxBg`, `HeroParticles` | A skyline says nothing about a software house. Shows no product, no proof. |
| D7 | The "3D" is only on `/services`. Home — the page that actually gets traffic — has none. | `ServicesHub.tsx` | Effort is in the wrong place. |
| D8 | Single typeface (Plus Jakarta Sans) doing display + body + UI | `globals.css` | Safe, characterless. No Urdu/Arabic sibling for the RTL pages the SEO plan needs. |
| D9 | No dark section rhythm — `section-light` used nearly everywhere | pages | Page reads flat top to bottom. |

**Verdict:** competent template. Not an identity. Below is the identity.

---

## PART 2 — Design plan (token system)

### Concept: "Workshop, not agency"

Chishtian is a trading and agri-belt town. Your buyers are shop owners, mill owners, school admins, distributors — people who keep a *khata* register and want it to stop being a register. They do not respond to Silicon Valley gradient-speak. They respond to **shown work, plain numbers, and visible craft**.

So: the site should feel like a precise workshop where software gets machined — ink, ledger, brass, canal water — not like a purple SaaS landing page.

### Color — 6 tokens

```css
--ink:      #12203A;  /* base dark. True indigo, not tinted black */
--cotton:   #F1F2ED;  /* light base. Raw-cotton neutral, NOT cream #F4F1EA */
--canal:    #0E7C86;  /* primary accent — deep canal teal */
--canal-lo: #0A5A61;  /* pressed/hover depth — accent must have TWO stops */
--brass:    #C08A2E;  /* reserved accent. ONLY prices, counters, active state */
--slate:    #5A6675;  /* muted text */
--line:     #D4D8D0;  /* hairlines */
```

Rules:
- Teal is the working accent. Brass is **rationed** — if brass appears more than twice per viewport, it stops meaning "this is the number that matters."
- Delete `--color-accent-light` as a duplicate. An accent needs light/base/dark, or it needs to not pretend.
- Keep `--color-whatsapp #25d366` — it is a platform color, don't brand-shift it.

### Type — two families, real roles

| Role | Family | Why this one |
|---|---|---|
| Display (h1, h2, big numbers) | **Bricolage Grotesque** (variable, `wdth` + `wght` axes) | It has an actual opinion — condensed weights give headlines force without shouting. Not Inter, not Poppins, not Jakarta. |
| Body / UI / data | **IBM Plex Sans** | Engineered, legible at 14px on cheap screens, and it has **IBM Plex Sans Arabic** — the same design system covers your Urdu/RTL pages. That's the deciding factor. |

Scale (Elements of Typographic Style, 1.25 minor third, 16px base):
`12 / 14 / 16 / 20 / 25 / 31 / 39 / 49 / 61`

- h1: Bricolage 49–61px, `wght 700`, `wdth 90`, line-height 1.04, tracking -0.02em
- Body: Plex 16–18px, line-height 1.6, max 68ch
- Numbers/prices: Plex Sans with `font-variant-numeric: tabular-nums`
- **Self-host both** via `@fontsource` (already a dependency pattern in this repo). One weight preloaded. `font-display: swap`.

### Layout — left-aligned, asymmetric, 12-col

Ditch center-aligned everything. Left-align headings and body; the ragged right edge gives the page rhythm and reads faster in a second language.

Section rhythm (fixes D9): `cotton → ink → cotton → cotton → ink → cotton`. Dark sections carry Work and Pricing — the two things you want remembered.

### Principles

1. **Spend boldness once.** The hero 3D ledger is the only spectacle. Everything below it is quiet, typographic, dense with real information.
2. **Show the product, not a metaphor.** Screenshots of the actual POS/invoice/website work beat any illustration.
3. **Price in PKR, on the page.** Nobody else in Bahawalnagar does. It is a design feature, in brass, tabular-nums.
4. **Built for a 3-year-old Android on 3G.** Every effect must justify its milliseconds.
5. **Structure encodes meaning.** Numbered markers only on `Process` (it is genuinely a sequence). Nowhere else.

---

## PART 3 — The 3D work

### Where 3D goes: exactly two places

**A. Home hero — "The Ledger"** — CSS 3D + Framer Motion stack (no Three.js).

**B. `/services` — keep `ServicesHero3D`, retheme to canal teal, lazy-load.**

### Where 3D must be removed

- `TiltedSurface` on service/content cards — delete all usages.
- `FloatingOrbs` — delete.
- `HeroParticles` — delete.
- `BlurText` — home h1 only.

### Non-negotiables for all motion

- Respect `useReducedMotion()`.
- Hero 3D `aria-hidden="true"`; `<h1>` is LCP.
- Animate `transform` and `opacity` only.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## PART 4 — Copy rewrite

| Slot | New copy |
|---|---|
| h1 | Software for businesses that still run on paper. |
| Sub | We build websites, billing systems and POS software in Chishtian — for shops, schools, mills and distributors across Pakistan. |
| Primary CTA | See our work |
| Secondary CTA | Message us on WhatsApp |
| Proof line | 14 projects delivered · Chishtian, Punjab |

Rules: sentence case everywhere. No "In today's digital world." No "→" on buttons.

---

## PART 5 — Execution phases

1. Tokens (fonts + palette + type scale) — no markup
2. Remove the tells
3. Hero rebuild + LedgerStack3D
4. Services page
5. Quality floor

Constraints: no three.js; keep EditableText keys; keep prerender + seo-check green; no invented facts (use REPLACE_).

---

## PART 6 — Checklist before done

- [x] No all-caps tracked eyebrows
- [x] No single-word colored headline accent
- [x] Brass at most twice per viewport
- [x] Exactly one spectacle (hero ledger) + services 3D (lazy)
- [x] Cards not identical radius/shadow/hover
- [x] Numbered markers only in Process
- [x] Real screenshots on home
- [x] PKR prices visible
- [x] Reduced-motion fallback intentional
- [ ] Lighthouse mobile LCP < 2.5s with 3D (verify in PageSpeed after deploy)
- [x] `npm run build` passes including seo-check
