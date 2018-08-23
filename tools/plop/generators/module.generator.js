// =====================
//   SERVICE GENERATOR
// =====================
const basePath = process.cwd() + '/src/app';

module.exports = () => {
  return {
    description: 'Cria um novo Modulo para o Truly-UI',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        default: 'App',
        message: 'Nome do Modulo:'
      }
    ],
    actions: [
      // ===============
      //   LIB ACTIONS
      // ===============
      {
        type: 'add',
        path: 'projects/truly-ui/src/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}.html',
        templateFile: 'tools/plop/templates/module/lib/html.hbs',
      },
      {
        type: 'add',
        path: 'projects/truly-ui/src/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}.ts',
        templateFile: 'tools/plop/templates/module/lib/typescript.hbs',
      },
      {
        type: 'add',
        path: 'projects/truly-ui/src/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}.scss',
        templateFile: 'tools/plop/templates/module/lib/sass.hbs',
      },
      {
        type: 'add',
        path: 'projects/truly-ui/src/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}-theme.scss',
        templateFile: 'tools/plop/templates/module/lib/theme.hbs',
      },
      {
        type: 'add',
        path: 'projects/truly-ui/src/components/{{lowerCase moduleName}}/index.ts',
        templateFile: 'tools/plop/templates/module/lib/index.hbs',
      },

      // ==================
      //  SHOWCASE ACTIONS
      // ==================
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo.component.html',
        templateFile: 'tools/plop/templates/module/showcase/html.hbs',
      },
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo.component.scss',
        templateFile: 'tools/plop/templates/module/showcase/scss.hbs',
      },
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo.component.ts',
        templateFile: 'tools/plop/templates/module/showcase/typescript.hbs',
      },
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo.dataevents.json.ts',
        templateFile: 'tools/plop/templates/module/showcase/dataevents.hbs',
      },
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo.module.ts',
        templateFile: 'tools/plop/templates/module/showcase/module.hbs',
      },
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo-dataproperties.json.ts',
        templateFile: 'tools/plop/templates/module/showcase/dataproperties.hbs',
      },
      {
        type: 'add',
        path: 'src/app/components/{{lowerCase moduleName}}/{{lowerCase moduleName}}demo-routing.module.ts',
        templateFile: 'tools/plop/templates/module/showcase/routing.hbs',
      },
    ]
  }
};
