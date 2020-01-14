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
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  TemplateRef, ViewChild
} from '@angular/core';
import { ScheduleDataSource } from './types/datasource.type';
import { StatusType } from './types/status.type';
import { ViewType } from './types/view.type';
import { SlotSettingsType } from './types/slot-settings.type';
import { WorkScaleType } from './types/work-scale.type';
import { WorkScaleService } from './services/work-scale.service';
import { EventService } from './services/event.service';
import { ScheduleI18n } from './i18n/schedule-i18n';
import { HolidaysType } from './types/holidays.type';
import { HolidayService } from './services/holiday.service';
import { GenerateEventsService } from './services/generate-events.service';

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

  @Input() typesConfig: any;

  @Input() currentDate = new Date();

  @Input() height = '550px';

  @Input() slotSettings: SlotSettingsType = new SlotSettingsType(  2, 43);

  @Input() workScale: WorkScaleType | WorkScaleType[] = new WorkScaleType( '08:00', '18:00', 30 );

  @Input() showNowIndicator = false;

  @Input() texts = ScheduleI18n;

  @Input() isLoading = false;

  @Input() eventButtonTemplate: TemplateRef<any>;

  @Input() holidays: Array<HolidaysType> = [];

  @Input() allowScheduleInHolidays = false;

  @Input('events') set events( events: ScheduleDataSource[]) {
    if ( !events) {
      this._events = [];
    } else {
      this._events = [...events].sort(( a, b ) => a.date.start - b.date.start  );
      this._events = JSON.parse( JSON.stringify(this._events) );
    }
    this.handleScrollView();
  }

  @Output() changeView = new EventEmitter<ViewType>();

  @Output() changeDate = new EventEmitter();

  @Output() rowDbClick = new EventEmitter();

  @Output() eventDbClick = new EventEmitter();

  @Output() eventClick = new EventEmitter();

  @Output() eventMouseover = new EventEmitter();

  @Output() eventMouseout = new EventEmitter();

  @Output() eventContextmenu = new EventEmitter();

  @Output() newEventClick = new EventEmitter();

  @Output() releaseSchedule = new EventEmitter();

  @ViewChild('scheduleviews', { static: true }) scheduleviews;

  public slatNumberRowsAsArray: Array<Number>;

  public existsScale = false;

  public currentHoliday: HolidaysType;

  private _events: ScheduleDataSource[];

  get events(): ScheduleDataSource[] {
    return this._events;
  }

  constructor(
    public workScaleService: WorkScaleService,
    private changeDetection: ChangeDetectorRef,
    private eventService: EventService,
    private holidayService: HolidayService,
    private generateEventsService: GenerateEventsService
  ) {}

  ngOnInit() {
    this.convertSlarNumberToArray();
    this.changeDetection.detectChanges();
  }

  ngOnChanges( changes: SimpleChanges ) {
    this.existsScale = this.workScaleService.exitsWorkScale( this.workScale );
    if ( changes['holidays'] ) {
      this.handleHoliday( changes['holidays'].currentValue );
    }
    this.changeDetection.detectChanges();
  }

  onChangeView( view: ViewType ) {
    this.defaultView = view;
    this.changeView.emit( view );
  }

  onChangeDate($event) {
    this.currentDate = new Date( $event.year, $event.month, $event.day);
    this.workScaleService.currentDate = new Date( $event.year, $event.month, $event.day);
    this.eventService.getEventsOfDay();
    this.changeDate.emit( $event );
    this.handleHoliday();
    this.handleScrollView( new Date($event.fullDate) );
    this.changeDetection.detectChanges();
  }

  onClickReleaseSchedule( holiday: HolidaysType ) {
    this.releaseSchedule.emit( holiday );
  }

  private handleScrollView( date = new Date() ) {
    if ( !this.scheduleviews ) {
      return;
    }
    const scroll = this.isSameDay( date ) ?  this.generateEventsService.convertMillisecondsToPixel() : 0;
    setTimeout(() => {
      this.scheduleviews.nativeElement.scrollTop = scroll;
    }, 100);
  }

  private isSameDay( date ) {
    const nowDate = new Date();
    return date.getDate() === nowDate.getDate() &&
           date.getDay() === nowDate.getDay() &&
           date.getFullYear() === nowDate.getFullYear();
  }

  private handleHoliday( holidays = this.holidays ) {
    this.currentHoliday = this.holidayService.handleHoliday( holidays, this.currentDate );
    this.changeDetection.detectChanges();
  }

  private convertSlarNumberToArray() {
    this.slatNumberRowsAsArray = Array( this.slotSettings.slotCount );
    this.changeDetection.detectChanges();
  }
}
