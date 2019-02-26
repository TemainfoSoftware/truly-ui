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
    name: 'title',
    type: 'string',
    default: 'Title !',
    description: 'The title of toaster',
    options: 'any text'
  },
  {
    name: 'message',
    type: 'string',
    default: 'Message Description',
    description: 'The description of toaster',
    options: 'any text'
  },
  {
    name: 'width',
    type: 'string',
    default: '400px',
    description: 'The Toaster width.',
    options: 'px | % | em'
  },
  {
    name: 'height',
    type: 'string',
    default: '70px',
    description: 'The Toaster height.',
    options: 'px | % | em'
  },
  {
    name: 'progress',
    type: 'boolean',
    default: 'false',
    description: 'Controls whether the progressbar will be shown or not',
    options: 'true | false'
  },
  {
    name: 'showIcon',
    type: 'boolean',
    default: 'true',
    description: 'Controls whether the icon will be shown or not',
    options: 'true | false'
  },
  {
    name: 'time',
    type: 'number',
    default: '3000',
    description: 'The time that toaster will be visible.',
    options: 'milliseconds'
  },
  {
    name: 'position',
    type: 'string',
    default: 'top-right',
    description: 'Set the position of toaster.',
    options: 'top-left | top-center | top-right | bottom-left | bottom-center | bottom-right'
  },
];
