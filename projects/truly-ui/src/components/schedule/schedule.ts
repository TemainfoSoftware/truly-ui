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
  Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { ScheduleDataSource } from './types/datasource.type';
import { StatusType } from './types/status.type';
import { ViewType } from './types/view.type';
import { SlotSettingsType } from './types/slot-settings.type';
import { WorkScaleType } from './types/work-scale.type';
import { WorkScaleService } from './services/work-scale.service';
import { EventService } from './services/event.service';

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

  @Input() slotSettings: SlotSettingsType = new SlotSettingsType(  2, 43);

  @Input() workScale: WorkScaleType | WorkScaleType[] = new WorkScaleType( '08:00', '18:00', 30 );

  @Input() showNowIndicator = false;

  @Input('events') set events( events: ScheduleDataSource[] ) {
    this._events = [...events].sort(( a, b ) => a.date.start - b.date.start  );
    this._events = JSON.parse( JSON.stringify(this._events) );
  }

  @Output() changeView = new EventEmitter<ViewType>();

  @Output() changeDate = new EventEmitter();

  @Output() rowDbClick = new EventEmitter();

  @Output() eventDbClick = new EventEmitter();

  @Output() eventClick = new EventEmitter();

  @Output() eventMouseover = new EventEmitter();

  @Output() eventMouseout = new EventEmitter();

  @Output() newEventClick = new EventEmitter();

  public slatNumberRowsAsArray: Array<Number>;

  private _events: ScheduleDataSource[];

  constructor(
    private changeDetection: ChangeDetectorRef,
    private workScaleService: WorkScaleService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.convertSlarNumberToArray();
    this.workScaleService.load( this.workScale );
    this.eventService.loadEvents( this._events );
    this.eventService.getEventsOfDay();
    this.changeDetection.detectChanges();
  }

  ngOnChanges( changes: SimpleChanges ) {

    if ( changes['workScale'] !== undefined ) {
      if ( changes[ 'workScale' ].currentValue ) {
        this.workScaleService.reload( changes[ 'workScale' ].currentValue );
      }
    }


    if ( changes['events'] !== undefined ) {
      if ( !changes[ 'events' ].firstChange ) {
        this.eventService.loadEvents( this._events );
        this.eventService.getEventsOfDay();
      }
    }

    if ( changes['currentDate'] !== undefined ) {
      if ( ! changes['currentDate'].firstChange) {
        this.eventService.loadEvents( this._events );
        this.eventService.getEventsOfDay();
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
    this.workScaleService.currentDate = new Date( $event.year, $event.month, $event.day);
    this.eventService.getEventsOfDay();
    this.changeDate.emit( $event );
    this.changeDetection.detectChanges();
  }

  private convertSlarNumberToArray() {
    this.slatNumberRowsAsArray = Array( this.slotSettings.slotCount );
    this.changeDetection.detectChanges();
  }
}
