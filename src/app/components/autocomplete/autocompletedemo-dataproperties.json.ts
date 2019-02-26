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
    description: 'Array of object used to populate the list.',
    options: 'Array<Object>'
  },
  {
    name: 'id',
    type: 'string',
    default: 'null',
    description: 'Key of object used to describe the ID on list (Normal Usage)',
    options: 'any text'
  },
  {
    name: 'labelDetail',
    type: 'string',
    default: 'null',
    description: 'Key of object used to describe the labelDetail on list (Normal Usage)',
    options: 'any text'
  },
  {
    name: 'labelName',
    type: 'string',
    default: 'null',
    description: 'Key of object used to describe the labelName on list (Normal Usage)',
    options: 'any text'
  },
  {
    name: 'openFocus',
    type: 'boolean',
    default: 'false',
    description: 'Handle of show list when input receives focus',
    options: 'true | false'
  },
  {
    name: 'rowHeight',
    type: 'number',
    default: '30',
    description: 'Value rowHeight of the list element',
    options: 'any number'
  },
  {
    name: 'listStripped',
    type: 'boolean',
    default: 'false',
    description: 'Handle to show list stripped',
    options: 'true | false'
  },
  {
    name: 'iconBefore',
    type: 'string',
    default: 'null',
    description: 'Create an icon Before the Input.',
    options: 'ion-printer | fa fa-home | any'
  },
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
    name: 'textBefore',
    type: 'string',
    default: 'null',
    description: 'Display a text Before the Input',
    options: 'any text'
  },
  {
    name: 'textAfter',
    type: 'string',
    default: 'null',
    description: 'Display a text After the Input',
    options: 'any text'
  },
  {
    name: 'autocomplete',
    type: 'string',
    default: 'off',
    description: 'Define the autocomplete of the input',
    options: 'on | off'
  },
  {
    name: 'textAlign',
    type: 'string',
    default: 'left',
    description: 'Define the alignment of the text inside of the input. (css text-align)',
    options: 'left|right|center|justify|initial|inherit'
  },
  {
    name: 'addNewMessage',
    type: 'string',
    default: '\'Add New\'',
    description: 'Text shown in Add New element',
    options: 'any text'
  },
];
