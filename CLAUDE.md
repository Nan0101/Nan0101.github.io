# CLAUDE.md — Session Context for Nan0101.github.io

## 1. Project Identity

- **Repo:** Nan0101/Nan0101.github.io — **Live:** https://nan0101.github.io
- **Owner:** Nandini Soni, handle `nannomnom`
- **Stack:** Astro 6 + React 19 islands + Tailwind CSS v4 + TypeScript strict
- **Deploy:** GitHub Pages via Actions on push to `main`
- **Purpose:** Professional portfolio (pro side `/`) + hidden personal site at `/shishin`
- **Libs:** Framer Motion (UI animations), GSAP (Portal only), lucide-react (icons)

---

## 2. Directory Structure

```
src/
  layouts/
    ProLayout.astro        Pro side shell: Nav, footer, Portal, Cat, PortalReveal
    PersonalLayout.astro   Personal shell: nebula bg, grain, ReturnButton, Portal, PortalReveal
  components/
    Nav.astro              Sticky pro nav with squiggle underlines + hamburger
    ProjectCard.astro      Reusable project card (hover tilt + scale)
    Cat.tsx                Sticky portal trigger, pro side only
    Portal.tsx             Dan Brown GSAP portal transition
    PortalReveal.tsx       Destination-side overlay fade-out
    ReturnButton.tsx       /shishin → / portal return
    NameCycle.tsx          Hero multi-script name hover cycle
    ThemeToggle.tsx        Dark/light toggle, localStorage-persisted
    LangToggle.tsx         EN/JA toggle, sets html[data-lang]
    SocialLinks.tsx        Footer icon row (lucide-react)
    HeroPhoto.tsx          Hero photo with mouse-tilt effect
    ScrollReveal.tsx       Framer Motion fade+Y stagger wrapper
    ProjectFilter.tsx      Client-side multi-select tag filter island
    MetricCounter.tsx      Scroll-triggered animated metric display
    personal/              (pending) Sticker.astro, WashiTape.astro
    AmbientAudio.tsx       (pending) Personal-side audio control
  pages/
    index.astro            Pro homepage: hero + featured projects
    resume.astro           Résumé viewer (imports resume.json, print stylesheet)
    leadership.astro       Leadership card grid (content collection)
    blog.astro             Blog page (Substack intro + build-time RSS feed, max 5 posts)
    contact.astro          Contact form (formsubmit.co, ?sent=true thank-you card)
    404.astro              404 page with home link + cat hint
    projects/
      index.astro          Projects listing with tag filter
      [slug].astro         Case study template
    shishin/
      index.astro          Personal landing ("you found the passage")
  content/
    projects/              .md files — one per project
      semantic-search.md
      context-aware-rag.md
      data-pipeline-viz.md
    leadership/            .md files — one per role
      swe-mentor.md
      ai-club.md
    resume.json            Resume data (summary, experience, education, skills, certifications)
  content.config.ts        Astro 6 content layer config (glob loader — projects + leadership)
  config/
    site.ts                (pending) Single source of truth: handle, socials, secretSlug, nameScripts
  i18n/
    en.json                (pending) EN strings
    ja.json                (pending) JA strings
  styles/
    global.css             @import tailwindcss + tokens.css
    tokens.css             All CSS custom properties (design tokens)
  assets/
    NANDINI_SONI_PHOTO_NEW.jpg  Source photo (also copied to public/photos/hero.jpg)

public/
  photos/
    hero.jpg               Profile photo (copied from src/assets)
  stickers/                (pending) Personal-side SVG assets
  uploads/                 (pending) User-managed images per category + manifest.json
  audio/
    ambient.mp3            (pending) Personal-side ambient loop
  resume.pdf               (pending upload)
  favicon.svg
  favicon.ico
  ryoish-skippy-days-389894.mp3   Existing audio file

Root:
  astro.config.mjs         Astro config (React, Tailwind vite plugin)
  tsconfig.json            TypeScript config (strict)
  package.json
  CLAUDE.md                This file
```

---

## 3. Design Tokens

Single source: `src/styles/tokens.css`. Never duplicate values — always reference vars.

```
Shared:   --ink, --paper, --paper-dim, --line
Nebula:   --nebula-deep/plum/violet/magenta/glow/mist
Semantic: --bg, --fg, --accent  (swap on data-theme="dark")
Fonts:    --font-display (Geist), --font-body (Inter), --font-mono (Geist Mono),
          --font-hand (Caveat), --font-retro (DotGothic16),
          --font-devanagari, --font-gujarati, --font-japanese
Spacing:  --space-1 (4px) → --space-10 (128px)   Radii: --radius-sm/md/lg/full
```

**Usage rule:** Pro light = `--paper` bg + `--ink` fg + `--nebula-violet` accent. Pro dark = `--ink` bg + `--paper` fg + `--nebula-magenta` accent. Personal = all nebula tokens, radial/conic gradients only, never `--paper` or `--ink`.

---

## 4. Architectural Rules

- **Static only.** No SSR, no server runtime. Everything must work as built HTML + client JS.
- **Portal secret.** `/shishin/*` is `noindex` + excluded from sitemap + disallowed in `robots.txt`. Never link to it from the pro side except via the `Cat` component event (`portal:open`).
- **Site constants** (handle, slug, socials, name scripts) must live in `src/config/site.ts`. Read from there, never hardcode in components or pages.
- **React islands only when needed.** If a component has no state or effects, write it as `.astro`. React adds hydration cost.
- **prefers-reduced-motion:** every animation must have a no-motion fallback. Check `window.matchMedia('(prefers-reduced-motion: reduce)')` before running GSAP/Framer timelines.
- **WCAG AA contrast** minimum on all text. Visible `:focus-visible` rings on every interactive element.
- **Breakpoints:** 375 (mobile), 768 (tablet), 1024 (desktop), 1440 (wide). Desktop-first layout, mobile graceful.
- **Font families in React inline styles** must use literal strings (`'Geist, system-ui, sans-serif'`), not `var(--font-display)` — CSS vars are unreliable in React inline `fontFamily`.

---

## 5. Content Collections Schema

Config: `src/content.config.ts` (Astro 6 glob loader, not legacy `src/content/config.ts`).

```
projects:        title, slug, year, tags[], stack[], summary, thumbnail?, hero?,
                 problem, approach, outcome, links[]?, featured, github?, demo?, metrics[]?

leadership:      role, org, dates, impact[], photo?   ✓ seeded (swe-mentor, ai-club)
japanese-log:    date, jlpt_target, learned[], interesting_kanji
recipes:         name, inspiration, ingredients[], steps[], chaos_level (1-5),
                 outcome_photo?, verdict, date
crochet:         name, yarn, hook_size, start_date, status, photos[], notes
trails:          name, date, distance_mi, elevation_ft, region, photos[], notes
buffalo-notes:   date, title, body
books:           title, author, cover?, rating (1-5), status, review_short
anime:           title, studio, cover?, rating (1-5), status, review_short
feminism-essays: title, excerpt, substack_url, date, tags[]
```

Add new collections here when created. Always use `glob` loader in `content.config.ts`.

---

## 6. Key Components

| File | Purpose |
|------|---------|
| `Cat.tsx` | Sticky 🐈‍⬛ button, pro side only, dispatches `portal:open` |
| `Portal.tsx` | GSAP overlay → glyph ring → collapse → navigate |
| `PortalReveal.tsx` | On destination page load, fades out dark overlay (sessionStorage flag) |
| `ReturnButton.tsx` | Pill button dispatching `portal:return` |
| `NameCycle.tsx` | Hover cycles en→hi→gu→ja with AnimatePresence cross-fade |
| `Nav.astro` | Sticky, scroll-blur, squiggle underlines, hamburger mobile menu |
| `ProjectCard.astro` | Card with aspect-3/2 thumb, tag chips, 2-line summary clamp, JS tilt |
| `ProjectFilter.tsx` | Multi-select tag filter, receives pre-fetched project data as prop |
| `MetricCounter.tsx` | `useInView` + fade-in animated stat display |
| `HeroPhoto.tsx` | Photo with ±2deg mouse-tilt via Framer Motion spring |
| `ScrollReveal.tsx` | `motion.div` fade+Y wrapper with configurable delay |
| `ThemeToggle.tsx` | Toggles `data-theme` on `<html>`, persists to localStorage |
| `LangToggle.tsx` | Toggles `data-lang` on `<html>` (EN/JA), persists to localStorage |
| `SocialLinks.tsx` | Row of lucide-react icon links: LinkedIn, GitHub, Instagram, Goodreads, Substack, Email |
| `AmbientAudio.tsx` | *(pending)* Personal-side ambient audio control |

---

## 7. Conventions

- **Path alias:** `@/` → `src/` (pending tsconfig config); use relative imports until then.
- **Styling:** Tailwind utilities first → CSS vars for tokens → scoped `<style>` for complex selectors only.
- **Animations:** Framer Motion for all UI; GSAP **only** for `Portal.tsx`. Don't add GSAP elsewhere.
- **Images:** `<Image />` in `.astro` for optimized raster; plain `<img>` in React with `onError` fallback. Inline SVG for icons.
- **i18n:** *(pending)* `data-i18n-key` attributes + `src/i18n/t.ts`. Don't hardcode user-facing strings.
- **No new deps** without explicit ask. lucide-react has no brand icons — use semantic substitutes.

---

## 8. Workflows

| Task | How |
|------|-----|
| Add a project | New `.md` in `src/content/projects/` with full schema frontmatter; update Section 2 tree |
| Mark project featured | Set `featured: true` in frontmatter; appears in homepage Selected Work (max 3) |
| Add uploaded photo | Place in `/public/uploads/<category>/`; update `manifest.json` in that folder |
| Change secret slug | Edit `SITE.secretSlug` in `src/config/site.ts` only; links update everywhere |
| Guestbook moderation | Via GitHub Discussions UI (category "Guestbook") |
| Run build | `npm run build` — must emit 0 errors before any commit |
| Dev server | `npm run dev` → http://localhost:4321 |

---

## 9. Session Protocol

**Read this section first, every session.**

- **Do NOT** run `find`, `ls`, `grep`, or directory scans to explore the repo. Section 2 is the map.
- **Only read** the specific files you need to edit. Never read a file just to confirm its existence.
- **Before starting** any task: state which files you will read and which you will edit. Proceed without waiting for confirmation unless the scope is genuinely ambiguous.
- **Prefer `Edit` (str_replace)** over full file rewrites. Only rewrite if >50% of the file changes.
- **When adding files:** update Section 2 (directory tree) and Section 6 (if a component) in the same commit.
- **If Section 2 looks stale:** update it as part of your final commit — do not re-explore to verify first.
- **Build check:** run `npm run build` after every non-trivial change. Fix all errors before declaring done.

---

## 10. Known TODOs / Pending Assets

- `src/config/site.ts` — create; constants still hardcoded in components
- `src/i18n/en.json` + `ja.json` + `t.ts` — i18n not yet wired
- `public/resume.pdf`, `public/audio/ambient.mp3` — pending uploads
- `FORMSUBMIT_EMAIL` — placeholder in any contact form
- Real project content — pull from github.com/Nan0101 + resume (Prompt 11)
- `@/` path alias — not yet configured in tsconfig/astro.config
- `/public/uploads/` + `manifest.json` pattern — not yet scaffolded
- `src/content/config.ts` (legacy file) — safe to delete; replaced by `src/content.config.ts`
