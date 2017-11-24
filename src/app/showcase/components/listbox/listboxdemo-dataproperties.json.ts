/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: 'data',
    type: 'Array<Object>',
    default: 'null',
    description: 'Array of data to shown on list.',
    options: 'Array<Object>'
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
    type: 'string',
    default: '1em',
    description: 'The size of the label when using the default list.',
    options: 'px | % | em'
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
    type: 'string',
    default: '0.7em',
    description: 'The size of the labelDetailSize when using the default list.',
    options: 'px | % | em'
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
    name: 'itemsToShow',
    type: 'number',
    default: '10',
    description: 'Number of lines that going to be shown on list',
    options: 'any number'
  },
  {
    name: 'addNew',
    type: 'boolean',
    default: 'false',
    description: 'Controls if the listBox will have the Add New element at the end of the list.',
    options: 'true | false'
  },
  {
    name: 'hiddenScroll',
    type: 'boolean',
    default: 'false',
    description: 'Controls if going to have scroll or not',
    options: 'true | false'
  },
  {
    name: 'showArrows',
    type: 'boolean',
    default: 'true',
    description: 'Controls if going to have Arrows Up and Down to navigate through the list',
    options: 'true | false'
  },
  {
    name: 'showArrows',
    type: 'boolean',
    default: 'true',
    description: 'Controls if the list going to be fixed or relative',
    options: 'true | false'
  },
  {
    name: 'listStripped',
    type: 'boolean',
    default: 'false',
    description: 'Handle to show list stripped',
    options: 'true | false'
  },
  {
    name: 'focusOnScroll',
    type: 'boolean',
    default: 'true',
    description: 'Controls if will set focus while scrolling',
    options: 'true | false'
  },
  {
    name: 'filterEmptyMessage',
    type: 'string',
    default: '\'Nothing to Show\'',
    description: 'Text shown when the search results are empty',
    options: 'any text'
  },
  {
    name: 'addNewMessage',
    type: 'string',
    default: '\'Add New\'',
    description: 'Text shown in Add New element',
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
