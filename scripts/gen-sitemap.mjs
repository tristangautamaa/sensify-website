/**
 * Writes public/sitemap.xml with a real <lastmod> so it never drifts from
 * the actual content. Runs before `vite build`, which then copies the fresh
 * file into dist/.
 *
 * lastmod = the last git commit date (YYYY-MM-DD). Falls back to today when
 * git isn't available (e.g. a tarball build).
 */
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { writeFileSync } from 'node:fs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://sensify.id';

function lastCommitDate() {
  try {
    return execSync('git log -1 --format=%cs', { cwd: ROOT }).toString().trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

// Single-page site: one entry. Add rows here when real routes ship.
const URLS = [{ loc: `${ORIGIN}/`, changefreq: 'monthly', priority: '1.0' }];

const lastmod = lastCommitDate();
const body = URLS.map(
  ({ loc, changefreq, priority }) =>
    `  <url>\n` +
    `    <loc>${loc}</loc>\n` +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `  </url>`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const target = resolve(ROOT, 'public/sitemap.xml');
writeFileSync(target, xml);
console.log(`[sitemap] ${target}: lastmod ${lastmod}`);
