import { EventEmitter, Injectable } from '@angular/core';
import { WorkScaleService } from './work-scale.service';
import { ScheduleDataSource } from '../types/datasource.type';

@Injectable()
export class EventService {

  public eventsOfDay: ScheduleDataSource[];

  public events: ScheduleDataSource[];

  public updateEvents = new EventEmitter<any>();

  constructor( private workScaleService: WorkScaleService ) { }

  loadEvents( events: ScheduleDataSource[] ) {
    this.events = events;
    this.updateEvents.emit( this.events );
  }

  getEventsOfDay() {
    // if ( this.events === undefined ) { return []; }
    // this.eventsOfDay = this.events.filter( ( event ) => {
    //   return ( event.date.start >= this.workScaleService.startDayMilliseconds )
    //     && ( event.date.end <= this.workScaleService.endDayMilliseconds );
    // });
  }
}
