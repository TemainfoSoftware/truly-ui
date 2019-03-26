/*
    MIT License

    Copyright (c) 2019 Temainfo Software

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

import { Injectable } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Injectable()
export class NavigatorManagerService {

  private currentMonth: number;

  private currentYear: number;

  private currentDay: number;

  private startYear: number;

  private endYear: number;

  private date = new Date();

  private type: string;

  private range: number;

  get monthsDescription() {
    return this.i18n.getLocale().Navigator.monthsDescription;
  }
  get daysDescription() {
    return this.i18n.getLocale().Navigator.daysDescription;
  }

  constructor( private i18n: I18nService ) {}

  previous() {
    this.managerPreviousAction();
  }

  next() {
    this.managerNextAction();
  }

  setType(type) {
    this.type = type;
  }

  setRange(range) {
    this.range = range;
  }

  setDate(date) {
    this.date = date;
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.currentDay = this.date.getDate();

    this.startYear = this.date.getFullYear();
    this.endYear = this.date.getFullYear() + this.range;

  }

  getDataObject() {
    return {
      day: this.currentDay,
      month: this.currentMonth,
      year: this.currentYear,
      fullDate: new Date( this.currentYear, this.currentMonth, this.currentDay, new Date().getHours(), new Date().getMinutes() ),
      rangeYear: {start: this.startYear, end: this.endYear}
    };
  }

  getDescription(): string {
    switch ( this.type )  {
      case 'monthyear': { return this.getMonthDescription() + ' ' + this.getYearDescription(); }
      case 'year': { return this.getYearDescription().toString(); }
      case 'rangeyear': { return this.getRangeYear().toString(); }
      case 'day': { return this.getDayDescription().toString(); }
    }
  }


  private managerPreviousAction() {
    switch ( this.type )  {
      case 'monthyear': { this.monthYearTypePrevious(); break; }
      case 'year': { this.yearTypePrevious(); break; }
      case 'rangeyear': { this.rangeYearTypePrevious(); break; }
      case 'day': { this.dayTypePrevious(); break; }
    }
  }

  private managerNextAction() {
    switch ( this.type )  {
      case 'monthyear': { this.monthYearTypeNext(); break; }
      case 'year': { this.yearTypeNext(); break; }
      case 'rangeyear': { this.rangeYearTypeNext(); break; }
      case 'day': { this.dayTypeNext(); break; }
    }
  }

  private getYearDescription() {
    return this.currentYear;
  }


  private getRangeYear() {
    return this.startYear + ' - ' + this.endYear;
  }

  private getDayDescription() {
    const dayOfMonth = new Date(this.currentYear, this.currentMonth, this.currentDay).getDate();
    const weekDay = this.daysDescription[ new Date(this.currentYear, this.currentMonth, this.currentDay).getDay() ];
    return dayOfMonth + ' ' + weekDay;
  }

  private getMonthDescription() {
    return this.monthsDescription[this.currentMonth];
  }

  // =============================== \\
  private monthYearTypeNext() {
    const date = this.getAtualDateFromParameters();
    date.setMonth( this.date.getMonth() + 1 );
    this.setDate( date );
  }

  private monthYearTypePrevious() {
    const date = this.getAtualDateFromParameters();
    date.setMonth( this.date.getMonth() - 1 );
    this.setDate( date );
  }

  private yearTypePrevious() {
    const date = this.getAtualDateFromParameters();
    date.setFullYear( this.date.getFullYear() - 1 );
    this.setDate( date );
  }

  private yearTypeNext() {
    const date = this.getAtualDateFromParameters();
    date.setFullYear( this.date.getFullYear() + 1 );
    this.setDate( date );
  }

  private dayTypePrevious() {
    const date = this.getAtualDateFromParameters();
    date.setDate( this.date.getDate() - 1 );
    this.setDate( date );
  }

  private dayTypeNext() {
    const date = this.getAtualDateFromParameters();
    date.setDate( this.date.getDate() + 1 );
    this.setDate( date );
  }

  private rangeYearTypePrevious() {
    this.startYear -= this.range;
    this.endYear -= this.range;
  }

  private rangeYearTypeNext() {
    this.startYear += this.range;
    this.endYear += this.range;
  }

  private getAtualDateFromParameters() {
    return new Date(this.currentYear, this.currentMonth, this.currentDay);
  }
}
