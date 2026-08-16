# Portfolio V5 — "Afternoon Porch"

Personal site for Sai Kushal Vittanala. Warm by day, cool by night, with the theme control as a sun on a plotted arc.

Live: [saikushal.live](https://saikushal.live) *(still served by V3 until this replaces it)*

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the Supabase keys
npm run dev                  # http://localhost:5173
```

Node 18 works. Vite 5 and Tailwind 3 are pinned deliberately — Vite 6+ needs Node 20, and the system node here is 18.

```bash
npm run build     # tsc + vite
npm run preview
```

## How the light works

Every colour is a CSS custom property holding an RGB triple. The sun-arc control swaps one set of values for another, and because the shadow offset, blur and alpha are variables too, every shadow on the page lengthens, softens and turns blue as the sun drops.

| Token | Day | Night |
|---|---|---|
| `--c-surface` | honeyed paper | cool slate |
| `--c-ink` | roasted brown | moon white |
| `--c-sun` | burnt amber | lamp glow |
| `--c-orb` | marigold | moonlight |
| `--c-shade` | garden green | moonlit green |

`--c-sun` carries text and icons, so it's held to WCAG AA in both themes. `--c-orb` is decorative only — the arc's sun and the window wash — which is why it can stay bright.

The long cross-fade is scoped to `html.is-travelling`, added by `useTheme` for the 900ms of the move and then removed. Leaving it on made every hover feel underwater.

`prefers-reduced-motion` skips the travel entirely and the theme just swaps.

## Layout

```
src/
├── theme/          SunArc + useTheme — the signature control
├── data/           all content, no JSX. Edit here, not in components
├── features/
│   ├── home/       hero, about, coding stats, credentials
│   ├── projects/   the findings wall + story overlay
│   ├── blog/       list and post
│   ├── contact/    anonymous note box
│   ├── admin/      Supabase auth, lazy-loaded
│   └── legal/
├── shared/         page frame, nav, footer, resume picker, icon map
└── index.css       the light system
```

Content lives in `src/data/*.ts` and nowhere else. Adding a project means adding an object, not writing a component.

A project appears on the **findings wall** if it has a `story` with a `metric`. Everything else drops to the quiet "More work" list — five weak cards read weaker than five strong ones.

## Demo clips

The four featured projects carry short silent recordings of the actual Streamlit apps being used, played inside the story overlay with `preload="none"`. They're produced by driving the real apps in a browser — see [`tools/README.md`](tools/README.md) to re-record.

## Routes

| Path | |
|---|---|
| `/` | hero, findings, about, coding, credentials, contact |
| `/projects` | full wall with category filters |
| `/blog`, `/blog/:slug` | writing |
| `/privacy`, `/terms` | legal |
| `/admin` | Supabase auth, message dashboard |

## Supabase

The contact box inserts `{ message, user_agent }` into the `messages` table — same schema and project as V3, no migration needed. RLS should allow anonymous `insert` only, with `select` and `delete` restricted to authenticated users.

Without the env vars the site still builds and runs; `isSupabaseConfigured` degrades the contact box and `/admin` gracefully.
