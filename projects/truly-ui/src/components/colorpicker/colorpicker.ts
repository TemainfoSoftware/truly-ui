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

import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, Renderer2,
  ViewChild
} from '@angular/core';
import {TlInput} from '../input/input';
import {TlButton} from '../button/button';
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange} from '@angular/cdk/overlay';
import {ColorPickerService} from './parts/colorpicker-content/colorpicker-service';
import {ColorPickerHelpers} from './parts/colorpicker-content/colorpicker-helpers';

@Component({
  selector: 'tl-colorpicker',
  templateUrl: './colorpicker.html',
  styleUrls: ['./colorpicker.scss'],
  providers: [ColorPickerService, ColorPickerHelpers]
})
export class TlColorPicker implements OnInit, AfterContentInit {

  @Input() label = '';

  @Input() labelSize = '';

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

  @Input() elementOrigin;

  @Output('selectColor') selectColor: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild( TlInput ) tlinput;

  @ViewChild( TlButton ) tlbutton;

  @ViewChild( 'trigger' ) trigger;

  @ViewChild( CdkConnectedOverlay ) connectedOverlay: CdkConnectedOverlay;

  public isOpen = false;

  public positionOverlay = '';

  public selectedColor = '#FF0000';

  constructor(private renderer: Renderer2, private change: ChangeDetectorRef, private colorPickerService: ColorPickerService) {}

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
    this.selectedColor = $event.hex;
    this.selectColor.emit($event);
  }

  copyInputColor(inputElement) {
    inputElement.input.nativeElement.select();
    document.execCommand('copy');
    inputElement.input.nativeElement.setSelectionRange(0, inputElement.input.nativeElement.value.length);
  }

  closeColorPicker(selectedColor) {
    this.isOpen = false;
    this.colorPickerService.setPresetColor(selectedColor);
  }

  validFromOrigin() {
    if (this.mode === 'fromOrigin' && !this.elementOrigin) {
      throw Error('Property [elementOrigin] is undefined on \'fromOrigin\' mode');
    }
  }

}
