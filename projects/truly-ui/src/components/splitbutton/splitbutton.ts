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
  Component,
  Input,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';

import { OverlayAnimation } from '../core/directives/overlay-animation';
import { TlSplitButtonAction } from './splitbutton-action';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component( {
  selector: 'tl-split-button',
  templateUrl: './splitbutton.html',
  styleUrls: [ './splitbutton.scss' ],
  animations: [ OverlayAnimation ]
} )
export class TlSplitButton implements AfterContentInit {

  @Input() text = '';

  @Input() width = '100%';

  @Input() height = '30px';

  @Input() disabled: boolean = null;

  @Input() color = 'basic';

  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  @ContentChildren( TlSplitButtonAction ) actions: QueryList<TlSplitButtonAction>;

  public isOpen: boolean;

  public positionOverlay = 'bottom';

  constructor(private change: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.actions.forEach( ( item ) => item.click.subscribe( () => this.isOpen = false ) );
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

}
