# ummah.games — website

Marketing site for the [Ummah Games Kit](https://github.com/OWNER/ummah-games-kit):
halal-first game development agents and Defold workflows for Muslim game studios.

Static HTML/CSS/JS — **no build step, no framework, no dependencies**. Deployed to
GitHub Pages.

## Structure

```
index.html              # all page sections; contains no roster markup
assets/styles.css       # neobrutalist design system
assets/og/              # social share image (1200×630)
scripts/roster.js       # the registry: 12 agents + 32 skills = 44 members
scripts/site.js         # renders roster, filtering, FAQ schema, mascot, modal
scripts/verify.js       # pre-deploy checks (run in CI)
robots.txt  sitemap.xml # crawl directives
```

`index.html` contains **no** hand-typed agent or skill markup. Every card is built at
runtime from `scripts/roster.js`, and all visible counts (44 / 12 / 32 / $39 / v0.9.0)
are read from its `REGISTRY` object through `data-registry` attributes — so the page
cannot disagree with the registry. `scripts/verify.js` enforces this in CI.

## SEO

- Title 54 chars, meta description 184 chars, absolute canonical
- **JSON-LD**: `Organization`, `WebSite`, `Product` + `Offer` (static in `<head>`),
  and `FAQPage` generated at runtime from the rendered FAQ so the structured data can
  never drift from the visible answers
- Open Graph + Twitter card with a generated 1200×630 image
- `robots.txt` + `sitemap.xml`
- Every `<h2>` carries a target keyword; exactly one `<h1>`
- Semantic landmarks, `aria-label`/`aria-labelledby` on every section, live regions on
  the roster grid and mascot status

Primary keywords: *halal game development*, *muslim game developers*,
*islamic game studio*, *defold agents*, *defold skills*.

## Develop

```bash
python3 -m http.server 8778
# http://127.0.0.1:8778/
```

## Verify

```bash
node scripts/verify.js
```

17 checks covering registry consistency, SEO metadata, JSON-LD validity, price
agreement between the page and the registry, required SEO files, and broken local asset
references. CI runs this before every deploy and blocks on failure.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: verify → publish to GitHub Pages.

Enable once under **Settings → Pages → Source → GitHub Actions**. For the custom domain,
add a `CNAME` file containing `ummah.games` and point DNS at GitHub Pages.

## Updating the roster

Edit `scripts/roster.js` only. Adding or removing a member updates the cards, every
count on the page, and the JSON-LD automatically. Keep it in sync with
`registry.json` in the kit repository.
