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
  Component,
  Optional, ContentChild, ViewChild, Output,
  Input, OnInit, EventEmitter, ElementRef, AfterViewInit, AfterContentInit, OnDestroy
} from '@angular/core';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { TlInput } from '../input/input';
import { TlCalendar } from '../calendar/calendar';

import { ReverseFormatDate } from '../core/helper/reverseformatdate';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { KeyEvent } from '../core/enums/key-events';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'tl-datepicker',
  templateUrl: './datepicker.html',
  styleUrls: [ './datepicker.scss' ],
  providers: [ MakeProvider( TlDatePicker ) ]
} )

export class TlDatePicker extends ValueAccessorBase<Date | string> implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @Input() label = '';

  @Input() name = '';

  @Input() labelSize = '';

  @Input() textAlign = 'left';

  @Input() isoDate = true;

  @Input() labelPlacement = 'left';

  @Input() formatDate = 'dd/mm/yyyy';

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() placeholder = 'Datepicker Field';

  @Input() clearButton = true;

  @Input() autoClose = false;

  @Input() iconCalendar = false;

  @Input() openOnFocus = true;

  @Output() selectDay: EventEmitter<any> = new EventEmitter<any>();

  @Output() completeMask: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild( NgModel, {static: true}  ) ngModel: NgModel;

  @ContentChild( FormControlName, {static: true} ) control: FormControlName;

  @ViewChild( TlCalendar, {static: true}  ) calendar;

  @ViewChild( TlInput, {static: true}  ) tlInput: TlInput;

  @ViewChild( 'calendarContent', {static: true}  ) calendarContent;

  @ViewChild( 'arrow', {static: true}  ) arrow;

  public isOpen = false;

  public positionOverlay = '';

  public iconAfter = '';

  public description = '';

  public trigger;

  public year = new Date().getFullYear();

  public month = new Date().getMonth();

  public day = new Date().getDate();

  private subscription = new Subscription();

  constructor( private datePicker: ElementRef ) {
    super();
  }

  ngOnInit() {
    this.setDateMask();
    if ( this.iconCalendar ) {
      this.iconAfter = 'ion-calendar';
    }
  }

  ngAfterContentInit() {
    this.decomposeDate( this.value );
  }

  ngAfterViewInit() {
    this.listenControlChanges();
  }

  private getControl() {
    return this.control ? this.control : this.ngModel;
  }

  listenControlChanges() {
    if ( this.getControl() ) {
      this.subscription.add( this.getControl().control.valueChanges.subscribe( ( date: Date ) => {
        if ( !this.isOpen ) {
          this.decomposeDate( date );
        }
      } ) );
    }
  }

  decomposeDate( date ) {
    if ( date && this.value ) {
      const dateStr = new Date( date ).toLocaleDateString();
      const format = ReverseFormatDate( this.stringUnmasked( dateStr ), this.formatDate );
      this.description = this.getFormattedDate( format );
      this.day = format.day;
      this.month = format.month;
      this.year = format.year;
    }
  }

  setDateMask() {
    this.tlInput.mask = this.getMask();
  }

  getMask() {
    const format = this.formatDate.toLowerCase();
    const dd = format.replace( 'dd', '00' );
    const mm = dd.replace( 'mm', '00' );
    return mm.replace( 'yyyy', '0000' );
  }

  onBlur() {
    this.propagateTouched();
  }

  onCompleteMask() {
    setTimeout( () => {
      if ( this.isoDate ) {
        const str = ReverseFormatDate( this.stringUnmasked( this.description ), this.formatDate );
        this.value = new Date( str.stringFormat ).toISOString();
      }
      this.completeMask.emit( this.getObjectValues() );
    } );
  }

  getObjectValues() {
    return {
      day: this.day,
      fullDate: new Date( this.value ),
      month: this.month,
      year: this.year
    };
  }

  onChange( $event ) {
    this.value = $event;
  }

  onDateInputFocus() {
    if ( this.value && !this.isOpen ) {
      const inputDate = ReverseFormatDate( this.stringUnmasked( this.description ), this.formatDate );
      this.day = inputDate[ 'day' ];
      this.month = inputDate[ 'month' ] - 1;
      this.year = inputDate[ 'year' ];
    }
    this.handleOpenOnFocus();
  }

  handleOpenOnFocus() {
    if ( this.openOnFocus ) {
      this.isOpen = true;
    }
  }

  onSelectDay( $event ) {
    this.selectDay.emit( $event );
    this.setValue( $event );
    this.setDateValues( $event );
    this.handleAutoClose();
  }

  setDateValues( $event ) {
    this.day = $event.day;
    this.month = $event.month - 1;
    this.year = $event.year;
  }

  handleAutoClose() {
    if ( this.autoClose ) {
      this.isOpen = false;
    }
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
  }

  backDropClick() {
    this.isOpen = false;
  }

  getFormattedDate( $event ) {
    const date = this.formatDate;
    let strDate;
    strDate = date.replace( 'dd', this.formatDayAndMonth( $event.day ) );
    strDate = strDate.replace( 'mm', this.formatDayAndMonth( $event.month ) );
    strDate = strDate.replace( 'yyyy', $event.year );
    return strDate;
  }

  setValue( $event ) {
    setTimeout( () => {
      this.description = this.getFormattedDate( $event );
      this.value = $event.fullDate.toISOString();
    } );
  }

  onClearInput( $event ) {
    $event.stopPropagation();
  }

  formatDayAndMonth( value ) {
    if ( String( value ).length === 1 ) {
      return '0' + value;
    }
    return value;
  }

  handleDateChange() {
    const inputDate = ReverseFormatDate( this.description, this.formatDate );
    const dateKeys = Object.keys( inputDate );
    for ( let key = 0; key < dateKeys.length; key++ ) {
      if ( inputDate[ dateKeys[ key ] ] ) {
        if ( dateKeys[ key ] === 'month' ) {
          this[ dateKeys[ key ] ] = inputDate[ dateKeys[ key ] ] - 1;
        } else {
          this[ dateKeys[ key ] ] = inputDate[ dateKeys[ key ] ];
        }
      }
    }
  }

  handleArrowKeys( $event ) {
    switch ( $event.keyCode ) {
      case KeyEvent.ARROWUP:
        if ( this.isOpen ) {
          $event.preventDefault();
          $event.stopPropagation();
        }
        break;
      case KeyEvent.TAB:
        if ( this.isOpen ) {
          this.isOpen = false;
        }
        break;
      case KeyEvent.ESCAPE:
        if ( this.isOpen ) {
          $event.preventDefault();
          $event.stopPropagation();
          this.isOpen = false;
        }
        break;
      case KeyEvent.ARROWDOWN:
        if ( this.isOpen ) {
          $event.preventDefault();
          $event.stopPropagation();
        }
        break;
      case KeyEvent.ARROWRIGHT:
        $event.preventDefault();
        break;
      case KeyEvent.ARROWLEFT:
        $event.preventDefault();
        break;
    }
  }

  stringUnmasked( value ) {
    return String( value ).replace( /(\|-|_|\(|\)|:|\+)/gi, '' );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
