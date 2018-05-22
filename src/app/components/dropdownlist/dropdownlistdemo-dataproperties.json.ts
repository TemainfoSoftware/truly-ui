export const dataProperties = [
  {
    name: 'data',
    type: 'object | array',
    default: 'null',
    description: 'Sets the data of the Dropdown List.',
    options: 'any object | any array'
  },
  {
    name: 'text',
    type: 'string',
    default: 'text',
    description: 'Sets the data item field that represents the item text.',
    options: 'any text'
  },
  {
    name: 'valueItem',
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
    name: 'showOnlyIcon',
    type: 'boolean',
    default: 'false',
    description: 'Changes the dropdown to display only icon.',
    options: 'true | false'
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
    name: 'preSelected',
    type: 'string',
    default: 'null',
    description: 'Sets the option that will be initialize it',
    options: 'Object Key'
  },
  {
    name: 'placeholderIcon',
    type: 'string',
    default: 'ion-navicon-round',
    description: 'Displays a default icon in dropdown icon mode.',
    options: 'any icon name'
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
export const dataProperties2 = [
  {
    name: 'type',
    type: 'string',
    default: 'button',
    description: 'Type of button.',
    options: 'button | submit | reset'
  },
  {
    name: 'text',
    type: 'string',
    default: 'null',
    description: 'Displays a text button.',
    options: 'any text'
  },
  {
    name: 'size',
    type: 'string',
    default: '100px (min)',
    description: 'Button size.',
    options: 'string | ex: 150px'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button if set to true.',
    options: 'true | false'
  },
  {
    name: 'iconAddonBefore',
    type: 'string',
    default: 'null',
    description: 'Creates an icon in the addon before the button.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'iconAddonAfter',
    type: 'string',
    default: 'null',
    description: 'Creates an icon in the addon after the button.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'iconLeftTextButton',
    type: 'string',
    default: 'null',
    description: 'Creates an icon on the left side of the text button.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name : 'iconRightTextButton',
    type : 'string',
    default : 'null',
    description : 'Creates an icon on the right side of the text button.',
    options : 'ion-printer | fa fa-home | any'
  },
  {
    name: 'checkedItem',
    type: 'boolean',
    default: 'false',
    description: 'Mark button as preselected if set to true.',
    options: 'true | false'
  }
];
