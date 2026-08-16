# Assets to grab — Portfolio V5

Drop raw originals into `assets-inbox/<folder>/`. Don't rename, don't resize, don't compress — I handle conversion and output the optimised versions into `public/`. `assets-inbox/` is gitignored, so full-size files are fine.

**Only item 1 blocks the build.** Everything else can land while I'm building.

---

## 1. Portrait 🔴 blocks build

**→ `assets-inbox/portrait/`**

- [ ] One photo of you

| | |
|---|---|
| **Format** | Anything — JPG, PNG, HEIC, straight off a phone |
| **Size** | As large as you have. Bigger is better, I downscale |
| **Crop** | Don't bother, I'll crop |

**What actually matters — the lighting.** The entire site is built on warm directional light, so a photo lit that way sits inside the design instead of fighting it.

- ✅ **Near a window, daytime, facing the light.** Late afternoon is ideal — that's literally the palette
- ✅ Plain-ish wall behind you, or anything soft and out of focus
- ✅ Slight angle, relaxed. It's a cozy site, not a passport office
- ❌ Camera flash — flattens everything and goes cold
- ❌ Overhead office fluorescent — green cast, fights the marigold
- ❌ Busy background, harsh backlight, heavy phone-portrait-mode blur

Two or three options is fine, I'll pick the one that sits best.

---

## 2. Resumes 🟡 I can copy these myself

**→ `assets-inbox/resumes/`**

**Already copied in for you** from `~/Downloads/` — all three are current (Aug 14–15). Drop newer versions here and they win.

- [x] `SaiKushalResume DA.pdf` → ships as `SaiKushal-DataAnalytics.pdf`
- [x] `SaiKushal AIML.pdf` → ships as `SaiKushal-AIML.pdf`
- [x] `Saikushal Swe.pdf` → ships as `SaiKushal-SWE.pdf`

These become the three-pill resume picker: *Data Analytics · AI/ML · Software Engineering*.

---

## 3. Certification badges 🟢 nice to have

**→ `assets-inbox/badges/`**

Your real, verifiable badges — recreations would be worse than nothing here.

- [ ] Oracle OCI 2025 Generative AI Professional
- [ ] AWS Certified Cloud Practitioner

**Where:** [credly.com](https://www.credly.com) → sign in → your badge → **Share** → **Download badge image**. PNG, whatever size it gives you.

If Oracle issued yours outside Credly, the certificate PDF works too — you already have the verify link in `certifications.ts`.

---

## 4. Platform logos 🟢 nice to have

**→ `assets-inbox/logos/`**

Already have: **LeetCode**, **CodeChef** (carried over from V4).

Only needed if you want these three on the coding-stats row:

- [ ] Codeforces — [simpleicons.org/?q=codeforces](https://simpleicons.org/?q=codeforces)
- [ ] Codolio — no Simple Icons entry; screenshot the logo from your profile page, or skip it
- [ ] InterviewBit — no Simple Icons entry; same deal

On Simple Icons: search → click the tile → it downloads a clean single-colour SVG. I recolour them to the palette, so the source colour doesn't matter.

**Worth asking:** do you want all five platforms, or just the three with real signal (LeetCode Knight 1800+, CodeChef 2★, GitHub)? Five weak rows read weaker than three strong ones.

---

## 5. Project demo videos ✅ done — recorded automatically

**→ `public/video/`** (raw cuts kept in `assets-inbox/video/`)

Recorded by driving each Streamlit app in a real browser and scripting the interactions, so they can be re-shot identically whenever a layout changes. See `tools/README.md`.

- [x] **A/B Testing Analytics** — 10.5s · 475K · scrolls the p=0.0013 verdict and results table
- [x] **Loan Default Risk** — 11.5s · 346K · types a weak applicant → 95.5% default probability, *"Decline or require guarantor"*, SHAP breakdown
- [x] **Healthcare Readmission** — 9.8s · 429K · 101,766 encounters → age-band chart → risk drivers
- [x] **Customer Segmentation** — 13.0s · 286K · £1,000 revenue floor → 4,338→1,664 customers, Avg CLV £2,049→£4,677, donut flips to Loyal + Champions

1280×720, silent, VP8 webm. **1.7MB total including posters** — `preload="none"`, so nothing downloads until hover.

Every clip's numbers match `projects.ts` exactly: p≈0.001, £8.9M, 100K encounters.

---

## Not needed — I hand-code all of it

Listing this so you don't go hunting for things I'm already writing:

| | |
|---|---|
| Sun-arc theme control | Inline SVG, animated — has to be code |
| Day → moonlight transition | CSS custom properties. **No video.** A video couldn't track the sun position or respect reduced-motion |
| Starfield | CSS radial-gradients |
| Paper grain texture | Inline SVG `feTurbulence` filter |
| Long raking shadows | CSS |
| Every UI icon | `lucide-react`, already a dependency |
| Per-route favicons | Recolouring the 10 SVGs you already have in V4 |
| OG / social preview image | Built in-repo as HTML, screenshotted at 1200×630 so it matches the site exactly |
| Fonts | Google Fonts — Bricolage Grotesque, Newsreader, DM Mono |

**No stock illustration, no AI-generated art, no gradient meshes.** The whole point of this direction is that it doesn't look generated, and imported illustration undoes that in one step.

---

## Handy free tools

| Tool | For |
|---|---|
| [squoosh.app](https://squoosh.app) | Photo → webp (I'll do this, but if you want to preview) |
| [photopea.com](https://photopea.com) | Free browser Photoshop, if you want to crop yourself |
| [simpleicons.org](https://simpleicons.org) | Brand SVGs, MIT licensed |
| [credly.com](https://credly.com) | Your cert badges |
| [lucide.dev](https://lucide.dev) | Icon search, if you spot one you'd rather use |

---

## Status

| # | Item | Blocks build | Done |
|---|---|---|---|
| 1 | Portrait photo | 🔴 yes | ☐ **only thing outstanding** |
| 2 | Three resume PDFs | — | ☑ copied in |
| 3 | Cert badges | — | ☑ 3 in (incl. Azure) |
| 4 | Platform logos | — | ☑ Codeforces, Codolio, InterviewBit |
| 5 | Demo videos | — | ☑ recorded, 1.7MB total |

Design direction and full build plan: **`plan.md`**
