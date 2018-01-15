/**
 * Created by Silvio on 07/07/2017.
 */
export const dataProperties = [
  {
    name: 'multiSelect',
    type: 'boolean',
    default: 'false',
    description: 'Enables selection of multiple buttons if set to true.',
    options: 'true | false'
  },
  {
    name: 'height',
    type: 'string',
    default: 'null',
    description: 'Button group height.',
    options: 'px | % | em'
  }
  ];
export const dataProperties2 = [
  {
    name: 'text',
    type: 'string',
    default: 'null',
    description: 'Displays a text button.',
    options: 'any text'
  },
  {
    name: 'width',
    type: 'string',
    default: '100 (min)',
    description: 'Button width.',
    options: 'px | % | em'
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
    name: 'iconBeforeText',
    type: 'string',
    default: 'null',
    description: 'Creates an icon before the text button.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'iconAfterText',
    type: 'string',
    default: 'null',
    description: 'Creates an icon after the text button.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'checkedItem',
    type: 'boolean',
    default: 'false',
    description: 'Mark button as preselected if set to true.',
    options: 'true | false'
  }
];
