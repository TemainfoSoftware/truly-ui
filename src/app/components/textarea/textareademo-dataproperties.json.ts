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
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Create a label together with Textarea Element.',
    options: 'any text'
  },
  {
    name: 'withBorder',
    type: 'boolean',
    default: 'true',
    description: 'Define the textarea field border.',
    options: 'true | false'
  },
  {
    name: 'name',
    type: 'string',
    default: 'null',
    description: 'Define the name attribute of textarea, used on form as form control name.',
    options: 'any text'
  },
  {
    name: 'showValidations',
    type: 'boolean',
    default: 'false',
    description: 'Define if will be shown the validations box right below of field.',
    options: 'any text'
  },
  {
    name: 'maxlength',
    type: 'number',
    default: '-1',
    description: 'Define the max number of characters of textarea.',
    options: 'any number'
  },
  {
    name: 'tabindex',
    type: 'number',
    default: '0',
    description: 'Define the tab index order of textarea.',
    options: 'any number'
  },
  {
    name: 'height',
    type: 'string',
    default: '23px',
    description: 'The height of textarea box.',
    options: 'any text'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '100px',
    description: 'Width of label textarea.',
    options: 'px | % | em'
  },
  {
    name: 'labelPlacement',
    type: 'string',
    default: 'left',
    description: 'Label Position.',
    options: 'top | left'
  },
  {
    name: 'clearButton',
    type: 'boolean',
    default: 'false',
    description: 'Display an icon to clear any Textarea Value.',
    options: 'true | false'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Display an textarea with not selectable text. (disabled)',
    options: 'true | false'
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Display an textarea with selectable text. (only read)',
    options: 'true | false'
  },
  {
    name: 'resize',
    type: 'boolean',
    default: 'false',
    description: 'Allow resize textarea.',
    options: 'true | false'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'null',
    description: 'Display a help text on Textarea.',
    options: 'any text'
  },
  {
    name: 'textAlign',
    type: 'string',
    default: 'left',
    description: 'Define the alignment of the text inside of the textarea. (css text-align)',
    options: 'left|right|center|justify|initial|inherit'
  }
];
