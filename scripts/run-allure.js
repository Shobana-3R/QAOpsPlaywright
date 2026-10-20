
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const resultsDir = path.join(root, 'allure-results');
const reportsDir = path.join(root, 'allure-reports');

const retentionDays = 7;
const cutoffTime =
  Date.now() - retentionDays * 24 * 60 * 60 * 1000;

// Delete archived reports older than 7 days.
function cleanOldReports() {
  if (!fs.existsSync(reportsDir)) {
    return;
  }

  for (const entry of fs.readdirSync(reportsDir, {
    withFileTypes: true
  })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const reportPath = path.join(reportsDir, entry.name);
    const stats = fs.statSync(reportPath);

    if (stats.mtimeMs < cutoffTime) {
      fs.rmSync(reportPath, {
        recursive: true,
        force: true
      });

      console.log(`Deleted expired Allure report: ${entry.name}`);
    }
  }
}

// Create a unique folder name for every run.
const runName = new Date()
  .toISOString()
  .replace(/:/g, '-')
  .replace(/\.\d{3}Z$/, 'Z');

const reportDir = path.join(reportsDir, runName);

fs.mkdirSync(reportsDir, { recursive: true });
cleanOldReports();

// Clear only raw results from the previous run.
fs.rmSync(resultsDir, {
  recursive: true,
  force: true
});

fs.mkdirSync(resultsDir, { recursive: true });

console.log('Starting Playwright tests...');

const testRun = spawnSync(
  'npx',
  ['playwright', 'test'],
  {
    cwd: root,
    stdio: 'inherit',
    shell: true
  }
);

if (testRun.error) {
  console.error('Could not start Playwright:', testRun.error);
  process.exit(1);
}

console.log('Generating Allure report...');

const generate = spawnSync(
  'npx',
  [
    'allure',
    'generate',
    resultsDir,
    '--output',
    reportDir
  ],
  {
    cwd: root,
    stdio: 'inherit',
    shell: true
  }
);

if (generate.error || generate.status !== 0) {
  console.error('Allure report generation failed.');
  process.exit(1);
}

console.log(`Allure report saved to: ${reportDir}`);

console.log('Opening the generated Allure report...');

const open = spawnSync(
  'npx',
  ['allure', 'open', reportDir],
  {
    cwd: root,
    stdio: 'inherit',
    shell: true
  }
);

if (open.error || open.status !== 0) {
  console.error(
    'Report was generated, but could not be opened automatically.'
  );
}

// Preserve the Playwright test exit status.
if (testRun.status !== 0) {
  process.exit(testRun.status || 1);
}

if (testRun.signal) {
  process.exit(1);
}
