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
import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ScheduleDataSource } from './types/datasource.type';

@Component( {
  selector: 'tl-schedule',
  templateUrl: './schedule.html',
  styleUrls: [ './schedule.scss' ]
} )
export class TlSchedule implements OnInit, OnChanges {

  @Input() currentDate: number;

  @Input() currentView: 'day' | 'week' | 'month';

  @Input() dataSource: ScheduleDataSource[];

  @Input() views: Array<string>; // ["day", "week", "workWeek", "month"],

  @Input() height = '300px';

  @Input() duration = 30;

  @Input() startDayHour = '08:00';

  @Input() endDayHour = '18:00';

  @Output() rowClick = new EventEmitter();

  public timesCollection: Array<Date> = [];

  ngOnInit() {
   this.generateTimes();
  }

  ngOnChanges(changes: SimpleChanges) {}

  private generateTimes() {

    const MIN_TO_MILLESECOND = 60000;

    const startHourSplited = this.startDayHour.split(':');
    const startHour_ms = new Date(2018, 4, 2, Number(startHourSplited[0]), Number( startHourSplited[1])).getTime();

    const endHourSplited = this.endDayHour.split(':');
    const endHour_ms = new Date(2018, 4, 2, Number(endHourSplited[0]), Number( endHourSplited[1])).getTime();

    let currentHour_ms = startHour_ms;
    let nextHourBreak_ms = new Date(2018, 4, 2, Number(startHourSplited[0]), Number( startHourSplited[1])).getTime();

    while (currentHour_ms < endHour_ms) {
       if ( currentHour_ms === nextHourBreak_ms  ) {
         this.timesCollection.push( new Date(nextHourBreak_ms) );
         nextHourBreak_ms =  nextHourBreak_ms + (this.duration * MIN_TO_MILLESECOND);
       }
      currentHour_ms++;
    }
  }
}

