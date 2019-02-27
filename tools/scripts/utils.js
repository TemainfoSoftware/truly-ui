const { exec } = require('child_process');
const { resolve } = require('path');

module.exports = {
  execute: (script, options)=> {
    console.log( script );
    return new Promise((resolvePromise, rejectPromise) => {
      exec(script, options, (error, stdout, stderr) => {
        if (error) {
          rejectPromise({ error, stderr });
        } else {
          resolvePromise(stdout);
        }
      });
    });
  },

  publishPackagesToNpm: async (version, tag) => {
    const buildPath = resolve(__dirname, '../../dist/');
    const packageDescription = `${buildPath} ${version} @${tag}`;
    const script = `npm publish --access public --tag ${tag}`;

    await module.exports.execute(script, { cwd: buildPath })
      .then(( output )=>{
        console.log(`Published ${packageDescription} /r/n -> ${output}`);
      }).catch(({ error })=>{
        console.log(`Error Publishing ${packageDescription} /r/n -> ${error}`);
        throw error;
      });
  }
};
