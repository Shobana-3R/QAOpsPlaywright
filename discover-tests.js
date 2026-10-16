
const fs = require('fs');
const path = require('path');

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.spec\.(js|ts)$/.test(entry.name)) {
      console.log(fullPath.replace(/\\/g, '/'));
    }
  }
}

walk('tests');
