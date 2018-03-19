export const events = [
  {
    name: 'lazyLoad',
    parameters: [
      { event: 'event.skip', description: 'First row offset ' },
      { event: 'event.take', description: 'Number of rows per page ' }
      ],
    description: 'Callback to invoke when paging, sorting or filtering happens in lazy mode.',
  },
  {
    name: 'addNew',
    parameters: [
      { event: 'null', description: 'null' },
    ],
    description: 'Callback to invoke when user click on Add New item.',
  },
  {
    name: 'clickItem',
    parameters: [
      { event: 'event.item', description: 'Item selected ' },
    ],
    description: 'Callback to invoke when user click on any item of the list.',
  },
];
