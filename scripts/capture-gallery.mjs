#!/usr/bin/env node
/**
 * scripts/capture-gallery.mjs
 *
 * Captures 8 gallery PNGs (1270x760) + 2 logos via Puppeteer.
 * Output: app/public/launch/*.png
 *
 * MARKETING_OS.md M1 Phase / GTM_PLAN.md §7
 *
 * Run: node scripts/capture-gallery.mjs
 */

import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../public/launch');
const BASE = process.env.GSC_SITE_URL || 'https://getresumeai.site';

const PAGES = [
  { file: 'gallery-1-hero.png', url: '/', selector: null, scroll: 0 },
  { file: 'gallery-2-builder-step1.png', url: '/builder', selector: null, scroll: 0 },
  { file: 'gallery-3-builder-step2.png', url: '/builder', selector: null, scroll: 400 },
  { file: 'gallery-4-ats-score.png', url: '/builder', selector: null, scroll: 800 },
  { file: 'gallery-5-templates.png', url: '/builder', selector: null, scroll: 1200 },
  { file: 'gallery-6-pricing.png', url: '/pricing', selector: null, scroll: 0 },
  { file: 'gallery-7-feature-a.png', url: '/alternatives/rezi', selector: null, scroll: 0 },
  { file: 'gallery-8-feature-b.png', url: '/blog/ats-resume-format-guide', selector: null, scroll: 0 },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log(`=== Capturing ${PAGES.length} gallery images to ${OUT_DIR} ===\n`);

  for (const p of PAGES) {
    const url = `${BASE}${p.url}`;
    console.log(`[${p.file}] ${url}${p.scroll ? ` scroll=${p.scroll}` : ''}`);

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1270, height: 760, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      if (p.scroll) {
        await page.evaluate((y) => window.scrollTo(0, y), p.scroll);
        await new Promise(r => setTimeout(r, 500));
      }

      await page.screenshot({
        path: resolve(OUT_DIR, p.file),
        type: 'png',
        clip: { x: 0, y: 0, width: 1270, height: 760 },
      });
      await page.close();
      console.log(`  [OK]`);
    } catch (err) {
      console.error(`  [FAIL] ${err.message}`);
    }
  }

  // Logos
  const logoPage = await browser.newPage();
  await logoPage.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await logoPage.setContent(`<!doctype html><html><body style="margin:0;padding:0;background:#0a0a0a;color:#10b981;font-family:-apple-system,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;font-size:96px;font-weight:800;letter-spacing:-0.04em">R<span style="color:#fff">A</span></body></html>`);
  await logoPage.screenshot({ path: resolve(OUT_DIR, 'logo-square.png'), type: 'png' });
  console.log(`[logo-square.png] OK`);

  await logoPage.setViewport({ width: 1000, height: 300, deviceScaleFactor: 1 });
  await logoPage.setContent(`<!doctype html><html><body style="margin:0;padding:0;background:#0a0a0a;color:#fff;font-family:-apple-system,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;font-size:96px;font-weight:800;letter-spacing:-0.04em"><span style="color:#10b981">Resume</span>AI</body></html>`);
  await logoPage.screenshot({ path: resolve(OUT_DIR, 'logo-horizontal.png'), type: 'png' });
  console.log(`[logo-horizontal.png] OK`);

  await browser.close();
  console.log(`\nDone. ${PAGES.length + 2} files written to public/launch/`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
