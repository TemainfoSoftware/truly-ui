export const dataProperties = [
  {
    name: 'rowSelect',
    parameters: [
      { event: 'event.row', description: 'Selected data' },
      { event: 'event.index', description: 'index of Selected data' }
    ],
    description: 'Callback to invoke when a row is selected.'
  },
  {
    name: 'rowClick',
    parameters: [
      { event: 'event.row', description: 'Selected data' },
      { event: 'event.index', description: 'index of Selected data' }
    ],
    description: 'Callback to invoke when a row is clicked.'
  },
  {
    name: 'rowDblclick',
    parameters: [
      { event: 'event.row', description: 'Selected data' },
      { event: 'event.index', description: 'index of Selected data' }
    ],
    description: 'Callback to invoke when a row is double clicked.'
  },
  {
    name: 'pageChange',
    parameters: [
      { event: 'event.page', description: 'Current page number' }
    ],
    description: 'Callback to invoke when pagination occurs.'
  },
  {
    name: 'loadData',
    parameters: [
      { event: 'event.skip', description: 'First row offset ' },
      { event: 'event.take', description: 'Number of rows per page ' }
    ],
    description: 'Callback to invoke when paging, sorting or filtering happens in lazy mode.'
  }
  ,
  {
    name: 'endRow',
    parameters: [
      { event: 'event.endRow', description: 'End line number' }
    ],
    description: 'Callback to invoke when the scroll or selection arrives on the last line'
  }
];
