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

import {Component, OnInit, Input, ViewChild, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { TlInput } from '../input/input';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component({
  selector: 'tl-colorpicker',
  templateUrl: './colorpicker.html',
  styleUrls: ['./colorpicker.scss'],
})
export class TlColorPicker implements OnInit {

  @Input() label = '';

  @Input() labelSize = '';

  @Input() name = '';

  @Input() textAlign = 'left';

  @Input() labelPlacement = 'left';

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() placeholder = 'Colorpicker Field';

  @Output('selectColor') selectColor: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild( TlInput ) tlinput;

  public isOpen = true;

  public trigger;

  public positionOverlay = '';

  public selectedColor;

  constructor(private change: ChangeDetectorRef) {}

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

  emitSelectColor($event) {
    this.selectedColor = $event;
    this.selectColor.emit($event);
  }

  ngOnInit() {}

}
