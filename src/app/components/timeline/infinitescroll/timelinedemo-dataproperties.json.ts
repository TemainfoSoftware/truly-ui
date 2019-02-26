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
    type: 'Array',
    default: 'null',
    description: 'An array of objects to display.',
    options: '[.. , ..]'
  },
  {
    name: 'data',
    type: 'object',
    default: 'null',
    description: 'An object with the data and total number of records.',
    options: '{ data:[ .. , ..], total: 1000 }'
  },
  {
    name: 'align',
    type: 'string',
    default: 'left',
    description: 'Alignment of timeline.',
    options: 'left | center | right'
  },
  {
    name: 'height',
    type: 'string',
    default: '400px',
    description: 'Height of timeline.',
    options: 'px | % | em'
  },
  {
    name: 'keyTitle',
    type: 'string',
    default: 'title',
    description: 'Name of your title property on object.',
    options: 'any string'
  },
  {
    name: 'keyText',
    type: 'string',
    default: 'text',
    description: 'Name of your text property on object.',
    options: 'any string'
  },
  {
    name: 'keyDate',
    type: 'string',
    default: 'date',
    description: 'Name of your date property on object.',
    options: 'any string'
  },
  {
    name: 'mode',
    type: 'string',
    default: 'basic',
    description: 'Define mode in infinite or basic.',
    options: 'basic | infinite'
  },
  {
    name: 'rowData',
    type: 'number',
    default: '20',
    description: 'Number of records at a time.',
    options: 'any number'
  }
];
