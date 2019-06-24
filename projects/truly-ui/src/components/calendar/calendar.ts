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
import {
  Component, ElementRef, AfterViewInit, Renderer2, ViewChild, Output,
  EventEmitter, Input, QueryList, ViewChildren, ViewContainerRef, SimpleChanges, OnChanges, OnDestroy,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { KeyEvent } from '../core/enums/key-events';
import { TlNavigator } from '../navigator/navigator';
import { NavigatorService } from '../navigator/services/navigator.service';
import { CalendarService } from './services/calendar.service';
import { I18nService } from '../i18n/i18n.service';
import { Subscription } from 'rxjs';

export interface CalendarStatus {
  id?: string;
  date: Date;
  current: number;
  total: number;
}

@Component( {
  selector: 'tl-calendar',
  templateUrl: './calendar.html',
  styleUrls: [ './calendar.scss' ],
  providers: [ NavigatorService, CalendarService ]
} )
export class TlCalendar extends ComponentDefaultBase implements AfterViewInit, OnChanges, OnDestroy {

  @Input() todayButton = true;

  @Input() inputControlFocus;

  @Input() status: Array<CalendarStatus>;

  @Input() date = new Date();

  @Input() year = this.date ? this.date.getFullYear() : new Date().getFullYear();

  @Input() month = this.date ? this.date.getMonth() : new Date().getMonth();

  @Input() day = this.date ? this.date.getDate() : new Date().getDate();

  @Input() typingDay = false;

  @Output() selectDay: EventEmitter<any> = new EventEmitter<any>();

  @Output() focusout: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild( 'tbody', {static: true}  ) tbody;

  @ViewChild( 'table', {static: true}  ) table;

  @ViewChild( 'wrapper', {static: true}  ) wrapper;

  @ViewChildren( TlNavigator ) tlnavigator: QueryList<TlNavigator>;

  private subscription = new Subscription();

  get todayText(): string {
    return this.i18n.getLocale().Calendar.today;
  }

  public displayMonths = false;

  public displayYears = false;

  public dateNavigator;

  public selectedDay;

  public todayIndex;

  private keyboardNavLine;

  private lineIndex;

  private navigator;

  private initNavigator;

  private direction;

  private rangeYear = {};

  get months() {
    return this.i18n.getLocale().Calendar.months;
  }

  get dayOfWeek() {
    return this.i18n.getLocale().Calendar.dayOfWeek;
  }

  constructor(
    public calendar: ElementRef,
    public renderer: Renderer2,
    private i18n: I18nService,
    private navigatorService: NavigatorService,
    private calendarService: CalendarService,
    private view: ViewContainerRef,
    tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService) {
    super( tabIndexService, idService, nameService );
    this.dateNavigator = new Date();
  }


  ngAfterViewInit() {
    this.calendarService.setView( this.view );
    this.calendarService.setConfigCalendar( this );
    this.navigatorService.setNavigator( this.tlnavigator.toArray()[ 0 ] );
    this.setDateNavigator();

    this.setElement( this.calendar, 'calendar' );
    this.createKeyboardListener();
    this.generateDays();
    this.initializeNavigator();
    setTimeout( () => {
      if ( !this.inputControlFocus ) {
        this.wrapper.nativeElement.focus();
      }
    }, 1 );
  }


  decreaseDate( $event? ) {
    this.direction = 'left';
    this.setDateOfNavigator( $event );
    this.generateDays();
  }

  increaseDate( $event? ) {
    this.direction = 'right';
    this.setDateOfNavigator( $event );
    this.generateDays();
  }

  handleChangeDateValuesDecrease() {
    this.navigatorService.setNavigator( this.tlnavigator.toArray()[ 0 ] );
    this.navigatorService.previous();
  }

  handleChangeDateValuesIncrease() {
    this.navigatorService.setNavigator( this.tlnavigator.toArray()[ 0 ] );
    this.navigatorService.next();
  }

  setDateOfNavigator( date ) {
    this.year = date.year;
    this.month = date.month;
  }

  focusOut( $event ) {
    this.focusout.emit( $event );
  }

  getToday() {
    this.displayYears = false;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.day = new Date().getDate();
    this.direction = 'none';
    this.emitToday();
    this.setDateNavigator();
    this.generateDays();
    this.loadNavigator();
  }

  emitToday() {
    this.selectDay.emit(
      {
        'year': this.year,
        'month': this.month + 1,
        'day': this.day,
        'fullDate': new Date( this.year, this.month, this.day, new Date().getHours(), new Date().getMinutes() ),
      }, );
  }

  generateDays() {
    this.displayMonths = false;
    this.calendarService.generateDays();
    this.handleScrolling();
  }

  handleScrolling() {
    if ( this.direction ) {
      setTimeout( () => {
        switch ( this.direction ) {
          case 'down':
            this.setNavigatorWhileDown();
            break;
          case 'up':
            this.setNavigatorWhileUp();
            break;
          case 'right':
            this.setNavigatorWhileRight();
            break;
          case 'left':
            this.setNavigatorWhileLeft();
            break;
        }
      }, 10 );
    }
  }

  setNavigatorWhileDown() {
    for ( let i = 0; i < this.tbody.nativeElement.children.length; i++ ) {
      this.keyboardNavLine = this.tbody.nativeElement.children[ i ];
      if ( this.hasContentOnCurrentLine() && this.hasContentOnCurrentLineInNavigatorPosition() ) {
        this.setNavigator( this.navigator );
        return;
      }
    }
  }

  hasContentOnCurrentLineInNavigatorPosition() {
    const next = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex ];
    return (next.children[ this.navigator ].innerHTML.trim().length > 0) &&
      (next.children[ this.navigator ].innerHTML.trim() !== '&nbsp;');
  }

  setDateNavigator() {
    this.dateNavigator = new Date( this.year, this.month );
  }

  setNavigatorWhileUp() {
    for ( let i = this.tbody.nativeElement.children.length - 1; i >= 0; i-- ) {
      this.keyboardNavLine = this.tbody.nativeElement.children[ i ];
      if ( this.hasContentOnCurrentLine() && this.hasContentOnCurrentLineInNavigatorPosition() ) {
        this.setNavigator( this.navigator );
        return;
      }
    }
  }

  setNavigatorWhileRight() {
    this.keyboardNavLine = this.tbody.nativeElement.children[ 0 ];
    for ( let i = 0; i < this.keyboardNavLine.children.length; i++ ) {
      if ( this.hasContentOnCell( this.keyboardNavLine.children[ i ] ) ) {
        this.navigator = i;
        this.setNavigator( this.navigator );
        return;
      }
    }
  }

  setNavigatorWhileLeft() {
    let index = this.tbody.nativeElement.children.length - 1;
    this.keyboardNavLine = this.tbody.nativeElement.children[ this.tbody.nativeElement.children.length - 1 ];

    while ( this.hasContentOnCurrentLine() === false ) {
      this.keyboardNavLine = this.tbody.nativeElement.children[ index ];
      index--;
    }

    for ( let i = this.keyboardNavLine.children.length - 1; i >= 0; i-- ) {
      if ( this.hasContentOnCell( this.keyboardNavLine.children[ i ] ) ) {
        this.navigator = i;
        this.setNavigator( this.navigator );
        return;
      }
    }
  }

  hasContentOnCell( cell ) {
    return (cell.innerHTML.trim().length > 0) && (cell.innerHTML.trim() !== '&nbsp;');
  }

  hasContentInSomeItemOfLine( line ) {
    if ( line === undefined ) {
      return false;
    }
    for ( let i = 0; i < line.children.length; i++ ) {
      if ( (line.children[ i ].innerHTML.trim().length > 0) && (line.children[ i ].innerHTML.trim() !== '&nbsp;') ) {
        this.initNavigator = i;
        return true;
      }
    }
    return false;
  }

  createKeyboardListener() {
    const rootControlElement = this.inputControlFocus ?
      this.inputControlFocus.input.nativeElement : this.wrapper.nativeElement;
    this.subscription.add(this.renderer.listen( rootControlElement, 'keydown', $event => {
      this.handleKeyDown( $event );
    } ));
  }

  handleKeyDown( $event ) {
    switch ( $event.keyCode ) {
      case KeyEvent.ARROWRIGHT:
        this.handleArrowRight();
        break;
      case KeyEvent.ARROWLEFT:
        this.handleArrowLeft();
        break;
      case KeyEvent.ARROWUP:
        $event.preventDefault();
        this.handleArrowUp();
        break;
      case KeyEvent.ARROWDOWN:
        $event.preventDefault();
        this.handleArrowDown();
        break;
      case KeyEvent.ENTER:
        $event.preventDefault();
        this.handleKeyEnter($event);
        break;
    }
  }

  handleArrowDown() {
    if ( !this.hasContentOnNextLine() || !this.hasContentOnNextLineInNavigatorPosition() ) {
      if ( !this.displayYearOrMonths() ) {
        this.direction = 'down';
        this.lineIndex = this.keyboardNavLine.sectionRowIndex;
        this.handleChangeDateValuesIncrease();
      }
      this.handleChangeYearWhileMonths( this.year + 1 );
      this.handleChangeRangeYearWhileYears( 'down' );
      return;
    }
    this.handleKeyBoardNav();
    this.keyboardNavLine = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex + 1 ];
    this.navigateDown();
  }

  handleArrowUp() {
    if ( !this.hasContentOnPreviousLine() || !this.hasContentOnPreviousLineInNavigatorPosition() ) {
      if ( !this.displayYearOrMonths() ) {
        this.direction = 'up';
        this.lineIndex = this.keyboardNavLine.sectionRowIndex;
        this.handleChangeDateValuesDecrease();
      }
      this.handleChangeYearWhileMonths( this.year - 1 );
      this.handleChangeRangeYearWhileYears( 'up' );
      return;
    }
    this.handleKeyBoardNav();
    this.keyboardNavLine = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex - 1 ];
    this.navigateUp();
  }

  handleChangeRangeYearWhileYears( direction ) {
    if ( this.displayYears ) {
      direction === 'down' ? this.handleChangeDateValuesIncrease() : this.handleChangeDateValuesDecrease();
    }
  }

  handleChangeYearWhileMonths( year ) {
    if ( this.displayMonths ) {
      this.year = year;
      this.setDateNavigator();
    }
  }

  hasContentOnNextLineInNavigatorPosition() {
    const next = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex + 1 ];
    return (next.children[ this.navigator ].innerHTML.trim().length > 0) &&
      (next.children[ this.navigator ].innerHTML.trim() !== '&nbsp;');
  }

  hasContentOnPreviousLineInNavigatorPosition() {
    const next = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex - 1 ];
    return (next.children[ this.navigator ].innerHTML.trim().length > 0) &&
      (next.children[ this.navigator ].innerHTML.trim() !== '&nbsp;');
  }

  handleArrowLeft() {
    if ( !this.hasContentOnPreviousCellFirstLine() && !this.displayYearOrMonths() ) {
      this.direction = 'left';
      this.handleChangeDateValuesDecrease();
      return;
    }
    if ( this.isFirstCell() ) {
      return this.setNavigatorToNewLineBackward();
    }
    this.handleKeyBoardNav();
    this.navigateLeft();
  }

  displayYearOrMonths() {
    return this.displayMonths || this.displayYears;
  }

  handleArrowRight() {
    if ( !this.hasContentOnNextCell() && !this.displayYearOrMonths() ) {
      this.direction = 'right';
      this.handleChangeDateValuesIncrease();
      return;
    }
    if ( this.isLastCell() ) {
      return this.setNavigatorToNewLineForward();
    }
    this.handleKeyBoardNav();
    this.navigateRight();
  }

  hasContentOnNextLine() {
    if ( (this.keyboardNavLine.sectionRowIndex === this.tbody.nativeElement.children.length - 1) ) {
      return false;
    }
    const line = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex + 1 ];
    return this.hasContentInSomeItemOfLine( line );
  }

  hasContentOnPreviousLine() {
    if ( (this.keyboardNavLine.sectionRowIndex === 0) ) {
      return false;
    }
    const line = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex - 1 ];
    return this.hasContentInSomeItemOfLine( line );
  }

  hasContentOnCurrentLine() {
    const line = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex ];
    return this.hasContentInSomeItemOfLine( line );
  }

  hasContentOnPreviousCellFirstLine() {
    if ( (this.keyboardNavLine.sectionRowIndex === 0) && (this.navigator === 0) ) {
      return false;
    }
    if ( this.keyboardNavLine.sectionRowIndex === 0 ) {
      return this.keyboardNavLine.children[ this.navigator - 1 ].innerHTML.trim().length > 0;
    }
    return true;
  }

  hasContentOnNextCell() {
    if ( this.navigator === this.keyboardNavLine.children.length - 1 ) {
      if ( !this.hasContentOnNextLine() ) {
        return false;
      }
    }
    if ( !this.keyboardNavLine.children[ this.navigator + 1 ] ) {
      return true;
    }
    return this.keyboardNavLine.children[ this.navigator + 1 ].innerHTML.trim().length > 0;
  }

  navigateLeft() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    const currentCell = this.getCellSelected();
    const indexNav = (this.navigator !== undefined) ? this.navigator - 1 : currentCell - 1;
    this.direction = 'left';
    this.setNavigator( indexNav );
  }

  navigateUp() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    this.direction = 'up';
    this.setNavigator( this.navigator );
  }

  navigateDown() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    this.direction = 'down';
    this.setNavigator( this.navigator );
  }

  navigateRight() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    const currentCell = this.getCellSelected();
    const indexNav = (this.navigator !== undefined) ? this.navigator + 1 : currentCell + 1;
    this.direction = 'right';
    this.setNavigator( indexNav );
  }

  handleKeyBoardNav() {
    if ( !this.keyboardNavLine ) {
      this.keyboardNavLine = !this.selectedDay ? this.todayIndex.nativeElement.parentElement :
        this.selectedDay.nativeElement.parentElement;
    }
  }

  setNavigatorToNewLineForward() {
    if ( this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex + 1 ] ) {
      this.lineIndex = this.keyboardNavLine.sectionRowIndex + 1;
      this.renderer.removeClass( this.keyboardNavLine.children[ this.keyboardNavLine.children.length - 1 ], 'navigator' );
      this.keyboardNavLine = this.tbody.nativeElement.children[ this.lineIndex ];
      this.setNavigator( 0 );
    }
  }

  setNavigatorToNewLineBackward() {
    if ( this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex - 1 ] ) {
      this.lineIndex = this.keyboardNavLine.sectionRowIndex - 1;
      this.renderer.removeClass( this.keyboardNavLine.children[ 0 ], 'navigator' );
      this.keyboardNavLine = this.tbody.nativeElement.children[ this.lineIndex ];
      this.setNavigator( this.keyboardNavLine.children.length - 1 );
    }
  }

  handleKeyEnter($event) {
    if ( this.displayMonths ) {
      this.month = parseInt( this.keyboardNavLine.children[ this.navigator ].getAttribute( 'cell' ), 10 );
      this.setDateNavigator();
      this.generateDays();
      this.initializeNavigator();
      return;
    }

    if ( this.displayYears ) {
      this.year = parseInt( this.keyboardNavLine.children[ this.navigator ].innerHTML, 10 );
      this.changeMonth();
      this.setDateNavigator();
      this.initializeNavigator();
      return;
    }

    this.calendarService.setSelectedDay( this.keyboardNavLine.children[ this.navigator ], $event );
  }

  getCellSelected() {
    for ( let i = 0; i < this.keyboardNavLine.children.length; i++ ) {
      if ( this.keyboardNavLine.children[ i ].className.includes( 'selected' ) ) {
        return i;
      }
    }
  }

  setNavigator( index ) {
    if ( this.keyboardNavLine.children[ index ] ) {
      this.removeClass( index );
      this.renderer.addClass( this.keyboardNavLine.children[ index ], 'navigator' );
      this.navigator = index;
    }
  }

  removeClass( index ) {
    let operator;
    switch ( this.direction ) {
      case 'right':
        operator = index - 1;
        break;
      case 'left':
        operator = index + 1;
        break;
      case 'up':
        this.handleRemoveClassNavigateGoingUp( index );
        return;
      case 'down':
        this.handleRemoveClassNavigateGoingDown( index );
        return;
    }
    if ( (this.keyboardNavLine.children[ operator ]) && this.hasNavigator( this.keyboardNavLine.children[ operator ] ) ) {
      this.renderer.removeClass( this.keyboardNavLine.children[ operator ], 'navigator' );
    }
  }

  handleRemoveClassNavigateGoingUp( index ) {
    const previousLine = this.tbody.nativeElement.children[ this.lineIndex + 1 ];
    if ( previousLine === undefined ) {
      return false;
    }
    if ( (previousLine.children[ index ]) && this.hasNavigator( previousLine.children[ index ] ) ) {
      this.renderer.removeClass( previousLine.children[ index ], 'navigator' );
    }
  }

  handleRemoveClassNavigateGoingDown( index ) {
    const nextLine = this.tbody.nativeElement.children[ this.lineIndex - 1 ];
    if ( nextLine === undefined ) {
      return false;
    }
    if ( (nextLine.children[ index ]) && this.hasNavigator( nextLine.children[ index ] ) ) {
      this.renderer.removeClass( nextLine.children[ index ], 'navigator' );
    }
  }

  hasNavigator( element ) {
    return element.className.includes( 'navigator' );
  }

  isLastCell() {
    if ( this.keyboardNavLine ) {
      return this.navigator === this.keyboardNavLine.children.length - 1;
    }
  }

  isFirstCell() {
    if ( this.keyboardNavLine ) {
      return this.navigator === 0;
    }
  }

  changeMonth() {
    this.setWrapperFocus();
    this.displayMonths = true;
    this.displayYears = false;
    this.calendarService.generateMonths();
  }

  increaseYear() {
    this.year++;
    this.changeMonth();
    this.setDateNavigator();
  }

  decreaseYear() {
    this.year--;
    this.changeMonth();
    this.setDateNavigator();
  }

  increaseYearRange( $event ) {
    this.year = $event.rangeYear.end;
    this.changeYear( $event );
  }

  decreaseYearRange( $event ) {
    this.year = $event.rangeYear.start;
    this.changeYear( $event );
  }

  changeYear( range ) {
    this.setWrapperFocus();
    this.displayYears = true;
    this.displayMonths = false;
    this.calendarService.generateYears( range );
  }

  clickNavigatorRange() {
    this.setWrapperFocus();
  }

  setWrapperFocus() {
    this.wrapper.nativeElement.focus();
  }

  setKeyBoardLineIndex( line, cell ) {
    this.keyboardNavLine = line.nativeElement;
    this.lineIndex = line.nativeElement.sectionRowIndex;
    setTimeout( () => {
      this.navigator = cell.nativeElement.cellIndex;
    }, 1 );
  }

  emitSelectedDay( cell, $event ) {
    this.selectDay.emit(
      {
        'year': this.year,
        'month': this.month + 1,
        'day': parseInt( cell.innerHTML, 10 ),
        'fullDate': new Date( this.year, this.month, parseInt( cell.innerHTML, 10 ) ),
        'event': $event
      }, );
  }

  removeNavigator( cell ) {
    this.loadNavigator( cell );
    const cells = this.tbody.nativeElement.querySelectorAll( 'td' );
    for ( let i = 0; i < cells.length; i++ ) {
      if ( cells[ i ].className.includes( 'navigator' ) ) {
        this.renderer.removeClass( cells[ i ], 'navigator' );
        return;
      }
    }
  }

  initializeNavigator() {
    this.direction = '';
    this.keyboardNavLine = this.tbody.nativeElement.children[ 0 ];
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    this.hasContentOnCurrentLine();
    this.setNavigator( this.initNavigator );
  }

  setNavigatorIndex( cell ) {
    this.navigator = cell.cellIndex;
  }

  setCurrentLine( cell ) {
    this.keyboardNavLine = cell;
  }

  loadNavigator( cell? ) {
    if ( cell ) {
      this.setCurrentLine( cell.parentElement );
      this.setNavigatorIndex( cell );
      return;
    }
    this.getSomeCellSelected();
  }

  getSomeCellSelected() {
    const listCell = this.tbody.nativeElement.querySelectorAll( 'td' );
    for ( const cell of listCell ) {
      if ( cell.className.includes( 'selected' ) ) {
        this.setCurrentLine( cell.parentElement );
        this.setNavigatorIndex( cell );
        this.setNavigator( this.navigator );
        return;
      }
    }
  }

  setDateChange() {
    this.date = new Date(this.date);
    this.day = this.date.getDate();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
  }

  ngOnChanges( changes: SimpleChanges ) {
    if (changes.status) {
      if (!changes.status.firstChange) {
        this.calendarService.changeStatus();
      }
    }
    if (changes.date) {
      this.setDateChange();
      if ( !changes.date.firstChange ) {
        this.setDateNavigator();
        this.generateDays();
      }
    }
    if ( changes.day ) {
      if ( !changes.day.firstChange ) {
        this.setDateNavigator();
        this.generateDays();
      }
    }
    if ( changes.month ) {
      if ( !changes.month.firstChange ) {
        this.setDateNavigator();
        this.generateDays();
      }
    }
    if ( changes.year ) {
      if ( !changes.year.firstChange ) {
        this.setDateNavigator();
        this.generateDays();
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

