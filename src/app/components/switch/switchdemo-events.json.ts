export const events = [
  {
    name: 'toogle',
    parameters: [
      { event: 'boolean', description: 'Boolean value' },
    ],
    description: 'Dispatched when the switch is checked.',
  },
  {
    name: 'focus',
    parameters: [
      { event: '$event', description: 'Native event' },
    ],
    description: 'Dispatched when the switch receive focus.',
  },
];
