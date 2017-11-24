/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: 'initialFocus',
    type: 'ElementRef',
    default: 'null',
    description: 'Used to set up the initialization focus, what element initialize focused',
    options: 'ElementRef'
  },
  {
    name: 'showConfirmOnChange',
    type: 'boolean',
    default: 'false',
    description: 'Controls if will shows up the confirmation message after the form changes.',
    options: 'true | false'
  },
  {
    name: 'messageDialogConfirmation',
    type: 'string',
    default: 'null',
    description: 'The message of the confirmation dialog (used with showConfirmOnChange property)',
    options: 'any text'
  },
  {
    name: 'modalOptions.icon',
    type: 'string',
    default: 'null',
    description: 'Icon of Window',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'modalOptions.title',
    type: 'string',
    default: 'My Modal',
    description: 'Title of window dialog',
    options: 'any text'
  },
  {
    name: 'modalOptions.color',
    type: 'string',
    default: '#53C68C',
    description: 'Color of window dialog header',
    options: 'Hex | RGBA'
  },
  {
    name: 'modalOptions.width',
    type: 'string',
    default: '500px',
    description: 'Width of window dialog',
    options: 'px | % | em'
  },
  {
    name: 'modalOptions.height',
    type: 'string',
    default: '500px',
    description: 'Height of window dialog',
    options: 'px | % | em'
  },
  {
    name: 'modalOptions.draggable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is draggrable or not',
    options: 'true | false'
  },
  {
    name: 'modalOptions.maximizable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is maximizable or not',
    options: 'true | false'
  },
  {
    name: 'modalOptions.minimizable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is minimizable or not',
    options: 'true | false'
  },

  ];
