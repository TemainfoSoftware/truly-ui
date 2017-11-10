const fs = require('fs');

const jsFile = './truly-ui.js';
const dtsFile = './truly-ui.d.ts';


fs.writeFileSync('dist/' + jsFile, fs.readFileSync(jsFile));
fs.writeFileSync('dist/' + dtsFile, fs.readFileSync(dtsFile));
