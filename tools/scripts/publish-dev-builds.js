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

  await execute(`npm view ${json.name} version`).then( async ( version ) => {
    const newVersion = (version.replace(/\n|\r/g, "") + '-dev-' + commit);
    await execute(`npm version ${newVersion}`, { cwd: buildPath }).then( async () => {
      console.log('Publishing new version', newVersion);
    });
  });

}

main();
