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
    name: 'text',
    type: 'string',
    default: 'null',
    description: 'Displays a text button.',
    options: 'any text'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of the button.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'width',
    type: 'string',
    default: '125px',
    description: 'Button width.',
    options: 'px | % | em'
  },
  {
    name: 'height',
    type: 'string',
    default: '39',
    description: 'Button height.',
    options: 'px | % | em'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button if set to true.',
    options: 'true | false'
  },
  {
    name: 'iconAddonBefore',
    type: 'string',
    default: 'null',
    description: 'Creates an icon in the addon before the text button.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'iconAddonAfter',
    type: 'string',
    default: 'null',
    description: 'Creates an icon in the addon after the text button.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'iconBeforeText',
    type: 'string',
    default: 'null',
    description: 'Creates an icon before the text button.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'iconAfterText',
    type: 'string',
    default: 'null',
    description: 'Creates an icon after the text button.',
    options: 'ion ion-printer | fas fa-home | any'
  },
  {
    name: 'mdResult',
    type: 'string',
    default: 'null',
    description: 'Return value class when set inside a Modal Component.',
    options: 'MRFREE | MRCUSTOM | MROK | MRCANCEL | MRABORT | MRRETRY | MRIGNORE | MRYES | MRNO | MRCLOSE'
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    description: 'When passed as TRUE the button is disable and activates an icon and load text.',
    options: 'false | true'
  },
  {
    name: 'loaderColor',
    type: 'string',
    default: '#ccc',
    description: 'Color of loader.',
    options: 'HEX'
  },
  {
    name: 'template',
    type: 'TemplateRef<any>',
    default: 'null',
    description: 'TemplateRef to be renderer inside of button',
    options: 'TemplateRef<any>'
  },
  {
    name: 'outline',
    type: 'boolean',
    default: 'false',
    description: 'When passed as TRUE the button will be ghost mode, just the outline colors and font.',
    options: 'false | true'
  },
  {
    name: 'textLoading',
    type: 'string',
    default: 'null',
    description: 'Change default text loading.',
    options: 'Any Text'
  }
];
