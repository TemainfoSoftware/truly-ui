const { parse } = require('semver');
const { execute, publishPackagesToNpm } = require('./utils');

async function main() {
  const json = require('../../dist/package.json');
  let commit = process.env.TRAVIS_PULL_REQUEST_SHA;
  if (!commit) {
    const lastCommit = await execute('git rev-parse HEAD');
    commit = lastCommit.toString().trim();
  }

  // shorten commit
  commit = commit.slice(0, 7);

  const version = parse(json.version);
  const newVersion = `${version.major}.${version.minor}.${version.patch}-dev-develop-${commit}`;
  console.log('publishing new version', newVersion);

  await publishPackagesToNpm(newVersion, 'dev');
}

main();
