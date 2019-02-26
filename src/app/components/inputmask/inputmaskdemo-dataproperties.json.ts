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
    name: 'mask',
    type: 'Object | string',
    default: 'null',
    description: 'Receives an Oject of configuration for mask',
    options: 'Object | string'
  },
  {
    name: 'mask.mask',
    type: 'string',
    default: 'null',
    description: 'The expression itself',
    options: '00/00/0000 | AAA-0000 | (099)-999999999'
  },
  {
    name: 'mask.guides',
    type: 'boolean',
    default: 'true',
    description: 'Show/Hide guides while typing',
    options: 'true | false'
  },
  {
    name: 'mask.withLiteralChar',
    type: 'boolean',
    default: 'false',
    description: 'Show/Hide special chars returned value [ngModel]',
    options: 'true | false'
  },
  {
    name: 'mask.uppercase',
    type: 'boolean',
    default: 'false',
    description: 'Show/Hide in uppercase value',
    options: 'true | false'
  },
];
