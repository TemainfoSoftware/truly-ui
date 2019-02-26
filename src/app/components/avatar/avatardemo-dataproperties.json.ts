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
    name: 'shape',
    type: 'string',
    default: 'square',
    description: 'Shape of avatar.',
    options: 'square | circle'
  },
  {
    name: 'size',
    type: 'string',
    default: '100px',
    description: 'Size of avatar.',
    options: 'px | % | em'
  },
  {
    name: 'src',
    type: 'string',
    default: 'null',
    description: 'Address of the image.',
    options: 'url image'
  },
  {
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Cheatsheet icon.',
    options: 'cheatsheet icon'
  },
  {
    name: 'text',
    type: 'string',
    default: 'null',
    description: 'Text or letter.',
    options: 'any text'
  },
  {
    name: 'gravatar',
    type: 'string',
    default: 'null',
    description: 'Gravatar email.',
    options: 'email gravatar'
  },
  {
    name: 'gender',
    type: 'string',
    default: 'female',
    description: 'Define gender of avatar.',
    options: 'male | female'
  },
  {
    name: 'bgColor',
    type: 'string',
    default: 'null',
    description: 'Changes the default color of the background.',
    options: 'hex | rgb | rgba'
  },
  {
    name: 'fontColor',
    type: 'string',
    default: 'null',
    description: 'Changes the default color of the font.',
    options: 'hex | rgb | rgba'
  }
];
