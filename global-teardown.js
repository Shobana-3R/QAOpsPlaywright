
const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'test-results');
const retentionDays = 7;
const cutoffTime =
  Date.now() - retentionDays * 24 * 60 * 60 * 1000;

function cleanOldRuns() {
  if (!fs.existsSync(resultsDir)) {
    console.log('test-results directory not found.');
    return;
  }

  for (const entry of fs.readdirSync(resultsDir, {
    withFileTypes: true
  })) {
    if (!entry.isDirectory()) continue;

    const runPath = path.join(resultsDir, entry.name);

    // Expected run folder names: YYYY-MM-DD
    // Example: 2026-10-15
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.name)) {
      continue;
    }

    const runDate = new Date(`${entry.name}T00:00:00`);
    
    if (
      !Number.isNaN(runDate.getTime()) &&
      runDate.getTime() < cutoffTime
    ) {
      fs.rmSync(runPath, {
        recursive: true,
        force: true
      });

      console.log(`Deleted old run: ${entry.name}`);
    } else {
      console.log(`Preserved recent run: ${entry.name}`);
    }
  }
}

module.exports = async function globalTeardown() {
  console.log('Cleaning test runs older than 7 days...');
  cleanOldRuns();
  console.log('Run cleanup completed.');
};
