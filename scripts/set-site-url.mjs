// Link-preview crawlers need absolute URLs for og:image / og:url.
// After `ng build`, rewrite the relative ones in index.html using the site address.
// Netlify sets URL automatically during builds; set SITE_URL to override.
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'dist/my-resume/browser/index.html';
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/+$/, '');

if (!siteUrl) {
  console.log('[set-site-url] No SITE_URL/URL set; leaving link-preview URLs relative.');
  process.exit(0);
}

const html = readFileSync(file, 'utf8').replace(
  /(<meta (?:property|name)="(?:og:url|og:image|twitter:image)" content=")\/([^"]*)"/g,
  (_, start, path) => `${start}${siteUrl}/${path}"`,
);

writeFileSync(file, html);
console.log(`[set-site-url] Link-preview URLs now point to ${siteUrl}`);
