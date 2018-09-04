import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {

  public positionSchemeX = 0;

  public positionSchemeY = 0;

  public positionHue = 0;

  public positionAlpha = 144;

  public opacity = 1;

  public rgbaColor = 'rgba(255,0,0,' + this.opacity + ')';

  public rgbaColorPreview = 'rgba(255,0,0,' + this.opacity + ')';

  public presetColors: string[] = [];

  constructor() {}

  getPositionHue(): number {
    return this.positionHue;
  }

  setPositionHue($event, offsetParent, offsetWidth) {
    this.positionHue = $event.clientX - offsetParent - (offsetWidth / 2) - 4;
  }

  getPositionAlpha(): number {
    return this.positionAlpha;
  }

  setPositionAlpha($event, offsetParent, offsetWidth) {
    this.positionAlpha = $event.clientX - offsetParent - (offsetWidth / 2) - 4;
  }

  getPositionSchemeX(): number {
    return this.positionSchemeX;
  }

  getPositionSchemeY(): number {
    return this.positionSchemeY;
  }

  setPositionScheme($event, offsetLeft, offsetTop) {
    this.positionSchemeX = $event.clientX - offsetLeft - 8;
    this.positionSchemeY = $event.clientY - offsetTop - 16;
  }

  setRgbaColor(color) {
    this.rgbaColor = color;
  }

  setRgbaColorPreview(color) {
    this.rgbaColorPreview = color;
  }

  getPresetColor(): string[] {
    return this.presetColors;
  }

  setPresetColor(color: string) {
    if (!this.presetColors.filter((colors) => (colors === color)).length) {
      this.presetColors = this.presetColors.concat(color);
    }
    if (this.presetColors.length > 16) {
      this.presetColors.splice(0, 1);
    }
  }

}
