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
    name: 'iconBefore',
    type: 'string',
    default: 'null',
    description: 'Create an icon Before the Input.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of the input addons.',
    options: 'basic | primary | success | information | warning | danger'
  },
  {
    name: 'iconAfter',
    type: 'string',
    default: 'null',
    description: 'Create an icon After the Input.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'type',
    type: 'string',
    default: 'text',
    description: 'Type of input',
    options: 'any type of Native Input'
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
  {
    name: 'name',
    type: 'string',
    default: 'null',
    description: 'Define the name attribute of input, used on form as form control name.',
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
    description: 'Define the max number of characters of input.',
    options: 'any number'
  },
  {
    name: 'tabindex',
    type: 'number',
    default: '0',
    description: 'Define the tab index order of input.',
    options: 'any number'
  },
  {
    name: 'height',
    type: 'string',
    default: '23px',
    description: 'The height of input box',
    options: 'any text'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '100px',
    description: 'Width of label text',
    options: 'px | % | em'
  },
  {
    name: 'flatBorder',
    type: 'boolean',
    default: 'false',
    description: 'Defines if the input field has flat borders or not',
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
  }
  ,
  {
    name: 'textAfter',
    type: 'string',
    default: 'null',
    description: 'Display a text After the Input',
    options: 'any text'
  },
  {
    name: 'mask',
    type: 'string',
    default: 'null',
    description: 'Property used to define mask.',
    options: 'any text'
  }
  ,
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
  }
  ];
