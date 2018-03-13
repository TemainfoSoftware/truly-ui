export const dataMethods = [
  {
    name: 'changeStatus',
    parameters: [
      {
        event: 'selectedItem', description: 'Selected item of chat, returned by (clickItem) event',
      },
      {
        event: 'status', description: 'String of status that will be set: Busy | Online | Offline | Away'
      }
    ],
    description: 'Method used to change status of item selected. Inject ChatListService to use',
  },
];
