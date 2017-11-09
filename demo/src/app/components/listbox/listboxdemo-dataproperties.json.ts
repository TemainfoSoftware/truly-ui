/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: 'data',
    type: 'Array<Object>',
    default: 'null',
    description: 'Array of data to shown on list.',
    options: 'any text'
  },
  {
    name: 'id',
    type: 'string',
    default: 'null',
    description: 'The text shown as ID when using the default list',
    options: 'any text'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'The text which will display front of checkbox',
    options: 'any text'
  },
  {
    name: 'labelSize',
    type: 'css measure',
    default: '1em',
    description: 'The size of the label when using the default list.',
    options: 'any css measure'
  },
  {
    name: 'labelDetail',
    type: 'string',
    default: 'null',
    description: 'The text of labelDetail shown just above of label when using default list.',
    options: 'any text'
  },
  {
    name: 'labelDetailSize',
    type: 'css measure',
    default: '0.7em',
    description: 'The size of the labelDetailSize when using the default list.',
    options: 'any css measure'
  },
  {
    name: 'rowHeight',
    type: 'number',
    default: '50',
    description: 'The row height in the list.',
    options: 'any number'
  },
  {
    name: 'searchElement',
    type: 'ElementRef',
    default: 'null',
    description: 'Receives an ElementRef input used for search on list.',
    options: 'ElementRef'
  },
  {
    name: 'charsToSearch',
    type: 'number',
    default: '3',
    description: 'Number of the charts to component begin to search on list.',
    options: 'any number'
  },
  {
    name: 'itensToShow',
    type: 'number',
    default: '10',
    description: 'Number of lines that going to be shown on list',
    options: 'any number'
  },
  {
    name: 'filterEmptyMessage',
    type: 'string',
    default: '\'Nothing to Show\'',
    description: 'Text shown when the search results are empty',
    options: 'any text'
  },
  {
    name: 'searchQuery',
    type: 'Array<String>',
    default: 'null',
    description: 'Array of string to receive the key that\'s going to be used to search on list',
    options: 'any text'
  },
  ];
