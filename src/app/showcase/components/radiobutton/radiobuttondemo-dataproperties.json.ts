/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: 'nameGroup',
    type: 'string',
    default: 'null',
    description: 'Name of Radio Group (Used as property [name])',
    options: 'any text'
  },
  {
    name: 'labelGroup',
    type: 'string',
    default: 'null',
    description: 'Label of Radio Group',
    options: 'any text'
  },
  {
    name: 'orientation',
    type: 'string',
    default: 'horizontal',
    description: 'Orientation of the Radios',
    options: 'vertical | horizontal'
  },
  {
    name: 'colorSelected',
    type: 'string',
    default: '#66CC99',
    description: 'Sets Background Color',
    options: 'Hex | RGBA'
  }
  ];
export const dataPropertiesRadioButton = [
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Label of Radio Button',
    options: 'any text'
  },
  {
    name: 'value',
    type: 'string | number',
    default: 'null',
    description: 'Value of Radio Button that going be returned to model',
    options: 'any text'
  },
  {
    name: 'tabindex',
    type: 'number',
    default: '0',
    description: 'Sets index tabbing',
    options: 'any number'
  },
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'Define if the radios button initialize checked or not.',
    options: 'true | false'
  }
  ];
