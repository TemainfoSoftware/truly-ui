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
export class TlSchedule implements OnInit, AfterViewInit, OnChanges {

  // @Input() currentView: 'day' | 'week' | 'month';

  // @Input() views: Array<string>; // ["day", "week", "workWeek", "month"],

  @Input() currentDate = new Date().getTime();

  @Input() height = '550px';

  @Input() duration = 30;

  @Input('endDayHour') set setEndDayHour(hour: string) {
    const endHourSplited = hour.split(':');
    this.endDayMilliseconds = new Date(2018, 4, 7, Number(endHourSplited[0]), Number( endHourSplited[1])).getTime();
  }

  @Input('startDayHour') set startDayHour( hour: string ) {
    const startHourSplited = hour.split(':');
    this.startDayMilliseconds = new Date(2018, 4, 7, Number(startHourSplited[0]), Number( startHourSplited[1])).getTime();
  }

  @Input('dataSource') set dataSource( dataSource: ScheduleDataSource[] ) {
    this._dataSource = dataSource.sort(( a, b ) =>  a.date.start - b.date.start );
    this.generateEventsPositions();
  }
  get dataSource () {
    return this._dataSource;
  }

  @Output() rowClick = new EventEmitter();

  @ViewChild('scheduleSlats') scheduleSlats: ElementRef;

  public timesCollection: Array<Date> = [];

  public nowIndicatorPositionTop: number;

  private _dataSource: ScheduleDataSource[];

  private startDayMilliseconds: number;

  private endDayMilliseconds: number;

  private eventsPositionsByStart = [];

  private eventsPositionsByEnd = [];


  constructor( private changeDetectionRef: ChangeDetectorRef ) {}

  ngOnInit() {
    this.generateTimes();
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {
    this.inicializeNowIndicator();

    // console.log('STARTDAY', this.startDayMilliseconds, new Date(this.startDayMilliseconds));
    // console.log('ENDDAY', this.endDayMilliseconds, new Date(this.endDayMilliseconds));
    // console.log('CURRENTDAY', new Date().getTime());
    //
    // console.log('CALC CURRENT',  new Date().getTime() - this.startDayMilliseconds );
    // console.log('CAL FACTOR', this.endDayMilliseconds - this.startDayMilliseconds );
    //
    // console.log('HEIGHT:', this.scheduleSlats.nativeElement.offsetHeight);
    // console.log('FINAL TOP: ',this.nowIndicatorPositionTop );
  }

  public calcPositionEvent(index, event: ScheduleDataSource) {

    const BOTTOM_POSITION = this.convertMillisecondsToPixel(event.date.end) * -1;
    const TOP_POSITION    = this.convertMillisecondsToPixel(event.date.start);

    const LEFT_POSITION = this.calcLeftPosition(index, event);
    const RIGHT_POSITION = this.calcRightPosition(index, event);

    return {top: TOP_POSITION + 'px', left: LEFT_POSITION + '%', right: RIGHT_POSITION + '%', bottom: BOTTOM_POSITION  + 'px'};
  }

  calcLeftPosition( index: number, event: ScheduleDataSource ) {

    // Algoritim 001
    if (  (this.eventsPositionsByEnd[event.date.end].indexOf(event) === 0) && ( this.eventsPositionsByEnd[event.date.end].length === 1) ) {
      const lenghtFromTimestamp = this.eventsPositionsByStart[event.date.start].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return (indexOf) * divisor;
    }

    // Algoritim 002
    if (
      (( this.eventsPositionsByEnd[event.date.end].length > 1))
      && (this.eventsPositionsByStart[event.date.start].length === this.eventsPositionsByEnd[event.date.end].length)
    ) {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[event.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return (indexOf) * divisor;
    }

    // Algoritim 003
    if ( ( this.eventsPositionsByEnd[event.date.end].indexOf(event) > 0 )
      && ( this.eventsPositionsByEnd[event.date.end].length > 1)
      && ( this.eventsPositionsByEnd[event.date.end].length > this.eventsPositionsByStart[event.date.start].length)
    )  {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[event.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return (indexOf + 1) * divisor;
    }

    // Algoritim 004
    if (
        (( this.eventsPositionsByEnd[event.date.end].indexOf(event) === 0 ) && ( this.eventsPositionsByEnd[event.date.end].length > 1))
        && (this.eventsPositionsByStart[event.date.start].length > this.eventsPositionsByEnd[event.date.end].length)
       ) {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[this.dataSource[ index - 1 ].date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return (indexOf) * divisor;
    }

    // Algoritim 005
    if (
      (( this.eventsPositionsByEnd[event.date.end].indexOf(event) > 0 ) && ( this.eventsPositionsByEnd[event.date.end].length > 1))
      && (this.eventsPositionsByStart[event.date.start].length > this.eventsPositionsByEnd[event.date.end].length)
    ) {
      const nextRow = this.dataSource[ this.eventsPositionsByEnd[event.date.end].length + index ];
      const lenghtFromTimestamp = this.eventsPositionsByEnd[nextRow.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return (indexOf + 1) * divisor;
    }

    // Algoritim 006
    if (  ( this.eventsPositionsByEnd[event.date.end].indexOf(event) === 0 ) && ( this.eventsPositionsByEnd[event.date.end].length > 1)) {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[event.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return (indexOf) * divisor;
    }



  }

  calcRightPosition( index: number, event: ScheduleDataSource ) {

    // Algoritim 001
    if (  (this.eventsPositionsByEnd[event.date.end].indexOf(event) === 0) && ( this.eventsPositionsByEnd[event.date.end].length === 1) ) {
      const lenghtFromTimestamp = this.eventsPositionsByStart[event.date.start].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return ((lenghtFromTimestamp - 1 - indexOf) * divisor);
    }

    // Algoritim 002
    if ( ( this.eventsPositionsByEnd[event.date.end].length > 1)
      && (this.eventsPositionsByStart[event.date.start].length === this.eventsPositionsByEnd[event.date.end].length)
    ) {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[event.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return ((lenghtFromTimestamp - 1 - indexOf) * divisor);
    }


    // Algoritim 003
    if ( ( this.eventsPositionsByEnd[event.date.end].indexOf(event) > 0 )
        && ( this.eventsPositionsByEnd[event.date.end].length > 1)
        && ( this.eventsPositionsByEnd[event.date.end].length > this.eventsPositionsByStart[event.date.start].length)
      )  {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[event.date.end].length;

      const indexOf = this.eventsPositionsByEnd[event.date.end].indexOf(event);
      const lenght = this.eventsPositionsByStart[event.date.start].length;
      const divisor = 100 / lenghtFromTimestamp ;

      return (( lenght - indexOf ) * divisor);
    }

    // Algoritim 004
    if (
      (( this.eventsPositionsByEnd[event.date.end].indexOf(event) === 0 ) && ( this.eventsPositionsByEnd[event.date.end].length > 1))
      && (this.eventsPositionsByStart[event.date.start].length > this.eventsPositionsByEnd[event.date.end].length)
    ) {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[this.dataSource[ index - 1 ].date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      console.log(lenghtFromTimestamp, indexOf, divisor, );

      return ((indexOf + 1) * divisor);
    }

    // Algoritim 005
    if (
      (( this.eventsPositionsByEnd[event.date.end].indexOf(event) > 0 ) && ( this.eventsPositionsByEnd[event.date.end].length > 1))
      && (this.eventsPositionsByStart[event.date.start].length > this.eventsPositionsByEnd[event.date.end].length)
    ) {

      const nextRow = this.dataSource[ this.eventsPositionsByEnd[event.date.end].length + index ];
      const lenghtFromTimestamp = this.eventsPositionsByEnd[nextRow.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const lenght = this.eventsPositionsByStart[event.date.start].length;
      const divisor = 100 / lenghtFromTimestamp ;

      console.log(lenghtFromTimestamp, indexOf, divisor, );

      return ((lenght - (indexOf + 1)) * divisor);
    }

    // Algoritim 006
    if (  ( this.eventsPositionsByEnd[event.date.end].indexOf(event) === 0 ) && ( this.eventsPositionsByEnd[event.date.end].length > 1))  {
      const lenghtFromTimestamp = this.eventsPositionsByEnd[event.date.end].length;

      const indexOf = this.eventsPositionsByStart[event.date.start].indexOf(event);
      const divisor = 100 / lenghtFromTimestamp ;

      return ((lenghtFromTimestamp - 1 - indexOf) * divisor);
    }

  }

  private inicializeNowIndicator() {
    this.nowIndicatorPositionTop = this.convertMillisecondsToPixel();
    this.changeDetectionRef.detectChanges();

    setInterval(() => {
      this.nowIndicatorPositionTop = this.convertMillisecondsToPixel();
      this.currentDate = new Date().getTime();
   //   this.changeDetectionRef.detectChanges();
    }, 1000);
  }

  private convertMillisecondsToPixel(date = new Date().getTime()) {
    const heightBody = this.scheduleSlats.nativeElement.offsetHeight;
    const currentDate = date - this.startDayMilliseconds;

    return ( heightBody * currentDate ) / ( this.endDayMilliseconds - this.startDayMilliseconds);
  }

  private generateTimes() {
    const MIN_TO_MILLESECOND = 60000;

    let currentHour_ms = this.startDayMilliseconds;
    let nextHourBreak_ms = this.startDayMilliseconds;

    while ( currentHour_ms < this.endDayMilliseconds ) {
       if ( currentHour_ms === nextHourBreak_ms  ) {
         this.timesCollection.push( new Date(nextHourBreak_ms) );
         nextHourBreak_ms =  nextHourBreak_ms + (this.duration * MIN_TO_MILLESECOND);
       }
      currentHour_ms++;
    }
  }

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

// startIn: [{
//     1231231231312: [
//       {
//         value: '1',
//         title: 'William Aguera',
//         detail: 'Consulta | Particular',
//         allday: false,
//         date: { start: new Date().getTime() , end: new Date().getTime() + 1800000 }
//       },
//       {
//         value: '2',
//         title: 'William Aguera',
//         detail: 'Consulta | Particular',
//         allday: false
//       }
//     ],
//     616161616161: [
//       {
//         value: '1',
//         title: 'William Aguera',
//         detail: 'Consulta | Particular',
//         allday: false
//       },
//       {
//         value: '2',
//         title: 'William Aguera',
//         detail: 'Consulta | Particular',
//         allday: false
//       }
//     ]
// }]
