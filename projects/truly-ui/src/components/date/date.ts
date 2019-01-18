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
  Component, OnInit, forwardRef, Input, Renderer2, ElementRef, ViewChild,
  ChangeDetectorRef, AfterViewInit, OnChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { InputMask } from '../input/core/input-mask';
import { ReverseFormatDate } from '../core/helper/reverseformatdate';
import { TlLeftPadPipe } from '../internals/pipes/leftpad.pipe';

@Component( {
  selector: 'tl-date',
  templateUrl: './date.html',
  styleUrls: [ './date.scss' ],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => TlDate ),
    multi: true,
  } ],
} )
export class TlDate extends ValueAccessorBase<string> implements OnInit, AfterViewInit {

  @Input() formatDate = 'dd/mm/yyyy';

  @Input() isoDate = false;

  @Input() label = 'Label';

  @Input() labelSize = '100px';

  @Input() disabled = false;

  @Input() readonly = false;

  @Input() color = 'basic';

  @Input() withBorder = true;

  @Input() flatBorders = false;

  @Input() labelPlacement: 'left' | 'top' = 'left';

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( 'input' ) input: ElementRef;

  public mockValue;

  public touched = false;

  public fieldMask: InputMask;

  public placeholder;

  public mask;

  constructor( private renderer: Renderer2,
               private change: ChangeDetectorRef ) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setDateMask();
    this.fieldMask = new InputMask( this, this.renderer, this.mask );
    this.handleModelChangeInit();
  }

  handleModelChangeInit() {
    if ( this.model ) {
      this.model.valueChanges.subscribe( ( value ) => {
        if ( value ) {
          const date = new Date( value );
          if ( this.isValidDate( date ) && this.isoDate ) {
            this.mockValue = this.getDateByFormat( date );
            this.handleIsoDateModel();
          } else {
            this.mockValue = value;
          }
        }
      } );
    }
  }

  getDateByFormat( date ) {
    let formattedDate;
    const leftPad = new TlLeftPadPipe();

    const first = this.formatDate.replace( 'dd', leftPad.transform( date.getDate(), 2 ) );
    const second = first.replace( 'mm', leftPad.transform( date.getMonth() + 1, 2 ) );
    formattedDate = second.replace( 'yyyy', leftPad.transform( date.getFullYear(), 4 ) );

    return formattedDate;
  }

  stringParse( date ) {
    return date.year + '/' + date.month + '/' + date.day;
  }

  isValidDate( date ) {
    if ( date === 'Invalid Date' ) {
      return false;
    }
    return date !== 'Invalid Date';
  }

  handleIsoDateModel() {
    let date;
    const object = new Date( this.value ).toLocaleDateString();
    if ( this.isValidDate( object ) ) {
      date = ReverseFormatDate( object, this.formatDate );
    } else {
      date = ReverseFormatDate( this.value, this.formatDate );
    }
    const isValidDate = Date.parse( this.stringParse( date ) );
    if ( isNaN( isValidDate ) || isNaN( date.day ) || isNaN( date.month ) || isNaN( date.year ) ) {
      return false;
    }
    this.value = new Date( date.year, date.month - 1, date.day ).toISOString();
  }

  focusOut() {
    if ( this.isoDate ) {
      this.handleIsoDateModel();
    }
  }

  setDateMask() {
    const formatTmp = this.formatDate.replace( /[a-z]/gi, '' );
    const formatArray = this.formatDate.split( '' );

    for ( let i = 0; i < formatArray.length; i++ ) {
      if ( formatArray[ i ] !== formatTmp[ 0 ] ) {
        formatArray[ i ] = '9';
      }
    }
    this.mask = formatArray.toString().replace( /,/gi, '' );
    this.placeholder = this.formatDate.toUpperCase();
    this.change.detectChanges();
  }

}
