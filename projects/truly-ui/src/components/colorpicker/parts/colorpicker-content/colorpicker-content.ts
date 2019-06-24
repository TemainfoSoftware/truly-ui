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
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Observable, of } from 'rxjs';

import { OverlayAnimation } from '../../../core/directives/overlay-animation';
import { Rgba } from '../../helpers/colorpicker-formats';
import { ColorPickerService } from '../../services/colorpicker-service';
import { ColorPickerHelpers } from '../../helpers/colorpicker-helpers';
import { ColorPickerMovable } from '../../interfaces/colorpicker-content-interface';

@Component({
  selector: 'tl-colorpicker-content',
  templateUrl: './colorpicker-content.html',
  styleUrls: ['./colorpicker-content.scss'],
  animations: [ OverlayAnimation ]
})

export class TlColorPickerContent implements OnInit, AfterContentInit, OnChanges {

  @Input('overlayPosition') overlayPosition: string;

  @Input('selectedColor') selectedColor: string;

  @Input() recentColors = false;

  @Input() returnFormatColor = false;

  @Input() color = 'basic';

  @Output('selectColor') selectColor: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TemplateRef, {static: true} ) template: TemplateRef<any>;

  @ViewChild('content', {static: true} ) content: ElementRef;

  @ViewChild('scheme', {static: true} ) scheme: ElementRef;

  @ViewChild('cursorScheme', {static: true} ) cursorScheme: ElementRef;

  @ViewChild('hue', {static: true} ) hue: ElementRef;

  @ViewChild('hueSlider', {static: true} ) hueSlider: ElementRef;

  @ViewChild('alpha', {static: true} ) alpha: ElementRef;

  @ViewChild('alphaSlider', {static: true} ) alphaSlider: ElementRef;

  public positionSchemeX: number;

  public positionSchemeY: number;

  public contextScheme;

  public contextHueSlider;

  public contextAlphaSlider;

  private isMoving: ColorPickerMovable = { scheme: false, hue: false, alpha: false };

  public presetColors: string[];

  constructor(private renderer: Renderer2,
              private colorPickerService: ColorPickerService,
              private colorPickerHelpers: ColorPickerHelpers) { }

  ngOnInit() {
    this.getPositionSchemeX();
    this.getPositionSchemeY();
    this.getPositionHue();
    this.getPositionAlpha();
    this.getPresetColor();
    this.windowMouseEvent();
  }

  ngAfterContentInit() {
    this.createCanvasScheme();
    this.createCanvasHue();
    this.createCanvasAlpha(this.getRgbaColorPreview());
  }

  windowMouseEvent() {
    this.renderer.listen(window, 'mousemove', ($event) => {
      if (this.isMoving.scheme) {
        this.onMouseMoveScheme($event);
      }
      if (this.isMoving.hue) {
        this.onMouseMoveHue($event);
      }
      if (this.isMoving.alpha) {
        this.onMouseMoveAlpha($event);
      }
    });

    this.renderer.listen(window, 'mouseup', () => {
      this.isMoving = { scheme: false, hue: false, alpha: false };
    });
  }

  getPositionSchemeX(): number {
    return this.colorPickerService.getPositionSchemeX();
  }

  getPositionSchemeY(): number {
    return this.colorPickerService.getPositionSchemeY();
  }

  setPositionScheme($event): Observable<number> {
    const offset = this.content.nativeElement.getBoundingClientRect();
    const width = this.scheme.nativeElement.offsetWidth;
    const height = this.scheme.nativeElement.offsetHeight;
    const midCursorWidth = this.cursorScheme.nativeElement.offsetWidth / 2;
    this.colorPickerService.setPositionScheme($event, offset.left, offset.top, width, height, midCursorWidth);
    this.changeColorScheme(this.getPositionSchemeX() + midCursorWidth, this.getPositionSchemeY() + midCursorWidth);
    return of(this.colorPickerService.positionSchemeX, this.colorPickerService.positionSchemeY);
  }

  getPositionHue(): number {
    return this.colorPickerService.getPositionHue();
  }

  setPositionHue($event): Observable<number> {
    const offset = this.hue.nativeElement.getBoundingClientRect();
    const width = this.hue.nativeElement.offsetWidth;
    this.colorPickerService.setPositionHue($event, offset.left, width);
    this.changeColor(this.colorPickerService.getPositionHue());
    return of(this.colorPickerService.positionHue);
  }

  getPositionAlpha(): number {
    return this.colorPickerService.getPositionAlpha();
  }

  setPositionAlpha($event): Observable<number> {
    const offset = this.alpha.nativeElement.getBoundingClientRect();
    const width = this.alpha.nativeElement.offsetWidth;
    this.colorPickerService.setPositionAlpha($event, offset.left, width);
    this.changeOpacity(this.colorPickerService.getPositionAlpha());
    return of(this.colorPickerService.positionAlpha);
  }

  public onMouseDownScheme($event) {
    this.isMoving.scheme = true;
    this.setPositionScheme($event);
  }


  public onMouseMoveScheme($event) {
    if (!this.isMoving.scheme) {
      return;
    }
    this.setPositionScheme($event);
  }

  public onMouseDownHue($event) {
    this.isMoving.hue = true;
    this.setPositionHue($event);
  }

  public onMouseMoveHue($event) {
    if (!this.isMoving.hue) {
      return;
    }
    this.setPositionHue($event);
  }

  public onMouseDownAlpha($event) {
    this.isMoving.alpha = true;
    this.setPositionAlpha($event);
  }

  public onMouseMoveAlpha($event) {
    if (!this.isMoving.alpha) {
      return;
    }
    this.setPositionAlpha($event);
  }

  getOpacityColor(): number {
    return this.colorPickerService.opacity;
  }

  setOpacityColor(opacity): Observable<number> {
    this.colorPickerService.setOpacityColor(opacity);
    this.getOpacityColor();
    return of(this.colorPickerService.opacity);
  }

  getRgbaColor(): string {
    return this.colorPickerService.rgbaColor;
  }

  setRgbaColor(color): Observable<string> {
    this.colorPickerService.setRgbaColor(color);
    this.getRgbaColor();
    return of(this.colorPickerService.rgbaColor);
  }

  getRgbaColorPreview(): string {
    return this.colorPickerService.rgbaColorPreview;
  }

  setRgbaColorPreview(color): Observable<string> {
    this.colorPickerService.setRgbaColorPreview(color);
    this.getRgbaColorPreview();
    return of(this.colorPickerService.rgbaColorPreview);
  }

  createCanvasScheme() {
    this.contextScheme = this.scheme.nativeElement.getContext('2d');
    this.contextScheme.rect(0, 0, this.contextScheme.canvas.width, this.contextScheme.canvas.height);
    this.fillGradient();
  }

  deleteCanvasScheme() {
    this.contextScheme = this.scheme.nativeElement.getContext('2d');
    this.contextScheme.clearRect(0, 0, this.contextScheme.canvas.width, this.contextScheme.canvas.height);
  }

  fillGradient() {
    this.contextScheme.fillStyle = this.getRgbaColor();
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

  createCanvasHue() {
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

  deleteCanvasHue() {
    this.contextHueSlider = this.hueSlider.nativeElement.getContext('2d');
    this.contextHueSlider.clearRect(0, 0, this.contextHueSlider.canvas.width, this.contextHueSlider.canvas.height);
  }

  createCanvasAlpha(color) {
    this.contextAlphaSlider = this.alphaSlider.nativeElement.getContext('2d');
    this.contextAlphaSlider.rect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);
    this.opacityGradient(color);
  }

  deleteCanvasAlpha() {
    this.contextAlphaSlider = this.alphaSlider.nativeElement.getContext('2d');
    this.contextAlphaSlider.clearRect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);
  }

  opacityGradient(color) {
    const context = this.alphaSlider.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);

    const gridTransparent = this.contextAlphaSlider.createLinearGradient(0, 0, this.contextAlphaSlider.canvas.width, 0);
    gridTransparent.addColorStop(0, 'transparent');
    gridTransparent.addColorStop(1, color);
    this.contextAlphaSlider.fillStyle = gridTransparent;
    this.contextAlphaSlider.fillRect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);
  }

  changeColorScheme(x, y) {
    x = (x >= this.scheme.nativeElement.offsetWidth) ? (x - 1) : x;
    const imageData = this.contextScheme.getImageData(x, y, 1, 1).data;
    this.setColor(imageData);
    this.opacityGradient(this.getRgbaColor());
  }

  changeColor(x) {
    const imageData = this.contextHueSlider.getImageData((x - 1), 1, 1, 1).data;
    this.setColor(imageData);
    this.fillGradient();
    this.opacityGradient(this.getRgbaColor());

    this.colorPickerService.positionSchemeX = 222;
    this.colorPickerService.positionSchemeY = -8;
    this.getPositionSchemeX();
    this.getPositionSchemeY();
  }

  changeOpacity(x) {
    this.setOpacityColor(Math.round(((100 * x) / this.alphaSlider.nativeElement.offsetWidth)) / 100);
    const imageDataAlpha = this.contextAlphaSlider.getImageData(this.contextAlphaSlider.canvas.width - 1, 1, 1, 1).data;
    this.setColor(imageDataAlpha);
  }

  setColor(imageData) {
    this.setRgbaColor('rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)');
    const rgba = new Rgba(imageData[0], imageData[1], imageData[2], this.getOpacityColor());
    const hex = (this.getOpacityColor() === 1) ? this.colorPickerHelpers.rgbaToHex(rgba) :
      this.colorPickerHelpers.rgbaToHex(rgba, true);
    this.setRgbaColorPreview(hex);
    this.selectColor.emit({'hex': hex, 'rgba': this.colorPickerHelpers.hexToRgbString(hex)});
  }

  getPresetColor(): void {
    this.presetColors = this.colorPickerService.getPresetColor();
  }

  setPresetColor(color): Observable<string[]> {
    this.colorPickerService.setPresetColor(color);
    this.getPresetColor();
    return of(this.colorPickerService.presetColors);
  }

  changeColorByPreset(color) {
    this.setRgbaColor(color);
    this.setRgbaColorPreview(color);
    this.selectColor.emit({'hex': this.getRgbaColorPreview(), 'rgba': this.colorPickerHelpers.hexToRgbString(this.getRgbaColorPreview())});
  }

  updateColor(value) {
    if (value['selectedColor'] && this.selectedColor !== undefined && this.selectedColor) {
      const selected: Array<number> = this.colorPickerHelpers.hexToRgb(this.selectedColor);
      const hsva = (this.selectedColor.length > 7) ? this.colorPickerHelpers.stringToHsva(this.selectedColor, true)
        : this.colorPickerHelpers.stringToHsva(this.selectedColor);
      if (!this.isMoving.scheme && !this.isMoving.hue && !this.isMoving.alpha && hsva !== null) {
        this.colorPickerService.setPositionHueManual(hsva.h * 144);
        this.colorPickerService.setPositionSchemeManual(Math.floor((hsva.s * 230) - 8), Math.floor(((1 - hsva.v) * 130) - 8));
        this.colorPickerService.setPositionAlphaManual(hsva.a * 144);
        this.deleteCanvasHue();
        this.createCanvasHue();
        const imageDataHue = this.contextHueSlider.getImageData(hsva.h * 144, 1, 1, 1).data;
        this.setRgbaColor('rgba(' + imageDataHue[0] + ',' + imageDataHue[1] + ',' + imageDataHue[2] + ',1)');
        this.setRgbaColorPreview('rgba(' + selected[0] + ',' + selected[1] + ',' + selected[2] + ',1)');
        this.deleteCanvasAlpha();
        this.createCanvasAlpha(this.getRgbaColorPreview());
        this.deleteCanvasScheme();
        this.createCanvasScheme();
      }
    }
  }

  ngOnChanges(value: SimpleChanges) {
    this.updateColor(value);
  }

}
