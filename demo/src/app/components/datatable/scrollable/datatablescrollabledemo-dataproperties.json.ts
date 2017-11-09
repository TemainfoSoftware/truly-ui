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
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description: 'Data is loaded and interacted in Lazy mode.',
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
    name: 'height',
    type: 'string',
    default: '300px',
    description: 'Height of the scroll viewport.',
    options: 'px | % '
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
