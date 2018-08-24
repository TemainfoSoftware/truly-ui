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

import {Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TlInput} from '../../../input/input';

@Component({
  selector: 'tl-colorpicker-content',
  templateUrl: './colorpicker-content.html',
  styleUrls: ['./colorpicker-content.scss']
})

export class TlColorPickerContent implements OnInit {

  @Input('input') input: TlInput;

  @Input('overlayPosition') overlayPosition: string;

  public hueSliderColor = '#006699';

  public positionHue = 0;

  private offsetWidthHueSlide = 0;

  public positionAlpha = 0;

  private offsetWidthAlphaSlide = 0;

  private isMoving = false;

  private mousePressX = 0;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @ViewChild('content') content: ElementRef;

  @ViewChild('hueSlider') hueSlider: ElementRef;

  @ViewChild('alphaSlider') alphaSlider: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  public onMouseDown($event, elementName) {
    this.isMoving = true;
    this.mousePressX = $event.clientX;
    if (elementName === 'hue') {
      this.offsetWidthHueSlide = this.hueSlider.nativeElement.offsetWidth;
      this.positionHue = this.mousePressX - this.content.nativeElement.offsetWidth - this.offsetWidthHueSlide + 8;
    } else {
      this.offsetWidthAlphaSlide = this.alphaSlider.nativeElement.offsetWidth;
      this.positionAlpha = this.mousePressX - this.content.nativeElement.offsetWidth - this.offsetWidthAlphaSlide + 8;
    }
  }

  public onMouseUp() {
    this.isMoving = false;
  }

  public onMouseMove($event, elementName) {
    if (this.isMoving) {
      const moviment = $event.clientX - this.mousePressX;
      if (elementName === 'hue') {
        this.offsetWidthHueSlide = this.hueSlider.nativeElement.offsetWidth;
        this.positionHue = this.mousePressX - this.content.nativeElement.offsetWidth - this.offsetWidthHueSlide + 8 + moviment;
      } else {
        this.offsetWidthAlphaSlide = this.alphaSlider.nativeElement.offsetWidth;
        this.positionAlpha = this.mousePressX - this.content.nativeElement.offsetWidth - this.offsetWidthAlphaSlide + 8 + moviment;
      }
    }
  }

}
