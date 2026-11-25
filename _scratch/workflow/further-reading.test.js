// Run: node --test _scratch/workflow/
// Fixture-driven checks for Further Reading link handling (docs/reqs/recommended-reading Part 7).
// affiliateUrl() tests are `todo` until the function exists, so red/green is visible per case.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const fr = require('./further-reading');
const { slugify } = require('./07b-fetch-link-assets');

const dir = path.join(__dirname, 'fixtures');
const fx = JSON.parse(fs.readFileSync(path.join(dir, 'affiliate-urls.json'), 'utf8'));
const expected = JSON.parse(fs.readFileSync(path.join(dir, 'affiliate-bpi-expected.json'), 'utf8'));
const hasAffiliate = typeof fr.affiliateUrl === 'function';

for (const c of fx.cases.filter((c) => !c.error)) {
  test(`classify/asin: ${c.name}`, () => {
    assert.strictEqual(fr.amazonAsin(c.input), c.asin ?? null);
    assert.strictEqual(fr.classify(c.input), c.type);
  });
  test(`affiliateUrl: ${c.name}`, { todo: !hasAffiliate && 'affiliateUrl not implemented' }, () => {
    assert.strictEqual(fr.affiliateUrl(c.input, fx.tag), c.untouched ? c.input : c.affiliate);
    if (!c.untouched) assert.strictEqual(fr.affiliateUrl(c.input, null), c.plain);
  });
}
for (const c of fx.cases.filter((c) => c.error)) {
  test(`rejects: ${c.name}`, { todo: !hasAffiliate && 'affiliateUrl not implemented' }, () => {
    assert.throws(() => fr.affiliateUrl(c.input, fx.tag), new RegExp(c.error));
  });
}
test('tag validation', { todo: typeof fr.validateAffiliateTag !== 'function' && 'validateAffiliateTag not implemented' }, () => {
  for (const t of fx.tags.valid) assert.ok(fr.validateAffiliateTag(t), `valid: ${t}`);
  for (const t of fx.tags.invalid) assert.ok(!fr.validateAffiliateTag(t), `invalid: ${t}`);
});

// --- BPI-level contract (new): parseFurtherReading(content) -> { items, dropped, warnings }
//   items    first 5 valid entries, input order; wikilink lines are skipped, not counted
//   dropped  titles beyond the cap (user trims; we only WARN)
//   warnings WARN strings (cap, wikilink lines, wikilinks in the draft body)
const newParserApi = !Array.isArray(fr.parseFurtherReading('## Further Reading\n'));
const bpis = Object.keys(expected).filter((k) => k.endsWith('.md'));

for (const file of bpis) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8');
  const want = expected[file];
  test(`BPI parse: ${file}`, { todo: !newParserApi && 'parser still returns an array and throws on wikilink lines' }, () => {
    const { items, dropped, warnings } = fr.parseFurtherReading(text);
    assert.strictEqual(items.length, expected.cap);
    items.forEach((it, i) => {
      assert.strictEqual(it.title, want.items[i].title);
      assert.strictEqual(it.url, want.items[i].source_url);
      assert.strictEqual(it.note, want.items[i].note);
      assert.strictEqual(fr.classify(it.url), want.items[i].type);
      assert.strictEqual(fr.amazonAsin(it.url), want.items[i].asin ?? null);
    });
    assert.deepStrictEqual(dropped.map((d) => d.title ?? d), want.dropped);
    for (const w of want.warnings) assert.ok(warnings.some((x) => x.includes(w)), `WARN containing: ${w}`);
  });
  test(`cover names: ${file}`, { todo: typeof fr.coverSlug !== 'function' && 'coverSlug not implemented' }, () => {
    for (const it of want.items.filter((i) => i.cover)) {
      assert.strictEqual(fr.coverSlug(it.title) + '.jpg', it.cover);
      assert.ok(fr.coverSlug(it.title).split('-').length <= 4);
    }
  });
  test(`step 2: ${file}`, () => {
    const { curateInput } = require('./02-curate-input');
    const wd = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'fr-'));
    const run = () => curateInput(path.join(dir, file), '2026-11-26', wd);
    if (want.step2_error) return assert.throws(run, new RegExp(want.step2_error));
    const out = run();
    const post = JSON.parse(fs.readFileSync(path.join(wd, 'post.json'), 'utf8'));
    assert.ok(!post.hemingway_content.includes('DRAFT-ONLY'), 'Draft content must be ignored');
    assert.strictEqual(post.further_reading.length, expected.cap);
    for (const w of want.curate_warnings || []) assert.ok(out.warnings.some((x) => x.includes(w)), `WARN containing: ${w}`);
    for (const w of want.warnings) assert.ok(out.warnings.some((x) => x.includes(w)), `WARN containing: ${w}`);
  });

  // 07b with no network: covers pre-seeded under their expected short names are reused.
  test(`07b affiliate + covers: ${file}`, async () => {
    if (want.step2_error) return;
    const { fetchLinkAssets } = require('./07b-fetch-link-assets');
    const { curateInput } = require('./02-curate-input');
    const wd = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'fr-'));
    const covers = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'covers-'));
    curateInput(path.join(dir, file), '2026-11-26', wd);
    for (const it of want.items.filter((i) => i.cover)) fs.writeFileSync(path.join(covers, it.cover), 'x');
    const posts = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'posts-'));
    fs.writeFileSync(path.join(posts, 'ratios-of-your-work.md'), '---\ntitle: x\nphotos:\n  - img/post_img/balancing_stones.jpg\n---\n');

    for (const tag of [expected.tag, null]) {
      const res = await fetchLinkAssets(wd, covers, posts, { tag });
      const got = JSON.parse(fs.readFileSync(path.join(wd, 'post.json'), 'utf8')).further_reading;
      want.items.forEach((w, i) => {
        assert.strictEqual(got[i].url, tag ? w.url : (w.plain_url || w.url), `url[${i}] tag=${tag}`);
        assert.strictEqual(got[i].affiliate, tag ? w.affiliate : false);
        assert.strictEqual(got[i].type, w.type);
        assert.strictEqual(got[i].cover, w.cover);
        if (w.type === 'book') assert.strictEqual(got[i].source_url, w.source_url);
      });
      assert.strictEqual(res.warnings.some((x) => x.includes('AMAZON_AFFILIATE_TAG is not set')), !tag);
    }
    await assert.rejects(fetchLinkAssets(wd, covers, posts, { tag: 'nope' }), /valid Associates ID/);
  });
}
