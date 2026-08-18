/**
 * Writes public/sitemap.xml from the routes in App.tsx and the slugs in
 * blogData.ts.
 *
 * Generated rather than hand-written because there are 21 posts and a
 * hand-kept list goes stale the first time one is added — a sitemap that
 * lies is worse than none, since it teaches crawlers to distrust it.
 *
 * Runs on `npm run build`, before vite copies public/ into dist/.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://cozy.saikushal.live";

// Everything reachable and worth indexing. /admin is deliberately absent — it
// is behind auth and is disallowed in robots.txt.
const STATIC_ROUTES = [
    "/",
    "/projects",
    "/about",
    "/skills",
    "/credentials",
    "/coding",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
];

const source = readFileSync(join(root, "src/data/blogData.ts"), "utf8");
const slugs = [...source.matchAll(/^\s*slug:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1]);

// A silent zero here would ship a sitemap missing every post, which is exactly
// the failure this script exists to prevent. Fail the build instead.
if (slugs.length === 0) {
    console.error(
        "generate-sitemap: found no slugs in src/data/blogData.ts — the shape of " +
            "that file probably changed. Fix the pattern here rather than shipping " +
            "a sitemap with no posts in it.",
    );
    process.exit(1);
}

const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (duplicates.length > 0) {
    console.error(`generate-sitemap: duplicate slugs: ${duplicates.join(", ")}`);
    process.exit(1);
}

const lastmod = new Date().toISOString().slice(0, 10);
const urls = [...STATIC_ROUTES, ...slugs.map((s) => `/blog/${s}`)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `    <url>\n        <loc>${SITE}${u}</loc>\n        <lastmod>${lastmod}</lastmod>\n    </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`generate-sitemap: ${urls.length} urls (${slugs.length} posts) -> public/sitemap.xml`);
