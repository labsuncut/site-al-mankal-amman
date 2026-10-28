// Screenshots and checks for the quality pass: every page, phone (375) and desktop (1280), English and Arabic.
//   NODE_PATH=$(npm root -g) node tools/shoot.cjs [outdir]
// Serves the repo on a local port, blocks every outside request (so the store's photos fall back to coal plates),
// logs console errors and horizontal overflow, and writes full-page PNGs.
const { chromium } = require('playwright');
const { createServer } = require('http');
const { readFileSync, existsSync, mkdirSync } = require('fs');
const { join, extname } = require('path');

const root = join(__dirname, '..');
const out = process.argv[2] || join(root, '..', 'shots');
mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
(async () => {
  const server = createServer((req, res) => {
    let file = join(root, decodeURIComponent(req.url.split('?')[0]));
    if (req.url.split('?')[0].endsWith('/')) file = join(file, 'index.html');
    if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }); res.end(readFileSync(file));
  }).listen(0);
  const port = server.address().port;
  const launch = existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {};
  const browser = await chromium.launch(launch);
  const pages = ['index.html', 'menu.html', 'branches.html', 'franchise.html', '404.html'];
  const sizes = { phone: { width: 375, height: 740 }, desktop: { width: 1280, height: 800 } };
  const problems = [];
  for (const l of ['en', 'ar']) {
    for (const [sz, vp] of Object.entries(sizes)) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, locale: l === 'ar' ? 'ar-JO' : 'en-US', isMobile: sz === 'phone', hasTouch: sz === 'phone' });
      await ctx.addInitScript((lang) => { try { localStorage.setItem('mankal-lang', lang); } catch (e) {} }, l);
      await ctx.route(/^(?!http:\/\/localhost)/, (r) => r.abort());
      for (const p of pages) {
        const page = await ctx.newPage();
        const errors = [];
        page.on('console', (m) => { if (m.type() === 'error' && !/net::ERR_FAILED|Failed to load resource/.test(m.text())) errors.push(m.text()); });
        page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
        await page.goto(`http://localhost:${port}/${p}`, { waitUntil: 'load' });
        await page.waitForTimeout(2600);
        const over = await page.evaluate(() => {
          const w = document.documentElement.clientWidth; const bad = [];
          document.querySelectorAll('body *').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width > 0 && (r.right > w + 1 || r.left < -1) && getComputedStyle(el).position !== 'fixed') bad.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') + ` ${Math.round(r.left)}..${Math.round(r.right)}`); });
          return { sw: document.documentElement.scrollWidth, w, bad: bad.slice(0, 8), text: document.body.innerText };
        });
        if (over.sw > over.w + 1) problems.push(`${l} ${sz} ${p}: page scrolls sideways (${over.sw} > ${over.w}) ${over.bad.join(' | ')}`);
        if (/undefined|NaN|\[object/.test(over.text)) problems.push(`${l} ${sz} ${p}: undefined/NaN in text`);
        errors.forEach((e) => problems.push(`${l} ${sz} ${p}: ${e}`));
        if (p === 'index.html') await page.screenshot({ path: join(out, `hero-${l}-${sz}.png`) });
        // A full-page capture never scrolls, so the chapters would stay unrevealed: show them as a visitor would see them.
        await page.evaluate(() => document.querySelectorAll('.ap, .skewer').forEach((el) => el.classList.add('in')));
        await page.waitForTimeout(900);
        await page.screenshot({ path: join(out, `${p.replace('.html', '')}-${l}-${sz}.png`), fullPage: true });
        await page.close();
      }
      await ctx.close();
    }
  }
  await browser.close(); server.close();
  console.log(problems.length ? problems.join('\n') : 'no problems');
})();
