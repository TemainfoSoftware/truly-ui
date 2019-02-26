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
    name: 'opened',
    type: 'boolean',
    default: 'false',
    description: 'Property that sets opened sidebar.',
    options: 'true | false'
  },
  {
    name: 'mode',
    type: 'string',
    default: 'slide',
    description: 'The mode of sidebar animation.',
    options: 'push | over | slide'
  },
  {
    name: 'width',
    type: 'number',
    default: '300',
    description: 'Width of sidebar box.',
    options: 'any number'
  },
  {
    name: 'position',
    type: 'string',
    default: 'start',
    description: 'Horizontal Position of sidebar.',
    options: 'start | end'
  },
  {
    name: 'dockWidth',
    type: 'number',
    default: '80',
    description: 'Width of docked sidebar.',
    options: 'any number'
  },
  {
    name: 'dock',
    type: 'boolean',
    default: 'false',
    description: 'Property to set if sidebar will be "docked" or not;',
    options: 'true | false'
  },
];
