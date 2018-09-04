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
  Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { ScheduleDataSource } from './types/datasource.type';
import { StatusType } from './types/status.type';
import { ViewType } from './types/view.type';

@Component( {
  selector: 'tl-schedule',
  templateUrl: './schedule.html',
  styleUrls: [ './schedule.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TlSchedule implements OnInit, OnChanges {

  @Input() defaultView: ViewType = 'day';

  @Input() views: Array<ViewType> = [ 'day', 'dayList' ];

  @Input() statusConfig: StatusType;

  @Input() currentDate = new Date();

  @Input() height = '550px';

  @Input() duration = 30;

  @Input() showNowIndicator = false;

  @Input() slatHightRows = 43;

  @Input() slatNumberRows = 2;

  @Input('events') set events( events: ScheduleDataSource[] ) {
    this._events = [...events].sort(( a, b ) => a.date.start - b.date.start || b.date.end - a.date.end );
  }
  get events () {
    return this._events;
  }

  @Input('startDayHour') set startDayHour( hours: string ) {
    this._startDayHour = hours;
    this.startDayMilliseconds = this.transformHourToMileseconds( hours );
  }
  get startDayHour () {
    return this._startDayHour;
  }

  @Input('endDayHour') set setEndDayHour( hours: string ) {
    this._endDayHour = hours;
    this.endDayMilliseconds = this.transformHourToMileseconds( hours );
  }
  get endDayHour () {
    return this._endDayHour;
  }

  @Output() changeView = new EventEmitter<ViewType>();

  @Output() changeDate = new EventEmitter();

  @Output() rowDbClick = new EventEmitter();

  @Output() eventDbClick = new EventEmitter();

  @Output() eventClick = new EventEmitter();

  @Output() eventMouseover = new EventEmitter();

  @Output() eventMouseout = new EventEmitter();

  @Output() newEventClick = new EventEmitter();

  public startDayMilliseconds: number;

  public endDayMilliseconds: number;

  public slatNumberRowsAsArray: Array<Number>;

  public eventsOfDay: ScheduleDataSource[];

  private _events: ScheduleDataSource[];

  private _startDayHour: string;

  private _endDayHour: string;

  constructor( private changeDetection: ChangeDetectorRef ) {}

  ngOnInit() {
    this.convertSlarNumberToArray();
    this.getEventsOfDay();
    this.changeDetection.detectChanges();
  }

  ngOnChanges( changes: SimpleChanges ) {

    if ( changes['events'] !== undefined ) {
      if ( !changes[ 'events' ].firstChange ) {
        this.refreshStartAndEndDay();
        this.getEventsOfDay();
      }
    }

    if ( changes['currentDate'] !== undefined ) {
      if ( ! changes['currentDate'].firstChange) {
        this.refreshStartAndEndDay();
        this.getEventsOfDay();
      }
    }
    this.changeDetection.detectChanges();
  }

  onChangeView( view: ViewType ) {
    this.defaultView = view;
    this.changeView.emit( view );
  }

  onChangeDate($event) {
    this.currentDate = new Date( $event.year, $event.month, $event.day);
    this.refreshStartAndEndDay();
    this.getEventsOfDay();
    this.changeDate.emit( $event );
    this.changeDetection.detectChanges();
  }

  private transformHourToMileseconds( fullHour: string ) {
    const hourSplited = fullHour.split(':');

    const hours = Number(hourSplited[0]);
    const minutes = Number(hourSplited[1]);
    const year =  this.currentDate.getFullYear();
    const month =  this.currentDate.getMonth();
    const date =  this.currentDate.getDate();

    return new Date(year, month, date, hours, minutes).getTime();
  }

  private refreshStartAndEndDay() {
    this.endDayMilliseconds = this.transformHourToMileseconds( this.endDayHour );
    this.startDayMilliseconds = this.transformHourToMileseconds( this.startDayHour );
  }


  private getEventsOfDay() {

    if ( this.events === undefined ) { return []; }

    this.eventsOfDay = this.events.filter( ( event ) => {
      return ( event.date.start >= this.startDayMilliseconds ) && ( event.date.end <= this.endDayMilliseconds );
    });
  }

  private convertSlarNumberToArray() {
    this.slatNumberRowsAsArray = Array( this.slatNumberRows );
    this.changeDetection.detectChanges();
  }
}
