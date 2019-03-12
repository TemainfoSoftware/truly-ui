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

import * as json from './calendardemo-dataproperties.json';
import * as jsonEvts from './calendardemo.dataevents.json';

@Component( {
  selector: 'app-calendar',
  templateUrl: './calendardemo.component.html',
  styleUrls: [ './calendardemo.component.scss' ]
} )
export class CalendarDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public month = new Date().getMonth();

  public day = new Date().getDate();

  public year = new Date().getFullYear();

  public status = [
    { id: '1', date: new Date( this.year, this.month, this.day + 3 ), total: 50, current: 15 },
    { id: '2', date: new Date( this.year, this.month, this.day + 5 ), total: 50, current: 40 },
    { id: '3', date: new Date( this.year, this.month, this.day + 10  ), total: 50, current: 10 },
  ];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

  onSelect( $event ) {
    console.log( $event );
  }

}

