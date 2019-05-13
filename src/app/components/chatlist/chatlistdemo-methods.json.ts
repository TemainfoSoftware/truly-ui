export const dataMethods = [
  {
    name: 'loadMessages',
    parameters: [
      {
        event: 'message',
        description: 'The Message Object of Type ChatMessage'
      },
      {
        event: 'chatId?',
        description: 'ID of chat'
      }
    ],
    description: 'Method used to a list of messages',
  },
  {
    name: 'appendMessage',
    parameters: [
      {
        event: 'message',
        description: 'The Message Object of Type ChatMessage'
      },
      {
        event: 'chatId?',
        description: 'ID of chat'
      }
    ],
    description: 'Method used append messages on chat',
  },
  {
    name: 'readAll',
    parameters: [
      {
        event: 'chatId?',
        description: 'ID of chat'
      }
    ],
    description: 'Method used to read all messages',
  },
  {
    name: 'setStatus',
    parameters: [
      {
        event: 'status',
        description: 'Status of contact'
      },
      {
        event: 'chatId?',
        description: 'ID of chat'
      }
    ],
    description: 'Method used to set status of chat owner',
  },
];
