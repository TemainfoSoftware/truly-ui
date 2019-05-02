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

@Component({
  selector: 'tl-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['./view-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ViewDayComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() currentDate = new Date();

  @Input() statusConfig: {StatusType};

  @Input() showNowIndicator = false;

  @Input() slotSettings: SlotSettingsType;

  @Input() workScale: WorkScaleType | WorkScaleType[];

  @Input() slatNumberRowsAsArray: Array<Number>;

  @Input() texts = ScheduleI18n;

  @Input('events') events: ScheduleDataSource[];

  @ViewChildren('scheduleSlats') scheduleSlats: QueryList<any>;

  @Output() onRowDbClick = new EventEmitter();

  @Output() onEventDbClick = new EventEmitter();

  @Output() onEventClick = new EventEmitter();

  @Output() onEventMouseover = new EventEmitter();

  @Output() onEventMouseout = new EventEmitter();

  @Output() onEventContextmenu = new EventEmitter();

  public nowIndicatorPositionTop: number;

  public timesCollection: Array<Array<Date>>;

  public currentTime = new Date();

  public eventsWithPositions = [];

  private subscriptions = new Subscription();

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private generateEvents: GenerateEventsService,
    private eventService: EventService,
    private workScaleService: WorkScaleService) {

    this.subscriptions.add(this.workScaleService.updateScale.subscribe(( timesCollection) => {
      this.timesCollection = timesCollection;
      this.changeDetectionRef.detectChanges();
    }));

    this.subscriptions.add(this.eventService.updateEvents.subscribe(( event ) => {
      this.generateEventsPositions( event );
      this.inicializeNowIndicator( );
      this.changeDetectionRef.detectChanges();
    }));
  }


  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnChanges( changes: SimpleChanges ) {

    if ( changes['currentDate'] !== undefined ) {
      this.workScaleService.currentDate = changes[ 'currentDate' ].currentValue;
      this.eventService.getEventsOfDay();
    }

    if ( changes['workScale'] !== undefined ) {
      this.workScaleService.reload( changes[ 'workScale' ].currentValue );
    }


    if ( changes['events'] !== undefined  ) {
        this.eventService.loadEvents( changes[ 'events' ].currentValue );
        this.eventService.getEventsOfDay();
    }

    this.changeDetectionRef.detectChanges();
  }

  rowDbClick( time, index, periodIndex) {
    const workScaleInterval = this.workScaleService.workScale[periodIndex].interval;
    const minutesToStart = index > 0 ? ( workScaleInterval / this.slotSettings.slotCount ) * ( index ) : 0;
    const minutesToEnd = ( workScaleInterval / this.slotSettings.slotCount ) * ( index + 1 );

    this.onRowDbClick.emit({
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
