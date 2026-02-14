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

const activeTemplateGlobs = [
  'source/*.blade.php',
  'source/_components/*.blade.php',
  'source/_layouts/*.blade.php',
];

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function listFilesFromGlob(globPattern) {
  const dir = path.dirname(globPattern);
  const basePattern = path.basename(globPattern).replace('*', '');
  const absDir = path.join(root, dir);

  return fs
    .readdirSync(absDir)
    .filter((name) => name.endsWith(basePattern) || globPattern.endsWith('*'))
    .map((name) => path.join(dir, name))
    .filter((file) => fs.statSync(path.join(root, file)).isFile());
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

function runAll() {
  checkH1();
  checkLinks();
  checkAssets();
}

if (!mode || mode === 'all') {
  runAll();
} else if (mode === 'h1') {
  checkH1();
} else if (mode === 'links') {
  checkLinks();
} else if (mode === 'assets') {
  checkAssets();
} else {
  fail(`Unknown mode: ${mode}. Use one of: all, h1, links, assets`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}
