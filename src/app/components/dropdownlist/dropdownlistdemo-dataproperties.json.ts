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
    default: 'text',
    description: 'Sets the data item field that represents the item text.',
    options: 'any text'
  },
  {
    name: 'keyValue',
    type: 'string',
    default: 'value',
    description: 'Sets the data item field that represents the item value.',
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
    default: '100',
    description: 'Sets the label width.',
    options: 'px | % | em'
  },
  {
    name: 'height',
    type: 'string',
    default: '37px',
    description: 'Sets the height of Dropdown List.',
    options: 'px | % | em'
  },
  {
    name: 'width',
    type: 'string',
    default: '87px',
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
    name: 'placeholder',
    type: 'string',
    default: 'null',
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
  {
    name: 'scroll',
    type: 'number',
    default: 'null | 10 to auto scroll',
    description: 'Displays minimum amount of items to create the scroll.',
    options: 'any number'
  }
  ];
