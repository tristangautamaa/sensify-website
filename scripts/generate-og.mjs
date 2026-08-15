/**
 * Renders the Open Graph share card to public/og-image.png at 1200x630.
 *
 * Run manually after brand copy or colors change:
 *   node scripts/generate-og.mjs
 *
 * The PNG is committed, so the normal build never depends on this script.
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const asDataUri = (path, mime) =>
  `data:${mime};base64,${readFileSync(resolve(ROOT, path)).toString('base64')}`;

const geist600 = asDataUri('node_modules/@fontsource/geist/files/geist-latin-600-normal.woff2', 'font/woff2');
const geist400 = asDataUri('node_modules/@fontsource/geist/files/geist-latin-400-normal.woff2', 'font/woff2');
const mark = asDataUri('public/Logo/sensify-mark.png', 'image/png');

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: 'Geist'; font-weight: 400; src: url('${geist400}') format('woff2'); }
      @font-face { font-family: 'Geist'; font-weight: 600; src: url('${geist600}') format('woff2'); }

      * { margin: 0; padding: 0; box-sizing: border-box; }

      body {
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 76px 88px;
        background: #030609;
        color: #f5f7fa;
        font-family: 'Geist', sans-serif;
        position: relative;
        overflow: hidden;
      }

      .glow {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(46% 62% at 12% 8%, rgba(12, 68, 124, 0.55), transparent 62%),
          radial-gradient(38% 52% at 92% 96%, rgba(216, 90, 48, 0.28), transparent 62%);
      }

      .row { position: relative; display: flex; align-items: center; gap: 20px; }
      .row img { width: 56px; height: 56px; border-radius: 12px; }
      .wordmark { font-size: 34px; font-weight: 600; letter-spacing: -0.02em; }

      .eyebrow {
        position: relative;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.34em;
        color: #378add;
      }

      h1 {
        position: relative;
        margin-top: 26px;
        font-size: 74px;
        font-weight: 600;
        line-height: 1.06;
        letter-spacing: -0.035em;
        max-width: 15ch;
      }

      .accent { color: #d85a30; }

      .foot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 21px;
        color: rgba(245, 247, 250, 0.62);
      }

      .rule { height: 3px; width: 92px; background: #d85a30; border-radius: 2px; }
    </style>
  </head>
  <body>
    <div class="glow"></div>

    <div class="row">
      <img src="${mark}" alt="" />
      <span class="wordmark">Sensify</span>
    </div>

    <div>
      <p class="eyebrow">MARKETPLACE EXIT SYSTEM</p>
      <h1>An AI-powered storefront <span class="accent">built for your brand.</span></h1>
    </div>

    <div class="foot">
      <span>sensify.id</span>
      <span class="rule"></span>
      <span>Owned storefronts for growing brands in Indonesia</span>
    </div>
  </body>
</html>`;

const browser = await puppeteer.launch({ headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  const png = await page.screenshot({ type: 'png' });
  const out = resolve(ROOT, 'public/og-image.png');
  writeFileSync(out, png);
  console.log(`[og] wrote ${out} (${png.length} bytes)`);
} finally {
  await browser.close();
}
