export const events = [
  {
    name: 'openedChange',
    parameters: [
      { event: 'event.opened', description: 'Opened property, true | false' } ],
    description: 'Returns the value of property [opened] changed by two-way data binding.',
  },
  {
    name: 'open',
    description: 'Returned when sidebar is opened.',
  },
  {
    name: 'close',
    description: 'Returned when sidebar is closed.',
  },
];
