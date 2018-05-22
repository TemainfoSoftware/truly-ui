export const events = [
  {
    name: 'getSelecteds',
    parameters: [
      {
        event: 'selected', description: 'Button Selected'
      }
    ],
    description: 'Dispacthed when a tag is selected or removed.',
  },
  {
    name: 'tagClick',
    parameters: [
      {
        event: 'object', description: 'Tag Clicked'
      }
    ],
    description: 'Dispacthed when a tag is clicked.',
  },
  {
    name: 'tagRemove',
    parameters: [
      {
        event: 'object', description: 'Tag Removed'
      }
    ],
    description: 'Dispacthed when a tag is removed.',
  },
];
