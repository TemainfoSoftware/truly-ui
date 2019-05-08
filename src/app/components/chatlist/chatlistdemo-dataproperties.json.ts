/*
 MIT License

 Copyright (c) 2019 Temainfo Software

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
export const dataProperties = [
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of the button.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'width',
    type: 'string',
    default: '400px',
    description: 'The width of chat container',
    options: 'px | % | em'
  },
  {
    name: 'maxHeight',
    type: 'string',
    default: '450px',
    description: 'The max height of chatlist container',
    options: 'px | % | em'
  },
  {
    name: 'loadingMessages',
    type: 'boolean',
    default: 'false',
    description: 'Control loading spin',
    options: 'true | false'
  },
  {
    name: 'chatStatus',
    type: 'ChatStatus',
    default: '{\n' +
      '    BUSY: \'#ffc019\',\n' +
      '    ONLINE: \'#66cc99\',\n' +
      '    OFFLINE: \'#ff3100\'\n' +
      '  };',
    description: 'Object of chat status',
    options: 'Object<ChatStatus>'
  },
  {
    name: 'partner',
    type: 'ChatContact',
    default: 'null',
    description: 'Object of ChatContact, the partner of conversation',
    options: 'ChatContact'
  },
  {
    name: 'id',
    type: 'string',
    default: 'null',
    description: '',
    options: 'object'
  },
  {
    name: 'user',
    type: 'ChatContact',
    default: 'null',
    description: 'Object of ChatContact, the user owner of conversation',
    options: 'ChatContact'
  },
  {
    name: 'contacts',
    type: 'ChatContact[]',
    default: 'null',
    description: 'List of contacts of chat',
    options: 'ChatContact[]'
  },
];
