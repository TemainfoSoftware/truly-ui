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

import {Input, Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import {KeyEvent} from '../core/enums/key-events';
import {TlInput} from '../input/input';

@Component({
  selector: 'tl-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag.scss'],
})
export class TlTag implements OnInit {

  @Input() title = 'Title Tag';

  @Input() width = 'fit-content';

  @Input() height = 'auto';

  @Input() icon = null;

  @Input() mode: 'default' | 'closeable' | 'clickable' | 'editable' = 'default';

  @Input() charcase: 'unset' | 'lowercase' | 'capitalize' | 'uppercase' | 'revert' = 'unset';

  @Input() closeOnValueEmited = true;

  @Input()
  set color( value: string ) {
    const colors = {
      basic: () => 'basic',
      primary: () => 'primary',
      success: () => 'success',
      information: () => 'information',
      warning: () => 'warning',
      danger: () => 'danger',
    };
    if ( colors[value] ) {
      this._color = colors[value]();
    } else {
      this._color = null;
      this.customColor = value;
    }
  }

  get color() {
    return this._color;
  }

  @Output() close: EventEmitter<any> = new EventEmitter();

  @Output() tagValue: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'input'  ) tlinput: TlInput;

  private _color = 'basic';

  public editing = false;

  public customColor = '';

  public editableValue = '';

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.close.emit();
  }

  onClickTag() {
    if (this.mode === 'editable') {
      this.editing = true;
      setTimeout(() => {
        this.tlinput.setFocus();
      });
    }
  }

  onConfirmTextInputed() {
    this.emitEditablevalue();
  }

  onClearValue() {
    this.resetInput();
    this.hideInput( true );
  }

  onInputValue( value: KeyboardEvent ) {
    if (value.key === KeyEvent.ENTER) {
     return this.emitEditablevalue();
    }
    if (value.key === KeyEvent.ESCAPE) {
      this.resetInput();
      this.hideInput(true);
    }
  }

  private emitEditablevalue() {
    if (this.mode === 'editable') {
      if ( this.editableValue.trim() ) {
        this.tagValue.emit( this.editableValue );
        this.resetInput();
        this.hideInput();
      } else {
        this.resetInput();
        this.hideInput( true );
      }
    }
  }

  private resetInput() {
    this.editableValue = '';
  }

  private hideInput( close = false) {
    if (this.closeOnValueEmited || close) {
      this.editing = false;
    }
  }

}
