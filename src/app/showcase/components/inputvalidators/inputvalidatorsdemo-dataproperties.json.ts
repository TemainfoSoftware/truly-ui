/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: 'iconBefore',
    type: 'string',
    default: 'null',
    description: 'Create an icon Before the Input.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'iconAfter',
    type: 'string',
    default: 'null',
    description: 'Create an icon After the Input.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Create a label together with Input Element',
    options: 'any text'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '100px',
    description: 'Width of label text',
    options: 'px | % | em'
  },
  {
    name: 'labelPlacement',
    type: 'string',
    default: 'left',
    description: 'Label Position',
    options: 'top | left'
  },
  {
    name: 'clearButton',
    type: 'boolean',
    default: 'false',
    description: 'Display an icon to clear any Input Value',
    options: 'true | false'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Display an input with not selectable text (disabled)',
    options: 'true | false'
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Display an input with selectable text (only read)',
    options: 'true | false'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'null',
    description: 'Display a help text on Input',
    options: 'any text'
  },
  {
    name: 'textBefore',
    type: 'string',
    default: 'null',
    description: 'Display a text Before the Input',
    options: 'any text'
  }
  ,
  {
    name: 'textAfter',
    type: 'string',
    default: 'null',
    description: 'Display a text After the Input',
    options: 'any text'
  }
  ,
  {
    name: 'autocomplete',
    type: 'string',
    default: 'off',
    description: 'Define the autocomplete of the input',
    options: 'on | off'
  },
  {
    name: 'textAlign',
    type: 'string',
    default: 'left',
    description: 'Define the alignment of the text inside of the input. (css text-align)',
    options: 'left|right|center|justify|initial|inherit'
  }
  ];
