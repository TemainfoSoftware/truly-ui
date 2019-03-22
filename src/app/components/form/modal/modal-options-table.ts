

 /*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
export const ModalOptions = [
  {
    name: 'title',
    type: 'string',
    default: 'My Modal',
    description: 'Title of Modal',
    options: 'any string'
  },
  {
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Icon that going to be placed right before the title on the bar',
    options: 'icon class'
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'true',
    description: 'Controls if its draggable or not',
    options: 'true | false'
  },
  {
    name: 'width',
    type: 'string',
    default: '500px',
    description: 'Width of Modal',
    options: 'px | % | em'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Color of Modal bar',
    options: 'HEX'
  },
  {
    name: 'height',
    type: 'string',
    default: '500px',
    description: 'Height of Modal',
    options: 'px | % | em'
  },
  {
    name: 'maximizable',
    type: 'boolean',
    default: 'true',
    description: 'Controls if its maximizable or not',
    options: 'true | false'
  },
  {
    name: 'minimizable',
    type: 'boolean',
    default: 'true',
    description: 'Controls if its minimizable or not',
    options: 'true | false'
  },
  {
    name: 'fullscreen',
    type: 'boolean',
    default: 'false',
    description: 'Controls if it will open fullscreen or not',
    options: 'true | false'
  },
  {
    name: 'closeOnOK',
    type: 'boolean',
    default: 'false',
    description: 'Controls if it will close after click on button Ok',
    options: 'true | false'
  },
  {
    name: 'closeShortcut',
    type: 'string',
    default: 'escape',
    description: 'The shortcut used to close the modal',
    options: 'shortcut'
  },
  {
    name: 'restoreShortcut',
    type: 'string',
    default: 'null',
    description: 'The shortcut used to restore the modal',
    options: 'shortcut'
  },
  {
    name: 'maximizeShortcut',
    type: 'string',
    default: 'null',
    description: 'The shortcut used to maximize the modal',
    options: 'shortcut'
  },
  {
    name: 'backdrop',
    type: 'boolean',
    default: 'false',
    description: 'Controls if it will be opened with backdrop',
    options: 'true | false'
  },
];
