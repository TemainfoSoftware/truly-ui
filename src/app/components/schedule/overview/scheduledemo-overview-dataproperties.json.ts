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
    name: 'defaultView',
    type: 'string',
    default: 'day',
    description: 'Defines the default View of the Schedule.',
    options: 'day | week | month | workWeek | dayList | weekList'
  },
  {
    name: 'views',
    type: 'Array<string>',
    default: '[\'day\', \'dayList\']',
    description: 'Defines which views will be used in Schedule.',
    options: 'day | week | month | workWeek | dayList | weekList'
  },
  {
    name: 'statusConfig',
    type: 'Array<StatusType>',
    default: 'Current Day',
    description: 'Configures the status types that will be part of Schedule.',
    options: '{\n' + '  status: string;\n' + '  color: string;\n' + '  description: string;\n' + '}'
  },
  {
    name: 'currentDate',
    type: 'date',
    default: 'new Date()',
    description: 'Sets a default date at the time Schedule is created.',
    options: 'new Date()'
  },
  {
    name: 'height',
    type: 'string',
    default: '550px',
    description: 'Schedule Height.',
    options: 'px | % | em'
  },
  {
    name: 'duration',
    type: 'number',
    default: '30',
    description: 'Default interval between one schedule and the other. In Mininutes',
    options: 'any number'
  },
  {
    name: 'showNowIndicator',
    type: 'boolean',
    default: 'false',
    description: 'Hide / Show Current Time Indicator in Schedule',
    options: 'true | false'
  },
  {
    name: 'slatHightRows',
    type: 'number',
    default: '43',
    description: 'Sets the Slat height between the times. In Pixel',
    options: 'any number'
  },
  {
    name: 'slatNumberRows',
    type: 'number',
    default: '2',
    description: 'Number of Slats between hours',
    options: 'any number'
  },
  {
    name: 'events',
    type: 'Array<ScheduleDataSource>',
    default: '[]',
    description: 'Schedule Events',
    options: ''
  },
  {
    name: 'startDayHour',
    type: 'string',
    default: '',
    description: 'Start time of Agenda in Daily schedules',
    options: 'any string with hour format ex(00:00)'
  },
  {
    name: 'endDayHour',
    type: 'string',
    default: '',
    description: 'End time of Agenda in Daily schedules',
    options: 'any string with hour format ex(00:00)'
  },
];
