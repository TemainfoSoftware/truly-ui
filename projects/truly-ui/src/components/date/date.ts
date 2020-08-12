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
  Component, OnInit, forwardRef, Input, Renderer2, ElementRef, ViewChild,
  ChangeDetectorRef, AfterViewInit, ContentChild, OnDestroy
} from '@angular/core';
import { FormControlName, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { InputMask } from '../input/core/input-mask';
import { ReverseFormatDate } from '../core/helper/reverseformatdate';
import { TlLeftPadPipe } from '../internals/pipes/leftpad.pipe';
import { Subscription } from 'rxjs';

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
export class TlDate extends ValueAccessorBase<string> implements OnInit, OnDestroy, AfterViewInit {

  @Input() formatDate = 'dd/mm/yyyy';

  @Input() isoDate = false;

  @Input() label = 'Label';

  @Input() labelSize = '100px';

  @Input() disabled = false;

  @Input() required = false;

  @Input() readonly = false;

  @Input() color = 'basic';

  @Input() withBorder = true;

  @Input() flatBorders = false;

  @Input() labelPlacement: 'left' | 'top' = 'left';

  @ContentChild( NgModel, {static: true} ) model: NgModel;

  @ContentChild( FormControlName, {static: true} ) controlName: FormControlName;

  @ViewChild( NgModel, {static: true}  ) hiddenModel: NgModel;

  @ViewChild( 'input', {static: true}  ) input: ElementRef;

  @Input('control')
  set control(item) {
    this._control = item;
  }

  get control() {
    if (this._control) {
      return this._control;
    }
    if (this.controlName || this.model) {
      return this.controlName ? this.controlName : this.model;
    }
    return this._control;
  }

  public mockValue: string;

  private fieldMask: InputMask;

  public placeholder: string;

  public touched: boolean;

  private mask: string;

  private subscription = new Subscription();

  private _control;

  constructor( private renderer: Renderer2,
               private change: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setDateMask();
    this.fieldMask = new InputMask( this, this.renderer, this.mask );
    this.getMockValue( this.value );
    this.handleModelChangeInit();
    this.handleChangeStatus();
    this.handleRequiredValidator();
    this.handleCompleteMask();
    this.change.detectChanges();
  }

  handleCompleteMask() {
    this.subscription.add(this.fieldMask.complete.subscribe(() => {
      if ( this.isoDate ) {
        this.handleIsoDateModel();
      }
    }));
  }

  handleChangeStatus() {
    this.subscription.add(this.hiddenModel.statusChanges.subscribe((value) => {
      value === 'VALID' ? this.getModel().control.setErrors(null) :
        this.getModel().control.setErrors(this.hiddenModel.control.errors);
    }));
  }

  handleModelChangeInit() {
    const model = this.getModel();
    if ( model ) {
      model.valueChanges.subscribe( ( value ) => {
        this.getMockValue( value );
      } );
    }
  }

  handleRequiredValidator() {
    if ( this.control.control.validator ) {
       let validators = [ this.hiddenModel.control.validator ];
       validators = [ ...validators, this.control.control.validator ];
       this.hiddenModel.control.setValidators( validators );
    }
    if (this.control && this.control.errors && this.control.errors.hasOwnProperty('required')) {
      this.required = this.control.errors['required'];
    }
  }

  getMockValue( value ) {
    if ( !value ) {
      this.value = null;
      return;
    }
    if ( this.isoDate && value.length > 0 ) {
      const date = new Date( value );
      this.mockValue = this.getDateByFormat( date );
      return;
    }
    this.mockValue = value;
  }

  getModel() {
    return this.model ? this.model : this.controlName;
  }

  getDateByFormat( date ) {
    let formattedDate;
    const leftPad = new TlLeftPadPipe();

    const first = this.formatDate.replace( 'dd', leftPad.transform( date.getDate(), 2 ) );
    const second = first.replace( 'mm', leftPad.transform( date.getMonth() + 1, 2 ) );
    formattedDate = second.replace( 'yyyy', leftPad.transform( date.getFullYear(), 4 ) );

    return formattedDate;
  }

  isIsoDate( str ) {
    if ( !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test( str ) ) {
      return false;
    }
    const d = new Date( str );
    return d.toISOString() === str;
  }

  handleIsoDateModel() {
    setTimeout( () => {
      if ( this.value.length === 0 && this.isControlValid() ) {
        this.value = null;
        return;
      }
      if ( !this.isIsoDate( this.value ) ) {
        const date = ReverseFormatDate( this.value, this.formatDate );
        const parsed = Date.parse( date.stringFormat );
        if ( !isNaN(parsed) ) {
          this.value = new Date( date.year, date.month - 1, date.day ).toISOString();
        }
      }
      this.propagateTouched();
    }, 100 );
  }

  isControlValid() {
    return this.hiddenModel.valid;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
