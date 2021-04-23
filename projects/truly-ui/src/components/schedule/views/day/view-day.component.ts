import {
  Component, OnInit, OnChanges, AfterViewInit, ChangeDetectorRef, Input, ViewChild, ElementRef, SimpleChanges,
  ChangeDetectionStrategy, Output, EventEmitter, ViewChildren, QueryList, OnDestroy
} from '@angular/core';
import { ScheduleDataSource } from '../../types/datasource.type';
import { GenerateEventsService } from '../../services/generate-events.service';
import { SlotSettingsType } from '../../types/slot-settings.type';
import { WorkScaleType } from '../../types/work-scale.type';
import { EventService } from '../../services/event.service';
import { WorkScaleService } from '../../services/work-scale.service';
import { Subscription } from 'rxjs';
import { ScheduleI18n } from '../../i18n/schedule-i18n';
import { HolidaysType } from '../../types/holidays.type';

@Component({
  selector: 'tl-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['./view-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ViewDayComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() currentDate = new Date();

  @Input() statusConfig: {StatusType};

  @Input() typesConfig: any;

  @Input() showNowIndicator = false;

  @Input() slotSettings: SlotSettingsType;

  @Input() workScale: WorkScaleType | WorkScaleType[];

  @Input() slatNumberRowsAsArray: Array<Number>;

  @Input() texts = ScheduleI18n;

  @Input('events') events: ScheduleDataSource[];

  @ViewChildren('scheduleSlats') scheduleSlats: QueryList<any>;

  @Output() onRowDbClick = new EventEmitter();

  @Output() onRowClick = new EventEmitter();

  @Output() onEventDbClick = new EventEmitter();

  @Output() onEventClick = new EventEmitter();

  @Output() onEventMouseover = new EventEmitter();

  @Output() onEventMouseout = new EventEmitter();

  @Output() onEventContextmenu = new EventEmitter();

  public nowIndicatorPositionTop: number;

  public timesCollection: Array<Array<Date>>;

  public currentTime = new Date();

  public indexRowSelected = null;

  public eventsWithPositions: {
    positions: {id: string, top: number, left: number, height: number, width: number},
    data: ScheduleDataSource
  }[] = [];

  private subscriptions = new Subscription();

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private generateEvents: GenerateEventsService,
    private eventService: EventService,
    private workScaleService: WorkScaleService) {

    this.subscriptions.add(this.workScaleService.updateScale.subscribe(( timesCollection) => {
      this.timesCollection = timesCollection;
      this.changeDetectionRef.detectChanges();
      this.indexRowSelected = null;
    }));

    this.subscriptions.add(this.eventService.updateEvents.subscribe(( event ) => {
      this.generateEventsPositions( event );
      this.inicializeNowIndicator( );
      this.changeDetectionRef.detectChanges();
      this.indexRowSelected = null;
    }));
  }


  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnChanges( changes: SimpleChanges ) {

    if ( changes['currentDate'] !== undefined ) {
      this.workScaleService.currentDate = changes[ 'currentDate' ].currentValue;
      this.indexRowSelected = null;
      this.eventService.getEventsOfDay();
    }

    if ( changes['workScale'] !== undefined ) {
      this.indexRowSelected = null;
      this.workScaleService.reload( changes[ 'workScale' ].currentValue );
    }

    if ( changes['events'] !== undefined  ) {
      this.createWorkScaleByEvents(changes[ 'events' ].currentValue, this.workScale as WorkScaleType[] );
      this.indexRowSelected = null;
      this.eventService.loadEvents( changes[ 'events' ].currentValue );
      this.eventService.getEventsOfDay();
    }
    this.changeDetectionRef.detectChanges();
  }

  rowDbClick( time, index, periodIndex ) {
    const workScaleInterval = this.workScaleService.workScale[periodIndex].interval;
    const minutesToStart = index > 0 ? ( workScaleInterval / this.slotSettings.slotCount ) * ( index ) : 0;
    const minutesToEnd = ( workScaleInterval / this.slotSettings.slotCount ) * ( index + 1 );

    this.onRowDbClick.emit({
      start: new Date(time).setMinutes( new Date(time).getMinutes( ) + minutesToStart ),
      end: new Date(time).setMinutes( new Date(time).getMinutes( ) + minutesToEnd ),
    });
  }


  rowClick( time, index, periodIndex, scheduleRow) {
    const workScaleInterval = this.workScaleService.workScale[periodIndex].interval;
    const minutesToStart = index > 0 ? ( workScaleInterval / this.slotSettings.slotCount ) * ( index ) : 0;
    const minutesToEnd = ( workScaleInterval / this.slotSettings.slotCount ) * ( index + 1 );
    this.indexRowSelected = scheduleRow.getAttribute('data-row-index');
    this.onRowClick.emit({
      start: new Date(time).setMinutes( new Date(time).getMinutes( ) + minutesToStart ),
      end: new Date(time).setMinutes( new Date(time).getMinutes( ) + minutesToEnd ),
    });
  }

  private inicializeNowIndicator() {
    // this.nowIndicatorPositionTop = this.showNowIndicator ? this.generateEvents.convertMillisecondsToPixel() : -1000;
    this.changeDetectionRef.detectChanges();
  }

  private generateEventsPositions( events ) {
    if ( events !== undefined ) {
      this.generateEvents.initializeArray( this.workScaleService.workScaleInMileseconds, this.scheduleSlats );
      this.eventsWithPositions = this.generateEvents.with( events );
    }
  }

  private createWorkScaleByEvents( events: ScheduleDataSource[], workScale: WorkScaleType[] ) {
    if (workScale && workScale.length > 0) {
      const scales = workScale.filter( work => work.expansed === undefined);
      for (let i = 0; i <= events.length - 1; i++) {

        workScale.forEach( (value, workScaleIndex, array) => {
          const eventStartDate = new Date(events[i].date.start).setSeconds(0, 0);
          const eventEndDate = new Date(events[i].date.end).setSeconds(0, 0);
          const workStartDate = this.workScaleService.transformHourToMileseconds(scales[workScaleIndex].start, new Date(eventStartDate));
          const workEndDate = this.workScaleService.transformHourToMileseconds(scales[workScaleIndex].end, new Date(eventEndDate));

          // Handle Overflow in BEFORE workScale
          if (
              ( eventEndDate >= workEndDate && eventStartDate >= workEndDate ) ||
              ( eventEndDate >= workEndDate && eventStartDate <= workEndDate )
            ) {
            if (workScale.length - 1 === workScaleIndex) {
              scales.push({
                start: this.workScaleService.transformMilesecondsToHour(workEndDate),
                end: this.workScaleService.transformMilesecondsToHour(eventEndDate),
                interval: (scales[workScaleIndex].interval),
                expansed: true,
              });

            }
          }

          // Handle Overflow in AFTER workScale
          if (
              ( eventEndDate <= workStartDate && eventStartDate <= workStartDate ) ||
              ( eventEndDate <= workStartDate && eventStartDate >= workStartDate )
            ) {
            if (workScaleIndex === 0) {
              scales.push({
                start: this.workScaleService.transformMilesecondsToHour(eventStartDate),
                end: this.workScaleService.transformMilesecondsToHour(workStartDate),
                interval: (scales[workScaleIndex].interval),
                expansed: true,
              });
            }
          }
        });
      }

      this.workScaleService.reload( this.addMiddleScales(events, this.reduceScales( scales) ) );
    }
  }

  private addMiddleScales(events: ScheduleDataSource[], workScale: WorkScaleType[]) {
    const scales = workScale.filter( work => work);
    for (let workScaleIndex = 0; workScaleIndex < workScale.length - 1; workScaleIndex++ ) {
      for (let e = 0; e <= events.length - 1; e++ ) {
        const eventStartDate = new Date(events[e].date.start).setSeconds(0, 0);
        const eventEndDate = new Date(events[e].date.end).setSeconds(0, 0);
        const workStartDate = this.workScaleService.transformHourToMileseconds(workScale[workScaleIndex].end, new Date(eventStartDate));
        const workEndDate = this.workScaleService.transformHourToMileseconds(workScale[workScaleIndex + 1].start, new Date(eventEndDate));

        // Horario de inicio dentro do intervalo
        if ( eventStartDate >= workStartDate && eventStartDate <= workEndDate ) {
          scales.push({
            start: workScale[workScaleIndex].end,
            end: workScale[workScaleIndex + 1].start,
            interval: workScale[workScaleIndex].interval,
            expansed: true,
            middle: true,
          });  break;
        }

        // Horario de fim dentro do intervalo
        if ( eventEndDate >= workStartDate && eventEndDate <= workEndDate ) {
          scales.push({
            start: workScale[workScaleIndex].end,
            end: workScale[workScaleIndex + 1].start,
            interval: workScale[workScaleIndex].interval,
            expansed: true,
            middle: true,
          });  break;
        }

      }
    }
    return this.reduceScales(scales);
  }

  private reduceScales( scales: WorkScaleType[] ) {
    const orderedScales = this.sortScaleByStart(scales);
    const notExpansedScales = orderedScales.filter( (scale) => !scale.expansed );
    const middleHourScale = orderedScales.filter( (scale) => scale.middle );
    const beforeHourScale = this.reduceBeforeScale( orderedScales );
    const afterHourScale = this.reduceAfterScale( orderedScales );
    return this.sortScaleByStart(
      this.removeNextSameStartAndEndSacalesTime(
        this.removeSameStartAndEndSacalesTime(
          notExpansedScales.concat(afterHourScale).concat(middleHourScale).concat(beforeHourScale)
        )
      )
    );
  }

  private removeSameStartAndEndSacalesTime(scales: WorkScaleType[]) {
    return this.sortScaleByStart(scales).filter( (value => value.start !== value.end ));
  }

  private removeNextSameStartAndEndSacalesTime(scales: WorkScaleType[]) {
    return this.sortScaleByStart(scales).filter( (value, index, array ) => {
      if ( array[index - 1] ) {
       return value.start !== array[index - 1].start && value.end !== array[index - 1].end;
      }
      return true;
    });
  }

  private reduceBeforeScale(  scales: WorkScaleType[] ) {
    return scales.reduce( (previous, current) => {
      const cStart = this.workScaleService.transformHourToMileseconds(current.start);
      const pStart = this.workScaleService.transformHourToMileseconds(previous.start);
      if (cStart < pStart) {
        return {...current, start: current.start };
      }

      const cEnd = this.workScaleService.transformHourToMileseconds(current.end);
      const pEnd = this.workScaleService.transformHourToMileseconds(previous.end);
      if (cEnd < pEnd) {
        return {...current, end: current.end };
      }
      return previous;
    }, { end: '23:59', start: '23:59', interval: 0, expansed: null });
  }

  private reduceAfterScale(  scales: WorkScaleType[] ) {
    return scales.reduce( (previous, current) => {
      const cStart = this.workScaleService.transformHourToMileseconds(current.start);
      const pStart = this.workScaleService.transformHourToMileseconds(previous.start);
      if (cStart > pStart) {
        return {...current, start: current.start };
      }

      const cEnd = this.workScaleService.transformHourToMileseconds(current.end);
      const pEnd = this.workScaleService.transformHourToMileseconds(previous.end);
      if (cEnd > pEnd) {
        return {...current, end: current.end };
      }
      return previous;
    }, { end: '01:00', start: '01:00', interval: 0, expansed: null });
  }

  private sortScaleByStart( scales: WorkScaleType[]   ) {
    return scales.sort( (scaleA, scaleB) => {
      return this.workScaleService.transformHourToMileseconds(scaleA.start) -
        this.workScaleService.transformHourToMileseconds(scaleB.start);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
