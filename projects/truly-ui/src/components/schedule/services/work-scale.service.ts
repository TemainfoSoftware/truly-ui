import { Injectable } from '@angular/core';
import { WorkScaleType } from '../types/work-scale.type';

@Injectable()
export class WorkScaleService {

  public startDayMilliseconds: number;

  public endDayMilliseconds: number;

  public workScale: WorkScaleType[];

  public currentDate = new Date();

  public timesCollection: Array<Date> = [];

  public periodCollection: Array<Array<Date>>;

  public workScaleInMileseconds = [];

  constructor( ) {}

  load( workScale: WorkScaleType | WorkScaleType[] ) {
    this.setWorkScale(workScale);
    this.generateTimes();
  }

  reload( workScale: WorkScaleType | WorkScaleType[] ) {
    this.setWorkScale(workScale);
    this.createWorkScaleMileseconds();
    this.generateTimes();
  }

  refreshStartAndEndDay() {
    // this.endDayMilliseconds = this.transformHourToMileseconds( this.endDayHour );
    // this.startDayMilliseconds = this.transformHourToMileseconds( this.startDayHour );
  }

  private setWorkScale( workScale: WorkScaleType | WorkScaleType[] ) {
    if ( !( (workScale as Array<WorkScaleType>).length > 0 ) ) {
      this.workScale = new Array<WorkScaleType>(1).fill( workScale as WorkScaleType);
    } else {
      this.workScale = workScale as WorkScaleType[];
    }
  }

  private createWorkScaleMileseconds() {
    if ( (this.workScale as Array<WorkScaleType>).length > 0 ) {
      (this.workScale as Array<WorkScaleType>).forEach(( value: WorkScaleType, index, array) => {
        this.workScaleInMileseconds.push({
          start: this.transformHourToMileseconds( value.start ),
          end: this.transformHourToMileseconds( value.end ),
          interval: value.interval
        });
      });
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
    this.timesCollection = [];
    this.periodCollection = new Array<Array<Date>>( (this.workScaleInMileseconds as Array<any>).length ).fill([]);


    if ( (this.workScaleInMileseconds as Array<any>).length > 0 ) {
      (this.workScaleInMileseconds as Array<any>).forEach(( value , index, array) => {
        let currentHour_ms =  value.start;
        let nextHourBreak_ms = value.start;

        while ( currentHour_ms < value.end ) {
          if ( currentHour_ms === nextHourBreak_ms  ) {
            this.timesCollection.push( new Date(nextHourBreak_ms) );
            this.periodCollection[index] = [...this.periodCollection[index], new Date(nextHourBreak_ms) ] ;
            nextHourBreak_ms =  nextHourBreak_ms + (value.interval * MIN_TO_MILLESECOND);
          }
          currentHour_ms++;
        }
      });
    }

  }





}
