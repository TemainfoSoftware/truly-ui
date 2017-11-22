export const dataProperties = [
  {
    name: 'data',
    type: 'Array',
    default: 'null',
    description: 'An array of objects to display.',
    options: '[.. , ..] '
  },
  {
    name: 'data',
    type: 'object',
    default: 'null',
    description: 'An object with the data and total number of records.',
    options: '{ data:[ .. , ..], total: 1000 }'
  }, {
    name: 'mode',
    type: 'string',
    default: 'normal',
    description: 'Define how the datatable works.',
    options: 'normal | scrollable | paginator'
  }, {
    name: 'rowModel',
    type: 'string',
    default: 'inmemmory',
    description: 'Data is loaded and interacted in InMemory or Infinite Mode.',
    options: 'inmemory | infinite'
  }, {
    name: 'allowResize',
    type: 'boolean',
    default: 'false',
    description: 'Allows you to resize table columns.',
    options: 'true | false'
  }, {
    name: 'allowFilterColumn',
    type: 'boolean',
    default: 'false',
    description: 'Allows you to filter by columns.',
    options: 'true | false'
  }, {
    name: 'rowsPage',
    type: 'number',
    default: '20',
    description: 'Number of rows to display per page.',
    options: 'any number'
  }, {
    name: 'rowHeight',
    type: 'number',
    default: '25',
    description: 'Height of each table row.',
    options: 'any number'
  }, {
    name: 'rowsClient',
    type: 'number',
    default: '10',
    description: 'Number of records you want to view at one time.',
    options: 'any number'
  }, {
    name: 'width',
    type: 'number',
    default: '300',
    description: 'Width(In Pixel) of the scroll viewport.',
    options: 'any number'
  }, {
    name: 'height',
    type: 'number',
    default: '300',
    description: 'Height(In Pixel) of the scroll viewport.',
    options: 'any number'
  }, {
    name: 'globalFilter',
    type: 'any',
    default: 'null',
    description: 'Reference of an input field to use as a global filter.',
    options: 'any input<html>'
  }, {
    name: 'globalFilterOptions',
    type: 'object',
    default: 'null',
    description: 'Global filter settings.',
    options: 'mode | caseSensitive'
  }, {
    name: 'globalFilterOptions.mode',
    type: 'string',
    default: 'contains',
    description: 'Global filter mode',
    options: 'startsWith | endsWith | contains'
  }, {
    name: 'globalFilterOptions.caseSensitive',
    type: 'boolean',
    default: 'false',
    description: 'Global filter caseSensitive',
    options: 'false | true'
  }
];
