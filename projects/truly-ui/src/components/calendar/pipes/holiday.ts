import {Pipe, PipeTransform} from '@angular/core';
import {CalendarHoliday} from '../interfaces/calendar-holiday.interface';

@Pipe({
  name: 'holiday'
})
export class TlHolidayPipe implements PipeTransform {

  constructor() {}

  transform(date: Date, holidays: CalendarHoliday[] ) {
    return holidays.filter(value => this.getRawDate(value.date) === this.getRawDate(date));
  }

  getRawDate( date: Date ) {
    const dt = new Date( date ).setHours(0, 0, 0, 0 );
    return new Date( dt ).getTime();
  }

}
