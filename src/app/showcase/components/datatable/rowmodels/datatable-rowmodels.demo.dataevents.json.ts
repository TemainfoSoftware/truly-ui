
export const dataProperties = [
  {
    name: 'loadData',
    parameters: [
      { event: 'event.skip', description: 'First row offset ' },
      { event: 'event.take', description: 'Number of rows per page ' },
      { event: 'event.filters', description: 'Filters used to change data ' },
      { event: 'event.sorts', description: 'Sort order used to change data ' }
    ],
    description: 'Callback to invoke when paging, sorting or filtering happens in infinite mode.'
  }
];
