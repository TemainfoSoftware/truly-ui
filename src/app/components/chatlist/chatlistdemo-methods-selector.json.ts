export const dataMethods = [
  {
    name: 'readMessage',
    parameters: [
      {
        event: '...message',
        description: 'Message Object of ChatMessage type'
      }
    ],
    description: 'Event dispatched when chat should read a message',
  },
  {
    name: 'sendMessage',
    parameters: [
      {
        event: '...message',
        description: 'Message Object of ChatMessage type'
      }
    ],
    description: 'Event dispatched when user send a message',
  },
  {
    name: 'changeStatus',
    parameters: [
      {
        event: 'user',
        description: 'User that chat change status'
      },
      {
        event: 'status',
        description: 'The new status'
      },
    ],
    description: 'Event dispatched when user change status',
  },
  {
    name: 'selectContact',
    parameters: [
      {
        event: '...contact',
        description: 'The contact selected/clicked'
      },
      {
        event: 'unreadMessages',
        description: 'The non read messages by user of that contact selected'
      }
    ],
    description: 'Event dispatched when user select a partner to talk/type'
  }
];
