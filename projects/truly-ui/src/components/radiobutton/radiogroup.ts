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
  Component, ContentChild, ContentChildren, QueryList, Input, ViewChild, AfterViewInit, Output,
  EventEmitter, OnChanges,
} from '@angular/core';

import { TlRadioButton } from './radiobutton';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { KeyEvent } from '../core/enums/key-events';
import { FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';
import {FixedPositionDirective} from '../misc/fixed-position.directive';

const Orientation = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

@Component( {
  selector: 'tl-radio-group',
  templateUrl: './radiogroup.html',
  styleUrls: [ './radiobutton.scss' ],
  providers: [
    [ MakeProvider( TlRadioGroup ) ]
  ]
} )
export class TlRadioGroup extends ValueAccessorBase<string> implements AfterViewInit {

  public itemSelected;

  public name;

  public tabindex;

  @Input() labelGroup = '';

  @Input() orientation = Orientation.HORIZONTAL;

  @Input() colorSelected = '';

  @ViewChild( 'radiobutton', {static: true} ) radiobutton;

  @ContentChild( NgModel, {static: true} ) model: NgModel;

  @ContentChild( FormControlName, {static: true} ) controlName: FormControlName;

  @ContentChildren( TlRadioButton ) listRadioButton: QueryList<TlRadioButton>;

  @Output() private onCheckRadio: EventEmitter<any> = new EventEmitter();

  @Output() private onFocusRadio: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.handleInitialValue();
      this.validateProperty();
      this.validateCheckedRadios();
    }, 1 );
    this.listenModelChange();
  }

  listenModelChange() {
    if ( this.model ) {
      this.model.valueChanges.subscribe((value) => {
        this.handleModelValue();
      });
    }
  }

  validateProperty() {
    if ( (this.orientation !== Orientation.VERTICAL) && (this.orientation !== Orientation.HORIZONTAL) ) {
      throw new EvalError( 'The property [orientation] only receive /vertical/ and /horizontal/ values!' );
    }
  }

  handleInitialValue() {
    if ( this.value ) {
      this.handleModelValue();
    } else {
      this.checkFirstItem();
      this.handleChecked();
    }
  }

  handleModelValue() {
    this.listRadioButton.toArray().forEach( ( item, index, array ) => {
      if ( this.value === item.value ) {
        this.itemSelected = item;
      }
    } );
  }

  handleChecked() {
    this.listRadioButton.toArray().forEach( ( item ) => {
      this.setItemChecked( item );
    } );
  }

  handleKeyDown( $event: KeyboardEvent ) {
    switch ( $event.keyCode ) {
      case KeyEvent.ARROWDOWN:
        $event.preventDefault();
        break;
      case KeyEvent.ARROWUP:
        $event.preventDefault();
        break;
    }
  }

  setItemChecked( item ) {
    if ( item.checked ) {
      return this.checkRadio( item );
    }
  }

  checkFirstItem() {
    setTimeout( () => {
      this.checkRadio( this.listRadioButton.toArray()[ 0 ] );
    }, 1 );
  }

  getCheckedRadios() {
    return this.listRadioButton.filter( ( item ) => {
      return item.checked;
    } );
  }

  validateCheckedRadios() {
    if ( this.getCheckedRadios().length > 1 ) {
      throw new EvalError( 'Only one radiobutton with [checked] property is allowed' );
    }
  }

  checkRadio( item, $event? ) {
    if ($event && item.disabled) {
      return;
    }
    this.value = item.value;
    this.itemSelected = item;
    this.onCheckRadio.emit( this.itemSelected );
  }

  focusRadio( item ) {
    this.onFocusRadio.emit( item );
  }


}

