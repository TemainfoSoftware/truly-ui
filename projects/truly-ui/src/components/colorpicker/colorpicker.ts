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
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { TlInput } from '../input/input';
import { TlButton } from '../button/button';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ColorPickerHelpers } from './helpers/colorpicker-helpers';
import { ColorPickerService } from './services/colorpicker-service';
import { KeyEvent} from '../core/enums/key-events';
import { ValueAccessorBase} from '../input/core/value-accessor';
import {
  FormControlName,
  NgModel
} from '@angular/forms';
import { MakeProvider } from '../core/base/value-accessor-provider';

@Component({
  selector: 'tl-colorpicker',
  templateUrl: './colorpicker.html',
  styleUrls: ['./colorpicker.scss'],
  providers: [ ColorPickerService, ColorPickerHelpers, MakeProvider(TlColorPicker)],
  animations: [
    trigger(
      'enterAnimation', [
        transition( ':enter', [
          style( { transform: 'translateX(100%)', opacity: 0 } ),
          animate( '250ms', style( { transform: 'translateX(0)', opacity: 1 } ) )
        ] ),
        transition( ':leave', [
          style( { transform: 'translateX(0)', opacity: 1 } ),
          animate( '250ms', style( { transform: 'translateX(100%)', opacity: 0 } ) )
        ] )
      ]
    )
  ]
})
export class TlColorPicker extends ValueAccessorBase<string> implements OnInit, AfterContentInit {

  @Input() label = '';

  @Input() labelSize = '100px';

  @Input() name = '';

  @Input() textAlign = 'left';

  @Input() labelPlacement = 'left';

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() placeholder = 'Colorpicker Field';

  @Input() mode: 'inline' | 'onlyColor' | 'fromOrigin' | 'input' = 'input';

  @Input() recentColors = false;

  @Input() returnFormatColor = false;

  @Input() copyButton = false;

  @Input() openFocus = false;

  @Input() elementOrigin;

  @Input() color = 'basic';

  @ContentChild( NgModel, {static: true}  ) model: NgModel;

  @ContentChild( FormControlName, {static: true}  ) controlName: FormControlName;

  @Output('selectColor') selectColor: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild( TlInput, {static: true}  ) tlinput;

  @ViewChild( TlButton, {static: true}  ) tlbutton;

  @ViewChild( 'trigger', {static: true}  ) trigger;

  @ViewChild( CdkConnectedOverlay, {static: true}  ) connectedOverlay: CdkConnectedOverlay;

  public isOpen = false;

  public saved = false;

  public positionOverlay = '';

  public required = false;

  private interval;

  constructor(private renderer: Renderer2, private change: ChangeDetectorRef, private colorPickerService: ColorPickerService) {
    super();
  }

  ngOnInit() {
    this.listClickElementOrgin();
    this.validFromOrigin();
  }

  ngAfterContentInit() {
    const element = new CdkOverlayOrigin( !this.elementOrigin ? this.trigger.elementRef.nativeElement : this.elementOrigin);
    this.connectedOverlay.origin = element;
  }

  listClickElementOrgin() {
    if (this.elementOrigin) {
      this.renderer.listen(this.elementOrigin, 'click', () => {
        this.isOpen = !this.isOpen;
      });
    }
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

  emitSelectColor($event) {
    this.value = $event.hex;
    this.selectColor.emit($event);
  }

  copyInputColor(inputElement) {
    this.isOpen = !this.isOpen;
    inputElement.input.nativeElement.select();
    document.execCommand('copy');
    inputElement.input.nativeElement.setSelectionRange(0, inputElement.input.nativeElement.value.length);
    this.showCopyMessage();
  }

  showCopyMessage() {
    this.saved = true;
    clearInterval( this.interval );
    this.interval = setInterval( () => {
      this.saved = false;
    }, 1000 );
  }

  keyDown($event) {
    switch ($event.keyCode) {
      case KeyEvent.TAB:
        this.isOpen = !this.isOpen;
        break;
      case KeyEvent.ESCAPE:
        this.isOpen = !this.isOpen;
        break;
      case KeyEvent.ARROWUP:
        this.isOpen = !this.isOpen;
        break;
      case KeyEvent.ARROWDOWN:
        this.isOpen = !this.isOpen;
        break;
    }
  }

  closeColorPicker() {
    this.isOpen = false;
    this.colorPickerService.setPresetColor(this.value);
  }

  validFromOrigin() {
    if (this.mode === 'fromOrigin' && !this.elementOrigin) {
      throw Error('Property [elementOrigin] is undefined on \'fromOrigin\' mode');
    }
  }

}
