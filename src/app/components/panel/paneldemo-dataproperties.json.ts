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
    name: 'labelGroup',
    type: 'string',
    default: 'Panel Group',
    description: 'Label of PanelGroup',
    options: 'any text'
  },
  {
    name: 'backgroundColor',
    type: 'string',
    default: 'null',
    description: 'The background color of the PanelGroup',
    options: 'Hex | RGBA'
  },
  {
    name: 'borderColor',
    type: 'string',
    default: 'null',
    description: 'Color of PanelGroup border',
    options: 'Hex | RGBA'
  },
  {
    name: 'width',
    type: 'string',
    default: '100%',
    description: 'Width of panel group.',
    options: 'px | % | em'
  },
  {
    name: 'fontColorCaption',
    type: 'string',
    default: 'null',
    description: 'Font color of caption of the PanelGroup',
    options: 'Hex | RGBA'
  },
  {
    name: 'showButtonAction',
    type: 'boolean',
    default: 'false',
    description: 'Property that shows or not an action button after panel label',
    options: 'true | false'
  },
  {
    name: 'fontSizeCaption',
    type: 'string',
    default: 'null',
    description: 'Font size of caption of the PanelGroup',
    options: 'px | % | em'
  }
  ];
