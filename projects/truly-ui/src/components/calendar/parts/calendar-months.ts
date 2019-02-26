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

import { NavigatorService } from '../../navigator/services/navigator.service';
import { Component, ElementRef } from '@angular/core';
import { TlCalendar } from '../calendar';

@Component( {
  selector: 'tl-calendar-months',
  template: ``,
  providers: [ NavigatorService ]
} )
export class TlCalendarMonths {

  private calendar: TlCalendar;

  constructor() {}

  setCalendar(calendar) {
    this.calendar = calendar;
    this.initializeTable();
  }

  initializeTable() {
    let line = new ElementRef( this.calendar.renderer.createElement('tr'));
    this.calendar.renderer.addClass(line.nativeElement, 'ui-table-line');
    for (let i = 0; i < 12; i++) {
      if (i % 4 === 0) {
        line = new ElementRef( this.calendar.renderer.createElement('tr'));
        this.calendar.renderer.addClass(line.nativeElement, 'ui-table-line');
      }
      const cell = new ElementRef(this.calendar.renderer.createElement('td'));
      this.calendar.renderer.addClass(cell.nativeElement, 'ui-table-cell');

      cell.nativeElement.innerHTML = this.calendar.months[i].initials;
      this.calendar.renderer.setAttribute(cell.nativeElement, 'cell', '' + i);
      this.calendar.renderer.addClass(cell.nativeElement, 'notDay');
      this.createClickListenerMonth(cell, i);
      this.handleSelectedMonth(i, line, cell);
      this.calendar.renderer.setStyle(line.nativeElement, 'height', '65px');
      this.calendar.renderer.appendChild(line.nativeElement, cell.nativeElement);
      this.calendar.renderer.appendChild(this.calendar.tbody.nativeElement, line.nativeElement);
    }
  }

  createClickListenerMonth(cell, index) {
    this.calendar.renderer.listen(cell.nativeElement, 'click', $event => {
      this.calendar.month = index;
      this.calendar.setDateNavigator();
      this.calendar.generateDays();
      this.calendar.initializeNavigator();
    });
  }

  handleSelectedMonth(index, line, cell) {
    if (index === this.calendar.month) {
      this.calendar.renderer.addClass(cell.nativeElement, 'selected');
      this.calendar.setKeyBoardLineIndex(line, cell);
    }
  }


}

