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
    name: 'multiSelect',
    type: 'boolean',
    default: 'false',
    description: 'Enables selection of multiple buttons if set to true.',
    options: 'true | false'
  },
  {
    name: 'height',
    type: 'string',
    default: 'null',
    description: 'Button group height.',
    options: 'px | % | em'
  },
  {
    name: 'fontSize',
    type: 'string',
    default: '0.8em',
    description: 'Font size.',
    options: 'px | % | em'
  },
  {
    name: 'useSelected',
    type: 'boolean',
    default: 'true',
    description: 'Use the control for the button state.',
    options: 'true | false'
  }
];
export const dataProperties2 = [
  {
    name: 'text',
    type: 'string',
    default: 'null',
    description: 'Displays a text button.',
    options: 'any text'
  },
  {
    name: 'width',
    type: 'string',
    default: '100 (min)',
    description: 'Button width.',
    options: 'px | % | em'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button if set to true.',
    options: 'true | false'
  },
  {
    name: 'selected',
    type: 'boolean',
    default: 'false',
    description: 'The state of button.',
    options: 'true | false'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of the button.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'iconBeforeText',
    type: 'string',
    default: 'null',
    description: 'Creates an icon before the text button.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'iconAfterText',
    type: 'string',
    default: 'null',
    description: 'Creates an icon after the text button.',
    options: 'ion ion-printer | fas fa-home | any'
  }
];
