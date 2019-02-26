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
    name: 'initialFocus',
    type: 'ElementRef',
    default: 'null',
    description: 'Used to set up the initialization focus, what element initialize focused.',
    options: 'ElementRef'
  },
  {
    name: 'textConfirm',
    type: 'string',
    default: 'Ok',
    description: 'Confirmation button text',
    options: 'any string'
  },
  {
    name: 'textCancel',
    type: 'string',
    default: 'Cancel',
    description: 'Cancel button text',
    options: 'any string'
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
    name: 'primaryKey',
    type: 'string',
    default: 'null',
    description: 'Property that set\'s the primary key field in the form, disabling the field.',
    options: 'any text'
  },
  {
    name: 'mode',
    type: 'string',
    default: 'modal',
    description: 'The form mode that will work',
    options: 'modal | inline'
  },
  {
    name: 'formSubmit',
    type: 'Directive',
    default: 'null',
    description: 'Directive to set what button will be the submit one.',
    options: 'Directive'
  },
  {
    name: 'formGroup',
    type: 'FormGroup',
    default: 'null',
    description: 'Bind Angular FormGroup to Truly-UI Form.',
    options: 'FormGroup'
  },
];
