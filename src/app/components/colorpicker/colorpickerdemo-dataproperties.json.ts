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
    name: 'mode',
    type: 'string',
    default: 'input',
    description: 'Define a view.',
    options: 'inline | onlyColor | fromOrigin | input'
  },
  {
    name: 'elementOrigin',
    type: 'element',
    default: 'null',
    description: 'Define a element of origin.',
    options: 'variable local'
  },
  {
    name: 'recentColors',
    type: 'bollean',
    default: 'false',
    description: 'Display recent colors.',
    options: 'true | false'
  },
  {
    name: 'returnFormatColor',
    type: 'bollean',
    default: 'false',
    description: 'Display color code.',
    options: 'true | false'
  },
  {
    name: 'copyButton',
    type: 'bollean',
    default: 'false',
    description: 'Display copy button.',
    options: 'true | false'
  },
  {
    name: 'label',
    type: 'string',
    default: 'null',
    description: 'Create a label together with Input Element',
    options: 'any text'
  },
  {
    name: 'labelSize',
    type: 'string',
    default: '100px',
    description: 'Width of label text',
    options: 'px | % | em'
  }
];
