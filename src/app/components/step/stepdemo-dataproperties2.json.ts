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
export const dataPropertiesStepForm = [
  {
    name: 'form',
    type: 'FormGroup',
    default: 'null',
    description: 'Form group to be validated by control steps.',
    options: 'FormGroup'
  },
  {
    name: 'validateForm',
    type: 'boolean',
    default: 'true',
    description: 'Property to control if step should validate form or not.',
    options: 'true | false'
  },
  {
    name: 'label',
    type: 'string',
    default: 'step',
    description: 'Label of step',
    options: 'any text'
  },
  {
    name: 'templateIcon',
    type: 'TemplateRef',
    default: 'null',
    description: 'Template icon to be placed before the label step.',
    options: 'TemplateRef'
  }
];
