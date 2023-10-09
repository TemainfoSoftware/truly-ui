import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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

  filteredEvents: ScheduleDataSource[];

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['events'] || !changes['currentDate']) {
      return;
    }
    if (!changes['events'].firstChange || !changes['currentDate'].firstChange) {
      this.filterEvents();
      this.changeDetectionRef.detectChanges();
    }
  }

  private filterEvents() {
    const startDate = new Date(this.currentDate);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Sunday of the current week
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Saturday of the current week
    endDate.setHours(23, 59, 59, 999);

    this.filteredEvents = this.events.filter(event => {
      const eventDate = new Date(event.date.start);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  getDayOfWeek(date: string) {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const eventDate = new Date(date);
    return daysOfWeek[eventDate.getDay()];
  }
}
