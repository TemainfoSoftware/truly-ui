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

import {
  Input, ContentChild, Directive, forwardRef, Output, EventEmitter, HostListener, OnInit,
  AfterViewInit, AfterContentInit
} from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { TlInput } from '../../input/input';
import { TlDatePicker } from '../../datepicker/datepicker';
import { DateValidator } from './date.validator';
import { ReverseFormatDate } from '../../core/helper/reverseformatdate';
import { DatePipe } from '@angular/common';

@Directive( {
  selector: '[date][ngModel],[date][formControl],[date][formControlName]',
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef( () => DateDirective ),
    }
  ]
} )
export class DateDirective implements Validator, AfterContentInit {

  @Input() formatDate = 'dd.mm.yyyy';

  @Input() isoDate = false;

  @ContentChild( TlInput ) tlinput: TlInput;

  @ContentChild( TlDatePicker ) tldatepicker;

  @HostListener( 'blur', [ '$event' ] )
  onBlur( $event ) {
    this.convertToIsoDate();
  }

  ngAfterContentInit() {
    if ( this.isoDate ) {
      setTimeout( () => {
        this.setDateMask();
        const dateValue = new DatePipe( 'en-US' ).transform( this.tlinput.value,
          this.getDatePipeFormat( this.formatDate.toLowerCase() ) );
        this.tlinput.value = dateValue;
      }, 1 );
    }
  }

  clearMask() {
    if (this.tlinput.value) {
      return (this.tlinput.value.replace( /_/gi, '' ).replace( /\//gi, '' )).trim();
    }
    return null;
  }

  getDatePipeFormat( value ) {
    return value.replace( 'mm', 'MM' );
  }

  convertToIsoDate() {
    if ( this.clearMask().length > 0 && this.isoDate ) {
      const dateString = this.tlinput.input.nativeElement.value;
      const date = ReverseFormatDate( this.tlinput.input.nativeElement.value, this.formatDate );
      this.tlinput.value = new Date( date.year, date.month - 1, date.day ).toISOString();
      setTimeout( () => {
        this.tlinput.input.nativeElement.value = dateString;
      }, 1 );
    }
  }

  getInput() {
    if ( !this.tlinput ) {
      this.tldatepicker.formatDate = this.formatDate;
      this.tlinput = this.tldatepicker.tlinput;
    }
  }

  setDateMask() {
    if ( this.tlinput ) {
      const formatTmp = this.formatDate.replace( /[a-z]/gi, '' );
      const formatArray = this.formatDate.split( '' );

      for ( let i = 0; i < formatArray.length; i++ ) {
        if ( formatArray[ i ] !== formatTmp[ 0 ] ) {
          formatArray[ i ] = '9';
        }
      }

      const strFormat = formatArray.toString().replace( /,/gi, '' );
      this.tlinput.mask = strFormat;
      this.tlinput.input.nativeElement.setAttribute( 'placeholder', this.formatDate.toUpperCase() );
    }
  }

  validate( c: FormControl ): ValidationErrors {
    this.getInput();
    this.setDateMask();
    return DateValidator( this.formatDate, this.isoDate )( c );
  }

}
