// Build first: /usr/bin/bundle exec ruby test/academic_deadlines_page_test.rb
// No repository dependency changes: npm install --prefix /tmp/academic-deadlines-js-tests --no-save --package-lock=false jsdom
// NODE_PATH=/tmp/academic-deadlines-js-tests/node_modules node --test test/academic_deadlines_behavior_test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, '../tmp/academic-deadlines-test-site/academic-deadlines/index.html'), 'utf8');

function timeline(t, timestamp) {
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const { window } = dom;
  let now = Date.parse(timestamp);
  let tick;
  const NativeDate = window.Date;
  window.Date = class extends NativeDate {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  };
  window.setInterval = callback => { tick = callback; };
  const script = [...window.document.scripts].find(script => script.textContent.includes('updateCountdowns'));
  assert.ok(script, 'Built page must contain the real countdown implementation');
  window.eval(script.textContent);
  const rows = [...window.document.querySelectorAll('.academic-deadlines__row')];
  return {
    window,
    document: window.document,
    rows,
    visible: () => rows.filter(row => !row.hidden),
    at: timestamp => { now = Date.parse(timestamp); tick(); },
    filter: area => window.document.querySelector(`[data-filter="${area}"]`).click(),
    showPast: checked => {
      const checkbox = window.document.querySelector('[data-show-past]');
      assert.ok(checkbox, 'Show past deadlines checkbox must exist');
      checkbox.checked = checked;
      checkbox.dispatchEvent(new window.Event('change', { bubbles: true }));
    }
  };
}

function deadline(row) { return row.querySelector('[data-deadline]').getAttribute('data-deadline'); }
function value(row) { return row.querySelector('.academic-deadlines__counter-value').textContent; }

test('current time includes the local timezone and refreshes on a tick', t => {
  const before = '2026-10-01T00:00:00Z';
  const after = '2026-10-01T00:01:00Z';
  const page = timeline(t, before);
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
  });
  assert.equal(page.document.querySelector('[data-current-time]').textContent, formatter.format(new Date(before)));
  page.at(after);
  assert.equal(page.document.querySelector('[data-current-time]').textContent, formatter.format(new Date(after)));
});

test('every area combines with history selection without changing chronological order', t => {
  const now = '2026-10-01T00:00:00Z';
  const page = timeline(t, now);
  assert.equal(page.document.querySelector('[data-show-past]').checked, false);
  assert.equal(page.rows.length, 11, 'History must remain in the same rail');
  const dates = page.rows.map(deadline);
  assert.deepEqual(dates, [...dates].sort());
  assert.equal(page.visible().length, 6);
  for (const showPast of [false, true, false]) {
    page.showPast(showPast);
    for (const area of ['ai', 'systems', 'bridge', 'all']) {
      page.filter(area);
      const expected = page.rows.filter(row =>
        (area === 'all' || row.getAttribute('data-area') === area) &&
        (showPast || Date.parse(deadline(row)) > Date.parse(now))
      );
      assert.deepEqual(page.visible(), expected, `${area}, showPast=${showPast}`);
      assert.equal(page.document.querySelector('[data-empty-state]').hidden, expected.length > 0);
    }
  }
  page.at('2028-01-01T00:00:00Z');
  assert.equal(page.visible().length, 0);
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, false);
  page.showPast(true);
  assert.equal(page.visible().length, 11);
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, true);
  assert.deepEqual(page.visible().map(deadline), dates);
});

test('official countdowns keep days, hours, and minutes precision', t => {
  const page = timeline(t, '2026-12-07T22:59:00Z');
  page.filter('systems');
  assert.equal(page.visible().length, 1);
  assert.equal(value(page.visible()[0]), '1d 00h 00m');
  page.at('2026-12-08T21:58:00Z');
  assert.equal(value(page.visible()[0]), '0d 01h 01m');
});

test('estimates show approximate days only and expire without official Passed semantics', t => {
  const page = timeline(t, '2026-10-01T00:00:00Z');
  page.filter('bridge');
  const marker = page.visible()[0];
  assert.equal(value(marker), '≈ 30 days');
  assert.equal(marker.querySelector('.academic-deadlines__counter-label').textContent, 'approximate days');
  assert.match(marker.querySelector('[data-deadline]').getAttribute('aria-label'), /planning estimate/i);
  page.at('2026-10-30T19:59:59Z');
  assert.equal(page.visible().length, 1);
  assert.equal(value(marker), '≈ 1 day');
  page.at('2026-10-30T20:00:00Z');
  assert.equal(page.visible().length, 0);
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, false);
  assert.equal(value(marker), 'Past estimate');
  page.showPast(true);
  assert.equal(page.visible().length, 1);
  page.at('2026-10-30T20:00:01Z');
  assert.equal(value(marker), 'Past estimate');
  assert.equal(page.visible().length, 1);
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, true);
});

test('upcoming-only refreshes visibility and empty state before, at, and after the final official cutoff', t => {
  const page = timeline(t, '2026-12-08T22:58:59Z');
  page.filter('systems');
  assert.equal(page.visible().length, 1, 'Past systems deadlines must be hidden by default');
  assert.equal(value(page.visible()[0]), '0d 00h 00m');
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, true);
  page.at('2026-12-08T22:59:00Z');
  assert.equal(page.visible().length, 0, 'The cutoff itself is expired');
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, false);
  page.at('2026-12-08T22:59:01Z');
  assert.equal(page.visible().length, 0);
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, false);
  page.showPast(true);
  assert.equal(page.visible().length, 5);
  assert.equal(value(page.visible().at(-1)), 'Passed');
  assert.equal(page.document.querySelector('[data-empty-state]').hidden, true);
});
