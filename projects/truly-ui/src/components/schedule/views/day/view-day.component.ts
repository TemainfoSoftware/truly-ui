import {
  Component, OnInit, OnChanges, AfterViewInit, ChangeDetectorRef, Input, ViewChild, ElementRef, SimpleChanges,
  ChangeDetectionStrategy, Output, EventEmitter
} from '@angular/core';
import { ScheduleDataSource } from '../../types/datasource.type';
import { GenerateEventsService } from '../../services/generate-events.service';

@Component({
  selector: 'tl-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['./view-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewDayComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() duration = 30;

  @Input() currentDate = new Date();

  @Input() events: ScheduleDataSource[];

  @Input() statusConfig: {StatusType};

  @Input() startDayMilliseconds: number;

  @Input() endDayMilliseconds: number;

  @Input() showNowIndicator = false;

  @Input() slatHightRows = 43;

  @Input() slatNumberRows = 2;

  @Input() slatNumberRowsAsArray: Array<Number>;

  @ViewChild('scheduleSlats') scheduleSlats: ElementRef;

  @Output() onRowDbClick = new EventEmitter();

  @Output() onEventDbClick = new EventEmitter();

  @Output() onEventClick = new EventEmitter();

  @Output() onEventMouseover = new EventEmitter();

  @Output() onEventMouseout = new EventEmitter();

  public nowIndicatorPositionTop: number;

  public timesCollection: Array<Date> = [];

  public currentTime = new Date();

  public eventsWithPositions = [];

  constructor( private changeDetectionRef: ChangeDetectorRef, private generateEvents: GenerateEventsService ) { }

  ngOnInit() {
    this.generateTimes();
  }

  ngAfterViewInit() {
    this.generateEvents.initialize(
      this.startDayMilliseconds,
      this.endDayMilliseconds,
      this.scheduleSlats.nativeElement.offsetHeight,
      this.scheduleSlats.nativeElement.offsetWidth
    );
    this.generateEventsPositions();
    this.inicializeNowIndicator();
    this.changeDetectionRef.detectChanges();
  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes['events'] !== undefined ) {
      if ( !changes[ 'events' ].firstChange ) {
        this.generateEvents.initialize(
          this.startDayMilliseconds,
          this.endDayMilliseconds,
          this.scheduleSlats.nativeElement.offsetHeight,
          this.scheduleSlats.nativeElement.offsetWidth
        );
        this.generateEventsPositions();
        this.inicializeNowIndicator();
        this.changeDetectionRef.detectChanges();
      }
    }
    this.changeDetectionRef.detectChanges();
  }

  rowDbClick( time, index) {

    const minutesToStart = index > 0 ? ( this.duration / this.slatNumberRows ) * ( index ) : 0;
    const minutesToEnd = ( this.duration / this.slatNumberRows ) * ( index + 1 );

    this.onRowDbClick.emit({
      start: new Date(time).setMinutes( minutesToStart ),
      end: new Date(time).setMinutes( minutesToEnd )
    });
  }

  private generateTimes() {
    const MIN_TO_MILLESECOND = 60000;

    let currentHour_ms = this.startDayMilliseconds;
    let nextHourBreak_ms = this.startDayMilliseconds;
    this.timesCollection = [];

    while ( currentHour_ms < this.endDayMilliseconds ) {
      if ( currentHour_ms === nextHourBreak_ms  ) {
        this.timesCollection.push( new Date(nextHourBreak_ms) );
        nextHourBreak_ms =  nextHourBreak_ms + (this.duration * MIN_TO_MILLESECOND);
      }
      currentHour_ms++;
    }
    this.changeDetectionRef.detectChanges();
  }

  private inicializeNowIndicator() {
    this.nowIndicatorPositionTop = this.showNowIndicator ? this.generateEvents.convertMillisecondsToPixel() : -1000;
    this.changeDetectionRef.detectChanges();
  }

  private generateEventsPositions() {
    if ( this.events !== undefined && this.events.length > 0 ) {
      this.eventsWithPositions = this.generateEvents.with( this.events );
    }
  }

}
