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

import { Injectable } from '@angular/core';
import { MonthsDescription } from '../consts/months-description';

@Injectable()
export class NavigatorManagerService {

  private currentMonth: number;

  private currentYear: number;

  private startYear: number;

  private endYear: number;

  private date = new Date();

  private type: string;

  private range: number;

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

    this.startYear = this.date.getFullYear();
    this.endYear = this.date.getFullYear() + this.range;

  }

  getDataObject() {
    return {
      month: this.currentMonth,
      year: this.currentYear,
      rangeYear: {start: this.startYear, end: this.endYear}
    };
  }

  getDescription(): string {
    switch ( this.type )  {
      case 'monthyear': { return this.getMonthDescription() + ' ' + this.getYearDescription(); }
      case 'year': { return this.getYearDescription().toString(); }
      case 'rangeyear': { return this.getRangeYear().toString(); }
    }
  }


  private managerPreviousAction() {
    switch ( this.type )  {
      case 'monthyear': { this.monthYearTypePrevious(); break; }
      case 'year': { this.yearTypePrevious(); break; }
      case 'rangeyear': { this.rangeYearTypePrevious(); break; }
    }
  }

  private managerNextAction() {
    switch ( this.type )  {
      case 'monthyear': { this.monthYearTypeNext(); break; }
      case 'year': { this.yearTypeNext(); break; }
      case 'rangeyear': { this.rangeYearTypeNext(); break; }
    }
  }

  private getYearDescription() {
    return this.currentYear;
  }


  private getRangeYear() {
    return this.startYear + ' - ' + this.endYear;
  }

  private getMonthDescription() {
    return MonthsDescription[this.currentMonth];
  }

  // =============================== \\
  private monthYearTypeNext() {
    if (this.currentMonth === 11) {
      this.currentMonth = -1;
      this.currentYear ++;
    }
    this.currentMonth ++;
  }

  private monthYearTypePrevious() {
    if (this.currentMonth === 0) {
      this.currentMonth = 12;
      this.currentYear --;
    }
    this.currentMonth --;
  }


  private yearTypePrevious() {
    this.currentYear --;
  }

  private yearTypeNext() {
    this.currentYear ++;
  }


  private rangeYearTypePrevious() {
    this.startYear -= this.range;
    this.endYear -= this.range;
  }

  private rangeYearTypeNext() {
    this.startYear += this.range;
    this.endYear += this.range;
  }
}
