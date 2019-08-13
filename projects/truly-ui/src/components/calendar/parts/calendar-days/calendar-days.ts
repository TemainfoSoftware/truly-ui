/*
    MIT License

    Copyright (c) 2018 Temainfo Software

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CalendarHoliday} from '../../interfaces/calendar-holiday.interface';

export interface CalendarDaysInterface {
  dayOfWeek: number;
  date: Date;
  day: number;
}

@Component({
  selector: 'tl-days',
  templateUrl: './calendar-days.html',
  styleUrls: ['./calendar-days.scss'],
})
export class TlCalendarDays implements OnInit, OnChanges {

  @Input('currentDate')
  set currentDate(value) {
    if ( this._currentDate.getMonth() !== new Date(value).getMonth()) {
      this._currentDate = new Date(value);
      this.buildCalendar();
    }
    this.selectedDate = new Date(value);
    this._currentDate = new Date(value);
  }

  get currentDate() {
    return this._currentDate;
  }

  @Input() holidays: Array<CalendarHoliday> = [];

  @Input() borders = false;

  @Input() width = '300px';

  @Input() height = '200px';

  @Output() selectDay = new EventEmitter();

  @Output() doubleClick = new EventEmitter();

  public dayOfMonth: Array<CalendarDaysInterface[]> = [];

  public selectedDate = new Date();

  public groupIndex = 0;

  public dayOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  private _currentDate = new Date();

  constructor() {
  }

  ngOnInit() {
    this.buildCalendar();
  }

  buildCalendar() {
    this.dayOfMonth = [];
    const daysByWeek = [];
    for (let i = 1; i <= new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate(); i++) {
      daysByWeek.push({
        dayOfWeek: this.getDateObject(i).getDay(),
        date: this.getDateObject(i),
        day: new Date(this.currentDate.getFullYear(), 0, i).getDate()
      });
    }
    this.setGroupIndex( daysByWeek );
    this.setBeforeDays();
    this.setAfterDays();
  }

  setGroupIndex( daysByWeek ) {
    this.dayOfMonth = this.groupBy(daysByWeek, 'dayOfWeek');
    this.dayOfMonth.forEach((item, groupIndex) => {
      item.forEach((value) => {
        if (value.day === 1) {
          this.groupIndex = groupIndex;
        }
      });
    });
  }

  setBeforeDays() {
    if (this.groupIndex === 0) {
      this.groupIndex = 7;
    }
    for (let i = 0; i < this.groupIndex; i++) {
      this.dayOfMonth[i].unshift({
        dayOfWeek: i,
        date: this.getDateObject(this.dayOfMonth[i][0].day - 7),
        day: this.getDateObject(this.dayOfMonth[i][0].day - 7).getDate()
      });
    }
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    if (date.getMonth() !== this.currentDate.getMonth()) {
      this.currentDate = date;
      this.buildCalendar();
    }
    this.selectDay.emit(this.selectedDate);
  }

  setAfterDays() {
    this.dayOfMonth.forEach((array, index) => {
      if (array.length < 6) {
        do {
          array.push({
            dayOfWeek: index,
            date: this.getDateObject(array[array.length - 1].day + 7, array[array.length - 1].date.getMonth()),
            day: this.getDateObject(array[array.length - 1].day + 7).getDate()
          });
        } while (array.length < 6);
      }
    });
  }

  isCurrentDate( date: Date ) {
    if ( !date ) {
      return false;
    }
    const select = new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), 0, 0, 0, 0).getTime();
    const current = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(),
      this.selectedDate.getDate(), 0, 0, 0, 0).getTime();
    return select === current;
  }

  isOtherMonth( item: CalendarDaysInterface ) {
    return item.date.getMonth() !== this.currentDate.getMonth();
  }

  today() {
    this.currentDate = new Date();
  }

  isToday(date: Date) {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const day = new Date( date.setHours(0, 0, 0, 0 ));
    return today.getTime() === day.getTime();
  }

  getDateObject(day, month?) {
    return new Date(this.currentDate.getFullYear(), month ? month : this.currentDate.getMonth(), day);
  }

  groupBy(xs, key) {
    const objectArray = xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []);
    objectArray.length = Object.keys(objectArray).length;
    return objectArray;
  }

  ngOnChanges( changes: SimpleChanges ) {
  }

}
