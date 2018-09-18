const promptDirectory = require('inquirer-directory');
const ModuleGenerator = require('./tools/plop/generators/module.generator');

module.exports = function (plop) {
  plop.setPrompt('directory', promptDirectory);
  plop.setWelcomeMessage(
    '==================================================\n' +
    '  [ TRULY - UI  ] Por favor selecione um gerador.\n' +
    '  =================================================='
  );

  plop.setGenerator( 'Module', ModuleGenerator() )

};
