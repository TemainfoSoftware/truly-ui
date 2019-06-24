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
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControlName, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ValueAccessorBase } from '../input/core/value-accessor';
import {FixedPositionDirective} from '../misc/fixed-position.directive';

@Component({
  selector: 'tl-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TlTextarea),
    multi: true
  } ],
})
export class TlTextarea extends ValueAccessorBase<string> implements OnInit, AfterViewInit {

  @Input() label = '';

  @Input() labelPlacement = 'left';

  @Input() labelSize = '100px';

  @Input() name = '';

  @Input() placeholder = '';

  @Input() height = '80px';

  @Input() tabindex = 0;

  @Input() maxlength = -1;

  @Input() textAlign: 'left' | 'right' | 'center' | 'justify' = 'left';

  @Input() readonly = null;

  @Input() disabled = null;

  @Input() clearButton = false;

  @Input() color = 'basic';

  @Input() withBorder = true;

  @Input() resize = false;

  @Input() showCount = false;

  @ViewChild( 'textarea', {static: true} ) textarea;

  @ViewChild( CdkOverlayOrigin, {static: true} ) cdkOverlayOrigin: CdkOverlayOrigin;

  @ContentChild( NgModel, {static: true} ) model: NgModel;

  @ContentChild( FormControlName, {static: true} ) controlName: FormControlName;

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  @Output() focus: EventEmitter<any> = new EventEmitter();

  @Output() blur: EventEmitter<any> = new EventEmitter();

  @Output() clear: EventEmitter<any> = new EventEmitter();

  @Output() overlayOrigin: EventEmitter<any> = new EventEmitter();

  public required = false;

  public isShowingMessages = false;

  public hasValidator;

  constructor( private change: ChangeDetectorRef ) {
    super();
  }

  ngOnInit() {
    this.overlayOrigin.emit( this.cdkOverlayOrigin );
  }

  ngAfterViewInit() {
    this.setRequired();
    this.handleValidator();
  }

  setRequired() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl && currentControl.control.errors) {
      if ( currentControl.control.errors[ 'required' ] ) {
        this.required = true;
        this.change.detectChanges();
      }
    }
  }

  handleValidator() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl ) {
      this.hasValidator = currentControl.control.validator;
      this.change.detectChanges();
    }
  }

  setFocus() {
    this.textarea.nativeElement.focus();
  }

  stopEvent( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onTextareaClick( $event: MouseEvent ) {
    this.stopEvent($event);
    this.isShowingMessages = true;
    this.click.emit( $event );
  }

  onTextareaFocus( $event ) {
    this.isShowingMessages = true;
    this.focus.emit( $event );
  }

  onTextareaBlur( $event ) {
    this.isShowingMessages = false;
    this.blur.emit( $event );
  }

  clearTextarea( $event? ) {
    this.value = '';
    this.setFocus();
    this.clear.emit( $event );
  }

}
