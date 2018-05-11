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
import {
  Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit,
  AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { ScheduleDataSource } from './types/datasource.type';

@Component( {
  selector: 'tl-schedule',
  templateUrl: './schedule.html',
  styleUrls: [ './schedule.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TlSchedule implements OnInit {

   @Input() currentView: 'day' | 'week' | 'month' | 'workWeek' | 'dayList' | 'weekList'  = 'day';

  // @Input() views: Array<string>; // ["day", "week", "workWeek", "month", "dayList", "weekList"],

  @Input() currentDate = new Date().getTime();

  @Input() height = '550px';

  @Input() duration = 30;

  @Input('endDayHour') set setEndDayHour(hour: string) {
    const endHourSplited = hour.split(':');
    this.endDayMilliseconds = new Date(2018, 4, 11, Number(endHourSplited[0]), Number( endHourSplited[1])).getTime();
  }

  @Input('startDayHour') set startDayHour( hour: string ) {
    const startHourSplited = hour.split(':');
    this.startDayMilliseconds = new Date(2018, 4, 11, Number(startHourSplited[0]), Number( startHourSplited[1])).getTime();
  }

  @Input('dataSource') set dataSource( dataSource: ScheduleDataSource[] ) {
    this._dataSource = dataSource.sort(( a, b ) => a.date.start - b.date.start || b.date.end - a.date.end );
    this.generateEventsPositions();
  }
  get dataSource () {
    return this._dataSource;
  }

  @Output() rowClick = new EventEmitter();

  public startDayMilliseconds: number;

  public endDayMilliseconds: number;

  public eventsPositionsByStart = [];

  public eventsPositionsByEnd = [];

  private _dataSource: ScheduleDataSource[];

  constructor() {}

  ngOnInit() {}

  private generateEventsPositions() {
    this.dataSource.forEach((value ) => {
      if (this.eventsPositionsByStart.indexOf(value.date.start) < 0 ) {
       this.eventsPositionsByStart[value.date.start] = [];
      }
      if (this.eventsPositionsByEnd.indexOf(value.date.end) < 0 ) {
        this.eventsPositionsByEnd[value.date.end] = [];
      }
    });
    this.dataSource.forEach((value ) => {
      if (this.eventsPositionsByStart.indexOf(value.date.start) < 0 ) {
        this.eventsPositionsByStart[value.date.start].push(value);
      }
      if (this.eventsPositionsByEnd.indexOf(value.date.end) < 0 ) {
        this.eventsPositionsByEnd[value.date.end].push(value);
      }
    });

   console.log(this.eventsPositionsByStart, this.eventsPositionsByEnd);
  }
}
