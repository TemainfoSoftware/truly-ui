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
import { StatusType } from '../../types/status.type';

@Component({
  selector: 'tl-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WeekComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  currentDate: Date[] = [];

  @Input() statusConfig: StatusType;

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

  public weekEvents: { day: string, events: ScheduleDataSource[] }[] = [];

  public eventsWithPositions: {
    positions: {id: string, top: number, left: number, height: number, width: number},
    data: ScheduleDataSource
  }[] = [];

  private subscriptions = new Subscription();

  public monthInterval: string;

  public workScaleDays: number;

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

  ngOnInit() {
    this.initializeCurrentDate();
  }

  private initializeCurrentDate() {
    const currentDate = new Date();

    // Obter o dia da semana (0 - domingo, 1 - segunda-feira, ..., 6 - sábado)
    const currentDay = currentDate.getDay();

    // Calcular os dias que faltam para o próximo domingo
    const daysRemaining = 7 - currentDay;

    // Preencher o array currentDate com os dias que faltam
    for (let i = 0; i < daysRemaining; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      this.currentDate.push(date);
    }
  }



  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['currentDate'] !== undefined ) {
      this.workScaleService.currentDate = changes[ 'currentDate' ].currentValue;
      this.indexRowSelected = null;
      this.eventService.getEventsOfDay();
    }

    if (changes['workScale'] !== undefined) {
      this.indexRowSelected = null;
      this.workScaleService.reload(changes['workScale'].currentValue);
    }

    if (changes['events'] !== undefined) {
      this.createWorkScaleByEvents(changes['events'].currentValue);
      this.indexRowSelected = null;
      this.eventService.loadEvents(changes['events'].currentValue);
      this.eventService.getEventsOfDay();

      const currentDate = this.workScaleService.currentDate;

      // Obter a data de início e fim da semana atual
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Definir o dia da semana para o domingo
      startDate.setHours(0, 0, 0, 0); // Definir as horas, minutos, segundos e milissegundos para zero

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Definir o dia da semana para o sábado
      endDate.setHours(23, 59, 59, 999); // Definir as horas, minutos, segundos e milissegundos para o final do dia

      // Filtrar os eventos dentro do intervalo de datas
      const events = changes['events'].currentValue.filter((event) =>
        event.date.start >= startDate && event.date.start <= endDate
      );

      // Agrupar os eventos por dia da semana
      const groupedEvents = events.reduce((result, event) => {
        const start = event.date.start;
        if (start instanceof Date) {
          const day = start.getDay();
          const dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][day];
          if (!result[dayOfWeek]) {
            result[dayOfWeek] = { day: dayOfWeek, events: [] };
          }
          result[dayOfWeek].events.push(event);
        }
        return result;
      }, {});

      // Converter o objeto em um array de objetos {day: string, events: ScheduleDataSource[]}
      this.weekEvents = Object.keys(groupedEvents).map((dayOfWeek) => ({
        day: dayOfWeek,
        events: groupedEvents[dayOfWeek]
      }));

      // Calcular o intervalo entre os dias da semana de cada mês
      const monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const monthEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      this.monthInterval = `${monthStart.toLocaleDateString()} - ${monthEnd.toLocaleDateString()}`;

      this.changeDetectionRef.detectChanges();
    }
  }

  rowDbClick(time, index, periodIndex) {
    const workScaleInterval = this.workScaleService.workScale[periodIndex].interval;
    const minutesToStart = index > 0 ? (workScaleInterval / this.slotSettings.slotCount) * (index) : 0;
    const minutesToEnd = (workScaleInterval / this.slotSettings.slotCount) * (index + 1);

    const startDate = new Date(time);
    startDate.setMinutes(startDate.getMinutes() + minutesToStart);
    const endDate = new Date(time);
    endDate.setMinutes(endDate.getMinutes() + minutesToEnd);

    const startOfWeek = startDate.getDate() - startDate.getDay() + 1;
    const endOfWeek = startOfWeek + 6;

    const startOfWeekDate = new Date(startDate.setDate(startOfWeek));
    const endOfWeekDate = new Date(startDate.setDate(endOfWeek));

    this.onRowDbClick.emit({
      start: startOfWeekDate,
      end: endOfWeekDate,
    });
  }

  rowClick(time, index, periodIndex, scheduleRow) {
    const workScaleInterval = this.workScaleService.workScale[periodIndex].interval;
    const minutesToStart = index > 0 ? (workScaleInterval / this.slotSettings.slotCount) * (index) : 0;
    const minutesToEnd = (workScaleInterval / this.slotSettings.slotCount) * (index + 1);
    this.indexRowSelected = scheduleRow.getAttribute('data-row-index');

    const startDate = new Date(time);
    startDate.setMinutes(startDate.getMinutes() + minutesToStart);
    const endDate = new Date(time);
    endDate.setMinutes(endDate.getMinutes() + minutesToEnd);

    const startOfWeek = startDate.getDate() - startDate.getDay() + 1;
    const endOfWeek = startOfWeek + 6;

    const startOfWeekDate = new Date(startDate.setDate(startOfWeek));
    const endOfWeekDate = new Date(startDate.setDate(endOfWeek));

    this.onRowClick.emit({
      start: startOfWeekDate,
      end: endOfWeekDate,
    });
  }


  private inicializeNowIndicator() {
    this.nowIndicatorPositionTop = this.showNowIndicator ? this.generateEvents.convertMillisecondsToPixel() : -1000;
    this.changeDetectionRef.detectChanges();
  }

  private generateEventsPositions(events) {
    if (events !== undefined) {
      this.generateEvents.initializeArray(
        this.workScaleService.workScaleInMileseconds,
        this.scheduleSlats
      );
      this.eventsWithPositions = this.generateEvents.with(events);
    }
  }

  private createWorkScaleByEvents(events: ScheduleDataSource[]) {
    const workScale = [
      // configure os valores desejados aqui
      new WorkScaleType('08:00', '13:30', 30),
      new WorkScaleType('13:30', '18:00', 60),
      new WorkScaleType('31:00', '36:30', 30),
      new WorkScaleType('36:30', '43:00', 60),
      new WorkScaleType('55:00', '60:30', 30),
      new WorkScaleType('60:30', '67:00', 60),
      new WorkScaleType('79:00', '84:30', 30),
      new WorkScaleType('84:30', '91:00', 60),
      new WorkScaleType('103:00', '108:30', 30),
      new WorkScaleType('108:30', '115:00', 60),
      new WorkScaleType('127:00', '132:30', 30),
      new WorkScaleType('132:30', '139:00', 60),
      new WorkScaleType('151:00', '156:30', 30),
      new WorkScaleType('156:30', '162:00', 60)
    ];

    if (workScale && workScale.length > 0) {
      const scales = workScale.filter((work) => work.expansed === undefined);
      for (let i = 0; i <= events.length - 1; i++) {
        workScale.forEach((value, workScaleIndex, array) => {
          const eventStartDate = new Date(events[i].date.start);
          eventStartDate.setSeconds(0, 0);
          const eventEndDate = new Date(events[i].date.end);
          eventEndDate.setSeconds(0, 0);
          const workStartDate = this.workScaleService.transformHourToMileseconds(
            scales[workScaleIndex].start,
            eventStartDate
          );
          const workEndDate = this.workScaleService.transformHourToMileseconds(
            scales[workScaleIndex].end,
            eventEndDate
          );

          if (
            (eventEndDate.getTime() >= workEndDate && eventStartDate.getTime() >= workEndDate) ||
            (eventEndDate.getTime() >= workEndDate && eventStartDate.getTime() <= workEndDate)
          ) {
            if (workScale.length - 1 === workScaleIndex) {
              scales.push({
                end: this.workScaleService.transformMilesecondsToHour(eventEndDate.getTime()),
                start: this.workScaleService.transformMilesecondsToHour(eventStartDate.getTime()),
                interval: scales[workScaleIndex].interval,
                expansed: true,
              });
            }
          }

          if (
            (eventEndDate.getTime() <= workStartDate && eventStartDate.getTime() <= workStartDate) ||
            (eventEndDate.getTime() <= workStartDate && eventStartDate.getTime() >= workStartDate)
          ) {
            if (workScaleIndex === 0) {
              scales.push({
                end: this.workScaleService.transformMilesecondsToHour(eventEndDate.getTime()),
                start: this.workScaleService.transformMilesecondsToHour(eventStartDate.getTime()),
                interval: scales[workScaleIndex].interval,
                expansed: true,
              });
            }
          }
        });
      }

      this.workScaleService.reload(this.addMiddleScales(events, this.reduceScales(scales)));
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
