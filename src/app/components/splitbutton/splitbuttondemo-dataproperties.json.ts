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
    name: 'text',
    type: 'string',
    default: 'null',
    description: 'Displays a text button.',
    options: 'any text'
  },
  {
    name: 'width',
    type: 'string',
    default: '125 (min)',
    description: 'Button width.',
    options: 'px | % | em'
  },
  {
    name: 'height',
    type: 'string',
    default: '39',
    description: 'SplitButton height.',
    options: 'px | % | em'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of the button.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button if set to true.',
    options: 'true | false'
  },
];
export const dataProperties2 = [
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Displays an action text.',
    options: 'any text'
  },
  {
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Creates an icon before the action text.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'separator',
    type: 'boolean',
    default: 'false',
    description: 'Creates a separator below action label if set to true.',
    options: 'true | false'
  }
];
