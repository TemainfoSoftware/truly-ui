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
import { Component } from '@angular/core';

import * as json from './time-available-pickerdemo-dataproperties.json';
import * as jsonEvts from './time-available-pickerdemo.dataevents.json';

@Component( {
selector : 'app-time-available-picker',
templateUrl : './time-available-pickerdemo.component.html',
styleUrls : [ './time-available-pickerdemo.component.scss' ],
} )
export class TimeAvailablePickerDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public data = [
    {
      start: new Date( 1999, 1, 1, 8, 0 ),
      end: new Date( 1999, 1, 1, 8, 30 ),
    },
    {
      start: new Date( 1999, 1, 1, 8, 30 ),
      end: new Date( 1999, 1, 1, 9, 0 ),
    },
    {
      start: new Date( 1999, 1, 1, 9, 0 ),
      end: new Date( 1999, 1, 1, 9, 30 ),
    },
    {
      start: new Date( 1999, 1, 1, 9, 30 ),
      end: new Date( 1999, 1, 1, 10, 0 ),
    },
    {
      start: new Date( 1999, 1, 1, 10, 0 ),
      end: new Date( 1999, 1, 1, 10, 30 ),
    },
    {
      start: new Date( 1999, 1, 1, 10, 30 ),
      end: new Date( 1999, 1, 1, 11, 0 ),
    },
    {
      start: new Date( 1999, 1, 1, 11, 0 ),
      end: new Date( 1999, 1, 1, 11, 30 ),
    },
  ];

  public value = [
    {
      start: new Date( 1999, 1, 1, 9, 0 ),
      end: new Date( 1999, 1, 1, 9, 30 ),
    },
    {
      start: new Date( 1999, 1, 1, 9, 30 ),
      end: new Date( 1999, 1, 1, 10, 0 ),
    },
  ];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

  onChangeSelect($event) {
    console.log('Change Time', $event);
  }
}

