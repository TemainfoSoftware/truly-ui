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
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { TlInput } from '../../../input/input';

import { Rgba } from './colorpicker-formats';

import { ColorPickerService } from './colorpicker-service';

import { ColorPickerHelpers } from './colorpicker-helpers';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'tl-colorpicker-content',
  templateUrl: './colorpicker-content.html',
  styleUrls: ['./colorpicker-content.scss']
})

export class TlColorPickerContent implements OnInit, AfterContentInit, OnChanges {

  @Input('input') input: TlInput;

  @Input('overlayPosition') overlayPosition: string;

  @Input('selectedColor') selectedColor: string;

  @Output('selectColor') selectColor: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @ViewChild('content') content: ElementRef;

  @ViewChild('scheme') scheme: ElementRef;

  @ViewChild('hue') hue: ElementRef;

  @ViewChild('hueSlider') hueSlider: ElementRef;

  @ViewChild('alpha') alpha: ElementRef;

  @ViewChild('alphaSlider') alphaSlider: ElementRef;

  public positionSchemeX: number;

  public positionSchemeY: number;

  public positionHue: number;

  public positionAlpha: number;

  public contextScheme;

  public contextHueSlider;

  public contextAlphaSlider;

  public opacity = 1;

  public rgbaColorPreview = 'rgba(255,0,0,' + this.opacity + ')';

  private isMoving = false;

  public presetColors: string[];

  constructor(private colorPickerService: ColorPickerService, private colorPickerHelpers: ColorPickerHelpers) {
  }

  ngOnInit() {
    this.getPositionSchemeX();
    this.getPositionSchemeY();
    this.getPositionHue();
    this.getPositionAlpha();
    this.getPresetColor();
  }

  ngAfterContentInit() {
    this.createCanvasScheme();
    this.createCanvasHue();
    this.createCanvasAlpha();
  }

  getPositionSchemeX(): void {
    this.positionSchemeX = this.colorPickerService.getPositionSchemeX();
  }

  getPositionSchemeY(): void {
    this.positionSchemeY = this.colorPickerService.getPositionSchemeY();
  }

  setPositionScheme($event): Observable<number> {
    this.colorPickerService.setPositionScheme($event,
      this.content.nativeElement.offsetParent.offsetLeft, this.content.nativeElement.offsetParent.offsetTop);
    this.getPositionSchemeX();
    this.getPositionSchemeY();
    return of(this.colorPickerService.positionSchemeX, this.colorPickerService.positionSchemeY);
  }

  getPositionHue(): void {
    this.positionHue = this.colorPickerService.getPositionHue();
  }

  setPositionHue($event): Observable<number> {
    this.colorPickerService.setPositionHue($event,
      this.content.nativeElement.offsetParent.offsetLeft, this.hue.nativeElement.offsetWidth);
    this.getPositionHue();
    return of(this.colorPickerService.positionHue);
  }

  getPositionAlpha(): void {
    this.positionAlpha = this.colorPickerService.getPositionAlpha();
  }

  setPositionAlpha($event): Observable<number> {
    this.colorPickerService.setPositionAlpha($event,
      this.content.nativeElement.offsetParent.offsetLeft, this.hue.nativeElement.offsetWidth);
    this.getPositionAlpha();
    return of(this.colorPickerService.positionAlpha);
  }

  public setMoving(value) {
    this.isMoving = value;
  }

  public onMouseDownScheme($event) {
    this.setMoving(true);
    this.setPositionScheme($event);
    this.changeColorScheme($event);
  }

  public onMouseMoveScheme($event) {
    if (!this.isMoving) {
      return;
    }
    this.setPositionScheme($event);
    this.changeColorScheme($event);
  }

  public onMouseDownHue($event) {
    this.setMoving(true);
    this.setPositionHue($event);
    this.changeColor($event);
  }

  public onMouseMoveHue($event) {
    if (!this.isMoving) {
      return;
    }
    this.setPositionHue($event);
    this.changeColor($event);
  }

  public onMouseDownAlpha($event) {
    this.setMoving(true);
    this.setPositionAlpha($event);
    this.changeOpacity($event);
  }

  public onMouseMoveAlpha($event) {
    if (!this.isMoving) {
      return;
    }
    this.setPositionAlpha($event);
    this.changeOpacity($event);
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

  createCanvasAlpha() {
    this.contextAlphaSlider = this.alphaSlider.nativeElement.getContext('2d');
    this.contextAlphaSlider.rect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);
    this.opacityGradient();
  }

  opacityGradient() {
    const context = this.alphaSlider.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);

    const gridTransparent = this.contextAlphaSlider.createLinearGradient(0, 0, this.contextAlphaSlider.canvas.width, 0);
    gridTransparent.addColorStop(0, 'transparent');
    gridTransparent.addColorStop(1, this.getRgbaColor());
    this.contextAlphaSlider.fillStyle = gridTransparent;
    this.contextAlphaSlider.fillRect(0, 0, this.contextAlphaSlider.canvas.width, this.contextAlphaSlider.canvas.height);
  }

  changeColorScheme($event) {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const imageData = this.contextScheme.getImageData(x, y, 1, 1).data;
    this.setColor(imageData);
    this.opacityGradient();
  }

  changeColor($event) {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const imageData = this.contextHueSlider.getImageData(x, y, 1, 1).data;
    this.setColor(imageData);
    this.fillGradient();
    this.opacityGradient();
  }

  changeOpacity($event) {
    this.opacity = Math.round((100 * ($event.offsetX + 1) / $event.target.clientWidth)) / 100;
    const x = $event.offsetX;
    const y = $event.offsetY;
    const imageData = this.contextAlphaSlider.getImageData(x, y, 1, 1).data;
    this.setColor(imageData);
  }

  setColor(imageData) {
    this.setRgbaColor('rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)');
    this.setRgbaColorPreview('rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',' + this.opacity + ')');
    const rgba = new Rgba(imageData[0], imageData[1], imageData[2], this.opacity);
    this.rgbaColorPreview = (this.opacity === 1) ? this.colorPickerHelpers.rgbaToHex(rgba) : this.colorPickerHelpers.rgbaToHex(rgba, true);
    this.selectColor.emit(this.getRgbaColorPreview());
  }

  getPresetColor(): void {
    this.presetColors = this.colorPickerService.getPresetColor();
  }

  setPresetColor(color): Observable<string[]> {
    this.colorPickerService.setPresetColor(color);
    this.getPresetColor();
    return of(this.colorPickerService.presetColors);
  }

  ngOnChanges(value: SimpleChanges) {
    if (value['selectedColor'] && this.selectedColor !== undefined) {
      const hsva = this.colorPickerHelpers.stringToHsva(this.selectedColor);
      this.colorPickerService.positionHue = hsva.h * 144;
      this.getPositionHue();
      this.colorPickerService.positionSchemeX = (hsva.s * 230) - 8;
      this.getPositionSchemeX();
      this.colorPickerService.positionSchemeY = ((1 - hsva.v) * 130) - 8;
      this.getPositionSchemeY();
      // this.setRgbaColor('#fff');
    }
  }

}
