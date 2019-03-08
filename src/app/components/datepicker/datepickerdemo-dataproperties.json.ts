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
    name: 'iconAfter',
    type: 'string',
    default: 'null',
    description: 'Create an icon After the Input.',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Create a label together with Input Element',
    options: 'any text'
  },
  {
    name: 'formatDate',
    type: 'string',
    default: 'dd.mm.yyyy',
    description: 'The format of date',
    options: 'dd.mm.yyyy | mm.dd.yyyy | yyyy.mm.dd'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '100px',
    description: 'Width of label text',
    options: 'px | % | em'
  },
  {
    name: 'labelPlacement',
    type: 'string',
    default: 'left',
    description: 'Label Position',
    options: 'top | left'
  },
  {
    name: 'clearButton',
    type: 'boolean',
    default: 'false',
    description: 'Display an icon to clear any Input Value',
    options: 'true | false'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Display an input with not selectable text (disabled)',
    options: 'true | false'
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Display an input with selectable text (only read)',
    options: 'true | false'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'null',
    description: 'Display a help text on Input',
    options: 'any text'
  },
  {
    name: 'iconCalendar',
    type: 'boolean',
    default: 'false',
    description: 'Display an calendar icon after input.',
    options: 'true | false'
  },
  {
    name: 'formatDate',
    type: 'string',
    default: 'dd/mm/yyyy',
    description: 'Define the date format of datepicker.',
    options: 'any format with dd, mm, and yyyy'
  },
  {
    name: 'textAlign',
    type: 'string',
    default: 'left',
    description: 'Define the alignment of the text inside of the input. (css text-align)',
    options: 'left|right|center|justify|initial|inherit'
  }
];
