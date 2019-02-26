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
    description: 'Array of data to shown on list.',
    options: 'Array<Object>'
  },
  {
    name: 'rowHeight',
    type: 'number',
    default: '40',
    description: 'The row height in the list.',
    options: 'any number'
  },
  {
    name: 'searchControl',
    type: 'ElementRef',
    default: 'null',
    description: 'Receives an ElementRef input used for search on list.',
    options: 'ElementRef'
  },
  {
    name: 'debounceTime',
    type: 'number',
    default: '200',
    description: 'Debounce time of list search',
    options: 'number'
  },
  {
    name: 'totalLength',
    type: 'number',
    default: '100',
    description: 'Total length of datasource when using lazy mode',
    options: 'number'
  },
  {
    name: 'inputElement',
    type: 'ElementRef',
    default: 'null',
    description: 'Input element used to control list.',
    options: 'ElementRef'
  },
  {
    name: 'rowsPage',
    type: 'number',
    default: '10',
    description: 'Number of lines that going to be shown on list, created on DOM',
    options: 'any number'
  },
  {
    name: 'height',
    type: 'string',
    default: '300px',
    description: 'Height of list wrapper, used when fixedHeight property is true.',
    options: 'any css measure'
  },
  {
    name: 'lazyMode',
    type: 'boolean',
    default: 'false',
    description: 'Define if list will work lazy load or not.',
    options: 'true | false'
  },
  {
    name: 'listStripped',
    type: 'boolean',
    default: 'false',
    description: 'Handle to show list stripped',
    options: 'true | false'
  },
  {
    name: 'template',
    type: 'TemplateRef<any>',
    default: 'null',
    description: 'Template of item list',
    options: 'TemplateRef'
  },
  {
    name: 'filterEmptyMessage',
    type: 'string',
    default: '\'Nothing to Show\'',
    description: 'Text shown when the search results are empty',
    options: 'any text'
  },
  {
    name: 'searchBy',
    type: 'string',
    default: 'description',
    description: 'string to receive the key that\'s going to be used to search on list',
    options: 'any text'
  },
  ];
