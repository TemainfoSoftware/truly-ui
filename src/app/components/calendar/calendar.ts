/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
import {
  Component, ElementRef, AfterViewInit, Renderer2, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Output,
  EventEmitter,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { KeyEvent } from '../core/enums/key-events';

@Component( {
  selector: 'tl-calendar',
  templateUrl: './calendar.html',
  styleUrls: [ './calendar.scss' ],
} )
export class TlCalendar extends ComponentDefaultBase implements AfterViewInit {

  @ViewChild('tbody') tbody;

  @ViewChild('table') table;

  @ViewChild('wrapper') wrapper;

  @Output() selectDay: EventEmitter<any> = new EventEmitter<any>();

  public displayMonths = false;

  private year = 2018;

  private month = 0;

  private today;

  private selectedDay;

  private todayIndex;

  private months =
    [
      { name: 'January', initials: 'jan' },
      { name: 'February', initials: 'feb' },
      { name: 'March', initials: 'mar' },
      { name: 'April', initials: 'apr' },
      { name: 'May', initials: 'may' },
      { name: 'June', initials: 'jun' },
      { name: 'July', initials: 'jul' },
      { name: 'August', initials: 'aug' },
      { name: 'September', initials: 'sept' },
      { name: 'October', initials: 'oct' },
      { name: 'November', initials: 'nov' },
      { name: 'December', initials: 'dec' }
    ];

  private dayOfWeek =
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor( public calendar: ElementRef, private renderer: Renderer2, private change: ChangeDetectorRef,
               tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
    super( tabIndexService, idService, nameService );
  }

  ngAfterViewInit() {
    this.setElement( this.calendar, 'calendar' );
    this.createKeyboardListenerDay();
    this.today = new Date().getDate();
    this.generateDays();
    setTimeout(() => {
      this.wrapper.nativeElement.focus();
    }, 1);
  }

  decreaseYear() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    }else {
      this.month--;
    }
    this.generateDays();
  }

  increaseYear() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    }else  {
      this.month++;
    }
    this.generateDays();
  }

  getToday() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.today = new Date().getDate();
    this.generateDays();
  }

  generateDays() {
    this.clearBody();
    this.displayMonths = false;
    const dayOfMonth = [];

    for (let i = 1; i <= new Date(this.year, this.month + 1, 0).getDate(); i++) {
      dayOfMonth.push({dayOfWeek: new Date( this.year, this.month, i ).getDay(), day: new Date( this.year, 0, i ).getDate()});
    }

    let week;

    if (dayOfMonth[0].dayOfWeek !== 0) {
      week = new ElementRef( this.renderer.createElement('tr'));
      this.renderer.appendChild(this.tbody.nativeElement, week.nativeElement);
      for (let i = 0; i < dayOfMonth[0].dayOfWeek; i++) {
        const td = new ElementRef( this.renderer.createElement('td'));
        this.renderer.appendChild(week.nativeElement, td.nativeElement);
      }
    }

    for (let day = 0; day < dayOfMonth.length; day++) {
      if (dayOfMonth[day].dayOfWeek === 0) {
        week = new ElementRef( this.renderer.createElement('tr'));
        this.renderer.appendChild(this.tbody.nativeElement, week.nativeElement);
      }
      const td = new ElementRef( this.renderer.createElement('td'));
      td.nativeElement.innerHTML = dayOfMonth[day].day;
      this.markToday(dayOfMonth[day].day, td);
      this.createClickListenerDay(td, dayOfMonth[day].day);
      this.renderer.appendChild(week.nativeElement, td.nativeElement);
    }

    for (let i = dayOfMonth[dayOfMonth.length - 1].dayOfWeek; i < 6; i++) {
      const td = new ElementRef( this.renderer.createElement('td'));
      this.renderer.appendChild(week.nativeElement, td.nativeElement);
    }

    if (this.tbody.nativeElement.children.length === 5) {
      const another = new ElementRef( this.renderer.createElement('tr'));
      for (let col = 0; col < 7; col++) {
        const td = new ElementRef(this.renderer.createElement('td'));
        td.nativeElement.innerHTML = '&nbsp';
        this.renderer.appendChild(this.tbody.nativeElement, another.nativeElement);
        this.renderer.appendChild(another.nativeElement, td.nativeElement);
      }
    }
  }

  createClickListenerDay(cell, day) {
    this.renderer.listen(cell.nativeElement, 'click', $event => {
      this.selectDay.emit({'year': this.year, 'month': this.month, 'day': day});
      this.renderer.removeClass(this.todayIndex.nativeElement, 'selected');
      this.setSelectedDay(cell, $event.target);
    });
  }

  createKeyboardListenerDay() {
    this.renderer.listen(this.wrapper.nativeElement, 'keydown', $event => {
      // this.handleKeyDown($event);
    });
  }

/*  handleKeyDown($event) {
    switch ($event.keyCode) {
      case KeyEvent.ARROWRIGHT:
        this.handleArrowRight();
        break;
    }
  }
  */

  createClickListenerMonth(cell, index) {
    this.renderer.listen(cell.nativeElement, 'click', $event => {
      this.month = index;
      this.generateDays();
    });
  }


  markToday(day, cell) {
    if ((day === this.today) && (this.month === new Date().getMonth())) {
      this.renderer.addClass(cell.nativeElement, 'today');
      this.renderer.addClass(cell.nativeElement, 'selected');
      this.todayIndex = cell;
    }
    this.removeSelectedDay();
  }

  changeYear() {
    this.displayMonths = true;
    this.tbody.nativeElement.innerHTML = '';

    let line = new ElementRef( this.renderer.createElement('tr'));

    for (let i = 0; i < 12; i++) {
      if (i % 4 === 0) {
        line = new ElementRef( this.renderer.createElement('tr'));
      }
      const cell = new ElementRef(this.renderer.createElement('td'));
      this.createClickListenerMonth(cell, i);
      cell.nativeElement.innerHTML = this.months[i].initials;
      this.renderer.setStyle(line.nativeElement, 'height', '65px');
      this.renderer.appendChild(line.nativeElement, cell.nativeElement);
      this.renderer.appendChild(this.tbody.nativeElement, line.nativeElement);
    }

  }

  setSelectedDay(cell, target) {
    this.renderer.addClass(cell.nativeElement, 'selected');
    this.removeSelectedDay();
    this.selectedDay = target;
  }

  removeSelectedDay() {
    if (this.selectedDay) {
      this.renderer.removeClass(this.selectedDay, 'selected');
    }
  }

  clearBody() {
    this.tbody.nativeElement.innerHTML = '';
  }

}

