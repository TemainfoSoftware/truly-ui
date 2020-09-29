/*
 MIT License

 Copyright (c) 2020 Temainfo Software

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
    name: 'width',
    type: 'string',
    default: '260px',
    description: 'Calendar width.',
    options: 'px | % | em'
  },
  {
    name: 'height',
    type: 'string',
    default: '260px',
    description: 'Calendar height.',
    options: 'px | % | em'
  },
  {
    name: 'holidays',
    type: 'Array<CalendarHolidays>',
    default: 'null',
    description: 'Holiday used as indication on cell, can pass a tooltip to describe the holiday',
    options: 'Array<CalendarHolidays>'
  },
  {
    name: 'status',
    type: 'Array<CalendarStatus>',
    default: 'null',
    description: 'Status used as indication on cell',
    options: 'Array<CalendarStatus>'
  },
  {
    name: 'date',
    type: 'Date',
    default: 'Current Day',
    description: 'Date Object to be represented on calendar',
    options: 'Date'
  },
];
