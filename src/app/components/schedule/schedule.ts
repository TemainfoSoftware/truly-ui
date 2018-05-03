import { Element } from '@angular/compiler';
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


  @Input() currentDate = new Date().getTime();

  @Input() currentView: 'day' | 'week' | 'month';

  @Input() dataSource: ScheduleDataSource[];

  @Input() views: Array<string>; // ["day", "week", "workWeek", "month"],

  @Input() height = '300px';

  @Input() duration = 30;

  @Input() startDayHour = '08:00';

  @Input() endDayHour = '22:30';

  @Output() rowClick = new EventEmitter();

  @ViewChild('scheduleSlats') scheduleSlats: ElementRef;

  public timesCollection: Array<Date> = [];

  public nowIndicatorPositionTop: number;

  private startDayMilliseconds: number;

  private endDayMilliseconds: number;

  constructor( private changeDetectionRef: ChangeDetectorRef ) {}

  ngOnInit() {
    this.setStartDayMilliseconds();
    this.setEndDayMilliseconds();
    this.generateTimes();
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {
    this.inicializeNowIndicator();
  }

  private inicializeNowIndicator() {
    this.nowIndicatorPositionTop = this.getPositionIndicator();
    this.changeDetectionRef.detectChanges();

    setInterval(() => {
      this.nowIndicatorPositionTop = this.getPositionIndicator();
      this.changeDetectionRef.detectChanges();
    }, 10000);
  }

  private getPositionIndicator() {
    const heightBody = this.scheduleSlats.nativeElement.offsetHeight;
    const currentDate = new Date().getTime() - this.startDayMilliseconds;

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

  private setStartDayMilliseconds() {
    const startHourSplited = this.startDayHour.split(':');
    this.startDayMilliseconds = new Date(2018, 4, 3, Number(startHourSplited[0]), Number( startHourSplited[1])).getTime();
  }

  private setEndDayMilliseconds() {
    const endHourSplited = this.endDayHour.split(':');
    this.endDayMilliseconds = new Date(2018, 4, 3, Number(endHourSplited[0]), Number( endHourSplited[1])).getTime();
  }
}

