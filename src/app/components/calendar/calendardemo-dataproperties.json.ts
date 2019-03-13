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
    name: 'todayButton',
    type: 'boolean',
    default: 'true',
    description: 'Displays a footer with a today button.',
    options: 'true | false'
  },
  {
    name: 'typingDay',
    type: 'boolean',
    default: 'true',
    description: 'Used on datepicker, this property is used to control change of Date Object while typing.',
    options: 'true | false'
  },
  {
    name: 'status',
    type: 'Array<CalendarStatus>',
    default: 'null',
    description: 'Status used as indication on cell',
    options: 'Array<CalendarStatus>'
  },
  {
    name: 'inputControlFocus',
    type: 'TlInput',
    default: 'null',
    description: 'Define a TlInput to control focus of calendar ( used on Datepicker Component ).',
    options: 'TlInput Instance'
  },
  {
    name: 'day',
    type: 'number',
    default: 'Current Day',
    description: 'Property to set Day of calendar will initiate.',
    options: 'true | false'
  },
  {
    name: 'month',
    type: 'number',
    default: 'Current Month',
    description: 'Property to set Month of calendar will initiate.',
    options: 'true | false'
  },
  {
    name: 'year',
    type: 'number',
    default: 'Current Year',
    description: 'Property to set Year of calendar will initiate.',
    options: 'true | false'
  },
];
