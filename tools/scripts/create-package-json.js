/**
 * Creates a package.json for the release NPM package structure.
 */
const fs = require('fs');
const path = require('path');

let basePkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// remove scripts
delete basePkgJson.scripts;

// remove devDependencies (as there are important for the sourcecode only)
delete basePkgJson.devDependencies;

// remove the private option
delete basePkgJson.private;

// remove others options
delete basePkgJson.release;
delete basePkgJson['pre-commit'];

// remove dependencies for safety reasons as we use peerDependencies
basePkgJson.dependencies = {};

const filepath = 'dist/package.json';
fs.writeFileSync(filepath, JSON.stringify(basePkgJson, null, 2), 'utf-8');

