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

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'tl-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
})
export class TlTextarea implements OnInit {

  @Input() label = '';

  @Input() labelPlacement = 'left';

  @Input() labelSize = '100px';

  @Input() name = '';

  @Input() placeholder = '';

  @Input() height = '80px';

  @Input() tabindex = 0;

  @Input() maxlength: number = -1;

  @Input() textAlign: 'left' | 'right' | 'center' | 'justify' = 'left';

  @Input() readonly = null;

  @Input() disabled = null;

  @Input() clearButton = false;

  @Input() color = 'basic';

  @ViewChild( 'textarea' ) textarea: ElementRef;

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  @Output() focus: EventEmitter<any> = new EventEmitter();

  @Output() blur: EventEmitter<any> = new EventEmitter();

  @Output() clear: EventEmitter<any> = new EventEmitter();

  public countLength: number = 0;

  constructor() {}

  ngOnInit() {}

  setFocus() {
    this.textarea.nativeElement.focus();
  }

  stopEvent( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onTextareaClick( $event: MouseEvent ) {
    this.stopEvent($event);
    this.click.emit( $event );
  }

  onTextareaFocus( $event ) {
    this.focus.emit( $event );
  }

  onTextareaBlur( $event ) {
    this.blur.emit( $event );
  }

  onTextareaDown() {
    this.countLength = this.textarea.nativeElement.textLength;
  }

  clearTextarea( $event? ) {
    this.value = '';
    this.setFocus();
    this.clear.emit( $event );
  }

}
