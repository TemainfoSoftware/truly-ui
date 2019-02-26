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
    name: 'accordion.singleOpened',
    type: 'boolean',
    default: 'false',
    description: 'Defines if the accordion will open one item at the time.',
    options: 'true | false'
  },
  {
    name: 'accordion-item.title',
    type: 'string',
    default: 'Title 1',
    description: 'Define the title of the accordion item.',
    options: 'any text'
  },
  {
    name: 'accordion-item.heightHeader',
    type: 'string',
    default: '45px',
    description: 'Define the height of the accordion\'s item height.',
    options: 'any text'
  },
  {
    name: 'accordion-item.opened',
    type: 'boolean',
    default: 'false',
    description: 'Defines the opened state of accordion item.',
    options: 'true | false'
  },
  {
    name: 'accordion-item.disabled',
    type: 'boolean',
    default: 'false',
    description: 'Defines the disabled state of accordion item.',
    options: 'true | false'
  },
];
