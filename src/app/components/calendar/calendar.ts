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

  public displayYears = false;

  private year = 2018;

  private month = 0;

  private today;

  private selectedDay;

  private todayIndex;

  private keyboardNavLine;

  private lineIndex;

  private navigator;

  private initNavigator;

  private rangeYear = [];

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
    this.initializeNavigator();
    setTimeout(() => {
      this.wrapper.nativeElement.focus();
    }, 1);
  }

  decreaseDate() {
    this.handleChangeDateValuesDecrease();
    this.generateDays( 'up' );
  }

  increaseDate() {
    this.handleChangeDateValuesIncrease();
    this.generateDays( 'down' );
  }

  handleChangeDateValuesDecrease() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    }else {
      this.month--;
    }
  }

  handleChangeDateValuesIncrease() {
    if ( this.month === 11 ) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
  }

  getToday() {
    this.displayYears = false;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.today = new Date().getDate();
    this.generateDays();
    this.loadNavigator();
  }

  generateDays( direction?: string ) {
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
      this.createClickListenerDay(td, dayOfMonth[day].day);
      this.renderer.appendChild(week.nativeElement, td.nativeElement);
      this.markToday( dayOfMonth[ day ].day, td );
    }

    for (let i = dayOfMonth[dayOfMonth.length - 1].dayOfWeek; i < 6; i++) {
      const td = new ElementRef( this.renderer.createElement('td'));
      this.renderer.appendChild(week.nativeElement, td.nativeElement);
    }

    for (let line = this.tbody.nativeElement.children.length; line < 6; line++) {
      const another = new ElementRef( this.renderer.createElement('tr'));
      for (let col = 0; col < 7; col++) {
        const td = new ElementRef(this.renderer.createElement('td'));
        td.nativeElement.innerHTML = '&nbsp';
        this.renderer.appendChild(this.tbody.nativeElement, another.nativeElement);
        this.renderer.appendChild(another.nativeElement, td.nativeElement);
      }
    }

    this.handleScrolling( direction );
  }

  handleScrolling( direction ) {
    if ( direction ) {
      setTimeout( () => {
        switch (direction) {
          case 'down': this.setNavigatorWhileDown(); break;
          case 'up': this.setNavigatorWhileUp(); break;
          case 'right': this.setNavigatorWhileRight(); break;
          case 'left': this.setNavigatorWhileLeft(); break;
        }
      }, 10 );
    }
  }

  setNavigatorWhileDown() {
    for ( let i = 0; i < this.tbody.nativeElement.children.length; i++ ) {
      this.keyboardNavLine = this.tbody.nativeElement.children[ i ];
      if ( this.hasContentOnCurrentLine() && this.hasContentOnCurrentLineInNavigatorPosition()) {
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
    for ( let i = 0; i < this.keyboardNavLine.children.length; i++) {
      if (this.hasContentOnCell(this.keyboardNavLine.children[i])) {
        this.navigator = i;
        this.setNavigator(this.navigator);
        return;
      }
    }
  }

  setNavigatorWhileLeft() {
    let index = this.tbody.nativeElement.children.length - 1;
    this.keyboardNavLine = this.tbody.nativeElement.children[this.tbody.nativeElement.children.length - 1];

    while (this.hasContentOnCurrentLine() === false) {
      this.keyboardNavLine = this.tbody.nativeElement.children[ index ];
      index--;
    }

    for ( let i = this.keyboardNavLine.children.length - 1; i >= 0; i--) {
      if (this.hasContentOnCell(this.keyboardNavLine.children[i])) {
        this.navigator = i;
        this.setNavigator(this.navigator);
        return;
      }
    }
  }

  hasContentOnCell(cell) {
    return (cell.innerHTML.trim().length > 0) && (cell.innerHTML.trim() !== '&nbsp;');
  }

  hasContentInSomeItemOfLine( line ) {
    for (let i = 0; i < line.children.length; i++) {
      if ((line.children[ i ].innerHTML.trim().length > 0) && (line.children[ i ].innerHTML.trim() !== '&nbsp;')) {
        this.initNavigator = i;
        return true;
      }
    }
    return false;
  }

  createClickListenerDay(cell, day) {
    this.renderer.listen(cell.nativeElement, 'click', $event => {
      this.selectDay.emit({'year': this.year, 'month': this.month, 'day': day});
      this.removeTodaySelected();
      this.setSelectedDay( cell.nativeElement, $event.target );
    });
  }

  createKeyboardListenerDay() {
    this.renderer.listen(this.wrapper.nativeElement, 'keydown', $event => {
      this.handleKeyDown( $event );
    });
  }

  removeTodaySelected() {
    if ( this.todayIndex.nativeElement.className.includes( 'selected' ) ) {
      this.renderer.removeClass( this.todayIndex.nativeElement, 'selected' );
    }
  }

  handleKeyDown( $event ) {
    $event.preventDefault();
    switch ($event.keyCode) {
      case KeyEvent.ARROWRIGHT: this.handleArrowRight(); break;
      case KeyEvent.ARROWLEFT: this.handleArrowLeft(); break;
      case KeyEvent.ARROWUP: this.handleArrowUp(); break;
      case KeyEvent.ARROWDOWN: this.handleArrowDown(); break;
      case KeyEvent.ENTER: this.handleKeyEnter(); break;
    }
  }

  handleArrowDown() {
    if ( !this.hasContentOnNextLine() || !this.hasContentOnNextLineInNavigatorPosition() ) {
      if (!this.displayYearOrMonths()) {
        this.increaseDate();
      }
      this.handleChangeYearWhileMonths(this.year + 1);
      this.handleChangeRangeYearWhileYears('down');
      return;
    }
    this.handleKeyBoardNav();
    this.keyboardNavLine = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex + 1 ];
    this.navigateDown();
  }

  handleArrowUp() {
    if (!this.hasContentOnPreviousLine() || !this.hasContentOnPreviousLineInNavigatorPosition()) {
      if (!this.displayYearOrMonths()) {
        this.decreaseDate();
      }
      this.handleChangeYearWhileMonths(this.year - 1);
      this.handleChangeRangeYearWhileYears('up');
      return;
    }
    this.handleKeyBoardNav();
    this.keyboardNavLine = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex - 1 ];
    this.navigateUp();
  }

  handleChangeRangeYearWhileYears(direction) {
    if (this.displayYears) {
      direction === 'down' ? this.increaseYear() : this.decreaseYear();
    }
  }

  handleChangeYearWhileMonths(year) {
    if (this.displayMonths) {
      this.year = year;
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
    if (!this.hasContentOnPreviousCellFirstLine() && !this.displayYearOrMonths()) {
      this.handleChangeDateValuesDecrease();
      this.generateDays('left');
      return;
    }
    if ( this.isFirstCell()) {
      return this.setNavigatorToNewLineBackward();
    }
    this.handleKeyBoardNav();
    this.navigateLeft();
  }

  displayYearOrMonths() {
    return this.displayMonths || this.displayYears;
  }

  handleArrowRight() {
    if ( !this.hasContentOnNextCell() && !this.displayYearOrMonths()) {
      this.handleChangeDateValuesIncrease();
      this.generateDays('right');
      return;
    }
    if ( this.isLastCell()) {
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
    const line = this.tbody.nativeElement.children[ this.keyboardNavLine.sectionRowIndex];
    return this.hasContentInSomeItemOfLine( line );
  }

  hasContentOnPreviousCellFirstLine() {
    if ((this.keyboardNavLine.sectionRowIndex === 0) && (this.navigator === 0)) {
      return false;
    }
    if ( this.keyboardNavLine.sectionRowIndex === 0 ) {
      return this.keyboardNavLine.children[ this.navigator - 1 ].innerHTML.trim().length > 0;
    }
    return true;
  }

  hasContentOnNextCell() {
    if ( this.navigator === this.keyboardNavLine.children.length - 1 ) {
      if (!this.hasContentOnNextLine()) {
        return false;
      }
    }
    if (!this.keyboardNavLine.children[ this.navigator + 1 ]) {
      return true;
    }
    return this.keyboardNavLine.children[ this.navigator + 1 ].innerHTML.trim().length > 0;
  }

  navigateLeft() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    const currentCell = this.getCellSelected();
    const indexNav = (this.navigator !== undefined) ? this.navigator - 1 : currentCell - 1;
    this.setNavigator( indexNav, 'left' );
  }

  navigateUp() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    this.setNavigator( this.navigator, 'up' );
  }

  navigateDown() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    this.setNavigator( this.navigator, 'down' );
  }

  navigateRight() {
    this.lineIndex = this.keyboardNavLine.sectionRowIndex;
    const currentCell = this.getCellSelected();
    const indexNav = (this.navigator !== undefined) ? this.navigator + 1 : currentCell + 1;
    this.setNavigator( indexNav, 'right' );
  }

  handleKeyBoardNav() {
    if ( !this.keyboardNavLine ) {
      this.keyboardNavLine = !this.selectedDay ? this.todayIndex.nativeElement.parentElement :
        this.selectedDay.nativeElement.parentElement;
    }
  }

  setNavigatorToNewLineForward() {
    if (this.tbody.nativeElement.children[this.keyboardNavLine.sectionRowIndex + 1]) {
      this.lineIndex = this.keyboardNavLine.sectionRowIndex + 1;
      this.renderer.removeClass( this.keyboardNavLine.children[ this.keyboardNavLine.children.length - 1 ], 'navigator' );
      this.keyboardNavLine = this.tbody.nativeElement.children[ this.lineIndex ];
      this.setNavigator( 0 );
    }
  }

  setNavigatorToNewLineBackward() {
    if (this.tbody.nativeElement.children[this.keyboardNavLine.sectionRowIndex - 1]) {
      this.lineIndex = this.keyboardNavLine.sectionRowIndex - 1;
      this.renderer.removeClass( this.keyboardNavLine.children[ 0 ], 'navigator' );
      this.keyboardNavLine = this.tbody.nativeElement.children[ this.lineIndex ];
      this.setNavigator( this.keyboardNavLine.children.length - 1 );
    }
  }

  handleKeyEnter() {
    if (this.displayMonths) {
      this.month = parseInt(this.keyboardNavLine.children[ this.navigator ].getAttribute('cell'), 10);
      this.generateDays();
      this.initializeNavigator();
      return;
    }

    if (this.displayYears) {
      this.year = parseInt(this.keyboardNavLine.children[ this.navigator ].innerHTML, 10);
      this.changeMonth();
      return;
    }

    this.removeTodaySelected();
    this.setSelectedDay( this.keyboardNavLine.children[ this.navigator ] );
  }

  getCellSelected() {
    for ( let i = 0; i < this.keyboardNavLine.children.length; i++ ) {
      if ( this.keyboardNavLine.children[ i ].className.includes( 'selected' ) ) {
        return i;
      }
    }
  }

  setNavigator( index, direction? ) {
    if ( this.keyboardNavLine.children[ index ] ) {
      this.removeClass( index, direction );
      this.renderer.addClass( this.keyboardNavLine.children[ index ], 'navigator' );
      this.navigator = index;
    }
  }

  removeClass( index, direction ) {
    let operator;
    switch ( direction ) {
      case 'right': operator = index - 1; break;
      case 'left': operator = index + 1; break;
      case 'up': this.handleRemoveClassNavigateGoingUp( index ); return;
      case 'down': this.handleRemoveClassNavigateGoingDown( index ); return;
    }
    if ( (this.keyboardNavLine.children[ operator ]) && this.hasNavigator( this.keyboardNavLine.children[ operator ] ) ) {
      this.renderer.removeClass( this.keyboardNavLine.children[ operator ], 'navigator' );
    }
  }

  handleRemoveClassNavigateGoingUp( index ) {
    const previousLine = this.tbody.nativeElement.children[ this.lineIndex + 1 ];
    if ( (previousLine.children[ index ]) && this.hasNavigator( previousLine.children[ index ] ) ) {
      this.renderer.removeClass( previousLine.children[ index ], 'navigator' );
    }
  }

  handleRemoveClassNavigateGoingDown( index ) {
    const nextLine = this.tbody.nativeElement.children[ this.lineIndex - 1 ];
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

  markToday(day, cell) {
    if ( (day === this.today) && (this.month === new Date().getMonth() )
      && (this.year === new Date().getFullYear()) ) {
      this.renderer.addClass(cell.nativeElement, 'today');
      this.renderer.addClass(cell.nativeElement, 'selected');
      this.todayIndex = cell;
    }
    this.removeSelectedDay();
  }

  changeMonth() {
    this.displayMonths = true;
    this.displayYears = false;
    this.tbody.nativeElement.innerHTML = '';

    let line = new ElementRef( this.renderer.createElement('tr'));
    for (let i = 0; i < 12; i++) {
      if (i % 4 === 0) {
        line = new ElementRef( this.renderer.createElement('tr'));
      }
      const cell = new ElementRef(this.renderer.createElement('td'));

      cell.nativeElement.innerHTML = this.months[i].initials;
      this.renderer.setAttribute(cell.nativeElement, 'cell', '' + i);
      this.createClickListenerMonth(cell, i);
      this.handleSelectedMonth(i, line, cell);
      this.renderer.setStyle(line.nativeElement, 'height', '65px');
      this.renderer.appendChild(line.nativeElement, cell.nativeElement);
      this.renderer.appendChild(this.tbody.nativeElement, line.nativeElement);
    }
  }

  createClickListenerMonth(cell, index) {
    this.renderer.listen(cell.nativeElement, 'click', $event => {
      this.month = index;
      this.generateDays();
      this.initializeNavigator();
    });
  }

  increaseYear() {
    this.year++;
  }

  decreaseYear() {
    this.year--;
  }

  increaseYearRange() {
    this.year = this.rangeYear[1];
    this.changeYear();
  }

  decreaseYearRange() {
    this.year = this.rangeYear[0];
    this.changeYear('old');
  }

  changeYear(previous?) {
    this.displayYears = true;
    this.displayMonths = false;
    this.tbody.nativeElement.innerHTML = '';

    let line = new ElementRef( this.renderer.createElement('tr'));

    for (let i = 0; i < 12; i++) {
      if ( i % 4 === 0 ) {
        line = new ElementRef( this.renderer.createElement( 'tr' ) );
      }
      const cell = new ElementRef( this.renderer.createElement( 'td' ) );
      cell.nativeElement.innerHTML = previous ? (this.year - 11) + i : this.year + i;
      this.createClickListenerYear( cell );
      this.renderer.setStyle( line.nativeElement, 'height', '65px' );
      this.renderer.appendChild( line.nativeElement, cell.nativeElement );
      this.renderer.appendChild( this.tbody.nativeElement, line.nativeElement );
      this.handleRangeYear(i, previous);
      this.handleSelectedYear(line, cell);
    }
  }

  handleRangeYear(index, previous) {
    if (index === 11) {
      if (previous) {
        this.rangeYear[0] = this.year - 11;
        this.rangeYear[1] = this.year;
      }else {
        this.rangeYear[0] = this.year;
        this.rangeYear[1] = this.year + 11;
      }
    }
  }

  createClickListenerYear(cell) {
    this.renderer.listen(cell.nativeElement, 'click', event => {
      this.year = parseInt(cell.nativeElement.innerHTML, 10);
      this.changeMonth();
    });
  }

  handleSelectedYear(line, cell) {
    const yearOfCell = parseInt(cell.nativeElement.innerHTML, 10);
    if (yearOfCell === this.year) {
      this.renderer.addClass(cell.nativeElement, 'selected');
      this.setKeyBoardLineIndex(line, cell);
    }
  }

  handleSelectedMonth(index, line, cell) {
    if (index === this.month) {
      this.renderer.addClass(cell.nativeElement, 'selected');
      this.setKeyBoardLineIndex(line, cell);
    }
  }

  setKeyBoardLineIndex(line, cell) {
    this.keyboardNavLine = line.nativeElement;
    this.lineIndex = line.nativeElement.sectionRowIndex;
    setTimeout(() => {this.navigator = cell.nativeElement.cellIndex; }, 1);
  }

  setSelectedDay( cell, target? ) {
    this.renderer.addClass( cell, 'selected' );
    this.removeSelectedDay();
    this.removeNavigator( cell );
    this.selectedDay = target ? target : cell;
  }

  removeSelectedDay() {
    if (this.selectedDay) {
      this.renderer.removeClass(this.selectedDay, 'selected');
    }
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
    this.keyboardNavLine = this.tbody.nativeElement.children[0];
    this.hasContentOnCurrentLine();
    this.setNavigator(this.initNavigator);
  }

  loadNavigator( cell? ) {
    if ( cell ) {
      this.keyboardNavLine = cell.parentElement;
      this.navigator = cell.cellIndex;
      return;
    }

    const listTd = this.tbody.nativeElement.querySelectorAll( 'td' );
    for ( let i = 0; i < listTd.length; i++ ) {
      if ( listTd[ i ].className.includes( 'selected' ) ) {
        this.keyboardNavLine = listTd[ i ].parentElement;
        this.navigator = listTd[ i ].cellIndex;
        return;
      }
    }
  }

  clearBody() {
    this.tbody.nativeElement.innerHTML = '';
  }

}

