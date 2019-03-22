const { exec } = require('child_process');

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
};
