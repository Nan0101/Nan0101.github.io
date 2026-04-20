# CLAUDE.md — Session Context for Nan0101.github.io

## 1. Project Identity

- **Repo:** Nan0101/Nan0101.github.io — **Live:** https://nan0101.github.io
- **Owner:** Nandini Soni (`nannomnom`)
- **Stack:** Astro 6 + React 19 islands + Tailwind CSS v4 + TypeScript strict
- **Deploy:** GitHub Pages via Actions on push to `main`
- **Purpose:** Pro portfolio (`/`) + hidden personal site at `/shishin` ("The Archive")
- **Libs:** Framer Motion (UI animations), GSAP (Portal only), lucide-react (icons)

---

## 2. Directory Structure

```
src/
  layouts/
    ProLayout.astro        Pro shell: Nav, footer, Portal, Cat, PortalReveal
    PersonalLayout.astro   Archive shell: horizontal scroll, Archive nav, AmbientAudio, ReturnButton
  components/
    Nav.astro              Sticky pro nav, squiggle underlines, hamburger
    ProjectCard.astro      Project card (hover tilt + scale)
    Cat.tsx                Sticky portal trigger (pro only), dispatches portal:open
    Portal.tsx             GSAP portal transition overlay
    PortalReveal.tsx       Destination-side overlay fade-out
    ReturnButton.tsx       /shishin → / return
    NameCycle.tsx          Hero name hover cycle (en→hi→gu→ja)
    ThemeToggle.tsx        Dark/light toggle, localStorage
    SocialLinks.tsx        Footer icon row (lucide-react)
    HeroPhoto.tsx          Hero photo with mouse-tilt (Framer Motion)
    ScrollReveal.tsx       Framer Motion fade+Y stagger wrapper
    ProjectFilter.tsx      Multi-select tag filter island
    MetricCounter.tsx      Scroll-triggered animated stat counter
    personal/
      AmbientAudio.tsx     Muted autoplay + tap-to-unmute pill + localStorage consent
  pages/
    index.astro            Pro homepage: hero + featured projects
    resume.astro           Résumé viewer (resume.json, print stylesheet)
    leadership.astro       Leadership card grid
    blog.astro             Substack intro + build-time RSS (max 5 posts)
    contact.astro          Contact form (formsubmit.co)
    404.astro              404 page
    projects/
      index.astro          Projects listing with tag filter
      [slug].astro         Case study template
    shishin/
      index.astro          Archive landing (horizontal scroll, evidence board)
      [page].astro         Archive section pages: books-anime, hiking, journal, kitchen, japanese, feminism, guestbook
  content/
    projects/              semantic-search.md, context-aware-rag.md, data-pipeline-viz.md
    leadership/            ee_spoc.md, grad_ambassador.md, esg_comms.md, iss_volunteer.md
    resume.json
  content.config.ts        Astro 6 glob loader (projects + leadership)
  config/
    site.ts                (pending) handle, socials, secretSlug, nameScripts
  styles/
    global.css             @import tailwindcss + tokens.css
    tokens.css             All CSS custom properties (design tokens)
  assets/
    NANDINI_SONI_PHOTO_NEW.jpg

public/
  photos/hero.jpg
  stickers/               8 line-art SVGs
  audio/ambient.mp3       Silent placeholder (loops at 40% vol)
  resume.pdf              (pending)
  favicon.svg / favicon.ico
```

---

## 3. Design Tokens

Single source: `src/styles/tokens.css`. Never duplicate — always reference vars.

```
Shared:   --ink, --paper, --paper-dim, --line
Nebula:   --nebula-deep/plum/violet/magenta/glow/mist
Archive:  --parchment, --navy-deep, --oxblood, --brass-gold, --wax-red  (to be added)
Semantic: --bg, --fg, --accent  (swap on data-theme="dark")
Fonts:    --font-display (Geist), --font-body (Inter), --font-mono (Geist Mono),
          --font-hand (Caveat), --font-retro (DotGothic16)
Spacing:  --space-1 (4px) → --space-10 (128px)   Radii: --radius-sm/md/lg/full
```

**Usage:** Pro = `--paper`/`--ink` + nebula accent. Archive (`/shishin`) = `--parchment`/`--navy-deep`/`--oxblood`/`--brass-gold`/`--wax-red` only — never nebula tokens.

---

## 4. Architectural Rules

- **Static only.** No SSR. Everything must work as built HTML + client JS.
- **Portal secret.** `/shishin/*` is `noindex`, excluded from sitemap, disallowed in `robots.txt`. Only reachable via `Cat` component (`portal:open`).
- **Site constants** live in `src/config/site.ts`. Never hardcode in components or pages.
- **React islands only when needed.** No state/effects → write `.astro`.
- **prefers-reduced-motion:** every animation needs a no-motion fallback.
- **WCAG AA contrast** on all text. Visible `:focus-visible` on every interactive element.
- **Breakpoints:** 375 / 768 / 1024 / 1440. Desktop-first, mobile graceful.
- **Font families in React inline styles** must use literal strings, not `var(--font-*)`.

---

## 5. Content Collections Schema

Config: `src/content.config.ts` (Astro 6 glob loader).

```
projects:   title, slug, year, tags[], stack[], summary, thumbnail?, hero?,
            problem, approach, outcome, links[]?, featured, github?, demo?, metrics[]?
leadership: role, org, dates, impact[], photo?
books:      title, author, cover?, rating (1-5), status, review_short
anime:      title, studio, cover?, rating (1-5), status, review_short
trails:     name, date, distance_mi, elevation_ft, region, photos[], notes
recipes:    name, ingredients[], steps[], chaos_level (1-5), verdict, date
crochet:    name, yarn, hook_size, start_date, status, photos[], notes
japanese-log: date, jlpt_target, learned[], interesting_kanji
feminism-essays: title, excerpt, substack_url, date, tags[]
```

---

## 6. Key Components

| File | Purpose |
|------|---------|
| `Cat.tsx` | Sticky portal trigger, pro side only |
| `Portal.tsx` | GSAP overlay → glyph ring → navigate |
| `PortalReveal.tsx` | Fades out dark overlay on arrival (sessionStorage) |
| `ReturnButton.tsx` | Archive → pro return |
| `NameCycle.tsx` | Hero name AnimatePresence cross-fade |
| `Nav.astro` | Sticky, scroll-blur, squiggle underlines, hamburger |
| `ProjectCard.astro` | Thumb + tags + 2-line summary, JS tilt |
| `ProjectFilter.tsx` | Multi-select tag filter |
| `MetricCounter.tsx` | `useInView` animated stat |
| `HeroPhoto.tsx` | ±2deg mouse-tilt via Framer spring |
| `AmbientAudio.tsx` | Vinyl disc UI, muted autoplay, localStorage consent |
| `HorizontalScroll.tsx` | Obys-style wheel→translateX engine; mobile falls back to vertical |
| `ArchivePanel.tsx` | Single horizontal panel with bg variant + data-panel attr |
| `CipherReveal.tsx` | 3 modes: atbash hover-decode, vigenère gate, scroll-reform glyphs |
| `symbols/*.tsx` | 9 ambient SVG symbols (SacredGeometry, AllSeeingEye, FibonacciSpiral, etc.) |

---

## 7. Conventions

- **Styling:** Tailwind utilities → CSS vars → scoped `<style>` for complex selectors.
- **Animations:** Framer Motion for all UI; GSAP **only** in `Portal.tsx`.
- **Images:** `<Image />` in `.astro`; plain `<img>` with `onError` in React. Inline SVG for icons.
- **No new deps** without explicit ask.
- Use relative imports (no `@/` alias yet).

---

## 8. Workflows

| Task | How |
|------|-----|
| Add project | New `.md` in `src/content/projects/`; update Section 2 |
| Feature a project | `featured: true` in frontmatter (max 3 on homepage) |
| Change secret slug | Edit `SITE.secretSlug` in `src/config/site.ts` only |
| Run build | `npm run build` — 0 errors before any commit |
| Dev server | `npm run dev` → http://localhost:4321 |

---

## 9. Session Protocol

**Read this section first, every session.**

- Do NOT run `find`, `ls`, `grep`, or scans — Section 2 is the map.
- Only read files you need to edit.
- State files to read/edit before starting. Proceed without waiting unless scope is ambiguous.
- Prefer `Edit` over full rewrites. Rewrite only if >50% changes.
- When adding files: update Section 2 (and Section 6 if a component) in the same commit.
- Run `npm run build` after every non-trivial change. Fix all errors before declaring done.

**Personal side — "The Archive" redesign (Prompts 7–9):**
- Old nebula/apartment concept is **SCRAPPED**. New concept: Dan Brown conspiracy archive aesthetic.
- Horizontal scroll throughout ALL `/shishin/*` pages — vertical is NOT the default.
- Palette: parchment + deep navy + oxblood + brass gold + wax-seal red (Archive tokens, see Section 3).
- Layout/scroll reference: Obys agency typography principles.
- Do NOT use nebula tokens, zone-grid layout, or washi tape on any `/shishin` page.

---

## 10. Pending / TODOs

- `src/config/site.ts` — create; constants still hardcoded
- `public/resume.pdf` — pending upload
- `public/audio/ambient.mp3` — replace silent placeholder
- `FORMSUBMIT_EMAIL` — placeholder in contact form
- Archive tokens (`--parchment` etc.) — add to `tokens.css`
- Real project content — pull from github.com/Nan0101 + resume
