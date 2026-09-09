import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.BASE ?? "http://localhost:3000";
const out = ".scratch/portfolio-v1/shots";
mkdirSync(out, { recursive: true });

const pages = [
  ["home-desktop", "/", 1440, 900],
  ["home-mobile", "/", 390, 844],
  ["sobre-desktop", "/sobre", 1440, 900],
  ["case-donko-desktop", "/cases/donko", 1440, 900],
  ["case-bussola-mobile", "/cases/bussola", 390, 844],
];

const browser = await chromium.launch();
for (const [name, path, w, h] of pages) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  console.log("shot", name);
  await page.close();
}
await browser.close();
