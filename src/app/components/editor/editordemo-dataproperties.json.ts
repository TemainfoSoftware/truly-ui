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
    name: 'content',
    type: 'HTML String',
    default: 'null',
    description: 'Defines the content of editor.',
    options: 'HTML String'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of header.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'height',
    type: 'string',
    default: '300px',
    description: 'Editor\'\s height.',
    options: 'px | % | em'
  },
  {
    name: 'toolbarConfig',
    type: 'Object - ToolbarConfig',
    default: 'null',
    description: 'The toolbar config object',
    options: 'Object of type toolbar config'
  },
];
