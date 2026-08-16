import { chromium } from 'playwright';
import { readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';

const CHROME = '/home/kester/.cache/puppeteer/chrome/linux-148.0.7778.97/chrome-linux64/chrome';
const OUT = process.env.OUT;
const W = 1280, H = 720;

// Strip Streamlit's own chrome so the clip shows only the app.
const HIDE = `
  [data-testid="stToolbar"], [data-testid="stDecoration"],
  [data-testid="stStatusWidget"], #MainMenu, header, footer { display:none !important; }
  html { scroll-behavior: smooth; }
`;

// Smooth wheel scroll — several small steps read far better on video than one jump.
async function glide(page, total, steps = 22, pause = 60) {
  const per = total / steps;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, per);
    await page.waitForTimeout(pause);
  }
}

const SHOOTS = {
  // Static analysis dashboards: the story is the scroll.
  abtest: async (page) => {
    await page.waitForTimeout(1800);          // land on the p-value KPI row
    await glide(page, 620);                   // verdict + results table
    await page.waitForTimeout(1100);
    await glide(page, 700);                   // group summary + charts
    await page.waitForTimeout(1600);
  },

  readmit: async (page) => {
    await page.waitForTimeout(1800);          // KPI row: 101,766 encounters
    await glide(page, 560);                   // age-band chart + risk drivers
    await page.waitForTimeout(1400);
    await glide(page, 640);                   // length-of-stay distribution
    await page.waitForTimeout(1500);
  },

  // The money shot: fill the form, get a scored decision.
  loan: async (page) => {
    await page.waitForTimeout(1400);
    const nums = page.locator('[data-testid="stNumberInput"] input');
    await nums.nth(0).click();
    await nums.nth(0).fill('2200');           // drop applicant income
    await page.waitForTimeout(500);
    await nums.nth(2).click();
    await nums.nth(2).fill('280');            // raise loan amount -> riskier
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: /simulate approval/i }).click();
    await page.waitForTimeout(2600);          // risk score + explanation render
    await glide(page, 480);
    await page.waitForTimeout(2200);
  },

  // Sidebar filter drives the whole dashboard live.
  // Raising the revenue floor recomputes every KPI and both charts — a stronger
  // demo than removing a segment chip, and it doesn't depend on BaseWeb internals.
  segment: async (page) => {
    await page.waitForTimeout(2000);          // KPI row: 4,338 customers / £8.9M
    const rev = page.locator('[data-testid="stSidebar"] [data-testid="stNumberInput"] input').first();
    await rev.click({ timeout: 4000 });
    await page.keyboard.press('Control+A');
    // Typed rather than filled: Streamlit only commits on real key events, and
    // watching the digits land reads better on video than a value appearing.
    await rev.pressSequentially('1000', { delay: 110 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2600);          // KPIs + donut + revenue bars recompute
    await glide(page, 520);
    await page.waitForTimeout(1400);
    await glide(page, 540);
    await page.waitForTimeout(1400);
  },
};

const ALL = [
  ['abtest', 8501], ['loan', 8502], ['readmit', 8503], ['segment', 8504],
];
// ONLY=segment re-shoots a single clip without redoing the set.
const TARGETS = process.env.ONLY
  ? ALL.filter(([n]) => process.env.ONLY.split(',').includes(n))
  : ALL;

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

for (const [name, port] of TARGETS) {
  const dir = join(OUT, name);
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    recordVideo: { dir, size: { width: W, height: H } },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  try {
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.addStyleTag({ content: HIDE });
    await page.waitForTimeout(2500);          // let charts finish painting
    await SHOOTS[name](page);
  } catch (e) {
    console.log(`  ! ${name}: ${String(e).slice(0, 130)}`);
  }
  await ctx.close();                          // flushes the video file

  const files = (await readdir(dir)).filter((f) => f.endsWith('.webm'));
  if (files[0]) {
    await rename(join(dir, files[0]), join(OUT, `${name}.webm`));
    console.log(`  recorded ${name}.webm`);
  } else {
    console.log(`  ! ${name}: no video produced`);
  }
}

await browser.close();
