import {
  Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import { ScheduleDataSource } from '../../types/datasource.type';
import { StatusType } from '../../types/status.type';

@Component({
  selector: 'tl-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent implements OnInit, OnChanges {

  @Input() events: ScheduleDataSource[];

  @Input() statusConfig: Array<StatusType>;

  @Input() currentDate = new Date();

  @Output() onEventDbClick = new EventEmitter();

  @Output() onEventClick = new EventEmitter();

  @Output() onEventMouseover = new EventEmitter();

  @Output() onEventMouseout = new EventEmitter();

  constructor( private changeDetectionRef: ChangeDetectorRef ) { }

  ngOnInit() {}

  ngOnChanges( changes: SimpleChanges ) {
    if ( !changes['events'] ) { return; }
    if (! changes['events'].firstChange) {
      this.changeDetectionRef.detectChanges();
    }
  }

}
