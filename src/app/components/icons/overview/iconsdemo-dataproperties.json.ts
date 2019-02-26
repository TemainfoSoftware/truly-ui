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
    name: 'icon',
    type: 'string',
    default: 'null',
    description: 'Icon code.',
    options: 'any text'
  },
  {
    name: 'lib',
    type: 'string',
    default: 'null',
    description: 'Icon Library.',
    options: 'dx: dxicons | fa: font-awesome | ion: ionicons'
  },
  {
    name: 'style',
    type: 'string',
    default: 'fas | dm',
    description: 'Style inside the library.',
    options: 'fas: font-awesome | far: font-awesome | fab: font-awesome | dm: ionicons | ios: ionicons | logo: ionicons'
  },
  {
    name: 'size',
    type: 'string',
    default: '12px',
    description: 'Size of icon.',
    options: 'px | % | em'
  },
  {
    name: 'animation',
    type: 'string',
    default: 'null',
    description: 'Animation of icons.',
    options: 'wrench | ring | horizontal | vertical | flash | bounce | spin | float | pulse | shake | tada | ' +
      'passing | passing-reverse | burst | falling'
  },
  {
    name: 'color',
    type: 'string',
    default: 'null',
    description: 'Changes the default color of the icon.',
    options: 'hex | rgb | rgba'
  },
  {
    name: 'align',
    type: 'string',
    default: 'left',
    description: 'Change icon alignment.',
    options: 'left | right'
  }
];
