const fs = require('fs');
const path = require('path');

const copyRecursiveSync = function(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    fs.linkSync(src, dest);
  }
};

copyRecursiveSync('projects/truly-ui/src/components/core/styles/','./dist/css');
