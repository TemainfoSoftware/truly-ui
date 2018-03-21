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
    name: 'initialFocus',
    type: 'ElementRef',
    default: 'null',
    description: 'Used to set up the initialization focus, what element initialize focused.',
    options: 'ElementRef'
  },
  {
    name: 'showConfirmOnChange',
    type: 'boolean',
    default: 'false',
    description: 'Controls if will shows up the confirmation message after the form changes.',
    options: 'true | false'
  },
  {
    name: 'messageDialogConfirmation',
    type: 'string',
    default: 'null',
    description: 'The message of the confirmation dialog (used with showConfirmOnChange property).',
    options: 'any text'
  },
  {
    name: 'modalOptions.icon',
    type: 'string',
    default: 'null',
    description: 'Icon of Window',
    options: 'ion-printer | fa fa-home | any'
  },
  {
    name: 'formSubmit',
    type: 'Directive',
    default: 'Directive',
    description: 'Directive to set what button will be the submit one.',
    options: 'Directive'
  },
  {
    name: 'modalOptions.title',
    type: 'string',
    default: 'My Modal',
    description: 'Title of window dialog.',
    options: 'any text'
  },
  {
    name: 'modalOptions.color',
    type: 'string',
    default: '#53C68C',
    description: 'Color of window dialog header.',
    options: 'Hex | RGBA'
  },
  {
    name: 'modalOptions.width',
    type: 'string',
    default: '500px',
    description: 'Width of window dialog.',
    options: 'px | % | em'
  },
  {
    name: 'modalOptions.height',
    type: 'string',
    default: '500px',
    description: 'Height of window dialog.',
    options: 'px | % | em'
  },
  {
    name: 'modalOptions.draggable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is draggrable or not.',
    options: 'true | false'
  },
  {
    name: 'modalOptions.maximizable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is maximizable or not.',
    options: 'true | false'
  },
  {
    name: 'modalOptions.minimizable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is minimizable or not.',
    options: 'true | false'
  },
  {
    name: 'modalOptions.closable',
    type: 'boolean',
    default: 'true',
    description: 'Control if window dialog is closable or not.',
    options: 'true | false'
  },

  ];
