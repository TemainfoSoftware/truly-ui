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
    options: 'any text'
  },
  {
    name: 'query',
    type: 'string',
    default: 'null',
    description: 'Key that going to be used to search.',
    options: 'any text'
  },
  {
    name: 'keyValue',
    type: 'string',
    default: 'null',
    description: 'Key that going to be used as value of component.',
    options: 'any text'
  },
  {
    name: 'onlyKeyValue',
    type: 'boolean',
    default: 'false',
    description: 'Controls if the component will work only with key value',
    options: 'true | false'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Key that will shown on label list.',
    options: 'any text'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '120px',
    description: 'Width of label text',
    options: 'px | % | em'
  },
  {
    name: 'labelTag',
    type: 'string',
    default: 'query',
    description: 'Defines what text will be shown on text tag.',
    options: 'Object Key'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of multiselect tags.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Key that will shown on icon section of list item.',
    options: 'FontAwesome Class | IonIcons class'
  },
  {
    name: 'detail',
    type: 'string',
    default: 'null',
    description: 'Key that will shown on detail section of list item.',
    options: 'Object Key'
  },
  {
    name: 'keyColor',
    type: 'string',
    default: 'null',
    description: 'Key that going to be used to change the color tag.',
    options: 'any text'
  },
  {
    name: 'itemHeight',
    type: 'string',
    default: '7px',
    description: 'Height of item list.',
    options: 'px | % | em'
  },
  {
    name: 'itemAmount',
    type: 'number',
    default: '5',
    description: 'Number of itens that going to be shown on list.',
    options: 'any number'
  },
  {
    name: 'minLengthSearch',
    type: 'number',
    default: '2',
    description: 'Number of itens that going to be shown on list.',
    options: 'any number'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'null',
    description: 'Placeholder of the input.',
    options: 'any text'
  },
  {
    name: 'openFocus',
    type: 'boolean',
    default: 'null',
    description: 'Controls if the list will be show on input focus.',
    options: 'any text'
  },
  {
    name: 'sortAlphabetically',
    type: 'boolean',
    default: 'false',
    description: 'Controls if the list will be show sorted alphabetically.',
    options: 'true | false'
  },
  {
    name: 'detailOnTag',
    type: 'boolean',
    default: 'false',
    description: 'Controls if the tag will be shown with the detail.',
    options: 'true | false'
  },
  {
    name: 'defaultColorTag',
    type: 'string',
    default: '#66CC99',
    description: 'The background color default for all tags.',
    options: 'Hexadecimal'
  },
  {
    name: 'defaultIconTag',
    type: 'string',
    default: 'null',
    description: 'The icon default for all tags.',
    options: 'FontAwesome Class | IonIcons class'
  },
  ];

