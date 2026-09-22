#!/usr/bin/env node
/**
 * Pre-deploy checks. Each exists because it catches a class of drift that
 * would otherwise ship silently.
 *
 * Run: node scripts/verify.js   (exit 1 on any failure)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const failures = [];
const check = (name, ok, detail) => {
  if (ok) {
    console.log(`  ok    ${name}`);
  } else {
    console.log(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`);
    failures.push(name);
  }
};

console.log('Verifying ummah.games\n');

/* ---- registry ---- */

const rosterSrc = read('scripts/roster.js');
const { AGENTS, SKILLS, ROSTER, REGISTRY } = new Function(
  rosterSrc + '; return {AGENTS,SKILLS,ROSTER,REGISTRY};'
)();

check('registry counts are self-consistent',
  REGISTRY.agents === AGENTS.length &&
  REGISTRY.skills === SKILLS.length &&
  REGISTRY.members === ROSTER.length &&
  ROSTER.length === AGENTS.length + SKILLS.length,
  `agents=${AGENTS.length} skills=${SKILLS.length} members=${ROSTER.length}`);

check('every member has a name and a blurb',
  ROSTER.every((m) => m.name && m.blurb && m.kind));

const names = ROSTER.map((m) => m.name);
check('member names are unique', new Set(names).size === names.length);

/* ---- html ---- */

const html = read('index.html');

check('no hand-typed roster markup in index.html',
  !ROSTER.some((m) => html.includes(m.name)),
  'roster must render from scripts/roster.js only');

const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
check('title is present and <= 65 chars', title.length > 0 && title.length <= 65,
  `${title.length} chars`);

const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
check('meta description is 50-200 chars', desc.length >= 50 && desc.length <= 200,
  `${desc.length} chars`);

check('canonical url is absolute',
  /<link rel="canonical" href="https:\/\//.test(html));

check('og:image is declared', /property="og:image"/.test(html));

check('exactly one <h1>', (html.match(/<h1/g) || []).length === 1);

/* ---- structured data ---- */

const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((m) => m[1]);

check('at least one JSON-LD block', ldBlocks.length >= 1);

let ldValid = true;
let ldTypes = [];
for (const block of ldBlocks) {
  try {
    const parsed = JSON.parse(block);
    ldTypes = ldTypes.concat(
      (parsed['@graph'] || [parsed]).map((n) => n['@type'])
    );
  } catch (e) {
    ldValid = false;
  }
}
check('all JSON-LD parses', ldValid);
check('JSON-LD declares Organization + Product',
  ldTypes.includes('Organization') && ldTypes.includes('Product'),
  ldTypes.join(', '));

/* ---- price consistency ---- */

const ldPrice = (html.match(/"price":\s*"(\d+)"/) || [])[1];
check('JSON-LD price matches registry',
  Number(ldPrice) === REGISTRY.price,
  `json-ld=${ldPrice} registry=${REGISTRY.price}`);

/* ---- seo files ---- */

check('robots.txt exists', fs.existsSync(path.join(ROOT, 'robots.txt')));
check('sitemap.xml exists', fs.existsSync(path.join(ROOT, 'sitemap.xml')));

if (fs.existsSync(path.join(ROOT, 'sitemap.xml'))) {
  const sm = read('sitemap.xml');
  check('sitemap uses the correct namespace',
    sm.includes('http://www.sitemaps.org/schemas/sitemap/0.9'));
}

/* ---- assets referenced by the page exist ---- */

/* Root-relative paths ("/assets/x") 404 when the site is served from a
   subpath such as user.github.io/repo/. Pages deploys exactly that way, so
   local refs must be relative. This check caught a real production outage. */
const rootRelative = [...html.matchAll(/(?:href|src)="(\/[^\/"][^"]*)"/g)].map((m) => m[1]);
check('no root-relative local asset paths',
  rootRelative.length === 0,
  rootRelative.join(', ') + ' — breaks under a subpath deploy');

const localRefs = [...html.matchAll(/(?:href|src)="(?!https?:|\/\/|#|mailto:)([^"]+)"/g)]
  .map((m) => m[1].replace(/^\//, ''));

const missing = localRefs.filter((p) => !fs.existsSync(path.join(ROOT, p)));
check('all local assets referenced by index.html exist',
  missing.length === 0, missing.join(', '));

/* ---- result ---- */

console.log();
if (failures.length) {
  console.error(`${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log(`All checks passed — ${REGISTRY.members} members, v${REGISTRY.version}.`);
