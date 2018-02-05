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
  Component,
  Optional, Inject, ViewChild,
  Input, Renderer2, OnInit,
} from '@angular/core';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { TlInput } from '../input/input';
import { TlCalendar } from '../calendar/calendar';

import { ReverseFormatDate } from '../core/helper/reverseformatdate';
import { KeyEvent } from '../core/enums/key-events';

@Component( {
  selector: 'tl-datepicker',
  templateUrl: './datepicker.html',
  styleUrls: [ './datepicker.scss' ],
  providers: [ MakeProvider( TlDatePicker ) ]
} )

export class TlDatePicker extends ElementBase<string> implements OnInit {

  @Input() label = '';

  @Input() labelSize = '';

  @Input() textAlign = 'left';

  @Input() labelPlacement = 'left';

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() placeholder = 'Datepicker Field';

  @Input() clearButton = true;

  @Input() autoClose = false;

  @Input() iconCalendar = false;

  @Input() formatDate = 'dd/mm/yyyy';

  public open = false;

  public iconAfter = '';

  public year = new Date().getFullYear();

  public month = new Date().getMonth();

  public day = new Date().getDate();

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( TlCalendar ) calendar;

  @ViewChild( TlInput ) tlinput;

  @ViewChild( 'calendarContent' ) calendarContent;

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>,
               @Optional() @Inject( NG_ASYNC_VALIDATORS ) asyncValidators: Array<any>, private renderer: Renderer2 ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {
    this.listenDocument();
    if ( this.iconCalendar ) {
      this.iconAfter = 'ion-calendar';
    }
  }

  onDateInputFocus() {
    this.open = true;
    this.setWrapperCalendarPosition();
    if ( this.value ) {
      const inputDate = ReverseFormatDate( this.stringUnmasked( this.value ), this.formatDate );
      this.day = inputDate[ 'day' ];
      this.month = inputDate[ 'month' ] - 1;
      this.year = inputDate[ 'year' ];
    }
  }

  onSelectDay( $event ) {
    this.setValue( $event );
    this.handleAutoClose();
  }

  onClickCalendar() {
    this.setInputFocus();
    this.open = true;
  }

  setInputFocus() {
    this.tlinput.input.nativeElement.focus();
  }

  setWrapperCalendarPosition() {
    this.calendarContent.nativeElement.style.top =
      this.tlinput.input.nativeElement.getBoundingClientRect().top +
      this.tlinput.input.nativeElement.offsetHeight + 'px';
  }

  listenDocument() {
    this.renderer.listen( document, 'scroll', ( $event ) => {
      this.open = false;
    } );
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
      this.value = this.getFormattedDate( $event );
    }, 0 );
  }

  onClearInput() {
    this.open = true;
  }

  handleAutoClose() {
    if ( this.autoClose ) {
      this.open = false;
    }
  }

  formatDayAndMonth( value ) {
    if ( String( value ).length === 1 ) {
      return '0' + value;
    }
    return value;
  }

  onDateInputFocusOut( $event ) {
    if ( $event.relatedTarget ) {
      if ( $event.relatedTarget.className !== 'wrapper-calendar' &&
        $event.target !== this.tlinput.input.nativeElement ) {
        return this.open = false;
      }
      return;
    }
    this.open = false;
  }

  onInputKeyUp( $event ) {
    if ( $event.keyCode === KeyEvent.ENTER ) {
      return this.open = false;
    }
    if ( $event.keyCode === KeyEvent.ESCAPE ) {
      return this.open = false;
    }
    this.handleDateChange();
  }

  handleDateChange() {
    const inputDate = ReverseFormatDate( this.value, this.formatDate );
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

  stringUnmasked( value ) {
    return String( value ).replace( /(\|-|_|\(|\)|:|\+)/gi, '' );
  }

}
