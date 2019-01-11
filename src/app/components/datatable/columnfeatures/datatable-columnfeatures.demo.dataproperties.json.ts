export const dataProperties = [
  {
    name: 'field',
    type: 'string',
    default: 'empty',
    description: 'Name of the field you are representing in the data object.',
    options: 'any text'
  },
  {
    name: 'title',
    type: 'string',
    default: 'empty',
    description: 'Description of the field in datatable presentation.',
    options: 'any text'
  },
  {
    name: 'alignment',
    type: 'string',
    default: 'center',
    description: 'Column alignment within the datatable.',
    options: 'left | center | right'
  },
  {
    name: 'width',
    type: 'string',
    default: 'empty',
    description: 'Column width (if not informed, it will use an automatic size).',
    options: 'px | % | em'
  },
  {
    name: 'type',
    type: 'string',
    default: 'text',
    description: 'Column type used for filter creation and validations.',
    options: 'text|number|date|cpf|rg|cnpj'
  },
  {
    name: 'showFilter',
    type: 'boolean',
    default: 'true',
    description: 'Hide the filter for a particular column using this property.',
    options: 'true | false'
  },
  {
    name: 'showFilterOptions',
    type: 'boolean',
    default: 'true',
    description: 'Enables or disables filter options.',
    options: 'true | false'
  },
  {
    name: 'filterOptions',
    type: 'array',
    default: 'according to the type of column',
    description: 'Allows you to change standard column filter options.',
    options: '[{ description : "Equals", valueItem : equals, icon: "dx-icon-filter-operation-equals" }]'
  },
  {
    name: 'sortable',
    type: 'boolean',
    default: 'true',
    description: 'Allows you to block the ordering for a given column.',
    options: 'true | false'
  },
  {
    name: 'format',
    type: 'string',
    default: 'shortDate',
    description: 'Formats the date type according to the DatePipe, when the cell is of type Date.',
    options: 'https://angular.io/api/common/DatePipe'
  },
];
