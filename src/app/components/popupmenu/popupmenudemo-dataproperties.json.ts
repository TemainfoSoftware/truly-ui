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
    name: 'items',
    type: 'Array<Object>',
    default: 'null',
    description: 'List of items that will fill menu.',
    options: 'Array<Object>'
  },
  {
    name: 'label',
    type: 'string',
    default: 'basic',
    description: 'Key that will display menu label.',
    options: 'string'
  },
  {
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Key that will display menu icon.',
    options: 'string'
  },
  {
    name: 'subItem',
    type: 'string',
    default: 'null',
    description: 'Key that will display subItem.',
    options: 'string'
  },
  {
    name: 'trigger',
    type: 'HTMLElement',
    default: 'null',
    description: 'Element that will trigger menu to the Target.',
    options: 'HTMLElement'
  },
  {
    name: 'target',
    type: 'HTMLElement',
    default: 'null',
    description: 'The Element target.',
    options: 'HTMLElement'
  },
  {
    name: 'positionY',
    type: 'string',
    default: 'bellow',
    description: 'Position Y of menu.',
    options: 'bellow | above'
  },
  {
    name: 'positionX',
    type: 'string',
    default: 'before',
    description: 'Position X of menu.',
    options: 'after | before'
  },
  {
    name: 'overlapTrigger',
    type: 'boolean',
    default: 'false',
    description: 'Property to control overlapping of target/trigger.',
    options: 'true | false'
  },
  {
    name: 'hover',
    type: 'boolean',
    default: 'false',
    description: 'Property to control if will trigger menu on hover.',
    options: 'true | false'
  },
  ];
