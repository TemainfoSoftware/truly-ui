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
export const data = [
    {
      name: 'label',
      type: 'string',
      default: 'null',
      description: 'Create a label together with Input Element',
      options: 'any text'
    },
    {
      name: 'name',
      type: 'string',
      default: 'null',
      description: 'Define the name attribute of input, used on form as form control name.',
      options: 'any text'
    },
    {
      name: 'labelSize',
      type: 'string',
      default: '100px',
      description: 'Width of label text',
      options: 'px | % | em'
    },
    {
      name: 'labelPlacement',
      type: 'string',
      default: 'left',
      description: 'Label Position',
      options: 'top | left'
    },
    {
      name: 'clearButton',
      type: 'boolean',
      default: 'false',
      description: 'Display an icon to clear any Input Value',
      options: 'true | false'
    },
    {
      name: 'autoClose',
      type: 'boolean',
      default: 'false',
      description: 'Controls if ClockPicker will be closed as soon as time is selected.',
      options: 'true | false'
    },
    {
      name: 'iconTimepicker',
      type: 'boolean',
      default: 'false',
      description: 'Controls if will be shown the ClockPicker icon.',
      options: 'true | false'
    },
    {
      name: 'buttonDoneMessage',
      type: 'string',
      default: 'Done',
      description: 'Description of Button \'Done \'',
      options: 'any text'
    },
    {
      name: 'showButtonDone',
      type: 'boolean',
      default: 'true',
      description: 'Controls if will be shown the ClockPicker Button \'Done\'.',
      options: 'any text'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Display an input with not selectable text (disabled)',
      options: 'true | false'
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Display an input with selectable text (only read)',
      options: 'true | false'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: 'null',
      description: 'Display a help text on Input',
      options: 'any text'
    },
  ];
