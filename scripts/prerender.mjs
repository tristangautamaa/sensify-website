/**
 * Build-time prerender: snapshots the rendered DOM into dist/index.html.
 *
 * The site is a client-rendered SPA behind a ~1.7 MB bundle, so without this
 * step a crawler has to execute three.js, ShaderGradient and GSAP before it
 * sees a single word of copy. This writes the real markup into the HTML.
 *
 * The snapshot is deliberately taken while AiLoader is still on screen
 * (App.jsx clears `loading` on a 2200 ms timer). Every section is mounted
 * underneath the fixed overlay from the first render, so the snapshot holds
 * the full page text *and* the loader. Because main.jsx uses createRoot —
 * which wipes #root children on mount — matching the loader frame is what
 * keeps the handoff from static HTML to React invisible.
 */
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { createReadStream, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer';

import { FAQ_ENTRIES } from '../src/data/faqEntries.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const SNAPSHOT_DELAY_MS = 1200;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function serveDist() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // normalize + prefix check keeps `../` out of the served tree
    const candidate = normalize(join(DIST, urlPath === '/' ? 'index.html' : urlPath));

    if (!candidate.startsWith(DIST + sep) && candidate !== DIST) {
      res.writeHead(403).end();
      return;
    }

    if (!existsSync(candidate) || !statSync(candidate).isFile()) {
      res.writeHead(404).end();
      return;
    }

    res.writeHead(200, { 'Content-Type': MIME[extname(candidate)] ?? 'application/octet-stream' });
    createReadStream(candidate).pipe(res);
  });

  return new Promise((ok) => {
    server.listen(0, '127.0.0.1', () => ok({ server, port: server.address().port }));
  });
}

/** FAQPage schema, generated from the same entries the FAQ section renders. */
function faqJsonLd() {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://sensify.id/#faq',
    mainEntity: FAQ_ENTRIES.map(({ title, answer }) => ({
      '@type': 'Question',
      name: title,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  // Escaping `<` keeps a stray "</script>" in copy from closing the tag early.
  const json = JSON.stringify(payload, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

const { server, port } = await serveDist();
const browser = await puppeteer.launch({ headless: 'new' });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForFunction(() => document.querySelector('#root')?.childElementCount > 0, {
    timeout: 60_000,
  });
  await new Promise((ok) => setTimeout(ok, SNAPSHOT_DELAY_MS));

  const rendered = await page.evaluate(() => document.documentElement.outerHTML);

  if (!rendered.includes('An AI-powered storefront')) {
    throw new Error('snapshot is missing hero copy — refusing to write a broken index.html');
  }

  const target = resolve(DIST, 'index.html');
  const withSchema = `<!doctype html>\n${rendered}`.replace(
    '</head>',
    `${faqJsonLd()}\n</head>`
  );

  writeFileSync(target, withSchema);

  const before = readFileSync(resolve(ROOT, 'index.html')).length;
  console.log(
    `[prerender] ${target}: ${before} B shell -> ${withSchema.length} B rendered ` +
      `(+${FAQ_ENTRIES.length} FAQPage entries)`
  );
} finally {
  await browser.close();
  server.close();
}
