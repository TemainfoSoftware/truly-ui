const { parse } = require('semver');
const { execute, publishPackagesToNpm } = require('./utils');
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
    console.log( buildPath);
    await execute(`npm version ${version}`, { cwd: buildPath }).then( async () => {
      const newVersion = (version + '-develop-' + commit);
      console.log('publishing new version', newVersion);
      await publishPackagesToNpm(newVersion, 'dev');
    });
  });

}

main();
