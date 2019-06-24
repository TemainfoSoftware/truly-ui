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
  Component, EventEmitter, Input, Output, TemplateRef, ViewChild
} from '@angular/core';
import { TlInput } from '../../input/input';
import { OverlayAnimation } from '../../core/directives/overlay-animation';

@Component( {
  selector: 'tl-datepicker-content',
  templateUrl: './datepicker-content.html',
  styleUrls: [ './datepicker-content.scss' ],
  animations: [ OverlayAnimation ]
} )

export class TlDatePickerContent  {

  @Input('day') day;

  @Input('month') month;

  @Input('year') year;

  @Input('input') input: TlInput;

  @Input('overlayPosition') overlayPosition: string;

  @Output() selectDayContent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TemplateRef, {static: true} ) template: TemplateRef<any>;

  constructor() {}

  selectDay($event) {
    this.selectDayContent.emit($event);
  }

}
