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
    name: 'name',
    type: 'string',
    default: 'null',
    description: 'Name of Radio Group (Used as property [name])',
    options: 'any text'
  },
  {
    name: 'labelGroup',
    type: 'string',
    default: 'null',
    description: 'Label of Radio Group',
    options: 'any text'
  },
  {
    name: 'orientation',
    type: 'string',
    default: 'horizontal',
    description: 'Orientation of the Radios',
    options: 'vertical | horizontal'
  },
  {
    name: 'colorSelected',
    type: 'string',
    default: '#66CC99',
    description: 'Sets Background Color',
    options: 'Hex | RGBA'
  }
  ];
export const dataPropertiesRadioButton = [
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Label of Radio Button',
    options: 'any text'
  },
  {
    name: 'value',
    type: 'string | number',
    default: 'null',
    description: 'Value of Radio Button that going be returned to model',
    options: 'any text'
  },
  {
    name: 'tabindex',
    type: 'number',
    default: '0',
    description: 'Sets index tabbing',
    options: 'any number'
  },
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'Define if the radios button initialize checked or not.',
    options: 'true | false'
  }
  ];
