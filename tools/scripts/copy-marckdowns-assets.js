const fs = require('fs');

const readmeFile = './README.md';
const licenseFile = './LICENSE.md';

// if (fs.existsSync(readmeFile)) {
//   fs.writeFileSync('dist/' + readmeFile, fs.readFileSync(readmeFile));
// }

fs.writeFileSync('dist/' + licenseFile, fs.readFileSync(licenseFile));
fs.writeFileSync('dist/' + readmeFile, fs.readFileSync(readmeFile));
