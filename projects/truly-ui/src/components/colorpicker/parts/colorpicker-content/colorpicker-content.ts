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

import {AfterContentInit, Component, ElementRef, HostListener, Input, NgZone, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TlInput} from '../../../input/input';

@Component({
  selector: 'tl-colorpicker-content',
  templateUrl: './colorpicker-content.html',
  styleUrls: ['./colorpicker-content.scss']
})

export class TlColorPickerContent implements OnInit, AfterContentInit {

  @Input('input') input: TlInput;

  @Input('overlayPosition') overlayPosition: string;

  public positionHue = 0;

  public positionAlpha = 0;

  private isMoving = false;

  private mousePressX = 0;

  public contextScheme;

  public contextHueSlider;

  public contextAlphaSlider;

  public data;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @ViewChild('content') content: ElementRef;

  @ViewChild('scheme') scheme: ElementRef;

  @ViewChild('hue') hue: ElementRef;
  @ViewChild('hueSlider') hueSlider: ElementRef;

  @ViewChild('alpha') alpha: ElementRef;
  @ViewChild('alphaSlider') alphaSlider: ElementRef;

  public rgbaColor = 'rgba(255,0,0,1)';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.contextScheme = this.scheme.nativeElement.getContext('2d');
    this.contextScheme.rect(0, 0, this.contextScheme.canvas.width, this.contextScheme.canvas.height);
    this.fillGradient();

    this.contextHueSlider = this.hueSlider.nativeElement.getContext('2d');
    this.contextHueSlider.rect(0, 0, this.contextHueSlider.canvas.width, this.contextHueSlider.canvas.height);
    const hue = this.contextHueSlider.createLinearGradient(0, 0, this.contextHueSlider.canvas.width, 0);
    hue.addColorStop(0, 'rgba(255, 0, 0, 1)');
    hue.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    hue.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    hue.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    hue.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    hue.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    hue.addColorStop(1, 'rgba(255, 0, 0, 1)');
    this.contextHueSlider.fillStyle = hue;
    this.contextHueSlider.fill();
  }

  public onMouseDownHue($event) {
    this.isMoving = true;
    this.positionHue = $event.clientX - this.content.nativeElement.offsetWidth - this.hue.nativeElement.offsetWidth + 16;
    this.changeColor($event);
  }

  public onMouseDownAlpha($event) {
    this.isMoving = true;
    this.positionAlpha = $event.clientX - this.content.nativeElement.offsetWidth - this.alpha.nativeElement.offsetWidth + 16;
  }

  public onMouseUpHue() {
    this.isMoving = false;
  }

  public onMouseUpAlpha() {
    this.isMoving = false;
  }

  public onMouseMoveHue($event) {
    if (!this.isMoving) {
      return;
    }
    this.positionHue = this.mousePressX - this.content.nativeElement.offsetWidth -
      this.hue.nativeElement.offsetWidth + 16 + this.getMoviment($event);
    this.changeColor($event);
  }

  public onMouseMoveAlpha($event) {
    if (!this.isMoving) {
      return;
    }
    this.positionAlpha = this.mousePressX - this.content.nativeElement.offsetWidth -
      this.alpha.nativeElement.offsetWidth + 16 + this.getMoviment($event);
  }

  getMoviment($event) {
    return $event.clientX - this.mousePressX;
  }

  fillGradient() {
    this.contextScheme.fillStyle = this.rgbaColor;
    this.contextScheme.fillRect(0, 0, this.contextScheme.canvas.width, this.contextScheme.canvas.height);

    const gridWhite = this.contextScheme.createLinearGradient(0, 0, this.contextScheme.canvas.width, 0);
    gridWhite.addColorStop(0, 'rgba(255,255,255,1)');
    gridWhite.addColorStop(1, 'rgba(255,255,255,0)');
    this.contextScheme.fillStyle = gridWhite;
    this.contextScheme.fillRect(0, 0, this.contextScheme.canvas.width, this.contextScheme.canvas.height);

    const gridBlack = this.contextScheme.createLinearGradient(0, 0, 0, this.contextScheme.canvas.height);
    gridBlack.addColorStop(0, 'rgba(0,0,0,0)');
    gridBlack.addColorStop(1, 'rgba(0,0,0,1)');
    this.contextScheme.fillStyle = gridBlack;
    this.contextScheme.fillRect(0, 0, this.contextScheme.canvas.width, this.contextScheme.canvas.height);
  }

  mouseMove($event) {
    // this.data = this.contextScheme.getImageData($event.offsetX, $event.offsetY, 1, 1).data;
    const x = $event.offsetX;
    const y = $event.offsetY;
    const imageData = this.contextScheme.getImageData(x, y, 1, 1).data;
    this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }

  changeColor($event) {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const imageData = this.contextHueSlider.getImageData(x, y, 1, 1).data;
    this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    this.data = this.rgbaColor;
    this.fillGradient();
  }

}
