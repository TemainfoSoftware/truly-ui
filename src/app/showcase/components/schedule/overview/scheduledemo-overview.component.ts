/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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

import * as json from './scheduledemo-overview-dataproperties.json';
import * as jsonEvts from './scheduledemo-overview.dataevents.json';

@Component( {
  selector : 'app-schedule',
  templateUrl : './scheduledemo-overview.component.html',
  styleUrls : [ './scheduledemo-overview.component.scss' ]
} )
export class ScheduleDemoOverviewComponent {

  public dataTableProperties;

  public dataEvents;

  public dataSource = [{
    value: '1',
    title: 'William Aguera',
    detail: 'Consulta | Particular',
    allday: false,
    date: { start: 51510515, end: 51510515 }
  },
  {
    value: '2',
    title: 'Maicon Aguera',
    detail: 'Consulta | Unimed',
    allday: false,
    date: { start: 51510515, end: 12312312312 }
  }];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }


}

