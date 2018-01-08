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
  Component, ElementRef, AfterViewInit, Renderer2, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';

@Component( {
  selector: 'tl-calendar',
  templateUrl: './calendar.html',
  styleUrls: [ './calendar.scss' ],
} )
export class TlCalendar extends ComponentDefaultBase implements AfterViewInit {
  
  @ViewChild('tbody') tbody;
  
  private year = 2018;
  
  private month = 0;
  
  private today;
  
  private months =
    [
      { name: 'January', initials: 'jan' },
      { name: 'February', initials: 'feb' },
      { name: 'March', initials: 'marc' },
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
    ["Su","Mo","Tu","We","Th","Fr","Sa"];
  
  constructor( public calendar: ElementRef, private renderer: Renderer2, private change: ChangeDetectorRef,
               tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
    super( tabIndexService, idService, nameService );
  }
  
  ngAfterViewInit() {
    this.setElement( this.calendar, 'calendar' );
    this.today = new Date().getDate();
    this.generateDays();
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
    let dayOfMonth = [];
    
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
      this.renderer.appendChild(week.nativeElement, td.nativeElement);
    }
  
    for (let i = dayOfMonth[dayOfMonth.length - 1].dayOfWeek; i < 6; i++) {
      const td = new ElementRef( this.renderer.createElement('td'));
      this.renderer.appendChild(week.nativeElement, td.nativeElement);
    }
    
    if (this.tbody.nativeElement.children.length === 5) {
      let another = new ElementRef( this.renderer.createElement('tr'));
      for (let col = 0; col < 7; col++) {
        const td = new ElementRef(this.renderer.createElement('td'));
        td.nativeElement.innerHTML = '&nbsp';
        this.renderer.appendChild(this.tbody.nativeElement, another.nativeElement);
        this.renderer.appendChild(another.nativeElement, td.nativeElement);
      }
    }
    
  }
  
  markToday(day, cell) {
    if (day === this.today) {
      this.renderer.addClass(cell.nativeElement, 'today');
    }
  }
  
  clearBody() {
    this.tbody.nativeElement.innerHTML = '';
  }
  
  getLastDayOfMonth(date) {
  
  }
  
}

