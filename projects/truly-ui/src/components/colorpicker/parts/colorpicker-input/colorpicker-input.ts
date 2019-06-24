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
  OnInit, ViewChild,
} from '@angular/core';

import { ColorPickerService } from '../../services/colorpicker-service';

import { ColorPickerHelpers } from '../../helpers/colorpicker-helpers';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'tl-colorpicker-input',
  templateUrl: './colorpicker-input.html',
  styleUrls: ['./colorpicker-input.scss'],
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

export class TlColorPickerInput implements OnInit {

  @Input('selectedColor') selectedColor: string;

  @Input() color = 'basic';

  @ViewChild( 'inputColor', {static: true}  ) inputElement;

  public saved = false;

  public formatColor = false;

  private interval;

  constructor(private colorPickerService: ColorPickerService,
              private colorPickerHelpers: ColorPickerHelpers) { }

  ngOnInit() { }

  getColorFormat() {
    const colorFormat = this.selectedColor;
    if (this.formatColor) {
      return this.colorPickerHelpers.hexToRgbString(colorFormat);
    }
    return colorFormat;
  }

  copyInputColor() {
    this.inputElement.nativeElement.select();
    document.execCommand('copy');
    this.inputElement.nativeElement.setSelectionRange(0, this.inputElement.nativeElement.value.length);
    this.showCopyMessage();
  }

  showCopyMessage() {
    this.saved = true;
    clearInterval( this.interval );
    this.interval = setInterval( () => {
      this.saved = false;
    }, 1000 );
  }

}
