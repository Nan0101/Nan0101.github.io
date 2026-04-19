# nan0101.github.io

Personal portfolio site for **Nandini Soni** ([@Nan0101](https://github.com/Nan0101) / nannomnom).

SWE + AI/ML portfolio — public-facing work, projects, and writing. A hidden personal section lives at `/shishin`.

Built with [Astro](https://astro.build), React, Tailwind CSS v4, Framer Motion, and GSAP. Deployed to [nan0101.github.io](https://nan0101.github.io) via GitHub Actions.

## Dev commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview build locally before deploying      |

## Deploy

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds and deploys to GitHub Pages.

**One-time setup:** In GitHub → Settings → Pages, set **Source** to **GitHub Actions**.

## Project structure

```
src/
  layouts/      Astro layout components
  components/   Astro + React components
  pages/        File-based routes
  styles/       Global CSS (Tailwind entry point)
  assets/       Images processed by Astro
  content/      Markdown/MDX content collections
  data/         Static data (JSON/TS)
  i18n/         Internationalisation strings
public/         Static files served as-is (resume, audio)
```
