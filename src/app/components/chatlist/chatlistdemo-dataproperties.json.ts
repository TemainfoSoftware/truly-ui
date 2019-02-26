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
    name: 'data',
    type: 'Array<Object>',
    default: 'null',
    description: 'Array of data to shown on list',
    options: 'Array'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'The text which will display on line.',
    options: 'any text'
  },
  {
    name: 'avatar',
    type: 'string',
    default: 'null',
    description: 'Key of object that going to be used as avatar.',
    options: 'any text'
  },
  {
    name: 'labelDetail',
    type: 'string',
    default: 'null',
    description: 'The text of labelDetail shown just above of label.',
    options: 'any text'
  },
  {
    name: 'height',
    type: 'number',
    default: '300',
    description: 'Height(In Pixel) of the scroll viewport.',
    options: 'any number'
  },
  {
    name: 'searchQuery',
    type: 'string',
    default: 'null',
    description: 'Key of object that going to be used to search on list',
    options: 'any key'
  },
  {
    name: 'rowsClient',
    type: 'number',
    default: '5',
    description: 'Number of lines of each box (Online | Offline)',
    options: 'any number'
  },
  {
    name: 'statusConfig',
    type: 'Object',
    default: 'null',
    description: 'Object required to set up keys of chat status',
    options: 'object'
  },
  {
    name: 'searchInput',
    type: 'ElementRef<TlInput>',
    default: 'null',
    description: 'Variable of element TlInput',
    options: 'ElementRef<TlInput>'
  },
];
