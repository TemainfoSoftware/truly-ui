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
    name: 'blockuiConfig',
    type: 'Object',
    default: 'null',
    description: 'Object config blockUI.',
    options: 'Object'
  },
  {
    name: 'dimensionsFrom',
    type: 'string',
    default: 'client',
    description: 'Choose which element to take the dimensions of Hight and Width',
    options: 'parent | client'
  },
  {
    name: 'blockuiConfig.spin',
    type: 'boolean',
    default: 'false',
    description: 'Handle that control if icon will spin or not.',
    options: 'true | false'
  },
  {
    name: 'blockuiConfig.icon',
    type: 'string',
    default: 'fas fa-sync-alt',
    description: 'Icon to be shown.',
    options: 'icon class'
  },
  {
    name: 'blockuiConfig.message',
    type: 'string',
    default: 'null',
    description: 'Message that will appear bellow the icon.',
    options: 'any text'
  }
];
