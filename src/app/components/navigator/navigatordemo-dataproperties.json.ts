export const dataProperties = [
  {
    name: 'width',
    type: 'string',
    default: '125px',
    description: 'Width of navigator.',
    options: 'px | % | em'
  },
  {
    name: 'height',
    type: 'string',
    default: '32px',
    description: 'Height of navigator.',
    options: 'px | % | em'
  },
  {
    name: 'type',
    type: 'string',
    default: 'monthyear',
    description: 'Navigator type of operation.',
    options: 'monthyear | year | rangeyear | day'
  },
  {
    name: 'date',
    type: 'Date',
    default: 'Current Date',
    description: 'Date for component initialization.',
    options: 'Date JavaScript'
  },
  {
    name: 'range',
    type: 'number',
    default: '11',
    description: 'Range of values for range types.',
    options: 'any number'
  },
  {
    name: 'withBorder',
    type: 'boolean',
    default: 'true',
    description: 'Completely removes the navigator borders.',
    options: 'true | false'
  }
];
