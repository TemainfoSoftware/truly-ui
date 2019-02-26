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
    name: 'group',
    type: 'string',
    default: 'null',
    description: 'Key that will display menu group.',
    options: 'string'
  },
  {
    name: 'filterEmptyMessage',
    type: 'string',
    default: 'Nothing to Show',
    description: 'Text that will display when the search return null.',
    options: 'string'
  },
  {
    name: 'maxHeight',
    type: 'string',
    default: '800px',
    description: 'Max height of menu box.',
    options: 'px | %'
  },
  {
    name: 'inputPlaceholder',
    type: 'string',
    default: 'Search...',
    description: 'Text of input search placeholder',
    options: 'string'
  },
  {
    name: 'titleMenu',
    type: 'string',
    default: 'Main Menu',
    description: 'Text of menu title',
    options: 'string'
  },
  {
    name: 'operationMode',
    type: 'string',
    default: 'hover',
    description: 'Mode that menu operates',
    options: 'click | hover'
  },
  {
    name: 'mode',
    type: 'string',
    default: 'simple',
    description: 'Type of menu',
    options: 'simple | advanced'
  },
  {
    name: 'subItem',
    type: 'string',
    default: 'null',
    description: 'Key that will display subItem.',
    options: 'string'
  },
  {
    name: 'dockWidth',
    type: 'string',
    default: '40px',
    description: 'Width of menu when menu is docked.',
    options: 'px | %'
  },
  {
    name: 'width',
    type: 'string',
    default: '200px',
    description: 'Width of menu when not docked.',
    options: 'px | %'
  },
  {
    name: 'docked',
    type: 'boolean',
    default: 'false',
    description: 'Property to toggle bind docked menu.',
    options: 'px | %'
  },
  {
    name: 'charsToSearch',
    type: 'number',
    default: '2',
    description: 'Determine number of chars that going to be used to search on AdvancedMenu.',
    options: 'number'
  },
  {
    name: 'link',
    type: 'string',
    default: 'null',
    description: 'Router link string used to navigate.',
    options: 'string [routerLink]'
  },
  {
    name: 'itemHeight',
    type: 'string',
    default: '30px',
    description: 'Line item height',
    options: 'string'
  },
  {
    name: 'widthRootMenu',
    type: 'string',
    default: '250px',
    description: 'Width of root menu',
    options: 'px | %'
  },
  {
    name: 'outsideBorder',
    type: 'boolean',
    default: 'false',
    description: 'Controls if the menu box will show border or not',
    options: 'true | false'
  },
  {
    name: 'alwaysActive (object)',
    type: 'boolean',
    default: 'false',
    description: 'Object key to set colorized item',
    options: 'true | false'
  },

 ];
