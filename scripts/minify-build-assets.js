const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

function collectFiles(dir, extension) {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(absPath, extension));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!entry.name.endsWith(extension)) {
      continue;
    }

    if (entry.name.endsWith('.min' + extension) || entry.name.endsWith('.map')) {
      continue;
    }

    results.push(absPath);
  }

  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

async function minifyJsFiles(files) {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const before = Buffer.byteLength(source, 'utf8');

    const result = await minify(source, {
      compress: true,
      mangle: true,
      format: { comments: false },
    });

    if (!result.code) {
      throw new Error(`Failed to minify JS file: ${file}`);
    }

    fs.writeFileSync(file, result.code, 'utf8');

    const after = Buffer.byteLength(result.code, 'utf8');
    totalBefore += before;
    totalAfter += after;
  }

  return { totalBefore, totalAfter, count: files.length };
}

function minifyCssFiles(files) {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const before = Buffer.byteLength(source, 'utf8');

    const output = new CleanCSS({ level: 2 }).minify(source);
    if (output.errors && output.errors.length) {
      throw new Error(`Failed to minify CSS file ${file}: ${output.errors.join('; ')}`);
    }

    fs.writeFileSync(file, output.styles, 'utf8');

    const after = Buffer.byteLength(output.styles, 'utf8');
    totalBefore += before;
    totalAfter += after;
  }

  return { totalBefore, totalAfter, count: files.length };
}

async function minifyBuildAssets(targetBuildDir = 'build_production') {
  const root = process.cwd();
  const buildDir = path.isAbsolute(targetBuildDir)
    ? targetBuildDir
    : path.join(root, targetBuildDir);
  const assetsDir = path.join(buildDir, 'assets');

  if (!fs.existsSync(assetsDir)) {
    throw new Error(`Assets directory not found: ${assetsDir}`);
  }

  const jsFiles = collectFiles(path.join(assetsDir, 'js'), '.js');
  const cssFiles = collectFiles(path.join(assetsDir, 'css'), '.css');

  const jsStats = await minifyJsFiles(jsFiles);
  const cssStats = minifyCssFiles(cssFiles);

  const totalBefore = jsStats.totalBefore + cssStats.totalBefore;
  const totalAfter = jsStats.totalAfter + cssStats.totalAfter;
  const saved = totalBefore - totalAfter;
  const ratio = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : '0.0';

  const summary =
    `Minified ${jsStats.count} JS and ${cssStats.count} CSS files in ${targetBuildDir}/assets ` +
    `(${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)}, saved ${formatBytes(saved)} / ${ratio}%)`;

  console.log(summary);
  return summary;
}

module.exports = { minifyBuildAssets };

if (require.main === module) {
  const targetBuildDir = process.argv[2] || 'build_production';
  minifyBuildAssets(targetBuildDir).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
