#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mode = process.argv[2];

const pages = [
  'build_production/index.html',
  'build_production/anfrage/index.html',
  'build_production/entruempelung/index.html',
  'build_production/entsorgung/index.html',
  'build_production/aufloesung/index.html',
  'build_production/umzug/index.html',
  'build_production/transport/index.html',
];

const breadcrumbRequiredPages = new Set(
  pages.filter((page) => page !== 'build_production/index.html')
);

const activeTemplateGlobs = [
  'source/*.blade.php',
  'source/_components/*.blade.php',
  'source/_layouts/*.blade.php',
];

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function getTemplateFiles() {
  return activeTemplateGlobs.flatMap((globPattern) => {
    const dir = path.dirname(globPattern);
    const absDir = path.join(root, dir);
    const ext = '.blade.php';

    return fs
      .readdirSync(absDir)
      .filter((name) => name.endsWith(ext))
      .map((name) => path.join(dir, name));
  });
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function checkH1() {
  let hasFailure = false;

  for (const page of pages) {
    const abs = path.join(root, page);

    if (!fs.existsSync(abs)) {
      fail(`Missing built page: ${page}`);
      hasFailure = true;
      continue;
    }

    const html = read(page);
    const matches = html.match(/<h1\b/gi);
    const count = matches ? matches.length : 0;

    if (count !== 1) {
      fail(`${page} has ${count} <h1> tags (expected 1)`);
      hasFailure = true;
    }
  }

  if (!hasFailure) {
    pass('One-H1 check passed for all production pages');
  }
}

function stripBladeComments(content) {
  return content.replace(/\{\{--[\s\S]*?--\}\}/g, '');
}

function checkLinks() {
  let hasFailure = false;
  const files = getTemplateFiles();

  for (const file of files) {
    const raw = read(file);
    const content = stripBladeComments(raw);

    if (content.includes('href="#"')) {
      fail(`Placeholder link found in ${file}`);
      hasFailure = true;
    }
  }

  if (!hasFailure) {
    pass('No placeholder href="#" links in active templates');
  }
}

function collectAssetRefs(content) {
  const refs = new Set();
  const patterns = [
    /(src|href)=\"(\/assets\/[^\"#?]+)\"/g,
    /url\(['\"](\/assets\/[^)'\"]+)['\"]\)/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      refs.add(match[2] || match[1]);
    }
  }

  return refs;
}

function checkAssets() {
  let hasFailure = false;
  const files = getTemplateFiles();
  const refs = new Set();

  for (const file of files) {
    const content = stripBladeComments(read(file));
    for (const ref of collectAssetRefs(content)) {
      refs.add(ref);
    }
  }

  for (const ref of refs) {
    const rel = ref.replace(/^\//, '');
    const target = path.join(root, 'source', rel);

    if (!fs.existsSync(target)) {
      fail(`Missing asset for reference ${ref} -> source/${rel}`);
      hasFailure = true;
    }
  }

  if (!hasFailure) {
    pass('All /assets references in active templates resolve to files');
  }
}

function checkSemantics() {
  let hasFailure = false;
  const files = getTemplateFiles();
  const emptyHrefPattern = /href\s*=\s*["']\s*["']/gi;
  const javascriptHrefPattern = /href\s*=\s*["']\s*javascript:/gi;

  for (const file of files) {
    const content = stripBladeComments(read(file));

    if (emptyHrefPattern.test(content)) {
      fail(`Empty href attribute found in ${file}`);
      hasFailure = true;
    }
    emptyHrefPattern.lastIndex = 0;

    if (javascriptHrefPattern.test(content)) {
      fail(`javascript: href found in ${file}`);
      hasFailure = true;
    }
    javascriptHrefPattern.lastIndex = 0;
  }

  const contactFormFile = 'source/anfrage.blade.php';
  const contactFormContent = stripBladeComments(read(contactFormFile));

  const controlIds = new Set();
  const controlPattern = /<(input|select|textarea)\b[^>]*\bid\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let controlMatch;
  while ((controlMatch = controlPattern.exec(contactFormContent)) !== null) {
    controlIds.add(controlMatch[2]);
  }

  const labelPattern = /<label\b([^>]*)>/gi;
  let labelMatch;
  while ((labelMatch = labelPattern.exec(contactFormContent)) !== null) {
    const attributes = labelMatch[1];
    const forMatch = attributes.match(/\bfor\s*=\s*["']([^"']+)["']/i);

    if (!forMatch) {
      fail(`Label without "for" attribute found in ${contactFormFile}`);
      hasFailure = true;
      continue;
    }

    const targetId = forMatch[1];
    if (!controlIds.has(targetId)) {
      fail(`Label "for=${targetId}" has no matching control id in ${contactFormFile}`);
      hasFailure = true;
    }
  }

  if (!hasFailure) {
    pass('Semantic checks passed (href rules and label bindings)');
  }
}

function extractJsonLdBlocks(html) {
  const blocks = [];
  const jsonLdPattern = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = jsonLdPattern.exec(html)) !== null) {
    blocks.push(match[1].trim());
  }

  return blocks;
}

function collectRootTypes(parsed, types) {
  if (Array.isArray(parsed)) {
    parsed.forEach((item) => collectRootTypes(item, types));
    return;
  }

  if (!parsed || typeof parsed !== 'object') {
    return;
  }

  const type = parsed['@type'];
  if (typeof type === 'string') {
    types.add(type);
  } else if (Array.isArray(type)) {
    type.forEach((value) => {
      if (typeof value === 'string') {
        types.add(value);
      }
    });
  }

  if (Array.isArray(parsed['@graph'])) {
    parsed['@graph'].forEach((entry) => collectRootTypes(entry, types));
  }
}

function checkSeo() {
  let hasFailure = false;

  for (const page of pages) {
    const abs = path.join(root, page);
    if (!fs.existsSync(abs)) {
      fail(`Missing built page: ${page}`);
      hasFailure = true;
      continue;
    }

    const html = read(page);

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const titleValue = titleMatch ? titleMatch[1].trim() : '';
    if (!titleValue) {
      fail(`Missing or empty <title> in ${page}`);
      hasFailure = true;
    }

    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);
    const descriptionValue = descriptionMatch ? descriptionMatch[1].trim() : '';
    if (!descriptionValue) {
      fail(`Missing or empty meta description in ${page}`);
      hasFailure = true;
    }

    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i);
    const canonicalValue = canonicalMatch ? canonicalMatch[1].trim() : '';
    if (!canonicalValue) {
      fail(`Missing canonical link in ${page}`);
      hasFailure = true;
    }

    const jsonLdBlocks = extractJsonLdBlocks(html);
    if (!jsonLdBlocks.length) {
      fail(`No JSON-LD blocks found in ${page}`);
      hasFailure = true;
      continue;
    }

    const detectedTypes = new Set();
    jsonLdBlocks.forEach((block, index) => {
      try {
        const parsed = JSON.parse(block);
        collectRootTypes(parsed, detectedTypes);
      } catch (error) {
        fail(`Invalid JSON-LD block #${index + 1} in ${page}: ${error.message}`);
        hasFailure = true;
      }
    });

    if (!detectedTypes.has('WebSite')) {
      fail(`Missing WebSite JSON-LD in ${page}`);
      hasFailure = true;
    }

    if (!detectedTypes.has('LocalBusiness')) {
      fail(`Missing LocalBusiness JSON-LD in ${page}`);
      hasFailure = true;
    }

    if (breadcrumbRequiredPages.has(page) && !detectedTypes.has('BreadcrumbList')) {
      fail(`Missing BreadcrumbList JSON-LD in ${page}`);
      hasFailure = true;
    }
  }

  if (!hasFailure) {
    pass('SEO checks passed (meta tags, canonical, and JSON-LD)');
  }
}

function runAll() {
  checkH1();
  checkLinks();
  checkAssets();
  checkSemantics();
  checkSeo();
}

if (!mode || mode === 'all') {
  runAll();
} else if (mode === 'h1') {
  checkH1();
} else if (mode === 'links') {
  checkLinks();
} else if (mode === 'assets') {
  checkAssets();
} else if (mode === 'semantics') {
  checkSemantics();
} else if (mode === 'seo') {
  checkSeo();
} else {
  fail(`Unknown mode: ${mode}. Use one of: all, h1, links, assets, semantics, seo`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}
