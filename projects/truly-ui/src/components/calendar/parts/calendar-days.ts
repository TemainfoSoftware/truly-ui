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
import { CalendarStatus, TlCalendar } from '../calendar';

@Component( {
  selector: 'tl-calendar-days',
  template: ``,
  providers: [ NavigatorService ]
} )
export class TlCalendarDays {

  private calendar: TlCalendar;

  private week;

  private dayOfMonth = [];

  private statusElements = [];

  private status;

  constructor() {
  }

  setCalendar( calendar ) {
    this.calendar = calendar;
    this.initializeTable();
  }

  initializeTable() {
    for ( let i = 1; i <= new Date( this.calendar.year, this.calendar.month + 1, 0 ).getDate(); i++ ) {
      this.dayOfMonth.push( {
        dayOfWeek: new Date( this.calendar.year, this.calendar.month, i ).getDay(),
        day: new Date( this.calendar.year, 0, i ).getDate()
      } );
    }
    this.generateLinesAndCells();
    this.appendDays();
    this.generateEmptyLinesAndCells();
    this.generateLeftOverLinesAndCells();
  }

  generateLinesAndCells() {
    if ( this.dayOfMonth[ 0 ].dayOfWeek !== 0 ) {
      this.week = new ElementRef( this.calendar.renderer.createElement( 'tr' ) );
      this.calendar.renderer.addClass( this.week.nativeElement, 'ui-table-line' );
      this.calendar.renderer.appendChild( this.calendar.tbody.nativeElement, this.week.nativeElement );
      for ( let i = 0; i < this.dayOfMonth[ 0 ].dayOfWeek; i++ ) {
        const td = new ElementRef( this.calendar.renderer.createElement( 'td' ) );
        this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell' );
        this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell-empty' );
        this.calendar.renderer.appendChild( this.week.nativeElement, td.nativeElement );
      }
    }
  }

  generateEmptyLinesAndCells() {
    for ( let i = this.dayOfMonth[ this.dayOfMonth.length - 1 ].dayOfWeek; i < 6; i++ ) {
      const td = new ElementRef( this.calendar.renderer.createElement( 'td' ) );
      this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell' );
      this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell-empty' );
      this.calendar.renderer.appendChild( this.week.nativeElement, td.nativeElement );
    }
  }

  generateLeftOverLinesAndCells() {
    for ( let line = this.calendar.tbody.nativeElement.children.length; line < 6; line++ ) {
      const another = new ElementRef( this.calendar.renderer.createElement( 'tr' ) );
      this.calendar.renderer.addClass( another.nativeElement, 'ui-table-line' );

      for ( let col = 0; col < 7; col++ ) {
        const td = new ElementRef( this.calendar.renderer.createElement( 'td' ) );

        this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell' );
        this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell-empty' );

        td.nativeElement.innerHTML = '&nbsp';
        this.calendar.renderer.appendChild( this.calendar.tbody.nativeElement, another.nativeElement );
        this.calendar.renderer.appendChild( another.nativeElement, td.nativeElement );
      }
    }
  }

  changeStatus() {
    for (let day = 0; day < this.dayOfMonth.length; day++ ) {
      const date = new Date( this.calendar.year, this.calendar.month, day + 1 );
      this.calendar.status.forEach( ( value, index ) => {
        if ( value.date.getTime() === date.getTime() ) {
          this.setStatus(value, this.statusElements[index].nativeElement);
        }
      });
    }
  }

  appendDays() {
    for ( let day = 0; day < this.dayOfMonth.length; day++ ) {
      if ( this.dayOfMonth[ day ].dayOfWeek === 0 ) {
        this.week = new ElementRef( this.calendar.renderer.createElement( 'tr' ) );
        this.calendar.renderer.addClass( this.week.nativeElement, 'ui-table-line' );
        this.calendar.renderer.appendChild( this.calendar.tbody.nativeElement, this.week.nativeElement );
      }

      const td = new ElementRef( this.calendar.renderer.createElement( 'td' ) );
      this.calendar.renderer.addClass( td.nativeElement, 'ui-table-cell' );
      td.nativeElement.innerHTML = this.dayOfMonth[ day ].day;

      if ( this.calendar.status ) {

        const date = new Date( this.calendar.year, this.calendar.month, day + 1 );
        this.calendar.status.forEach( ( value ) => {
          if ( value.date.getTime() === date.getTime() ) {

            const statusWrapper = new ElementRef( this.calendar.renderer.createElement( 'div' ) );
            this.calendar.renderer.addClass( statusWrapper.nativeElement, 'ui-status-wrapper' );

            this.status = new ElementRef( this.calendar.renderer.createElement( 'div' ) );
            this.calendar.renderer.addClass( this.status.nativeElement, 'ui-cell-status' );

            this.calendar.renderer.setAttribute( this.status.nativeElement, 'day', day.toString());
            this.statusElements.push(this.status);

            const statusBackdrop = new ElementRef( this.calendar.renderer.createElement( 'div' ) );
            this.calendar.renderer.addClass( statusBackdrop.nativeElement, 'ui-status-backdrop' );

            this.calendar.renderer.appendChild( statusWrapper.nativeElement, this.status.nativeElement );
            this.calendar.renderer.appendChild( statusWrapper.nativeElement, statusBackdrop.nativeElement );
            this.calendar.renderer.appendChild( td.nativeElement, statusWrapper.nativeElement );

            this.setStatus( value );
          }

        } );
      }

      this.markToday( this.dayOfMonth[ day ].day, td );
      this.selectDay( this.dayOfMonth[ day ].day, td );

      this.createClickListenerDay( td );
      this.calendar.renderer.appendChild( this.week.nativeElement, td.nativeElement );
    }
  }

  setStatus( item: CalendarStatus, element? ) {
    const percent = (100 * item.current) / item.total;
    this.calendar.renderer.setStyle( element ? element : this.status.nativeElement, 'width', percent + '%' );
    this.calendar.renderer.addClass( element ? element : this.status.nativeElement, percent === 100 ? 'danger' : 'primary' );
  }

  selectDay( day, cell ) {
    if ( day === this.calendar.day ) {
      this.calendar.renderer.addClass( cell.nativeElement, 'selected' );
      this.calendar.selectedDay = cell.nativeElement;
    }
  }

  markToday( day, cell ) {
    if ( (day === new Date().getDate()) && (this.calendar.month === new Date().getMonth() )
      && (this.calendar.year === new Date().getFullYear()) ) {
      this.calendar.renderer.addClass( cell.nativeElement, 'today' );
      this.calendar.todayIndex = cell;
    }
  }

  createClickListenerDay( cell ) {
    this.calendar.renderer.listen( cell.nativeElement, 'click', $event => {
      this.setSelectedDay( cell.nativeElement, $event, $event.target );
    } );
  }

  setSelectedDay( cell, $event, target? ) {
    this.calendar.emitSelectedDay( cell, $event );
    if ( cell.getAttribute( 'class' ).includes( 'selected' ) ) {
      return;
    }
    this.calendar.renderer.addClass( cell, 'selected' );
    this.calendar.removeNavigator( cell );
    this.removeSelectedDay( cell );
    this.calendar.selectedDay = target ? target : cell;
  }

  removeSelectedDay( cell ) {
    if ( (this.calendar.selectedDay !== cell) && (this.calendar.selectedDay !== undefined) ) {
      this.calendar.renderer.removeClass( this.calendar.selectedDay, 'selected' );
    }
  }

}

