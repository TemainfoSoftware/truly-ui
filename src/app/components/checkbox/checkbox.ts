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
  Component, Input, ViewChild, Output, EventEmitter,
  Optional, Inject, Injector, OnInit, ChangeDetectorRef
} from '@angular/core';

import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';

@Component( {
  selector: 'tl-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: [ './checkbox.scss' ],
  providers: [
    [ MakeProvider( TlCheckBox ) ]
  ]
} )
export class TlCheckBox extends ElementBase<boolean> implements OnInit {

  @Input() label = '';

  @Input() checked = false;

  @Input() tabindex = '0';

  @Input() color = 'basic';

  @ViewChild( 'checkbox' ) checkbox;

  @ViewChild( NgModel ) model: NgModel;

  @Output() checkBox: EventEmitter<any> = new EventEmitter();

  @Output() focusBox: EventEmitter<any> = new EventEmitter();

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, injector: Injector ) {
    super( validators, asyncValidators, injector );
  }

  ngOnInit() {
    this.value = false;
    if ( this.checked ) {
      this.value = true;
    }
    if ( !this.label ) {
      throw new EvalError( 'The [label] property is required!' );
    }
  }

  check( boolean ) {
    this.value = !boolean;
    this.emitEvent();
  }

  emitEvent() {
    this.checkBox.emit( this.value );
  }

  focusCheckBox() {
    this.focusBox.emit( this.value );
  }

}

