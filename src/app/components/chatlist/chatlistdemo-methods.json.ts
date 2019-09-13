export const dataMethods = [
  {
    name: 'loadMessages',
    parameters: [
      {
        event: 'message',
        description: 'The Message Object of Type ChatMessage'
      },
      {
        event: 'chatId',
        description: 'ID of chat'
      }
    ],
    description: 'Method used to a list of messages',
  },
  {
    name: 'readMessages',
    parameters: [
      {
        event: 'messages',
        description: 'Array of Messages of Type ChatMessage'
      },
      {
        event: 'user',
        description: 'User of chat'
      },
      {
        event: 'chatId',
        description: 'ID of chat'
      }
    ],
    description: 'Method used read messages of chat',
  },
  {
    name: 'appendMessage',
    parameters: [
      {
        event: 'message',
        description: 'The Message Object of Type ChatMessage'
      },
      {
        event: 'user',
        description: 'User of chat'
      },
      {
        event: 'chatId',
        description: 'ID of chat'
      }
    ],
    description: 'Method used append messages on chat',
  },
  {
    name: 'readAll',
    parameters: [
      {
        event: 'chatId',
        description: 'ID of chat'
      }
    ],
    description: 'Method used to read all messages',
  },
  {
    name: 'getAllMessages',
    parameters: [
      {
        event: 'chatId',
        description: 'ID of chat'
      }
    ],
    description: 'Return all messages of chat',
  },
  {
    name: 'deleteChat',
    description: 'Remove chat and all messages of it'
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
