// Optional real-browser smoke test. Install Playwright outside the repository:
// npm install --prefix /tmp/yuxuan-personal-page-qa playwright
// PLAYWRIGHT_MODULE=/tmp/yuxuan-personal-page-qa/node_modules/playwright node test/homepage_browser_test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const options = { headless: true };
  const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(chrome)) options.executablePath = chrome;
  const browser = await chromium.launch(options);
  const root = process.env.PREVIEW_URL || 'http://127.0.0.1:8765';
  const out = path.resolve('tmp/review-screenshots');
  fs.mkdirSync(out, { recursive: true });
  try {
    for (const width of [1280, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(root, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const state = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        order: [...document.querySelectorAll('.work-item')].map(e => e.id),
        newsDirection: getComputedStyle(document.querySelector('.news-item')).flexDirection,
        newsGap: parseFloat(getComputedStyle(document.querySelector('.news-item')).rowGap),
        newsIcons: document.querySelectorAll('.news-content i').length,
        metaMargin: parseFloat(getComputedStyle(document.querySelector('.work-item__meta')).marginBottom),
        imageLoaded: [...document.querySelectorAll('img')].every(i => i.complete && i.naturalWidth > 0),
        badLinks: [...document.querySelectorAll('a')].filter(a => a.href.startsWith(location.origin) && a.hash && a.pathname === location.pathname && !document.getElementById(a.hash.slice(1))).map(a => a.href)
      }));
      assert.ok(state.scrollWidth <= width, `horizontal overflow: ${JSON.stringify(state)}`);
      assert.deepEqual(state.order, ['fastafd', 'gamingagent-grl', 'nanorollout', 'tunix']);
      assert.equal(state.newsDirection, width > 600 ? 'row' : 'column', 'News should use a compact desktop date column and stack on mobile');
      assert.ok(state.metaMargin <= 8, 'Project role and description should not be separated by an empty paragraph-sized gap');
      assert.equal(state.newsIcons, 0, "News uses plain dates and text, without broken decorative glyphs");
      if (width <= 600) assert.ok(state.newsGap <= 8, "Mobile News spacing should remain compact");
      assert.ok(state.imageLoaded);
      assert.deepEqual(state.badLinks, []);
      assert.deepEqual(errors, []);
      await page.screenshot({ path: path.join(out, `homepage-${width}.png`), fullPage: true });
      console.log(`PASS homepage ${width}px: order, layout, image, anchors, no JS errors`);
      await page.close();
    }
    const redirect = await browser.newPage();
    await redirect.goto(`${root}/portfolio/portfolio-2/`, { waitUntil: 'networkidle' });
    assert.equal(new URL(redirect.url()).hash, '#gamingagent-grl');
    const target = new URL(redirect.url());
    const requested = new URL(root);
    const local = ['localhost', '127.0.0.1'];
    assert.ok(target.origin === requested.origin || (local.includes(target.hostname) && local.includes(requested.hostname) && target.port === requested.port), 'Redirect must remain on the local preview, not the public site');
    await redirect.close();
    console.log('PASS historical project redirect to current homepage anchor');
    console.log(`Screenshots: ${out}`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
