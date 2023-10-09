const { execute } = require('./utils');
const { resolve } = require('path');

async function main() {
  const json = require('../../dist/package.json');
  const buildPath = resolve(__dirname, '../../dist/');
  let commit = process.env.TRAVIS_PULL_REQUEST_SHA;
  if (!commit) {
    const lastCommit = await execute('git rev-parse HEAD');
    commit = lastCommit.toString().trim();
  }

  // shorten commit
  commit = commit.slice(0, 7);

  try {
    const version = await execute(`npm view ${json.name} version`);
    const newVersion = `${version.replace(/\n|\r/g, '')}-dev-${commit}`;
    await execute(`npm version ${newVersion} --allow-same-version`, { cwd: buildPath });
    console.log('Publishing new version', newVersion);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

main().catch(error => {
  console.error('Unhandled promise rejection:', error);
});
