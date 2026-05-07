const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const roots = ['data', 'js', 'api', 'lib'];
const files = [];
const rootDir = path.resolve(__dirname, '..');

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.js')) files.push(fullPath);
  }
}

roots.forEach(walk);

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}

function assertFileExists(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (
    normalized.startsWith('/') ||
    normalized.startsWith('../') ||
    /^[a-zA-Z]:/.test(normalized)
  ) {
    throw new Error(`Static asset path is not deploy-safe: ${relativePath}`);
  }

  const absolutePath = path.resolve(rootDir, normalized);
  if (!absolutePath.startsWith(rootDir + path.sep)) {
    throw new Error(`Static asset path escapes the project: ${relativePath}`);
  }
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Mapped static asset is missing: ${relativePath}`);
  }
}

function validateSubjectMappingAssets() {
  const mappingPath = path.join(rootDir, 'data', 'subject-mapping.js');
  if (!fs.existsSync(mappingPath)) return 0;

  const source = fs.readFileSync(mappingPath, 'utf8');
  const matches = source.matchAll(/\bfile\s*:\s*['"]([^'"]+)['"]/g);
  let checked = 0;

  for (const match of matches) {
    assertFileExists(match[1]);
    checked += 1;
  }

  return checked;
}

try {
  const assetCount = validateSubjectMappingAssets();
  console.log(`Checked ${files.length} JavaScript files and ${assetCount} mapped static assets.`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
