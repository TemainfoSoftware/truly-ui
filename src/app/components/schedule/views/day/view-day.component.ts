import {
  Component, OnInit, OnChanges, AfterViewInit, ChangeDetectorRef, Input, ViewChild, ElementRef
} from '@angular/core';
import { ScheduleDataSource } from '../../types/datasource.type';

@Component({
  selector: 'tl-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['./view-day.component.scss']
})
export class ViewDayComponent implements OnInit, AfterViewInit {

  @Input() duration = 30;

  @Input() currentDate = new Date().getTime();

  @Input() dataSource: ScheduleDataSource[];

  @Input() startDayMilliseconds: number;

  @Input() endDayMilliseconds: number;

  @Input() eventsPositionsByStart = [];

  @Input() eventsPositionsByEnd = [];

  @ViewChild('scheduleSlats') scheduleSlats: ElementRef;

  public nowIndicatorPositionTop: number;

  public timesCollection: Array<Date> = [];

  constructor( private changeDetectionRef: ChangeDetectorRef  ) { }

  ngOnInit() {
    this.generateTimes();
  }

  ngAfterViewInit() {
    this.inicializeNowIndicator();
  }


  calcPositionEvent(index, event: ScheduleDataSource) {

    const BOTTOM_POSITION = this.convertMillisecondsToPixel(event.date.end) * -1;
    const TOP_POSITION    = this.convertMillisecondsToPixel(event.date.start);

    const LEFT_POSITION = this.calcLeftPosition(index, event);
    const RIGHT_POSITION = this.calcRightPosition(index, event);

    return {top: TOP_POSITION + 'px', left: LEFT_POSITION + '%', right: RIGHT_POSITION + '%', bottom: BOTTOM_POSITION  + 'px'};
  }

  calcLeftPosition( index: number, event: ScheduleDataSource ) {

    const countSameStartHour = this.eventsPositionsByStart[event.date.start].length;
    const countSameStartEnd = this.eventsPositionsByEnd[event.date.end].length;
    const indexOfinStart = this.eventsPositionsByStart[event.date.start].indexOf(event);
    const indexOfInEnd = this.eventsPositionsByEnd[event.date.end].indexOf(event);

    let length = 0;
    let position = 0;
    let fator = 0;
    let quantidadeLinhaAbaixo = 0;
    // Calcula Lenght
    if ( countSameStartHour === countSameStartEnd ) {
      length = countSameStartHour ;
    }

    if ( countSameStartHour < countSameStartEnd ) {
      length = countSameStartEnd;
    }

    if ( ( countSameStartHour !== countSameStartEnd ) && ( indexOfinStart > indexOfInEnd ) ) {
      const indice = index - ( ( indexOfinStart - ( indexOfinStart - indexOfInEnd ) + 1 ) );
      const eventDroped = this.dataSource[ indice ].date.end;
      const firstEventDroped = this.eventsPositionsByEnd[ eventDroped ].length;
      quantidadeLinhaAbaixo = firstEventDroped - (indexOfinStart - indexOfInEnd);

      length = firstEventDroped;
      position = indexOfinStart - indexOfInEnd;
    }

    if ( ( countSameStartHour > countSameStartEnd ) && ( indexOfinStart < indexOfInEnd ) ) {
      length = countSameStartHour;
      position = indexOfinStart;
    }

    // Calcula Position
    if ( indexOfinStart === indexOfInEnd ) {
      position = indexOfinStart ;
    }

    if ( indexOfinStart < indexOfInEnd ) {
      position = indexOfInEnd;
    }

    const divisor = 100 / length ;

    if (quantidadeLinhaAbaixo) {
      fator =  ( ( divisor * quantidadeLinhaAbaixo ) / countSameStartEnd ) * indexOfInEnd ;
    }

    return  ( position * divisor ) + fator;
  }

  calcRightPosition( index: number, event: ScheduleDataSource ) {

    const countSameStartHour = this.eventsPositionsByStart[event.date.start].length;
    const countSameStartEnd = this.eventsPositionsByEnd[event.date.end].length;
    const indexOfinStart = this.eventsPositionsByStart[event.date.start].indexOf(event);
    const indexOfInEnd = this.eventsPositionsByEnd[event.date.end].indexOf(event);

    let length = 0;
    let position = 0;
    let fator = 0;
    let quantidadeLinhaAbaixo = 0;

    // Calcula Lenght
    if ( countSameStartHour === countSameStartEnd ) {
      length = countSameStartHour ;
    }

    if ( countSameStartHour < countSameStartEnd ) {
      length = countSameStartEnd;
    }

    if ( ( countSameStartHour !== countSameStartEnd ) && ( indexOfinStart > indexOfInEnd ) ) {
      const indice = index - ( ( indexOfinStart - ( indexOfinStart - indexOfInEnd ) + 1 ) );
      const eventDroped = this.dataSource[ indice ].date.end;
      const firstEventDroped = this.eventsPositionsByEnd[ eventDroped ].length;
      quantidadeLinhaAbaixo = firstEventDroped - (indexOfinStart - indexOfInEnd);

      length = firstEventDroped;
      position =  ( indexOfinStart - indexOfInEnd ) - 1;
    }

    if ( ( countSameStartHour > countSameStartEnd ) && ( indexOfinStart < indexOfInEnd ) ) {
      length = countSameStartHour;
      position = indexOfinStart;
    }

    // Calcula Position
    if ( indexOfinStart === indexOfInEnd ) {
      position = indexOfinStart ;
    }

    if ( indexOfinStart < indexOfInEnd ) {
      position = indexOfInEnd;
    }

    const divisor = 100 / length ;

    if (quantidadeLinhaAbaixo) {
      fator =  ( ( divisor * quantidadeLinhaAbaixo ) / countSameStartEnd ) * ( indexOfInEnd + 1 ) ;
    }


    return ( ( length - position - 1  ) * divisor) - fator;
  }


  private generateTimes() {
    const MIN_TO_MILLESECOND = 60000;

    let currentHour_ms = this.startDayMilliseconds;
    let nextHourBreak_ms = this.startDayMilliseconds;

    while ( currentHour_ms < this.endDayMilliseconds ) {
      if ( currentHour_ms === nextHourBreak_ms  ) {
        this.timesCollection.push( new Date(nextHourBreak_ms) );
        nextHourBreak_ms =  nextHourBreak_ms + (this.duration * MIN_TO_MILLESECOND);
      }
      currentHour_ms++;
    }
  }

  private inicializeNowIndicator() {
    this.nowIndicatorPositionTop = this.convertMillisecondsToPixel();
    this.changeDetectionRef.detectChanges();

    setInterval(() => {
      this.nowIndicatorPositionTop = this.convertMillisecondsToPixel();
      this.currentDate = new Date().getTime();
      //   this.changeDetectionRef.detectChanges();
    }, 1000);
  }


  private convertMillisecondsToPixel(date = new Date().getTime()) {
    const heightBody = this.scheduleSlats.nativeElement.offsetHeight;
    const currentDate = date - this.startDayMilliseconds;

    return ( heightBody * currentDate ) / ( this.endDayMilliseconds - this.startDayMilliseconds);
  }


}
