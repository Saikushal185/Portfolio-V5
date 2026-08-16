# tools/

| File | What it does |
|---|---|
| `record-demos.mjs` | Re-records the project demo clips in the findings wall |
| `generate-sitemap.mjs` | Writes `public/sitemap.xml`; runs automatically on `npm run build` |
| `og-cover.html` | Source for `public/og-cover.png`, the social share card |

## tools/generate-sitemap.mjs

Runs as the first step of `npm run build`, so the sitemap is never stale. It reads the static route list at the top of the file and the post slugs out of `src/data/blogData.ts`. If it finds no slugs it fails the build rather than shipping a sitemap with no posts in it — add routes to `STATIC_ROUTES` when you add a page.

## tools/og-cover.html

The 1200×630 card that shows when a link is shared. Re-render it after changing the headline or the palette:

```bash
~/.cache/ms-playwright/chromium-1237/chrome-linux64/chrome \
  --headless --disable-gpu --hide-scrollbars --virtual-time-budget=8000 \
  --screenshot=public/og-cover.png --window-size=1200,630 \
  "file://$PWD/tools/og-cover.html"
```

`--virtual-time-budget` matters: without it the shot fires before the webfonts land and the card renders in Times.

## tools/record-demos.mjs

Re-records the project demo clips that play on hover in the findings wall. Everything it needs is already on this machine — no downloads.

## Why it exists

The four featured projects are interactive Streamlit apps. A screenshot hides that, so each card carries a short silent clip of the app actually being used. Scripted rather than screen-captured, so a clip can be re-shot identically when a layout changes.

## Prerequisites

| | Path |
|---|---|
| Node 20+ | `~/.nvm/versions/node/v22.23.2/bin/node` — system node is 18, Playwright needs 20+ |
| Playwright | `~/.npm/_npx/9833c18b2d85bc59/node_modules` (symlink it in as `node_modules`) |
| Chrome | `~/.cache/puppeteer/chrome/linux-148.0.7778.97/chrome-linux64/chrome` |
| ffmpeg | `~/.cache/ms-playwright/ffmpeg-1011/ffmpeg-linux` — Playwright's own, VP8 only |

## Run

Start the four apps first, each on its own port:

```bash
D="$HOME/Desktop/Data Science Projects"
cd "$D/ab-testing-analytics"           && python3 -m streamlit run dashboard/app.py --server.port 8501 --server.headless true &
cd "$D/loan-risk-system"               && python3 -m streamlit run dashboard/app.py --server.port 8502 --server.headless true &
cd "$D/hospital-readmissions"          && python3 -m streamlit run app.py           --server.port 8503 --server.headless true &
cd "$D/customer-segmentation-platform" && python3 -m streamlit run dashboard/app.py --server.port 8504 --server.headless true &
```

Then record:

```bash
ln -sfn ~/.npm/_npx/9833c18b2d85bc59/node_modules ./node_modules
OUT=./raw ~/.nvm/versions/node/v22.23.2/bin/node record-demos.mjs

# one clip only
ONLY=segment OUT=./raw ~/.nvm/versions/node/v22.23.2/bin/node record-demos.mjs
```

Then trim, compress and cut posters:

```bash
FF=~/.cache/ms-playwright/ffmpeg-1011/ffmpeg-linux
$FF -nostdin -y -ss 1.2 -i raw/abtest.webm -t 10.5 \
    -c:v libvpx -b:v 700k -crf 34 -qmin 10 -qmax 46 -an \
    -deadline good -cpu-used 2 ../public/video/ab-testing-analytics.webm
```

`-nostdin` matters — without it ffmpeg swallows the surrounding shell loop's input.

## Choreography

| Clip | Port | What it shows |
|---|---|---|
| `abtest` | 8501 | Scrolls the p=0.0013 verdict, results table, charts |
| `loan` | 8502 | Types a weak applicant → **Simulate approval** → 95.5% default, "Decline or require guarantor", SHAP breakdown |
| `readmit` | 8503 | Scrolls 101,766 encounters → age-band chart → risk drivers |
| `segment` | 8504 | Types a £1,000 revenue floor → 4,338→1,664 customers, Avg CLV £2,049→£4,677, donut flips to Loyal + Champions |

## Gotchas

- **Streamlit only commits real key events.** `fill()` + `Enter` silently does nothing; use `pressSequentially()` then `Enter`.
- **A multiselect chip is itself the button** (`role="button"`, "close by backspace"), so `getByRole('button')` inside it finds nothing and burns the full 30s click timeout. Prefer the number input.
- **`document.body.scrollHeight` is 0** — Streamlit scrolls an inner container. Use `page.mouse.wheel()`.
- Streamlit's toolbar and the "Deploy" button are hidden by injected CSS in the script.
