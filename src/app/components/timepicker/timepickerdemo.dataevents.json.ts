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
export const dataEvents = [
  {
    name: 'changeTime',
    parameters: [
      {
        event: 'time',
        description: 'Time selected'
      },
      {
        event: 'timeZone',
        description: 'Time Zone selected (AM|PM)'
      }
    ],
    description: 'EventEmitter returned when time is changed',
  },
  {
    name: 'now',
    parameters: [
      {
        event: 'time',
        description: 'Time selected'
      },
      {
        event: 'timeZone',
        description: 'Time Zone selected (AM|PM)'
      }
    ],
    description: 'EventEmitter returned when button NOW is clicked',
  },
  {
    name: 'cancel',
    parameters: [
      {
        event: 'selectedTime',
        description: 'Time selected'
      },
      {
        event: 'timeZone',
        description: 'Time Zone selected (AM|PM)'
      }
    ],
    description: 'EventEmitter returned when button CANCEL is clicked',
  },
  {
    name: 'confirm',
    parameters: [
      {
        event: 'selectedTime',
        description: 'Time selected'
      },
      {
        event: 'timeZone',
        description: 'Time Zone selected (AM|PM)'
      }
    ],
    description: 'EventEmitter returned when button CONFIRM is clicked',
  },
];
