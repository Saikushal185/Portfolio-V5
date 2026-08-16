# Portfolio V5 — "Afternoon Porch"

## Context

Sai has three portfolio generations on disk under `~/Desktop/Web Portfolio Projects/`:

- **V2 / V3** — full multi-page editorial sites, Tokyo Night dark palette, Supabase-backed contact + admin + blogs, both in git with GitHub remotes. V3 is the current live site (`saikushal.live`).
- **V4** — a terminal-only reinvention, work in progress, **not in git**, with the content layer already lifted into clean `src/data/*.ts` modules.

Every version so far has been cool and dark. The ask is a warm one: a cozy, summer-feeling portfolio, with a day→night toggle that animates into cool moonlight.

The valuable asset across all three is the **content**, not the chrome — 20 projects (9 with full four-beat narratives and a headline metric), skills, education, certifications, coding profiles, blog posts, legal copy. V5 reuses that verbatim and rebuilds everything visual.

**Outcome:** a new `Portfolio-V5` that reads as warm, unhurried, and personal, keeps V3's working features, and presents the project work as a wall of findings rather than another card grid. V3 stays untouched and live until V5 is ready to replace it.

---

## Design direction

The brief's own words — cozy, warm, summer — point straight at the most common AI-default look right now (cream `#F4F1EA` + high-contrast serif + terracotta). This direction deliberately steps off it: the warmth is **honeyed and saturated** rather than bleached, and it is anchored by a **deep garden green**, so the page reads as warmth *plus shade*, not warmth alone.

### Tokens

```
DAY                                  NIGHT
--paper   #FBEBD2  honeyed paper     --night  #131A24  cool slate
--card    #FFF6E8  lit surface       --card   #1C2533  shadowed surface
--ink     #2A1F17  roasted brown     --ink    #DDE6F0  moon white
--sun     #F6A21E  marigold          --moon   #A8C3E0  blue light
--ember   #E2542C  hot orange        --lamp   #F0A85C  the one warm thing
--shade   #3E5B4A  deep garden green --shade  #5E8A78  moonlit green
```

Night is **cool everywhere except one warm accent** — that is what cozy means after dark: a lamp in a cool room. `--lamp` is the only survivor of the day palette.

### Type — three roles, no neutral sans

| Role | Face | Use |
|---|---|---|
| Display | **Bricolage Grotesque** (variable, `opsz`/`wdth`) | headlines, project metrics — friendly and slightly wonky, not the default serif |
| Prose | **Newsreader** | project stories, about copy — warm low-contrast serif, pleasant for long narrative |
| Utility | **DM Mono** | nav, eyebrows, tech tags, stat labels |

Google Fonts, `display=swap`, subset to latin.

### Signature: the sun travels, and the light travels with it

The theme control is not a moon icon. It is a **small sun arc in the header** — an SVG curve with a dot on it. Clicking (or dragging) it moves the sun from high noon down past the horizon, and the entire page's light follows:

- Surface and ink colors interpolate day → night
- `--shadow-x`, `--shadow-blur`, `--shadow-color` shift, so **every shadow on the page lengthens, softens and turns blue** as the sun drops
- The hero's warm radial "window light" wash slides down and fades
- A faint starfield layer fades in

This is the one bold element. Everything around it stays quiet and disciplined. It also happens to be honest to the subject: for a data person, the theme switch is a plotted curve.

Implementation: all light state lives in CSS custom properties on `<html>`; the toggle sets `data-theme` and a `--sun-position` value, with an ~900ms orchestrated transition. `prefers-reduced-motion` → instant swap, no arc animation, no starfield.

### Signature: the findings wall

Sai's projects carry real numbers — `p ≈ 0.001`, `£8.9M`, `R² 0.94`, `≈3×`, `383K`. Those numbers are the material, so they lead.

```
┌──────────────────┐  ┌──────────────────┐
│                  │  │                  │
│  ≈3×             │  │  £8.9M           │   ← metric, Bricolage, huge
│  attrition risk  │  │  revenue         │   ← metricLabel, DM Mono, small
│  under overtime  │  │  segmented       │
│                  │  │                  │
│  HR Attrition    │  │  Segmentation    │   ← title, quiet
│  ML · Python     │  │  ML · K-Means    │
└──────────────────┘  └──────────────────┘
      ╲ shadow angled by sun position ╲

click → warm overlay: hook / problem / investigation / result
```

Projects without a `story` or `metric` fall into a quieter ruled list beneath ("More work"), so the wall only ever shows projects that have something to say.

---

## Stack

Match V3/V4 exactly — **Node here is v18.19.1**, so Vite 6+ and Tailwind 4 are off the table.

- Vite 5 · React 18 · TypeScript 5 · Tailwind 3
- `react-router-dom` 6, `react-helmet-async`, `lucide-react`, `@supabase/supabase-js` 2
- `vite-plugin-compression`, `vercel.json` (copy V3's)

---

## Structure — hybrid

| Route | Contents |
|---|---|
| `/` | Hero → About → Findings wall (featured) → Coding stats → Certifications → Education → Contact |
| `/projects` | Full findings wall, all 20, with category filter chips |
| `/blog`, `/blog/:slug` | Posts from `blogData.ts` |
| `/admin` | Supabase-auth login + messages dashboard (lazy-loaded) |
| `/privacy`, `/terms` | From `legal.ts` |
| `*` | 404 |

---

## Files

Create `~/Desktop/Web Portfolio Projects/Portfolio-V5/`.

**Copy verbatim from `Portfolio-V4/src/data/`** — no content rewriting:
`profile.ts` · `projects.ts` · `skills.ts` · `education.ts` · `certifications.ts` · `codingProfiles.ts` · `blogData.ts` + `blogs.ts` · `legal.ts` · `resume.ts`

**Copy from `Portfolio-V4/public/`:** `SaiKushalDA.pdf`, `preview.webp`, `favicons/`, `LeetCode_logo_rvs.webp`, `codechef.webp`

**Port with theme rewrite** (logic intact, all Tokyo Night classes replaced):
- `src/lib/supabase.ts` — copy as-is from `Portfolio-V4/src/lib/supabase.ts`
- `src/features/contact/MessageDialog.tsx` — inserts into the existing `messages` table
- `src/features/admin/{index,AdminLogin,Dashboard}.tsx` — `supabase.auth` session flow, reads/deletes `messages`
- `src/shared/iconMap.tsx` — from `Portfolio-V3/src/shared/iconMap.tsx`, resolves the `icon` string on every data record

**New:**
- `src/theme/SunArc.tsx` — the arc control
- `src/theme/useTheme.ts` — `data-theme` + `--sun-position`, `localStorage`, `prefers-color-scheme` initial, `prefers-reduced-motion` guard
- `src/index.css` — the full custom-property light system (both themes + shadow vars + starfield)
- `src/features/projects/FindingsWall.tsx`, `FindingCard.tsx`, `StoryOverlay.tsx`
- `src/features/home/{Hero,About,CodingStats,Certifications,Education}.tsx`
- `src/data/resumes.ts` + `src/shared/components/ResumePicker.tsx` — the three-role resume selector
- `src/shared/components/{Navbar,Footer,Page,Section}.tsx`
- `tailwind.config.js` — semantic color names bound to the CSS vars (`paper`, `ink`, `sun`, `ember`, `shade`, `lamp`), the three font families

**Config:** `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `postcss.config.js`, `index.html`, `vercel.json`, `.gitignore`, `.env.example`

`.env.local` with `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — Sai copies these from V3's env; `isSupabaseConfigured` already degrades gracefully without them.

---

## Build order

0. Create `Portfolio-V5/` with `plan.md` (this file), `ASSETS.md` (the grab-list), and the empty `assets-inbox/` drop folders below — so Sai can start collecting while the scaffold goes up
1. Scaffold Vite + TS + Tailwind, copy config and public assets, `npm install`, confirm dev server boots on Node 18
2. Land the token system in `index.css` + `tailwind.config.js`, wire fonts, build `useTheme` and `SunArc` — **get the day→moonlight transition feeling right before any content exists**
3. Copy `src/data/*`, port `iconMap`
4. Findings wall + story overlay (the other signature) on `/projects`
5. Landing page sections in order: hero, about, featured findings, coding stats, certs, education
6. Contact dialog + `/admin` — verify against the live Supabase `messages` table
7. Blog routes, legal pages, 404
8. Responsive pass, keyboard focus states, reduced-motion pass, `npm run build`

Git-init at step 1 and commit per step, so the work is recoverable — V4 has no history and that is worth not repeating.

---

## Verification

- `npm run dev` → open `http://localhost:5173`
- **Sun arc:** toggle repeatedly — colors interpolate cleanly, shadows lengthen and cool, starfield fades in, no flash of unstyled theme on reload, choice persists across refresh
- **Reduced motion:** `Settings → Accessibility → Reduce motion` (or DevTools *Rendering → Emulate prefers-reduced-motion*) → theme swaps instantly, no arc travel
- **Findings wall:** every metric card opens its story; the 11 story-less projects appear only in the "More work" list; category filters return correct counts
- **Resume picker:** all three pills download the correct PDF, filenames have no spaces, links work with JS disabled
- **Contact:** submit a message → confirm the row lands in Supabase → log into `/admin` and see it → delete it
- **Responsive:** 375px, 768px, 1440px — no horizontal scroll, wall reflows to one column on mobile
- **Keyboard:** tab the whole page — visible focus rings in both themes, overlay traps focus and closes on `Esc`
- `npm run build` clean (`tsc` + vite), then `npm run preview` and re-check the toggle on the production bundle
- Contrast check `--ink` on `--paper` and `--ink` on `--night` ≥ 4.5:1

Deployment to `saikushal.live` is a separate step once Sai approves the built site — V3 stays live until then.

---

## Assets

Written to `Portfolio-V5/plan.md` (this file) and `Portfolio-V5/ASSETS.md` (the grab-list, with a checkbox per item) at step 0.

### Drop-folder structure

Raw originals go in `assets-inbox/`; I convert and optimise them out into `public/`. Nothing in `assets-inbox/` ships — it's gitignored — so Sai can drop full-size photos and long screen recordings without bloating the repo.

```
Portfolio-V5/
├── plan.md                  ← this document
├── ASSETS.md                ← the checklist, one line per item
├── assets-inbox/            ← DROP ZONE (gitignored)
│   ├── portrait/            ← photo, any size/format
│   ├── resumes/             ← the 3 PDFs
│   ├── badges/              ← Credly cert PNGs
│   ├── logos/               ← platform SVGs from simpleicons
│   └── video/               ← optional project screen recordings
└── public/                  ← processed output, ships
    ├── resume/
    ├── badges/
    ├── logos/
    └── video/
```

### Hand-coded — no downloads, no generators

Everything atmospheric in this design is code, because it has to react to the sun position:

| Element | How |
|---|---|
| Sun arc control | Inline SVG `<path>` + `<circle>`, animated via `--sun-position` |
| Starfield | CSS `radial-gradient` dots on a pseudo-element, opacity tied to theme |
| Paper grain | Inline SVG `feTurbulence` filter, ~15 lines, zero bytes over the wire |
| Long raking shadows | CSS `--shadow-x` / `--shadow-blur` / `--shadow-color` |
| Hero window-light wash | CSS radial-gradient, slides and fades with the sun |
| All UI icons | `lucide-react` — already a dependency, every data record's `icon` field resolves to it |
| Per-route favicons | Recolor the ten existing SVGs in `public/favicons/` to the new palette (each is <1KB, blue gradient → marigold/green) |

**Deliberately not using:** stock illustration, AI-generated decorative art, gradient mesh backgrounds. This direction's whole point is that it doesn't look generated; imported illustration undoes that in one step.

### Real gaps — needed from Sai

| # | Asset | Status | Source |
|---|---|---|---|
| 1 | **Portrait** | **Sai supplies a real photo** — replaces the Memoji | Window light, no flash; square crop via photopea, webp via squoosh |
| 2 | **Resume PDFs ×3** | All three exist and are current (Aug 14–15, 2026) | Copy from `~/Downloads/` — see resume picker below |
| 3 | **Cert badges** | Missing | Credly — download his real Oracle OCI + AWS CCP badge PNGs |
| 4 | **Platform logos** | Has LeetCode + CodeChef `.webp` | simpleicons.org for Codeforces, InterviewBit, Codolio |
| 5 | **OG preview image** | `preview.webp` is V3-era | Built in-repo as HTML + screenshot at 1200×630 |
| 6 | **Fonts** | — | Google Fonts: Bricolage Grotesque, Newsreader, DM Mono |

### Resume picker

Sai maintains three role-targeted resumes, all current. Rather than picking one and hiding the others, the site asks the visitor which lens they want — a recruiter for a backend role and one for a DS role want different documents, and saying so is more useful than a generic "Download CV".

New `src/data/resumes.ts`:

```ts
export const resumes = [
  { id: "da",   label: "Data Analytics",        file: "/resume/SaiKushal-DataAnalytics.pdf",
    note: "Dashboards, SQL, experimentation" },
  { id: "aiml", label: "AI / ML",               file: "/resume/SaiKushal-AIML.pdf",
    note: "Modelling, QML, explainability" },
  { id: "swe",  label: "Software Engineering",  file: "/resume/SaiKushal-SWE.pdf",
    note: "FastAPI, Node, REST, systems" },
] as const;
```

Rendered as three DM Mono pills under the hero CTA and again in the contact section — label above, `note` beneath in small type. Default highlight on Data Analytics. No JS state beyond a hover; each pill is a plain `<a download>`, so it works without scripting and is keyboard-navigable by default.

Source files, copied into `public/resume/` and renamed web-safe (no spaces):

| From `~/Downloads/` | To |
|---|---|
| `SaiKushalResume DA.pdf` | `SaiKushal-DataAnalytics.pdf` |
| `SaiKushal AIML.pdf` | `SaiKushal-AIML.pdf` |
| `Saikushal Swe.pdf` | `SaiKushal-SWE.pdf` |

The old `public/SaiKushalDA.pdf` is dropped. `profile.resume` in `profile.ts` changes from a single string to a reference to `resumes[0].file` so nothing else breaks.

### Video

**The day→night transition needs no video.** It's CSS custom properties interpolating — a video couldn't respond to the sun-arc position, couldn't respect `prefers-reduced-motion`, and would cost megabytes for something that renders in a few KB of CSS.

There is one genuinely good use for video though: **8–12 second silent screen recordings of the Streamlit dashboards**, playing muted on hover inside the findings-wall cards. Sai's projects are interactive apps, and a still screenshot hides that. Optional, and worth doing for the four featured ones first:

- A/B Testing Analytics · Loan Default Risk · Customer Segmentation · Healthcare Readmission

Capture with **OBS Studio** or GNOME's built-in recorder (`Ctrl+Shift+Alt+R`), 1280×720, no audio. I compress to webm (VP9, ~500KB each) with `ffmpeg`, add `preload="none"` so nothing downloads until hover, and fall back to a poster frame on mobile and under reduced-motion.

If these don't exist, the cards work fine without them — the metric is the hero, not the screenshot.

### Free tools

- **simpleicons.org** — brand SVGs, MIT, has every coding platform needed
- **credly.com** — his own verified cert badges
- **lucide.dev** — icon search (already installed)
- **fonts.google.com** / **fontsource.org** — the three faces, self-hostable
- **squoosh.app** — photo → webp, quality 80
- **photopea.com** — free browser Photoshop, for cropping the portrait square
- **haikei.app** — free SVG texture generator, *only* if the CSS grain isn't enough

If AI imagery is ever wanted: **Ideogram** (best text rendering), **Bing Image Creator** (free DALL·E 3), **Leonardo.ai** (free daily credits). Not recommended for this build.
