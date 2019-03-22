export const dataProperties = [
  {
    name: 'data',
    type: 'object | array',
    default: 'null',
    description: 'Sets the data of the Dropdown List.',
    options: 'any object | any array'
  },
  {
    name: 'keyText',
    type: 'string',
    default: 'null',
    description: 'Sets the data item field that represents the item text.',
    options: 'any text'
  },
  {
    name: 'identifier',
    type: 'string',
    default: 'null',
    description: 'String key used to compare values when model mode is string.',
    options: 'any text'
  },
  {
    name: 'modelMode',
    type: 'string',
    default: 'object',
    description: 'Operating mode of model values, some servers uses ID hash of value' +
    ' fields and others the object itself. The model mode is used to compare value of models' +
    ' with dropdown dataSource when angular is loading the form values.',
    options: 'string | object'
  },
  {
    name: 'keyValue',
    type: 'string',
    default: 'null',
    description: 'Sets the data item field that represents the item value.',
    options: 'any text'
  },
  {
    name: 'groupBy',
    type: 'string',
    default: 'null',
    description: 'Key that would be used to group items',
    options: 'any text'
  },
  {
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Sets the data item field that represents the item icon.',
    options: 'any text'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Create a label together with Dropdown List.',
    options: 'any text'
  },
  {
    name: 'labelPlacement',
    type: 'string',
    default: 'left',
    description: 'Sets the label position.',
    options: 'left | top'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '100px',
    description: 'Sets the label width.',
    options: 'px | % | em'
  },
  {
    name: 'itemHeight',
    type: 'string',
    default: '23px',
    description: 'Sets the height box and itemHeight of items list.',
    options: 'px | % | em'
  },
  {
    name: 'maxHeight',
    type: 'string',
    default: '150px',
    description: 'Sets the max height of the list.',
    options: 'px | % | em'
  },
  {
    name: 'width',
    type: 'string',
    default: '120px',
    description: 'Sets the width of Dropdown List.',
    options: 'px | % | em'
  },
  {
    name: 'searchOnList',
    type: 'boolean',
    default: 'false',
    description: 'Handle if will have input search or not',
    options: 'true | false'
  },
  {
    name: 'defaultOption',
    type: 'boolean',
    default: 'false',
    description: 'Handle if will have the null option',
    options: 'true | false'
  },
  {
    name: 'debounceTime',
    type: 'boolean',
    default: '200',
    description: 'Delay of time used on searching',
    options: 'number'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'Select item',
    description: 'Display a help text on dropdown list.',
    options: 'any text'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the dropdown list if set to true.',
    options: 'true | false'
  },
  ];
