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
    name: 'availableTimes',
    type: 'Array<DateRange>',
    default: 'null',
    description: 'Array of available times.',
    options: 'Array<DateRange>'
  },
  {
    name: 'width',
    type: 'number',
    default: '300',
    description: 'The Box width.',
    options: 'number pixels'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Color name of component theme',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'dateValue',
    type: 'Date',
    default: 'current date',
    description: 'Date object to set day on component',
    options: 'Date'
  },
  {
    name: 'value',
    type: 'Array<DateRange>',
    default: 'null',
    description: 'Value of selected times',
    options: 'Array<DateRange>'
  },
];
