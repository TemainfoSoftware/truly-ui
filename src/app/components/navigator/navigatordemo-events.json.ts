export const dataEvents = [
  {
    name: 'clickNavigator',
    parameters: [
      { event: 'event.year', description: 'Returning year in navigation.' },
      { event: 'event.day', description: 'Returning day in navigation.' },
      { event: 'event.month', description: 'Returning month in navigation.' },
      { event: 'event.fullDate', description: 'Returning default format date.' },
      { event: 'event.rangeYear', description: 'Start year and dnd year selected in range.' }
    ],
    description: 'Callback triggered by clicking Navigator Button.'
  },
  {
    name: 'clickPrevious',
    parameters: [
      { event: 'event.year', description: 'Returning year in navigation.' },
      { event: 'event.day', description: 'Returning day in navigation.' },
      { event: 'event.month', description: 'Returning month in navigation.' },
      { event: 'event.fullDate', description: 'Returning default format date.' },
      { event: 'event.rangeYear', description: 'Start year and dnd year selected in range.' }
    ],
    description: 'Callback triggered by clicking Previous Button.'
  },
  {
    name: 'clickNext',
    parameters: [
      { event: 'event.year', description: 'Returning year in navigation.' },
      { event: 'event.day', description: 'Returning day in navigation.' },
      { event: 'event.month', description: 'Returning month in navigation.' },
      { event: 'event.fullDate', description: 'Returning default format date.' },
      { event: 'event.rangeYear', description: 'Start year and dnd year selected in range.' }
    ],
    description: 'Callback triggered by clicking Next Button.'
  },
];
