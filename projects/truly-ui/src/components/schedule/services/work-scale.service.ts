import { EventEmitter, Injectable } from '@angular/core';
import { WorkScaleType } from '../types/work-scale.type';

@Injectable()
export class WorkScaleService {

  public workScale: WorkScaleType[];

  public currentDate = new Date();

  public timesCollection: Array<Array<Date>>;

  public workScaleInMileseconds = [];

  public updateScale = new EventEmitter<any>();

  constructor( ) {}

  load( workScale: WorkScaleType | WorkScaleType[] ) {
    if ( this.exitsWorkScale( workScale ) ) {
      this.setWorkScale(workScale);
      this.createWorkScaleMileseconds();
      this.generateTimes();
    }
  }

  reload( workScale: WorkScaleType | WorkScaleType[] ) {
    if ( this.exitsWorkScale( workScale ) ) {
      this.setWorkScale( workScale );
      this.createWorkScaleMileseconds();
      this.generateTimes();
    }
  }

  exitsWorkScale ( workScale ) {
    return workScale && (
      ( workScale as WorkScaleType ).hasOwnProperty('interval') ||
      ( workScale as Array<WorkScaleType> ).length > 0
    );
  }

  private setWorkScale( workScale: WorkScaleType | WorkScaleType[] ) {
    if ( workScale ) {
      if ( !( (workScale as Array<WorkScaleType>).length > 0 ) ) {
        this.workScale = new Array<WorkScaleType>(1).fill( workScale as WorkScaleType);
      } else {
        this.workScale = workScale as WorkScaleType[];
      }
    }
  }

  private createWorkScaleMileseconds() {
    if ( this.workScale ) {
      if ( (this.workScale as Array<WorkScaleType>).length > 0 ) {
        this.workScaleInMileseconds = [];
        (this.workScale as Array<WorkScaleType>).forEach(( value: WorkScaleType, index, array) => {
          this.workScaleInMileseconds.push({
            start: this.transformHourToMileseconds( value.start ),
            end: this.transformHourToMileseconds( value.end ),
            interval: value.interval
          });
        });
      }
    }
  }


  private transformHourToMileseconds( fullHour: string ) {
    const hourSplited = fullHour.split(':');

    const hours = Number(hourSplited[0]);
    const minutes = Number(hourSplited[1]);
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const date = this.currentDate.getDate();

    return new Date(year, month, date, hours, minutes).getTime();
  }


  private generateTimes() {
    const MIN_TO_MILLESECOND = 60000;
    this.timesCollection = new Array<Array<Date>>( (this.workScaleInMileseconds as Array<any>).length ).fill([]);

    if ( (this.workScaleInMileseconds as Array<any>).length > 0 ) {
      (this.workScaleInMileseconds as Array<any>).forEach(( value , index, array) => {
        let currentHour_ms =  value.start;
        let nextHourBreak_ms = value.start;

        while ( currentHour_ms < value.end ) {
          if ( currentHour_ms === nextHourBreak_ms  ) {
            this.timesCollection[index] = [...this.timesCollection[index], new Date(nextHourBreak_ms) ] ;
            nextHourBreak_ms =  nextHourBreak_ms + (value.interval * MIN_TO_MILLESECOND);
          }
          currentHour_ms++;
        }
      });
      this.updateScale.emit( this.timesCollection );
    }
  }
}
