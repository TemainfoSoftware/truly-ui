/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
    name: 'color',
    type: 'string',
    default: 'primary',
    description: 'Changes the default color of the progress bar.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'progress',
    type: 'number',
    default: '0',
    description: 'Number of current value progress.',
    options: 'any number'
  },
  {
    name: 'start',
    type: 'number',
    default: '0',
    description: 'Value that represents the start of progress bar.',
    options: 'any number'
  },
  {
    name: 'end',
    type: 'number',
    default: '100',
    description: 'Value that represents the end of progress bar',
    options: 'any number'
  },
  {
    name: 'mode',
    type: 'string',
    default: 'determinate',
    description: 'The mode of progress bar works, with determinate value (start and end) or infinite progress bar (loader).',
    options: 'determinate | indeterminate'
  },
];
