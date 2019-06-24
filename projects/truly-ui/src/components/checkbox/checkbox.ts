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
  Component, Input, ViewChild, Output, EventEmitter, ContentChild, OnInit, AfterViewInit, AfterContentInit,
  SimpleChanges, OnChanges
} from '@angular/core';

import { MakeProvider } from '../core/base/value-accessor-provider';
import { FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';

@Component( {
  selector: 'tl-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: [ './checkbox.scss' ],
  providers: [
    [ MakeProvider( TlCheckBox ) ]
  ]
} )
export class TlCheckBox extends ValueAccessorBase<boolean> implements OnInit, OnChanges {

  @Input() label = '';

  @Input() checked = false;

  @Input() tabindex = '0';

  @Input() disabled = null;

  @Input() color = 'basic';

  @Input() indeterminate = false;

  @ViewChild( 'checkbox', {static: true}  ) checkbox;

  @ContentChild( NgModel, {static: true}  ) model: NgModel;

  @ContentChild( FormControlName, {static: true}  ) controlName: FormControlName;

  @Output() checkBox: EventEmitter<any> = new EventEmitter();

  @Output() focusBox: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {
    this.value = this.checked;
    if ( !this.label ) {
      throw new EvalError( 'The [label] property is required!' );
    }
  }

  check( boolean ) {
    if ( this.checkbox.nativeElement.indeterminate ) {
      this.checkbox.nativeElement.indeterminate = false;
      this.value = true;
      this.emitEvent();
      return;
    }
    if ( !this.disabled ) {
      this.value = !boolean;
      this.emitEvent();
    }
  }

  emitEvent() {
    this.checkBox.emit( this.value );
  }

  focusCheckBox() {
    this.focusBox.emit( this.value );
  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'indeterminate' ] ) {
      this.checkbox.nativeElement.indeterminate = changes[ 'indeterminate' ].currentValue;
    }
  }

}

