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
    name: 'format',
    type: 'string',
    default: '24',
    description: 'Describes the format of hour, 12hrs or 24hrs',
    options: '12 | 24'
  },
  {
    name: 'flatBorder',
    type: 'boolean',
    default: 'false',
    description: 'Defines if the input field has flat borders or not',
    options: 'true | false'
  },
  {
    name: 'showTimeIcon',
    type: 'boolean',
    default: 'false',
    description: 'Defines if will show time icon or not',
    options: 'true | false'
  },
  {
    name: 'labelPlacement',
    type: 'string',
    default: 'left',
    description: 'Label Position',
    options: 'top | left'
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
    name: 'name',
    type: 'string',
    default: 'null',
    description: 'Define the name attribute of input, used on form as form control name.',
    options: 'any text'
  },
  {
    name: 'textAlign',
    type: 'string',
    default: 'left',
    description: 'Define the alignment of the text inside of the input. (css text-align)',
    options: 'left|right|center|justify|initial|inherit'
  },
  {
    name: 'steps',
    type: 'Object<IncrementalSteps>',
    default: 'null',
    description: 'Define number of incremental steps of hour and minute',
    options: 'Object<IncrementalSteps>'
  },
  {
    name: 'min',
    type: 'Date',
    default: 'null',
    description: 'Define a object of [min] Date to initiate the picker',
    options: 'Object<Time>'
  },
  {
    name: 'max',
    type: 'Date',
    default: 'null',
    description: 'Define a object of [max] Date the picker',
    options: 'Object<Time>'
  },
  {
    name: 'height',
    type: 'string',
    default: '23px',
    description: 'The height of input box',
    options: 'any text'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Create a label together with Input Element',
    options: 'any text'
  },
  {
    name: 'withBorder',
    type: 'boolean',
    default: 'true',
    description: 'Define the input field border',
    options: 'true | false'
  },
];
